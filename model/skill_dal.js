var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM skill;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(skill_id) {
    var query = 'SELECT skill_name, description FROM skill ' +
               'WHERE skill_id = ?';
    var queryData = [skill_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    var query = 'INSERT INTO skill (skill_name) VALUES (?)';

    var queryData = [params.skill_name];

    connection.query(query, params.skill_name, function(err, result) {
        var skill_id = result.insertId;

        var skillData = [];
        if(params.skill_id.constructor === Array) {
            for(var i = 0; i < params.skill_id.length; i++) {
                skillData.push([skill_id, params.skill_id[i]]);
            }
        }
        else {
            skillData.push([skill_id, params.skill_id]);
        }

        connection.query(query, [skillData], function(err, result) {
            callback(err, result);
        });
    });

};

exports.delete = function(skill_id, callback) {
    var query = 'DELETE FROM skill WHERE skill_id = ?';
    var queryData = [skill_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.edit = function(skill_id, callback) {
    var query = 'Call skill_getinfo(?)';
    var queryData = [skill_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

