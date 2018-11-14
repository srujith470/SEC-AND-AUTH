const{mongoose} = require('../server/DB/mongoose');
const{TODO} = require('../server/models/Todomodel');
const {ObjectID} = require('mongodb');
const {User} = require('../server/models/Usermodel');

var id = "5bebd05ada44283e50ea26fd";
var uid = "5bec945546730a16e464a973";

if(!ObjectID.isValid(id)){
    console.log('ID NOT VALID')
}else{
    console.log("VALID ID")
}

// TODO.find({
//     _id: id
// }).then((todos) => {
//     console.log('todosfind:', todos) ;
// });

// TODO.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('TODO FINDONE:', todo);
// })

TODO.findById(id).then((todo) => {
    if(!todo){
        return console.log('ID NOT FOUND!!!!')
    }
    console.log('TODO FINDBYID:', todo)
})

User.findById(uid).then((user) => {
    if(!user){
        console.log('unable to log user');
    } else{
        console.log(JSON.stringify(user, undefined, 2));
    } 
}, (e) => {
    console.log(e)
});


