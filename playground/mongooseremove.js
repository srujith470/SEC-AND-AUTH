const{mongoose} = require('../server/DB/mongoose');
const{TODO} = require('../server/models/Todomodel');
const {User} = require('../server/models/Usermodel');


const {ObjectID} = require('mongodb');

// TODO.remove({}).then((result) => {
//     console.log(JSON.stringify(result, undefined, 2));
// }); // REMOVE METHOD WONT GIVE DOCS BACK WHICH ARE REMOVED

// TODO.findOneAndRemove({_id:"5bee1f002136f7ff07cb107e"}).then((result) => {
//     console.log(JSON.stringify(result, undefined, 2));
// })
//findOneAndRemove GIVS DOCS WHICH ARE REMOVED

TODO.findByIdAndRemove("5bee1f3a2136f7ff07cb10a1").then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
})

// findByIdAndRemove GIVS DOCS WHICH ARE REMOVED REFERENCE TO ID

