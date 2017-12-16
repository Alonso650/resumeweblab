var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback){
    var query = 'SELECT * FROM volunteer;';

    connection.query(query, function(err, result){
        callback(err, result);
    });
};


exports.getById = function(volunteer_id, callback){
    var query = 'SELECT * FROM volunteer '+
        'WHERE volunteer_id = ?';
    var queryData = [volunteer_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};



exports.insert = function(params, callback){
    var query = 'INSERT INTO volunteer (volunteer_first_name, volunteer_last_name, age, date_started) VALUES (?, ?, ?, ?)';

    var queryData = [params.volunteer_first_name, params.volunteer_last_name, params.age, params.date_started];
    connection.query(query, queryData, function(err, result){
        var volunteer_id = result.insertId;

        if(params.shelter_id != null){
            volunteerShelterInsert(volunteer_id, params.shelter_id, function(err, result){

            });
        }
        if(params.animal_id != null){
            volunteerAnimalInsert(volunteer_id, params.animal_id, function(err, result){

            });
        }
        callback(err, result);

    });
};





exports.delete = function(volunteer_id, callback){
    var query = 'DELETE FROM volunteer WHERE volunteer_id = ?';
    var queryData = [volunteer_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};




var volunteerShelterInsert = function(volunteer_id, shelterIdArray, callback){
    var query = 'INSERT INTO volunteers_at (volunteer_id, shelter_id) VALUES ?';

    var volunteerShelterData = [];
    if(shelterIdArray.constructor === Array){
        for(var i=0; i < shelterIdArray.length; i++){
            volunteerShelterData.push([volunteer_id, shelterIdArray[i]]);
        }
    }
    else {
        volunteerShelterData.push([volunteer_id, shelterIdArray]);
    }
    connection.query(query, [volunteerShelterData], function(err, result){
        callback(err, result);
    });
};

module.exports.volunteerShelterInsert = volunteerShelterInsert;






var volunteerShelterDeleteAll = function(volunteer_id, callback){
    var query = 'DELETE FROM volunteers_at WHERE volunteer_id = ?';
    var queryData = [volunteer_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

module.exports.volunteerShelterDeleteAll = volunteerShelterDeleteAll;




var volunteerAnimalInsert = function(volunteer_id, animalIdArray, callback){
    var query = 'INSERT INTO takes_care_of (volunteer_id, animal_id) VALUES ?';

    var volunteerAnimalData = [];
    if(animalIdArray.constructor === Array){
        for(var i=0; i < animalIdArray.length; i++){
            volunteerAnimalData.push([volunteer_id, animalIdArray[i]]);
        }
    }
    else {
        volunteerAnimalData.push([volunteer_id, animalIdArray]);
    }
    connection.query(query, [volunteerAnimalData], function(err, result){
        callback(err, result);
    });
};

module.exports.volunteerAnimalInsert = volunteerAnimalInsert;






var volunteerAnimalDeleteAll = function(volunteer_id, callback){
    var query = 'DELETE FROM takes_care_of WHERE volunteer_id = ?';
    var queryData = [volunteer_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

module.exports.volunteerAnimalDeleteAll = volunteerAnimalDeleteAll;




exports.update = function(params, callback){
    var query = 'UPDATE volunteer SET volunteer_first_name = ?, volunteer_last_name = ?, ' +
                'age = ?, date_started = ? WHERE volunteer_id = ?';
    var queryData = [params.volunteer_first_name, params.volunteer_last_name, params.age, params.date_entered, params.volunteer_id];

    connection.query(query, queryData, function (err, result) {
        volunteerShelterDeleteAll(params.volunteer_id, function (err, result) {
            if (params.shelter_id != null) {
                volunteerShelterInsert(params.volunteer_id, params.shelter_id, function (err, result) {
                });
            }
        });
        volunteerAnimalDeleteAll(params.volunteer_id, function (err, result) {
            if (params.animal_id != null) {
                volunteerAnimalInsert(params.volunteer_id, params.animal_id, function (err, result) {
                });
            }
        });
        callback(err, params.volunteer_id)
    });
};






exports.edit = function(volunteer_id, callback){
    var query = 'SELECT * FROM volunteer WHERE volunteer_id = ?';
    var queryData = [volunteer_id];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};



exports.getInfo = function(volunteer_id, callback){
    var query = 'CALL volunteer_getinfo(?)';
    var queryData = [volunteer_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};