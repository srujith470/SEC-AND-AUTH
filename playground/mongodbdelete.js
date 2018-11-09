const MongoClient = require('mongodb').MongoClient;

const { ObjectId } = require('mongodb');


MongoClient.connect('mongodb://127.0.0.1:27017/ToDos', { useNewUrlParser: true },
    (error, dbresponse) => {
        if (error) {
            console.log('unable to connect mongo db server');
        }
        console.log('connected to server');
        var db = dbresponse.db('ToDos');
        db.collection('ToDos').deleteMany({text: 'LUNCH INVITE'}).then((result) =>{
                console.log(result);
        });

        //delete many
    }
    );

    MongoClient.connect('mongodb://127.0.0.1:27017/ToDos', { useNewUrlParser: true },
    (error, dbresponse) => {
        if (error) {
            console.log('unable to connect mongo db server');
        }
        console.log('connected to server');
        var db = dbresponse.db('ToDos');
        db.collection('ToDos').deleteOne({text: 'COOKING'}).then((result) =>{
                console.log(result);
        });

        //delete one
    }
    );

    MongoClient.connect('mongodb://127.0.0.1:27017/ToDos', { useNewUrlParser: true },
    (error, dbresponse) => {
        if (error) {
            console.log('unable to connect mongo db server');
        }
        console.log('connected to server');
        var db = dbresponse.db('ToDos');
        db.collection('ToDos').findOneAndDelete({completion: true}).then((result) =>{
                console.log(result);
        });

        //find one and delete one
    }
    );
