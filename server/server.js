var express = require('express');
var bodyparser = require('body-parser');

var {mongoose} = require('./DB/mongoose');
var {TODO} = require('./models/Todomodel');
var {User} = require('./models/Usermodel');

mongoose.Promise = global.Promise

var app = express();

 app.use(bodyparser.urlencoded ({extended: true})); 
 // parse application/x-www-form-urlencoded

 app.use(bodyparser.json());
 // parse application/json


app.post('/todos', (req, res) => {

    // console.log(req.body);

    var todo = new TODO({
        task: req.body.task,
        status: req.body.status
    });
    todo.save().then((docs) => {
        res.send(docs);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req,res) => {
    TODO.find().then((todos) => {
        res.send({todos});
    })
}, (e) => {
    res.status(400).send(e);
});

app.listen(3000, () => {
    console.log('starting port 3000')
});

module.exports = {app}
























// var TODO123 = new TODO({
//     task:'DINNER ARRANGEMENT',
//     status:'IN PROCESS',
//     completed: false,
//     timestamp: '000000'
// }); // ADD DATA TO DATA MODEL 

// TODO123.save().then((docs) => {
//     console.log(docs, 'saved');
// },(e) => {
//     console.log('ERROR',e);
// }); //SAVE DATA IN MONGODB

// var TODO1234 = new TODO({
//     task:'DANCE PARTY',
//     status:'IN PROCESS',
//     timestamp: '56788'
// }); // ADD DATA TO DATA MODEL 

// TODO1234.save().then((docs) => {
//     console.log(docs, 'saved');
// },(e) => {
//     console.log('ERROR',e);
// }); //SAVE DATA IN MONGODB


// var user = new User({
//     Email:'asdfg@gmail.com'
// })

// user.save().then((docs) => {
//     console.log(`USER IS ${docs}`)
// }, (e) =>{
//     console.log('ERROR', e)
// });