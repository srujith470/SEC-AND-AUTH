const expect = require('expect');

const supertest = require('supertest');

const { ObjectID } = require('mongodb');

const { temptodo, tempusers, populateTodos, populateUsers } = require('../seed/seedDB');
const { app } = require('../server');
const { TODO } = require('../models/Todomodel');
const { User } = require('../models/Usermodel');



// beforeEach((done) => {
//     TODO.remove({}).then(() => done());
// }); // THIS COMMAND CLEANS TODOS COLLECTION BEFORE EACH EXECUTION
beforeEach(populateUsers);
beforeEach(populateTodos); // THIS COMMAND CLEANS TODOS COLLECTION BEFORE EACH EXECUTION AND ADDS TEMPERORY TODOS



describe('POST /todos', () => {
    it('should create new todo', (done) => {
        var task = 'Test todo task';

        supertest(app).post('/todos')
        .set('x-auth', tempusers[0].tokens[0].token)
        .send({ task }).expect(200).expect((res) => {
            expect(res.body.task).toBe(task);
        }).end((err, res) => {
            if (err) {
                return done(err);
            }
            TODO.find({ task }).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].task).toBe(task);
                done();
            }).catch((e) => {
                done(e)
            });
        });
    });

    it('should not create new todo with invalid data', (done) => {
        var task = 'Test todo task';

        supertest(app).post('/todos')
        .set('x-auth', tempusers[0].tokens[0].token)
        .send().expect(200).end((err, res) => {
            if (err) {
                return done(err);
            }

            TODO.find().then((todos) => {
                expect(todos.length).toBe(3);
                done();
            }).catch((e) => {
                done(e)
            });
        });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        supertest(app).get('/todos')
        .set('x-auth', tempusers[0].tokens[0].token)
        .expect(200).expect((res) => {
            expect(res.body.todos.length).toBe(0);
        }).end(done);
    });
});

describe('GET/todos/:id', () => {
    it('should return todo doc refered to id', (done) => {
        supertest(app).get(`/todos/${temptodo[0]._id.toHexString()}`)
        .set('x-auth', tempusers[0].tokens[0].token)
            .expect(200).expect((res) => {
                expect(res.body.todo.task).toBe(temptodo[0].task);
            }).end(done)
    });
    it('should return 404 if todo not found', (done) => {
        var hexID = new ObjectID().toHexString();
        supertest(app).get(`/todos/${hexID}`).expect(404).end(done);
    });
    it('return 404 for non object ID', (done) => {
        supertest(app).get('/todos/asdfgh1234sdfg').expect(404).end(done);
    });
}
);

describe('DELET/todos/:id', () => {
    it('should remove Todo', (done) => {
        var hexID = temptodo[1]._id.toHexString();
        supertest(app).delete(`/todos/${hexID}`).expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexID)
            }).end(done)
    });

    it('should return 404 if Todo not found', (done) => {
        var hexID = new ObjectID().toHexString();
        supertest(app).delete(`/todos/${hexID}`).expect(404).end(done);

    });

    it('should return 404 if object id is invalid', (done) => {
        var hexID = 'asd123sd123asdf123';

        supertest(app).delete(`/todos/${hexID}`).expect(404).end(done);

    });

});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexId = temptodo[0]._id.toHexString();
        var task = 'This should be the new text';
        supertest(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: true,
                task
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.task).toBe(task);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.timestamp).toBe('number');
            })
            .end(done);
    });
    it('should clear completedAt when todo is not completed', (done) => {
        var hexId = temptodo[0]._id.toHexString();
        var task = 'This should be the new text!!';
        supertest(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: false,
                task,
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.task).toBe(task);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.timestamp).toBeFalsy();
            })
            .end(done);
    });
});

describe('GET/users/me', () => {
    it('it should user if auth', (done) => {
        supertest(app).get('/users/me').set('x-auth', tempusers[0].tokens[0].token)
            .expect(200).expect((res) => {
                expect(res.body._id).toBe(tempusers[0]._id.toHexString());
                expect(res.body.Email).toBe(tempusers[0].Email);
            }).end(done)
    });

    it('sould return 401 if auth fail', (done) => {
        supertest(app).get('/users/me').expect(401).expect((res) => {
            expect(res.body).toEqual({});
        }).end(done)
    })
});

describe('POST/users', () => {
    it('should create a user', (done) => {
        var Email = 'example@example.com';
        var password = '123mnb!';

        supertest(app)
            .post('/users')
            .send({ Email, password })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
                expect(res.body.Email).toBe(Email);
        }).end((err) => {
            if (err) {
                return done(err);
            }
            User.findOne({ Email }).then((user) => {
                    expect(user).toBeTruthy();
                    expect(user.password).not.toBe(password);
                    done();
            });
            })
    });
    
    it('should return validation errors if request is invalid', (done) => {
        supertest(app)
        .post('/users')
        .send({
          Email: 'and',
          password: '123'
        })
        .expect(400)
        .end(done);
    });

    it('should not create email if email is in use', (done) => {
       supertest(app)
      .post('/users')
      .send({
        Email: tempusers[0].Email,
        password: 'Password123!'
      })
      .expect(400)
      .end(done);
    });
});

describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
      supertest(app)
        .post('/users/login')
        .send({
          Email: tempusers[1].Email,
          password: tempusers[1].password
        })
        .expect(200)
        .expect((res) => {
          expect(res.headers['x-auth']).toBeTruthy();
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          User.findById(tempusers[1]._id).then((user) => {
            expect(user.tokens[0]).toContain({
              access: 'auth',
              token: res.headers['x-auth']
            });
            done();
          }).catch((e) => done(e));
        });
    });
  
    it('should reject invalid login', (done) => {
      supertest(app)
        .post('/users/login')
        .send({
          email: tempusers[1].Email,
          password: tempusers[1].password + '1'
        })
        .expect(400)
        .expect((res) => {
          expect(res.headers['x-auth']).toBeFalsy();
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          User.findById(tempusers[1]._id).then((user) => {
            expect(user.tokens.length).toBe(0);
            done();
          }).catch((e) => done(e));
        });
    });
  });
  

  describe('DELETE /users/me/token', () => {
    it('should remove auth token on logout', (done) => {
      supertest(app)
        .delete('/users/me/token')
        .set('x-auth', temptodo[0].tokens[0].token)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          User.findById(temptodo[0]._id).then((user) => {
            expect(user.tokens.length).toBe(0);
            done();
          }).catch((e) => done(e));
        });
    });
  });
  