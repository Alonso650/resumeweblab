var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM school;';

    connection.query(query, function(err, result) {
        callback(err,result);
    });
};

exports.getById = function(school_id, callback) {
    var query = 'SELECT s.*, a.street, a.zip_code FROM school s ' +
        'LEFT JOIN address a on s.address_id = a.address_id ' +
        'WHERE s.school_id = ?';
    var queryData = [school_id];
    console.log(query);


    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });

};

exports.insert = function(params, callback) {

    var query = 'INSERT INTO school (school_name) VALUES (?)';

    var queryData = [params.school_name];

    connection.query(query, queryData, function(err, result) {

            callback(err, result);
    });
};





exports.delete = function(school_id, callback) {
    var query = 'DELETE FROM school WHERE school_id = ?';
    var queryData = [school_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};




exports.update = function(params, callback) {
    var query = 'UPDATE school SET school_name = ? WHERE school_id = ?';
    var queryData = [params.school_name, params.school_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);

    });
};


exports.edit = function(school_id, callback) {
    var query = 'SELECT s.*, a.street, a.zip_code FROM school s ' +
        'LEFT JOIN address a ON s.address_id = a.address_id ' +
        'WHERE school_id = ?';
    var queryData = [school_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};