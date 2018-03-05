//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var setting = require("./server/sqlhelper");

// Body Parser Middleware
app.use(bodyParser.json());
var users = require('./routes/users');
var bank = require("./routes/banks");

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.use('/users', users);
app.use("/api/banks", bank);


//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

//GET API
app.get("/api/user", function (req, res) {
    setting.executeQuery("select User_Name,Full_Name,Password from [System_Users];").then(function (d) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(d);
    }).catch(function (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    });
});