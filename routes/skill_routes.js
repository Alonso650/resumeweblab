var express = require('express');
var router = express.Router();
var skill_dal = require('../model/skill_dal');

router.get('/all', function(req, res) {
    skill_dal.getAll(function(err, result) {
        if(err) {
            res.send(err);
        }
        else {
            res.render('skill/skillViewAll', {'result':result });
        }
    });

});

router.get('/', function(req, res){
    if(req.query.skill_id == null) {
        res.send('skill_id is null');
    }
    else {
        skill_dal.getById(req.query.skill_id, function(err, result) {
            if(err) {
                res.send(err);
            }
            else {
                res.render('skill/skillViewById', {'result': result});
            }
        });
    }
});

router.get('/add', function(req, res) {
    if(req.query.skill_name == null) {
        res.send('A type of skill must be provided.');
    }
    else if(req.query.skill_id == null) {
        res.send('At least one skill must be selected');
    }
    else {
        skill_dal.insert(req.query, function(err, result) {
            if(err) {
                console.log(err)
                res.send(err);
            }
            else {
                res.redirect(302, 'skill/all');
            }
        });
    }
});

router.get('/edit', function(req, res) {
    if(req.query.skill_id = null) {
        res.send('A skill_id is required');
    }
    else {
        skill_dal.edit(req.query.skill_id, function(err, result) {
            res.render('skill/skillUpdate', {skill: result[0][0]});
        });
    }
});

router.get('/edit2', function(req, res) {
    if(req.query.skill_id == null) {
        res.send('A skill id is required');
    }
    else {
        skill_dal.getById(req.query.skill_id, function(err, skill) {
            skill.getById(function(err, address) {
                res.render('skill/skillUpdate', {skill:[0]})
            });
        });
    }
});

router.get('/update', function(req, res) {
    skill_dal.update(req.query, function(err, result) {
        res.redirect(302, '/skill/all');
    });

});

router.get('/delete', function(req, res) {
    if(req.query.skill_id == null) {
        res.send('skill_id is null');
    }
    else {
        skill_dal.delete(req.query.skill_id, function(err, result) {
            if(err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/skill/all');
            }
        });
    }
});

module.exports = router;