var mongoose = require('mongoose');

module.exports = {User}

var User = mongoose.model('USER', {
    Email:{
        type: String,
        trim:true,
        required: true,
        minlength:1
    }
});

