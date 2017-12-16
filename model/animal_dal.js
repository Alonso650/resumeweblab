var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM animal;';

    connection.query(query, function(err, result) {
        callback(err,result);
    });
};

exports.getById = function(animal_id, callback) {
    var query = 'SELECT * FROM animal ' +
        'WHERE animal_id = ?';
 var queryData = [animal_id];
    console.log(query);


    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });

};

exports.insert = function(params, callback) {

    var query = 'INSERT INTO animal (animal_name, age, gender, date_entered) VALUES (?, ?, ?, ?)';

    var queryData = [params.animal_name, params.age, params.gender, params.date_entered];

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};





exports.delete = function(animal_id, callback) {
    var query = 'DELETE FROM animal WHERE animal_id = ?';
    var queryData = [animal_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};






exports.update = function(params, callback) {
    var query = 'UPDATE animal SET animal_name = ?, age = ?, gender = ?, date_entered = ?' +
        ' WHERE animal_id = ?';
    var queryData = [params.animal_name, params.age, params.gender, params.date_entered, params.animal_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);

    });
};

exports.edit = function(animal_id, callback) {
    var query = 'SELECT a.*, s.shelter_name FROM animal a ' +
        'LEFT JOIN shelter s on s.shelter_id = a.shelter_id ' +
        'WHERE a.animal_id = ?';
    var queryData = [animal_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};