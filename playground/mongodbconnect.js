const MongoClient = require('mongodb').MongoClient;

const {MongoClientDestructure, ObjectID} = require('mongodb');

var obj = new ObjectID();

console.log(obj);


MongoClient.connect('mongodb://127.0.0.1:27017/ToDos',{ useNewUrlParser: true }, (error, response) => {
    if(error){
        console.log('unable to connect mongo db server');
    }
    console.log('connect mongodb runs');
    var db = response.db('ToDos');

    db.collection('USER').insertOne(
        {
            Name:'MONGO BHAI',
            Age: 25,
            Sex: 'MALE',
            Virgin: false,
            Location: '08896 LakeView MI USA'
        }, (err, result) => {
            if(err){
                return console.log('Unable to insert', err)
            }else{
                console.log('Data Added')
                console.log(JSON.stringify(result.ops, undefined, 2));
                console.log(result.ops[0]._id.getTimestamp())

            }
        });
        response.close()

});
//MongoClient.connect() TAKES TWO ARGUMENTS
// HERE FIRST ARGUMENT TAKES URL WHICH MAY BE LOCALHOST OR AMAZON OR HEROKU AND MORE
// SECOND ARGUMENT TAKES A CALL BACK FUNCTION
// ADD DOCUMENT OR OBJECT TO THE COLLECTION