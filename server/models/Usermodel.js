const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _L = require('lodash');
const bcryptjs = require('bcryptjs');
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

UserSchema.statics.findByToken = function(token) {
    var USER = this;
    var decoded;
    try{
        decoded = jwt.verify(token,'abc123')
    }catch(e){
        // return new Promise((resolve, reject) => {
        //     reject();
        // });

        return Promise.reject();
    }

    return USER.findOne({
         '_id': decoded._id,
        'tokens.token': token,
        'tokens.access':'auth'
    })
};

UserSchema.pre('save', function(next) {
    var USER = this;
    if(USER.isModified('password')){
        bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(USER.password, salt, (err, hash) => {
                USER.password = hash;
                next();
            })
        });
    }else{
        next();
    }
});
var User = mongoose.model('User', UserSchema);

module.exports = { User }

// https://www.npmjs.com/package/validator
// https://mongoosejs.com/docs/validation.html