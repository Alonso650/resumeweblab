
var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM account;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(account_id, callback) {
    var query = 'SELECT * FROM account '+
        'WHERE account_id = ?';
    var queryData = [account_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO account (first_name, last_name, email) VALUES (?,?,?)';

    var queryData = [params.first_name, params.last_name, params.email];

    connection.query(query, queryData, function(err, result) {

        var account_id = result.insertId;


        if(params.school_id != null){
            accountSchoolInsert(account_id, params.school_id, function(err, result){

            });
        }
        if(params.company_id != null){
            accountCompanyInsert(account_id, params.company_id, function(err, result){

            });
        }
        if(params.skill_id != null){
            accountSkillInsert(account_id, params.skill_id, function(err, result){

            });
        }

        callback(err, result);

    });


};


exports.delete = function(account_id, callback) {
    var query = 'DELETE FROM account WHERE account_id = ?';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

var accountSchoolInsert = function(account_id, schoolIdArray, callback) {
    var query = 'INSERT INTO account_school (account_id, school_id) VALUES ?';

    var accountSchoolData = [];
    if(schoolIdArray.constructor === Array) {
        for(var i =0; i < schoolIdArray.length; i++) {
            accountSchoolData.push([account_id, schoolIdArray[i]]);
        }
    }
    else {
        accountSchoolData.push([account_id, schoolIdArray]);
    }
    connection.query(query, [accountSchoolData], function(err, result) {
        callback(err, result);
    });

};

module.exports.accountSchoolInsert = accountSchoolInsert;

var accountCompanyInsert = function(account_id, companyIdArray, callback) {
    var query = 'INSERT INTO account_company (account_id, company_id) VALUES ?';

    var accountCompanyData = [];
    if(companyIdArray.constructor === Array) {
        for(var i =0; i < companyIdArray.length; i++) {
            accountCompanyData.push([account_id, companyIdArray[i]]);
        }
    }
    else {
        accountCompanyData.push([account_id, companyIdArray]);
    }
    connection.query(query, [accountCompanyData], function(err, result) {
        callback(err, result);
    });

};

module.exports.accountCompanyInsert = accountCompanyInsert;

var accountSkillInsert = function(account_id, skillIdArray, callback) {
    var query = 'INSERT INTO account_skill (account_id, skill_id) VALUES ?';

    var accountSkillData = [];
    if(skillIdArray.constructor === Array) {
        for(var i =0; i < skillIdArray.length; i++) {
            accountSkillData.push([account_id, skillIdArray[i]]);
        }
    }
    else {
        accountSkillData.push([account_id, skillIdArray]);
    }
    connection.query(query, [accountSkillData], function(err, result) {
        callback(err, result);
    });

};

module.exports.accountSkillInsert = accountSkillInsert;

var accountSchoolDeleteAll = function(account_id, callback){
    var query = 'DELETE FROM account_school WHERE account_id = ?';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

module.exports.accountSchoolDeleteAll = accountSchoolDeleteAll;

var accountCompanyDeleteAll = function(account_id, callback) {
    var query = 'DELETE FROM account_company WHERE account_id = ?';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

module.exports.accountCompanyDeleteAll = accountCompanyDeleteAll;

var accountSkillDeleteAll = function(account_id, callback) {
    var query = 'DELETE FROM account_skill WHERE account_id = ?';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

module.exports.accountSkillDeleteAll = accountSkillDeleteAll;

exports.update = function(params, callback) {
    var query = 'UPDATE account SET first_name = ?, last_name = ?, email = ?' +
        'WHERE account_id = ?';

    var queryData = [params.first_name, params.last_name, params.email, params.account_id];

    connection.query(query, queryData, function (err, result) {
        accountSchoolDeleteAll(params.account_id, function (err, result) {
            if (params.school_id != null) {
                accountSchoolInsert(params.account_id, params.school_id, function (err, result) {
                 //   callback(err, result);
                });
            }
        });
        accountCompanyDeleteAll(params.account_id, function (err, result) {
            if (params.company_id != null) {
                accountCompanyInsert(params.account_id, params.company_id, function (err, result) {
                   // callback(err, result);
                });
            }
        });

        accountSkillDeleteAll(params.account_id, function (err, result) {
            if (params.skill_id != null) {
                accountSkillInsert(params.account_id, params.skill_id, function (err, result) {
                    callback(err, result);
                });
            }
        });
        callback(err, params.account_id)
    });
};


exports.edit = function(account_id, callback) {
    var query = 'SELECT * FROM account WHERE account_id = ?';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getInfo = function(account_id, callback){

    var query = 'CALL account_getinfo(?)';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};