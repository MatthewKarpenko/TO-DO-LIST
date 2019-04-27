const express = require("express");
const mongoose = require("mongoose");

const port = process.env.PORT || 8080;
const app = express();
const tasks = require("./routes/tasks");

const URL =
  "mongodb://mhalik2:mama1011@cluster0-shard-00-00-e4xgm.gcp.mongodb.net:27017,cluster0-shard-00-01-e4xgm.gcp.mongodb.net:27017,cluster0-shard-00-02-e4xgm.gcp.mongodb.net:27017/todolist?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

app.use(express.json());
app.use("/api/tasks", tasks);

mongoose
  .connect(URL, { useNewUrlParser: true, dbName: "todolist" })
  .then(() => console.log("Connected to the database..."))
  .catch(err => console.error("Could not connect to the database...", err));

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

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
