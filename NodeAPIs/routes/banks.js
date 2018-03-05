'use strict';
var express = require('express');
var router = express.Router();
var sql = require("../server/sqlhelper");
const Joi = require('joi');
const validator = require('express-joi-validation')({});

const userSchema = Joi.object({
    bankname: Joi.string().min(2).max(50).required()
});
const headerSchema = Joi.object({
    // no auth token means no access!
  //  'authorization': Joi.string().regex(/^Bearer [A-Za-z0-9]+/).required(),
    // an api version must be specified
    'x-api-version': Joi.number().valid(1.0, 1.1, 1.2, 2.0)
});
router.use(validator.headers(headerSchema));

/* GET users listing. */
router.get('/', function (req, res) {
    var qry = "SELECT * FROM Banks";
    sql.executeQuery(qry).then(function (d) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json({
            type: 'List',
            status: 200,
            message: 'This is fully banks',
            data:d
        });
    }).catch(function (err) {
        console.log(err.message);
        res.status(500).send({
            type: 'Error',
            status: 200,
            message: err.message,
            data:null
        });
    });
});

router.post('/', validator.body(userSchema), function (req, res) {
    //var params = [];
    //params.push({ name: "Category_ID", type: "int", value: "45" });
    //params.push({ name: "Search_Text", type: "string", value: "s" });
    //params.push({ name: "Branch_ID", type: "int", value: "1" });
    //sql.executeSP("posuser.spGet_Sub_Products_With_Rating", params).then(function (data) {
    //    var a = data;
    //    res.setHeader('Access-Control-Allow-Origin', '*')
    //    res.status(200).json(data);
    //}).catch(function (err) {
    //    console.log(err.message);
    //    res.status(500).send({ message: err.message });
    //});
    var qry = "INSERT INTO Banks(Bank_Name) VALUES('" + req.body.bankname + "')";
    sql.executeQuery(qry).then(function (data) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json("OK");
    }).catch(function (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    });
});

router.get('/:id', function (req, res) {

});



module.exports = router;