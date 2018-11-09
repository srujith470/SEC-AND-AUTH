var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/ToDos1', { useNewUrlParser: true });

var TODO = mongoose.model('TODO', {
    task:{
        type: String
    },
    status:{
        type: String
    },
    completed:{
        type: Boolean
    },
    timestamp:{
        type: Number
    }
}); // DATA MODEL INTERFACE CONSTRUICTOR FOR TODO

var TODO123 = new TODO({
    task:'DINNER ARRANGEMENT',
    status:'IN PROCESS',
    completed: false,
    timestamp: '000000'
}); // ADD DATA TO DATA MODEL 

TODO123.save().then((docs) => {
    console.log(docs, 'saved');
},(e) => {
    console.log('ERROR',e);
}); //SAVE DATA IN MONGODB

var TODO1234 = new TODO({
    task:'DANCE PARTY',
    status:'IN PROCESS',
    completed: true,
    timestamp: '56788'
}); // ADD DATA TO DATA MODEL 

TODO1234.save().then((docs) => {
    console.log(docs, 'saved');
},(e) => {
    console.log('ERROR',e);
}); //SAVE DATA IN MONGODB
