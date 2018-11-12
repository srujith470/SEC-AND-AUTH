var mongoose = require('mongoose');

module.exports = {ToDo};

var TODO = mongoose.model('TODO', {
    task:{
        type: String,
        trim:true,
        minlength:5

    },
    status:{
        type: String,
        required:true
    },
    completed:{
        type: Boolean,
        default: false
    },
    timestamp:{
        type: Number,
    }
}); // DATA MODEL INTERFACE CONSTRUICTOR FOR TODO
