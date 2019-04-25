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