var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM skill;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(skill_id, callback) {
    var query = 'SELECT s.* FROM skill s  ' +
               'WHERE s.skill_id = ?';
    var queryData = [skill_id];
    console.log(query);

    connection.query(query, [queryData], function(err, result) {
        callback(err, result);
    });
};

//original one
/*
exports.insert = function(params, callback) {

    var query = 'INSERT INTO skill (skill_name, description) VALUES (?, ?)';

    var queryData = [params.skill_name];

    connection.query(query, params.skill_name, function(err, result) {
        var skill_id = result.insertId;

        var query = 'INSERT INTO skill(skill_id) VALUES ?';

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
*/

/*
//other version
exports.insert = function(params, callback) {
    var query = 'INSERT INTO skill (skill_name, description) VALUES (?)';

    var queryData = [params.skill_name, params.description];

    connection.query(query, [queryData], function(err, result) {
        var skill_id = result.insertId;

        var query = 'INSERT INTO skill (skill_id) ?';

        var skillData = [];
        if(params.skill_id.constructor === Array) {
            for(var i = 0; i < params.skill_id.length; i++){
                skillData.push([skill_id, params.skill_id[i]]);
            }
        }
        else{
            skillData.push([skill_id, params.skill_id]);
        }
        connection.query(query, [skillData], function(err, result) {
            callback(err, result);
        });

//        if(params2.skill_id.constructor === Array) {
//            for(var i =0; i < params2.skill_id.length; i++){
//                skillData.push([skill_id,params2.skill_id[i]]);
//            }
//        }
//        else{
 //           skillData.push([skill_id, params2.skill_id]);
 //       }
 //       connection.query(query,[skillData], function(err, result) {
 //           callback(err, result);
 //       })
    });
};
*/

//version that works
exports.insert = function(params, callback){
    var query = 'INSERT INTO skill (skill_name, description) VALUES (?)';
    var queryData = [params.skill_name, params.description];

    connection.query(query, [queryData], function(err, result){
        callback(err, result);
    });
};


exports.delete = function(skill_id, callback) {
    var query = 'DELETE FROM skill WHERE skill_id = ?';
    var queryData = [skill_id];

    connection.query(query, [queryData], function(err, result) {
        callback(err, result);
    });
};


var skillInsert = function(skill_id, skillIdArray, callback){
    var query = 'INSERT INTO skill (skill_id) VALUES ?';

    var skillData = [];
    if(skillIdArray.constructor === Array) {
        for(var i = 0; i < skillIdArray.length; i++){
            skillData.push([skill_id, skillIdArray[i]]);
        }
    }
    else{
        skillData.push([skill_id, skillIdArray]);
    }
    connection.query(query, [skillData], function(err, result){
        callback(err, result);
    });
};

module.exports.skillInsert = skillInsert;



var skillDeleteAll = function(skill_id, callback){
    var query = 'DELETE FROM skill WHERE skill_id = ?';
    var queryData = [skill_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

module.exports.skillDeleteAll = skillDeleteAll;



//original
exports.update = function(params, callback) {
    var query = 'UPDATE skill SET skill_name = ?, description = ? WHERE skill_id = ?';
    var queryData = [params.skill_name, params.description, params.skill_id];

    connection.query(query, queryData, function(err, result){
        skillDeleteAll(params.skill_id, function(err, result){
            if(params.skill_id != null){
                skillInsert(params.skill_id, function(err, result) {
                    callback(err, result);
                });}
            else{
                callback(err, result);
            }
        });

    });
};

/*
//original
exports.update = function(params, params2, callback) {
    var query = 'UPDATE skill SET skill_name = ?, description = ? WHERE skill_id = ?';
    var queryData = [params.skill_name, params.skill_id, params2.description, params2.skill_id];

    connection.query(query, queryData, function(err, err2, result){
        skillDeleteAll(params.skill_id, function(err, err2, result){
            if(params.skill_id != null && params2.skill_id != null){
                skillInsert(params.skill_id, function(err, err2, result) {
                    callback(err, err2, result);
                });}
            else{
                callback(err, err2, result);
            }
        });

    });
};

/*
original
exports.update = function(params, callback){
    var query ='UPDATE skill SET skill_name = ?, description = ? WHERE skill_id = ?';

    var queryData = [params.skill_name, params.description, params.skill_id];

    connection.query(query, [queryData], function(err, result){
        callback(err, result);
    });
};

*/
exports.edit = function(skill_id, callback) {
    var query = 'Call skill_getinfo(?)';
    var queryData = [skill_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

