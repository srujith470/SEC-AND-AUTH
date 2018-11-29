const {ObjectID} = require('mongodb');
const {TODO} = require('../models/Todomodel');
const {User} = require('../models/Usermodel');
const jwt = require('jsonwebtoken');

const userid1 = new ObjectID();
const userid2 = new ObjectID();

const tempusers =[{
    _id: userid1,
    Email:'adf@asd.com',
    password:'onepass123',
    _creator: userid1,
    tokens:[{
        access: 'auth',
        token: jwt.sign({_id: userid1, access: 'auth'}, 'abc123').toString()
    }]
},{
    _id:userid2,
    Email:'asdfgws@gmail.com',
    password: 'twopass321',
    _creator: userid2
}]

const temptodo = [
    { 
        _id: new ObjectID(),
        task: 'GET TEST TEMP TASK',
        completed: false,
        timestamp: 123456,
        status: 'KNOWN'
    },
    {
        _id: new ObjectID(),
        task: 'GET TEST TEMP TASK2',
        completed: true,
        timestamp: 123456,
        status: 'GET SET GO'
    }
]

const populateTodos = (done) => {
    TODO.remove({}).then(() => {
        return TODO.insertMany(temptodo);
    }).then(() => {
        done();
    })
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var UserOne = new User(tempusers[0]).save();
        var UserTwo = new User(tempusers[1]).save();   
        return Promise.all([UserOne, UserTwo])
    }).then(() => done());
};

module.exports = {temptodo, populateTodos, tempusers, populateUsers};