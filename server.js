const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mhalik2:mama1011@cluster0-e4xgm.gcp.mongodb.net/test?retryWrites=true";
MongoClient.connect(uri, function (err, client) {
    if (err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
    }
    console.log('Connected...');
    // perform actions on the collection object
    client.close();
});
// the __dirname is the current directory from where the script is running
//app.use(express.static(path.join(__dirname, './public')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// send the user to index html page inspite of the url
app.get('/', (req, res) => {
    console.log("It works!!!")
   // res.sendFile(path.join(__dirname, './public', 'index.html'));
   res.status(200).json({status: 200, message: "success"}).send();
});

app.listen(port);










//////// nowe metody CRUD 26.04 do integracji //////////////////////

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

// Connection URL
const postTask = (task) => {
    var url = 'mongodb://mhalik2:mama1011@cluster0-shard-00-00-e4xgm.gcp.mongodb.net:27017,cluster0-shard-00-01-e4xgm.gcp.mongodb.net:27017,cluster0-shard-00-02-e4xgm.gcp.mongodb.net:27017/todolist?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        const zadanko = task;
        console.log(zadanko);
        //Insert a single document
        db.collection('tasks').insertOne(zadanko, function (err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
        });
    });
}
//postTask({text: 'Ogarnij się paruwo', isDone: false});

const updateTask = (oldVal, newVal) => {
    var url = 'mongodb://mhalik2:mama1011@cluster0-shard-00-00-e4xgm.gcp.mongodb.net:27017,cluster0-shard-00-01-e4xgm.gcp.mongodb.net:27017,cluster0-shard-00-02-e4xgm.gcp.mongodb.net:27017/todolist?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        oldVal = oldVal;
        newVal = newVal;
        console.log(newVal);
        //Update a single document
        db.collection('tasks').updateOne(oldVal, {
            $set: newVal
        }, function (err, r) {
            assert.equal(null, err);
            assert.equal(1, r.matchedCount);
            assert.equal(1, r.modifiedCount);
        });
    });
}

//updateTask({ "_id": ObjectId("5cc3224aaf53624cd052ef45")}, {text: 'Ogarnij się bez paruwy22'})


const deleteTask = (task) => {
    var url = 'mongodb://mhalik2:mama1011@cluster0-shard-00-00-e4xgm.gcp.mongodb.net:27017,cluster0-shard-00-01-e4xgm.gcp.mongodb.net:27017,cluster0-shard-00-02-e4xgm.gcp.mongodb.net:27017/todolist?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        const zadanko = task;
        console.log(zadanko);
        //Insert a single document
        db.collection('tasks').deleteOne(zadanko, function (err, r) {
            assert.equal(null, err);
            assert.equal(1, r.deletedCount);
        });
    });
}

//deleteTask({ "_id": ObjectId("5cc3224aaf53624cd052ef45") });

// const getTask = (task) => {
//     var url = 'mongodb://mhalik2:mama1011@cluster0-shard-00-00-e4xgm.gcp.mongodb.net:27017,cluster0-shard-00-01-e4xgm.gcp.mongodb.net:27017,cluster0-shard-00-02-e4xgm.gcp.mongodb.net:27017/todolist?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
//     // Use connect method to connect to the Server
//     MongoClient.connect(url, function (err, db) {
//         assert.equal(null, err);
//         console.log("Connected correctly to server");
//         const zadanko = task;
//         console.log(zadanko);
//         //Insert a single document
//         var found = db.collection('tasks').findOne(zadanko, function (err, r) {
//             assert.equal(null, err);
//             //assert.equal(1, r.deletedCount);
//         });
//        console.log(found.text);
//     });

// }

// getTask({ "_id": ObjectId("5cc32199f2dd370f0847a5bf") });
