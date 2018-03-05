'use strict';
var express = require('express');
var router = express.Router();
const validator = require('express-joi-validation')({ passError: true });
var validation = require('../validations/user-validation');
var sql = require("../server/sqlhelper");
var pass = require("../server/encryptdecrept");

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

// validator.body(validation.SignUpValidation),
router.post('/', validator.body(validation.SignUpValidation), function (req, res) {
    var a = pass.DecryptText("30f361b211a513b5");
    var qry = "INSERT INTO test(username,password,firstname,lastname,email,mobileno,isactive) VALUES('" + req.body.username + "','" + pass.EncryptText(req.body.password) + "','" + req.body.firstname + "','" + req.body.lastname + "','" + req.body.mobileno + "','" + req.body.email + "','1')";
    sql.executeQuery(qry).then(function (data) {
        res.send("OK");
    }).catch(function (err) {
        console.log(err.message);
        res.send("Error");
    });
});

router.post('/login', validator.body(validation.SignInValidation), function (req, res) {
    var qry = "SELECT * FROM  test WHERE username='" + req.body.username + "' AND password='" + pass.EncryptText(req.body.password) + "' AND isactive='1'";
    sql.executeQuery(qry).then(function (data) {
        if (data[0].length > 0)
            res.send("OK");
        else
            res.send("Invalid username or password");
    }).catch(function (err) {
        console.log(err.message);
        res.send("Error");
    });
});

router.use((err, req, res, next) => {
    if (err.error.isJoi) {
        // we had a joi error, let's return a custom 400 json response
        var msg = "";
        err.error.details.forEach(function (data) {
            msg += msg == "" ? data.message : "," + data.message;
        });
        res.status(400).json({
            type: err.type, // will be "query" here, but could be "headers", "body", or "params"
            code: 3,// code:1-success,2-already exist,3-validation-failed,etc
            status: 400,
            message: msg.toString()
        });
    } else {
        // pass on to another error handler
        next(err);
    }
});


module.exports = router;
