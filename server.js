const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

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