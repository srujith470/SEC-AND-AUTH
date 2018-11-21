const mongoose = require('mongoose');
const validator = require('validator');

// {
//     email:'',
//     password:'', we need to hash the password in one way hashing to avoid password leak
//     tokens:[{
//                      token is array of objects each object is login token.
//                      so if you login in phone and pc both have different tokens
//         access:'auth' or 'verify email', 'reset password'
//         token:'' ,           crypto string used and send back and forth by user to 
//                              make secure request and validate so user is eligible for request
//     }]
// }

var User = mongoose.model('User', {
    Email: {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value)
            },
            message: '{value} is not valid email'
        }
    },
    password: {
        type: string,
        require: true,
        minlength: 6,
    },
    tokens: [{
        access: {
            type: string,
            require: true
        },
        token: {
            type: string,
            require: true
        }
    }]
});

module.exports = { User }

// https://www.npmjs.com/package/validator
// https://mongoosejs.com/docs/validation.html