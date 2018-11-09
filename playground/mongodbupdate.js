const MongoClient = require('mongodb').MongoClient;

const { ObjectId } = require('mongodb');


MongoClient.connect('mongodb://127.0.0.1:27017/ToDos', { useNewUrlParser: true },
    (error, dbresponse) => {
        if (error) {
            console.log('unable to connect mongo db server');
        }
        console.log('connected to server')
        var db = dbresponse.db('ToDos');
        db.collection('ToDos').findOneAndUpdate(
            {
                _id: new ObjectId('5be4f8fbd3beb562afd909a2')
            },{
                $set:{
                    completion: true,
                    status:'unknown',
                    text:'OLD ZONE'
                }   
            },{
                returnOriginal:false
            }
        ).then((result) => {
            console.log(result);
        });
    });


    MongoClient.connect('mongodb://127.0.0.1:27017/ToDos', { useNewUrlParser: true },
    (error, dbresponse) => {
        if (error) {
            console.log('unable to connect mongo db server');
        }
        console.log('connected to server')
        var db = dbresponse.db('ToDos');
        db.collection('USER').findOneAndUpdate(
            {
                _id: new ObjectId('5be38443a684ba3d848dc79f')
            },{
                $set:{
                    Name:'GANDABERUNDA'
                },$inc:{
                    Age: 10, "metrics.orders": 1
                }
          
            },{
                returnOriginal:false
            }
        ).then((result) => {
            console.log(result);
        });
    });