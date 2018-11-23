const{SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
         id:14
     }
var token = jwt.sign(data, 'SecrteSaltKey123');

var decodedtoken = jwt.verify(token, 'SecrteSaltKey123');

console.log(token);

console.log('DECODED',decodedtoken);
// var message = "I am number 3"
// var hashmessage = SHA256(message).toString();
// console.log(`message: ${message}`);
// console.log(`hashmessage: ${hashmessage}`);

// var data = {
//     id:4
// }

// var token = {
//     data,
//     hash:SHA256(JSON.stringify(data) + 'SoMeSecReTT').toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString

// var resultHash = SHA256(JSON.stringify(token.data) + 'SoMeSecReTT').toString();

// if(resultHash === token.hash){
//     console.log('Data was not changed')
// } else {
//     console.log('Data was changed Dont TRust')
// }