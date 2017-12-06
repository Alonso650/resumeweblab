var mysql = require('mysql');
var db = require('../../../Desktop/resumeweblab/model/db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM school;';

    connection.query(query, function(err, result) {
        callback(err,result);
    });
};

exports.getById = function(school_id, callback) {
    var query = 'SELECT s.*, a.street, a.zip_code FROM school s ' +
        //  'LEFT JOIN account_school as on as.school_id = s.school_id ' +
        'LEFT JOIN address a on a.address_id = s.address_id ' +
        'WHERE s.school_id = ?';
    var queryData = [school_id];
    console.log(query);

    /*
     exports.getById = function(address_id, callback) {
     var query = 'SELECT a.*, s.street, s.zip_code FROM address a ' +
     'LEFT JOIN school s on s.address_id = a.address_id' +
     'WHERE a.address=[address_id]'

     */
    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });

};

exports.insert = function(params, callback) {
    /*
     var query = 'INSERT INTO school (school_name) VALUES (?)';

     var queryData = [params.school_name];

     connection.query(query, params.school_name, function(err, result) {

     var school_id = result.insertId;

     var query = 'INSERT INTO account_school (school_id, address_id) VALUES ?';

     var schoolAddressData = [];
     if (params.address_id.constructor === Array) {
     for ( var i = 0; i < params.address_id.length; i++) {
     schoolAddressData.push([school_id, params.address_id[i]]);
     }
     }
     else {
     schoolAddressData.push([school_id, params.address_id]);
     }

     connection.query(query,[schoolAddressData], function(err, result){
     callback(err, result);
     });
     });
     };
     */


    var query = 'INSERT INTO school (school_name) VALUES (?)';

    var queryData = [params.school_name];

    connection.query(query, params.school_name, function(err, result) {

        // THEN USE THE COMPANY_ID RETURNED AS insertId AND THE SELECTED ADDRESS_IDs INTO COMPANY_ADDRESS
        var school_id = result.insertId;

        // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
        var query = 'INSERT INTO address (school_id, address_id) VALUES ?';

        // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
        var schoolAddressData = [];
        if (params.address_id.constructor === Array) {
            for (var i = 0; i < params.address_id.length; i++) {
                schoolAddressData.push([school_id, params.address_id[i]]);
            }
        }
        else {
            schoolAddressData.push([school_id, params.address_id]);
        }

        // NOTE THE EXTRA [] AROUND companyAddressData
        connection.query(query, [schoolAddressData], function(err, result){
            callback(err, result);
        });
    });

};





exports.delete = function(school_id, callback) {
    var query = 'DELETE FROM school WHERE school_id = ?';
    var queryData = [school_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
/*
 var schoolAddressInsert = function(school_id, addressIdArray, callback) {
 var query = 'INSERT INTO account_school (school_id, address_id) VALUES ?';

 var schoolAddressData = [];
 if (addressIdArray.constructor === Array) {
 for (var i = 0; i < addressIdArray.length; i++) {
 schoolAddressData.push([school_id, params.address_id[i]]);
 }
 }
 else {
 schoolAddressData.push([school_id, addressIdArray]);
 }
 connection.query(query, [schoolAddressData], function(err, result){
 callback(err, result);
 });
 };
 */



var schoolAddressInsert = function(school_id, addressIdArray, callback){

    var query = 'INSERT INTO address (address_id) VALUES ?';

    var schoolAddressData = [];
    if (addressIdArray.constructor === Array) {
        for (var i = 0; i < addressIdArray.length; i++) {
            schoolAddressData.push([school_id, addressIdArray[i]]);
        }
    }
    else {
        schoolAddressData.push([school_id, addressIdArray]);
    }
    connection.query(query, [schoolAddressData], function(err, result){
        callback(err, result);
    });
};


module.exports.schoolAddressInsert = schoolAddressInsert;

var schoolAddressDeleteAll = function(school_id, callback){
    var query = 'DELETE FROM address WHERE address_id = ?';
    var queryData = [school_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

module.exports.schoolAddressDeleteAll = schoolAddressDeleteAll;

exports.update = function(params, callback) {
    var query = 'UPDATE school SET school_name = ? WHERE school_id = ?';
    var queryData = [params.school_name, params.school_id];

    connection.query(query,queryData, function(err, result) {
        schoolAddressDeleteAll(params.school_id, function(err, result) {

            if(params.address_id != null) {
                schoolAddressInsert(params.school_id, params.address_id, function(err, result) {
                    callback(err, result);

                });}
            else {
                callback(err, result);
            }
        });
    });
};

exports.edit = function(school_id, callback) {
    var query = 'CALL school_getinfo(?)';
    var queryData = [school_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};