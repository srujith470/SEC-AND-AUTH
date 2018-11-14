const expect = require('expect');

const supertest = require('supertest');

const { app } = require('../server');
const { TODO } = require('../models/Todomodel');

const temptodo = [{task: 'GET TEST TEMP TASK'},{task: 'GET TEST TEMP TASK2'}]

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