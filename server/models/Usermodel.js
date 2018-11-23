const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _L = require('lodash');

var UserSchema = new mongoose.Schema({
    
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
            type: String,
            require: true,
            minlength: 6
        },
        tokens: [{
            access: {
                type: String,
                require: true
            },
            token: {
                type: String,
                require: true
            }
        }]
    });

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();
    return _L.pick(userObject, ['_id', 'Email']);
}

UserSchema.methods.generateAuthToken = function () {
    var usertoken = this;
    var access = 'auth';
    var token = jwt.sign({_id: usertoken._id.toHexString(), access}, 'abc123').toString();

    //user.tokens.push({access, token});

    usertoken.tokens = usertoken.tokens.concat([{access, token}]);
    return usertoken.save().then(() => {
        return token;
    });
}

var User = mongoose.model('User', UserSchema);

module.exports = { User }

// https://www.npmjs.com/package/validator
// https://mongoosejs.com/docs/validation.html