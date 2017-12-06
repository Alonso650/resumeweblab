var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM address;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(address_id, callback) {
    var query = 'SELECT street, zip_code FROM address  ' +
        'WHERE address_id = ?';
    var queryData = [address_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO address (street) VALUES (?)';

    var queryData = [params.street];

    connection.query(query, params.street, function(err, result) {
        var address_id = result.insertId;

        var query = 'INSERT INTO address(address_id) VALUES ?';

        var addressData = [];
        if(params.address_id.constructor === Array) {
            for (var i = 0; i < params.address_id.length; i++) {
                addressData.push([address_id, params.address_id[i]]);
            }
        }
        else {
            addressData.push([address_id, params.address_id]);
        }

        connection.query(query, [addressData], function(err, result) {
            callback(err, result);
        });
    });
};

exports.delete = function(address_id, callback) {
    var query = 'DELETE FROM address WHERE address_id = ?';
    var queryData = [address_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
/*
var addressInsert = function(address_id, addressIdArray, callback) {
    var query = 'INSERT INTO address (address_id) VALUES ?';

    var addressData = [];
    if(addressIdArray.constructor === Array) {
        for(var i = 0; i < addressIdArray.length; i++) {
            addressData.push([address_id, addressIdArray[i]]);
        }
    }
    else {
        addressData.push([address_id, addressIdArray]);
    }
    connection.query(query,[addressData], function(err, result) {
        callback(err, result);
    });
};

//module.exports.addressInsert = addressInsert;

var addressDeleteAll = function(address_id, callback) {
    var query = 'DELETE FROM address WHERE address_id = ?';
    var queryData = [address_id];

    connection.query(query, queryData, function(err, result) {
        callback(err,result);
    });
};

module.exports.addressDeleteAll = addressDeleteAll;

exports.update = function(params, callback) {
    var query = 'UPDATE address SET street = ? WHERE address_id = ?';
    var queryData = [params.street, params.address_id];

    connection.query(query, queryData, function(err, result) {
        addressDeleteAll(params.address_id, function(err, result) {

            if(params.address_id != null) {

                addressInsert(params.address_id, function(err, result) {
                    callback(err, result);
                });}
            else {
                callback(err, result);
            }
        });
    });
};
*/
exports.edit = function(address_id, callback) {
    var query = 'CALL address_getinfo(?)';
    var queryData = [address_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
