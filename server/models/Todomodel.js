var mongoose = require('mongoose');

var TODO = mongoose.model('TODO', {
    task:{
        type: String,
        trim:true,
        minlength:5

    },
    status:{
        type: String
    },
    completed:{
        type: Boolean,
        default: false
    },
    timestamp:{
        type: Number,
        default: null
    },
    _creator:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    }
}); // DATA MODEL INTERFACE CONSTRUICTOR FOR TODO

module.exports = {TODO};

