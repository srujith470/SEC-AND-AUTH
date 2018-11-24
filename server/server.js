var express = require('express');
var bodyparser = require('body-parser');
const {ObjectID} = require('mongodb');
const _L = require('lodash');


var { mongoose } = require('./DB/mongoose');
mongoose.set('useFindAndModify', false);  //DEPRECATION WARNING

var { TODO } = require('./models/Todomodel');
var { User } = require('./models/Usermodel');

const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise

var app = express();

app.use(bodyparser.urlencoded({ extended: true }));
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
app.get('/todos', (req, res) => {
    TODO.find().then((todos) => {
        res.send({ todos });
        console.log(req.body)
    })
}, (e) => {
    res.status(400).send(e);
});

// app.post('/users', (req, res) => {
//     // console.log(req.body);
//     var user = new User({
//         Email: req.body.Email,
//     });
//     user.save().then((docs) => {
//         res.send(docs);
//     }, (e) => {
//         res.status(400).send(e);
//     });
// }); 
// above comment is remove old post user and add new one for authencitation

app.get('/users', (req, res) => {
    User.find().then((todos) => {
        res.send({ todos });
        console.log(req.body)
    })
}, (e) => {
    res.status(400).send(e);
});

app.get('/todos/:id', (req,res) => {
    //res.send(req.params); // this statement tracks and prints id of URL in POSTMAN
    var id = req.params.id; // this is id as dynamic parameter which give in url of POSTMAN

    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    TODO.findById(id).then((todo) => {
        if(!todo){
            return res.status(404).send()
       }
            res.send({todo:todo})
    }).catch((e) => {
        res.status(400).send()
    });
});
 
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id; // this is id as dynamic parameter which give in url of POSTMAN
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    TODO.findByIdAndRemove(id).then((todo) => {
    if(!todo){
        return res.status(404).send()
    }
        res.send({todo:todo})
        console.log(JSON.stringify(result, undefined, 2));
    }).catch((e) => {
        res.status(404).send();
    });    
}); //DELET A DOC

app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    var body = _L.pick(req.body,['task','status','completed','timestamp']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    };

    if(_L.isBoolean(body.completed) && body.completed){
        body.timestamp= new Date().getTime()
    } else{
        body.completed = false;
        body.timestamp = null;  
    }
    TODO.findByIdAndUpdate(id, {$set: body}, {new:true}).then(todo =>  {
        res.send({todo})
    }).catch((e) => {
        res.status(404).send()
    })
});

app.post('/users', (req, res) => {
    // console.log(req.body);
    var body = _L.pick(req.body, ['Email', 'password']);
    var user = new User(body)

    user.save().then((user) => {
    return user.generateAuthToken();
       // res.send(user);
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e)
    });
});

app.get('/users/me', (req, res) => {
    var token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        if(!user){
        return Promise.reject();
        }
        res.send(user);
    }).catch((e) => {
        res.send(401).send();
    });
}); //private route


app.listen(port, () => {
    console.log(`starting port ${port}`)
});

module.exports = { app }
























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