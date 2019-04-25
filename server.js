const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const port = process.env.PORT || 8080;
const app = express();
const tasks = require("./routes/tasks");

mongoose
  .connect("mongodb://localhost/TO-DO-LIST")
  .then(() => console.log("Connected to the database..."))
  .catch(err => console.error("Could not connect to the database...", err));

//const DATABASE_NAME = 'todolist';

/* const url =
  "mongodb+srv://mhalik2:mama1011@cluster0-e4xgm.gcp.mongodb.net/test?retryWrites=true";

MongoClient.connect(url, function(err, client) {
  if (err) {
    console.log(
      "Error occurred while connecting to MongoDB Task database...\n",
      err
    );
  }
  console.log("Connected to the MongoDB Task database...");
  // perform actions on the collection object
  //client.close();
}); */

app.use(express.json());
app.use("/api/tasks", tasks);

// the __dirname is the current directory from where the script is running
//app.use(express.static(path.join(__dirname, './public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// send the user to index html page inspite of the url
/* app.get("/", (req, res) => {
  console.log("It works!!!");
  // res.sendFile(path.join(__dirname, './public', 'index.html'));
  res
    .status(200)
    .json({ status: 200, message: "success" })
    .send();
}); */

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
