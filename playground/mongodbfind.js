const MongoClient = require('mongodb').MongoClient;

const { ObjectId } = require('mongodb');


MongoClient.connect('mongodb://127.0.0.1:27017/ToDos', { useNewUrlParser: true },
    (error, response) => {
        if (error) {
            console.log('unable to connect mongo db server');
        }
        console.log('connected to server')
        var db = response.db('ToDos');

        db.collection('ToDos').find().toArray().then((docs) => {
            console.log('ToDos'),
                console.log(JSON.stringify(docs, undefined, 2))
        }, (err) => {
            console.log('unable to find', err)
        });
    });
// this is to find all objexts in document

MongoClient.connect('mongodb://127.0.0.1:27017/ToDos', { useNewUrlParser: true },
    (error, response) => {
        if (error) {
            console.log('unable to connect mongo db server');
        }
        console.log('connected to server')
        var db = response.db('ToDos');

        db.collection('ToDos').find().count().then((count) =>
            console.log(`ToDos count: ${count}`),
            (err) => {
                console.log('unable to find', err)
            });

            response.close()
    });

// count the objects in document



MongoClient.connect('mongodb://127.0.0.1:27017/ToDos', { useNewUrlParser: true },
    (error, response) => {
        if (error) {
            console.log('unable to connect mongo db server');
        }
        console.log('connected to server ')
        var db = response.db('ToDos');

        db.collection('ToDos').find({
            $and: [
                { response: true }, { _id: new ObjectId('5be45cb4d3beb562afd8dffd') }
            ]
        }
        ).toArray().then((docs) => {
            console.log('ToDos Query \n\n'),
                console.log(JSON.stringify(docs, undefined, 2))
        }, (err) => {
            console.log('unable to find', err)
        });
    });

// TO FIND SPECIFIC QUERY WITH LOGIC 'AND'

MongoClient.connect('mongodb://127.0.0.1:27017/ToDos', { useNewUrlParser: true },
    (error, response) => {
        if (error) {
            console.log('unable to connect mongo db server');}
        console.log('connected to server ')
        var db = response.db('ToDos');

        db.collection('USER').find({
            $or: [
                { Name: 'PRANI BHAI' }, { Age: 31 }
            ]}
        ).toArray().then((docs) => {
            console.log('USER Query \n\n'),
                console.log(JSON.stringify(docs, undefined, 2))
        }, (err) => {
            console.log('unable to find', err)
        });
    });

// TO SEARCH 'ToDos' DB 'USER' COLLECTION USING LOGICAL OR








