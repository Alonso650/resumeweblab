var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback){
    var query = 'SELECT * FROM client;';

    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.getById = function(client_id, callback){
    var query = 'SELECT cl.*, a.name FROM client cl' +
                'LEFT JOIN adopts_or_surrenders aos ON aos.client_id = cl.client_id ' +
                'LEFT JOIN animal a ON a.animal_id = aos.animal_id ' +
                'WHERE cl.client_id = ?';
    var queryData = [client_id];

    console.log(query);

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};





exports.insert = function(params, callback) {

    var query = 'INSERT INTO client (client_first_name, client_last_name, phone_number, adopt_surrender) VALUES (?, ?, ?, ?)';

    var queryData = [params.client_first_name, params.client_last_name, params.phone_number, params.adopt_surrender];

    connection.query(query, queryData, function(err, result) {

        var client_id = result.insertId;

        var query = 'INSERT INTO adopts_or_surrenders (client_id, animal_id) VALUES ?';

        var clientAnimalData = [];
        if (params.animal_id.constructor === Array) {
            for (var i = 0; i < params.animal_id.length; i++) {
                clientAnimalData.push([client_id, params.animal_id[i]]);
            }
        }
        else {
            clientAnimalData.push([client_id, params.animal_id]);
        }

        connection.query(query, [clientAnimalData], function(err, result){
            callback(err, result);
        });
    });

};



exports.delete = function(client_id, callback){
    var query = 'DELETE FROM client WHERE client_id = ?';
    var queryData = [client_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};




var clientAnimalInsert = function(client_id, animalIdArray, callback){
    var query = 'INSERT INTO adopts_or_surrenders (client_id, animal_id) VALUES ?';

    var clientAnimalData = [];
    if(animalIdArray.constructor === Array){
        for(var i = 0; i < animalIdArray.length; i++){
            clientAnimalData.push([client_id, animalIdArray[i]]);
        }
    }
    else{
        clientAnimalData.push([client_id, animalIdArray]);
    }
    connection.query(query,[clientAnimalData], function(err, result){
        callback(err, result);
    });
};

module.exports.clientAnimalInsert = clientAnimalInsert;

var clientAnimalDeleteAll = function(client_id, callback){
    var query = 'DELETE FROM adopts_or_surrenders WHERE client_id = ?';
    var queryData = [client_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

module.exports.clientAnimalDeleteAll = clientAnimalDeleteAll;

exports.update = function(params, callback){
    var query = 'UPDATE client SET client_first_name = ?, client_last_name = ? , ' +
                'phone_number = ?, adopt_surrender = ? WHERE client_id = ?';
    var queryData = [params.client_first_name, params.client_last_name, params.phone_number, params.adopt_surrender, params.client_id];

    connection.query(query, queryData, function(err, result) {
        clientAnimalDeleteAll(params.client_id, function(err, result){
            if(params.animal_id != null){
                clientAnimalInsert(params.client_id, params.animal_id, function(err, result){
                    callback(err, result);
                });}
            else{
            callback(err, result);
        }
    });
  });
};




exports.edit = function(client_id, callback){
    var query = 'CALL client_getinfo(?)';
    var queryData = [client_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};