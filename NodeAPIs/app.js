//'use strict';
//var debug = require('debug');
//var express = require('express');
//var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

//var routes = require('./routes/index');
//var users = require('./routes/users');

//var app = express();

//// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

//// uncomment after placing your favicon in /public
////app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

//// catch 404 and forward to error handler
//app.use(function (req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

//// error handlers

//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function (err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}

//// production error handler
//// no stacktraces leaked to user
//app.use(function (err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});

//app.set('port', process.env.PORT || 3000);

//var server = app.listen(app.get('port'), function () {
//    debug('Express server listening on port ' + server.address().port);
//});

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
   //  executeQuery(res, query);
//});

//POST API
//app.post("/api/user", function (req, res) {
//    var query = "INSERT INTO [user] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password)";
//    executeQuery(res, query);
//});

////PUT API
//app.put("/api/user/:id", function (req, res) {
//    var query = "UPDATE [user] SET Name= " + req.body.Name + " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
//    executeQuery(res, query);
//});

//// DELETE API
//app.delete("/api/user /:id", function (req, res) {
//    var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
//    executeQuery(res, query);
//});
