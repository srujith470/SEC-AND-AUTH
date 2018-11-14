const expect = require('expect');

const supertest = require('supertest');

const { app } = require('../server');
const { TODO } = require('../models/Todomodel');


beforeEach((done) => {
    TODO.remove({}).then(() => done());
}); // THIS COMMAND CLEANS TODOS COLLECTION BEFORE EACH EXECUTION

describe('POST /todos', () => {
    it('should create new todo', (done) => {
        var task = 'Test todo task';

        supertest(app).post('/todos').send({ task }).expect(200).expect((res) => {
            expect(res.body.task).toBe(task);
        }).end((err, res) => {
            if (err) {
                return done(err);
            }

            TODO.find().then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].task).toBe(task);
                done();
            }).catch((e) => {
                done(e)
            });
        });
    });
});