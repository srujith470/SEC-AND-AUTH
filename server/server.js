var {mangoose} = require('./DB/mongoose');

var {ToDo} = require('./models/Todomodel');

var {User} = require('./models/Usermodel');



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