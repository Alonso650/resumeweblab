var express = require('express');
var router = express.Router();
var account_dal = require('../model/account_dal');
var company_dal = require('../model/company_dal');
var skill_dal = require('../model/skill_dal');
var school_dal = require('../model/school_dal');

router.get('/all', function(req, res) {
    account_dal.getAll(function(err, result) {
        if(err) {
            res.send(err);
        }
        else {
            res.render('account/accountViewAll', { 'result':result });
        }
    });

});


router.get('/', function(req, res){
    if(req.query.account_id == null){
        res.send('account_id is null');
    }
    else{
        account_dal.getInfo(req.query.account_id, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.render('account/accountViewById', {'account':result[3][0],
                    'school': result[0], 'company':result[1], 'skill': result[2]

                });
            }
        });
    }
});




router.get('/add', function(req, res){
        school_dal.getAll(function(err,school) {
            if (err) {
                res.send(err);
            }
            else {
                company_dal.getAll(function(err, company) {
                    if (err){
                        res.send(err);
                     }
                     else
                    {
                        skill_dal.getAll(function(err, skill) {
                            if (err) {
                                res.send(err)
                            }
                            else {
                                res.render('account/accountAdd', {
                                    'school': school, 'company': company, 'skill': skill
                                });
                            }

                        });

                    }

                });

            }

        });

});



router.get('/insert', function(req, res){
    if(req.query.first_name == null){
        res.send('Must provide a first name');
    }
  else{
        account_dal.insert(req.query, function(err, result){
            if(err){
                console.log(err);
                res.send(err);
            }
            else{
                res.redirect(302, '/account/all');
            }
        });
    }
});





router.get('/edit', function(req, res) {
    if(req.query.account_id == null) {
        res.send('An account_id is required');
    }
    else{
        account_dal.edit(req.query.account_id, function(err, result){
            res.render('account/accountUpdate', {account: result[0][0], school: result[1], skill: result[2], company: result[3]});
        });
    }

});



router.get('/update', function(req, res){
    account_dal.update(req.query, function(err, result) {
        res.redirect(302, '/account/all');
    });
});

router.get('/delete', function(req, res){
    if(req.query.account_id == null){
        res.send('account_id is null');
    }
    else{
        account_dal.delete(req.query.account_id, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.redirect(302, '/account/all');
            }
        });
    }
});

module.exports = router;

