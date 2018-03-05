var sql = require("mssql");
var setting = require("./settings");
exports.executeQuery = function (query) {
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(setting.dbConfig).connect().then(pool => {
            return pool.request().query(query);
        }).then(result => {
            let rows = result.recordsets
            sql.close();
            resolve(rows);
        }).catch(err => {
            sql.close();
            return reject(err);
        });
    })
}

exports.executeSP = function (spName, params) {
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(setting.dbConfig).connect().then(pool => {
            return this.createParams(pool.request(), params).execute(spName);
        }).then(result => {
            let rows = result.recordsets
            sql.close();
            resolve(rows);
        }).catch(err => {
            sql.close();
            return reject(err);
        });
    })
}

exports.createParams = function (req, params) {
    for (i = 0; i < params.length; i++) {
        if (params[i].type == "string")
            req.input(params[i].name, sql.NVarChar(30), params[i].value);
        else if (params[i].type == "int")
            req.input(params[i].name, sql.Int, params[i].value);
        else if (params[i].type == "bigint")
            req.input(params[i].name, sql.BigInt, params[i].value);
        else if (params[i].type == "binary")
            req.input(params[i].name, sql.Binary, params[i].value);
        else if (params[i].type == "bit")
            req.input(params[i].name, sql.Bit, params[i].value);
        else if (params[i].type == "char")
            req.input(params[i].name, sql.Char, params[i].value);
        else if (params[i].type == "date")
            req.input(params[i].name, sql.Date, params[i].value);
        else if (params[i].type == "datetime")
            req.input(params[i].name, sql.DateTime, params[i].value);
        else if (params[i].type == "decimal")
            req.input(params[i].name, sql.Decimal, params[i].value);
        else if (params[i].type == "float")
            req.input(params[i].name, sql.Float, params[i].value);
        else if (params[i].type == "unique")
            req.input(params[i].name, sql.UniqueIdentifier, params[i].value);
    }
    return req;
}