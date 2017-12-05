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
    var query = 'SELECT a.*, s.school_name, c.company_name, sk.skill_name FROM account a' +
        'LEFT JOIN account_school as on as.account_id = a.account_id ' +
        'LEFT JOIN school s on s.school_id = as_school_id ' +
        'LEFT JOIN account_company ac on ac.account_id = a.account_id ' +
        'LEFT JOIN company c on c.company_id = ac.company_id ' +
        'LEFT JOIN account_skill ak on ak.account_id = a.account_id ' +
        'LEFT JOIN skill sk on sk.skill_id = ak.skill_id ' +
        'WHERE a.account_id = ?';
    var queryData = [account_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO account (first_name, last_name, email) VALUES (?)';

    var queryData = [params.first_name, params.last_name, params.email];

    connection.query(query, params.first_name, params.last_name, params.email, function(err, result) {

        var account_id = result.insertId;

        var query = 'INSERT INTO account_school (account_id, school_id) VALUES ?';

        var query2 = 'INSERT INTO account_company (account_id, company_id) VALUES ?';

        var query3 = 'INSERT INTO account_skill (account_id, skill_id) VALUES ?';

        var accountSchoolData = [];
        if(params.school_id.constructor === Array) {
            for (var i =0; i < params.school_id.length; i++) {
                accountSchoolData.push([account_id, params.school_id[i]]);
            }
        }
        else {
            accountSchoolData.push([account_id, params.school_id]);
        }

        var accountCompanyData = [];
        if(params.company_id.constructor === Array) {
            for (var i =0; i < params.company_id.length; i++) {
                accountCompanyData.push([account_id, params.company_id[i]]);
            }
        }
        else {
            accountCompanyData.push([account_id, params.company_id]);
        }

        var accountSkillData = [];
        if(params.skill_id.constructor === Array) {
            for (var i =0; i < params.skill_id.length; i++) {
                accountSkillData.push([account_id, params.skill_id[i]]);
            }
        }
        else {
            accountSkillData.push([account_id, params.skill_id]);
        }

        connection.query(query, [accountSchoolData], function(err, result) {
            callback(err, result);
        });
        connection.query(query2, [accountCompanyData], function(err, result) {
            callback(err, result);
        });
        connection.query(query3, [accountSkillData], function(err, result) {
            callback(err, result);
        });


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
    var query2 = 'INSERT INTO account_company (account_id, company_id) VALUES ?';

    var accountCompanyData = [];
    if(companyIdArray.constructor === Array) {
        for(var i =0; i < companyIdArray.length; i++) {
            accountCompanyData.push([account_id, companyIdArray[i]]);
        }
    }
    else {
        accountCompanyData.push([account_id, companyIdArray]);
    }
    connection.query(query2, [accountCompanyData], function(err, result) {
        callback(err, result);
    });

};

module.exports.accountCompanyInsert = accountCompanyInsert;

var accountSkillInsert = function(account_id, skillIdArray, callback) {
    var query3 = 'INSERT INTO account_skill (account_id, skill_id) VALUES ?';

    var accountSkillData = [];
    if(skillIdArray.constructor === Array) {
        for(var i =0; i < skillIdArray.length; i++) {
            accountSkillData.push([account_id, skillIdArray[i]]);
        }
    }
    else {
        accountSkillData.push([account_id, skillIdArray]);
    }
    connection.query(query3, [accountSkillData], function(err, result) {
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

exports.edit = function(account_id, callback) {
    var query = 'CALL account_getinfo(?)';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};