const expect = require('expect');

const supertest = require('supertest');

const {ObjectID} = require('mongodb');


const { app } = require('../server');
const { TODO } = require('../models/Todomodel');

const temptodo = [  
                    {_id: new ObjectID(),task: 'GET TEST TEMP TASK'},
                    {_id: new ObjectID(),task: 'GET TEST TEMP TASK2'}
                ]

// beforeEach((done) => {
//     TODO.remove({}).then(() => done());
// }); // THIS COMMAND CLEANS TODOS COLLECTION BEFORE EACH EXECUTION

beforeEach((done) => {
    TODO.remove({}).then(() => {
        return TODO.insertMany(temptodo);
    }).then(() => {
        done();
    })
}); // THIS COMMAND CLEANS TODOS COLLECTION BEFORE EACH EXECUTION AND ADDS TEMPERORY TODOS



describe('POST /todos', () => {
    it('should create new todo', (done) => {
        var task = 'Test todo task';

        supertest(app).post('/todos').send({ task }).expect(200).expect((res) => {
            expect(res.body.task).toBe(task);
        }).end((err, res) => {
            if (err) {
                return done(err);
            }
            TODO.find({task}).then((todos) => {
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

        supertest(app).post('/todos').send().expect(200).end((err, res) => {
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
        supertest(app).get('/todos').expect(200).expect((res) => {
            expect(res.body.todos.length).toBe(2);
        }).end(done);
    });
});

describe('GET/todos/:id',() => {
    it('should return todo doc refered to id', (done) => {
        supertest(app).get(`/todos/${temptodo[0]._id.toHexString()}`)
        .expect(200).expect((res) => {
            expect(res.body.todo.task).toBe(temptodo[0].task);
        }).end(done)
    });
    it('should return 404 if todo not found', (done) => {
        var hexID =new ObjectID().toHexString();
        supertest(app).get(`/todos/${hexID}`).expect(404).end(done);
    });
    it('return 404 for non object ID',(done) => {
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
        var hexID =new ObjectID().toHexString();
        supertest(app).delete(`/todos/${hexID}`).expect(404).end(done);

    });

    it('should return 404 if object id is invalid', (done) => {
        var hexID = 'asd123sd123asdf123';

        supertest(app).delete(`/todos/${hexID}`).expect(404).end(done);

    });

});