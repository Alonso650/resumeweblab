var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM shelter_address;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};