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