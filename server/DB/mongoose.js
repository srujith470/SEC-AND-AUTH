var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/ToDos1', { useNewUrlParser: true, useCreateIndex: true });

module.exports = {mongoose};    