var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback){
    var query = 'SELECT * FROM shelter;';

    connection.query(query, function(err, result){
        callback(err, result);
    });
};




exports.getById = function(shelter_id, callback){
    var query = 'SELECT s.*, sa.street, sa.state, sa.zip_code FROM shelter s ' +
        'LEFT JOIN shelter_address sa ON sa.address_id = s.address_id ' +
        'WHERE s.shelter_id = ?';

    var queryData = [shelter_id];
    console.log(query);
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};




exports.insert = function(params, callback){
    var query = 'INSERT INTO shelter (shelter_name) VALUES ( ?)';

    var queryData = [params.shelter_name];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

var shelterAddressInsert = function(shelter_id, addressIdArray, callback){
    var query = 'INSERT INTO shelter_address (shelter_id, address_id) VALUES ?';

    var shelterAddressData = [];
    if (addressIdArray.constructor === Array) {
        for (var i = 0; i < addressIdArray.length; i++) {
            shelterAddressData.push([shelter_id, addressIdArray[i]]);
        }
    }
    else {
        shelterAddressData.push([shelter_id, addressIdArray]);
    }
    connection.query(query, [shelterAddressData], function(err, result){
        callback(err, result);
    });
};
module.exports.shelterAddressInsert = shelterAddressInsert;

var shelterAddressDeleteAll = function(shelter_id, callback){
    var query = 'DELETE FROM shelter_address WHERE shelter_id = ?';
    var queryData = [shelter_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

module.exports.shelterAddressDeleteAll = shelterAddressDeleteAll;

exports.update = function(params, callback) {
    var query = 'UPDATE shelter SET shelter_name = ? WHERE shelter_id = ?';
    var queryData = [params.shelter_name, params.shelter_id];

    connection.query(query, queryData, function(err, result) {
        shelterAddressDeleteAll(params.shelter_id, function(err, result){

            if(params.address_id != null) {
                //insert school_address ids
                shelterAddressInsert(params.shelter_id, params.address_id, function(err, result){
                    callback(err, result);
                });}
            else {
                callback(err, result);
            }
        });

    });
};





exports.delete = function(shelter_id, callback){
    var query = 'DELETE FROM shelter WHERE shelter_id = ?';
    var queryData = [shelter_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};


exports.edit = function(shelter_id, callback){
    var query = 'SELECT s.*, sa.street, sa.state, sa.zip_code FROM shelter s ' +
                'LEFT JOIN shelter_address sa ON s.address_id = sa.address_id' +
                'WHERE s.shelter_id = ?';
    var queryData = [shelter_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};