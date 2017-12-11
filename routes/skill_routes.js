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
          //  res.render('skill/skillViewAll', {skill_name: req.query.skill_name, description:req.query.description})
        }
    });

});


//Original
// View the skill for the given id
router.get('/', function(req, res){
    if(req.query.skill_id == null) {
        res.send('skill_id is null');
    }
    else {
        skill_dal.getById(req.query.skill_id, function(err,result) {
            if(err) {
                res.send(err);
            }
            else {
                res.render('skill/skillViewById', {'result': result});
            }
        });
    }
});

/*
router.get('/', function(req, res){
    if(req.query.skill_id == null) {
        res.send('skill_id is null');
    }
    else {
        skill_dal.getById(req.query.skill_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('skill/skillViewById', {'result': result});
            }
        });
    }
});
*/
/*
router.get('/', function(req, res) {
    console.log(req.query.skill_id);
    if(req.query.skill_id == null){
        res.send('skill_id is null')
    }
    else{
        skill_dal.getById(req.query.skill_id, function(err, result){
            if(err){
                res.send(err);
            }
            console.log(result);
            res.render('skill/skillViewById', {skill_name: req.query.skill_name, description: req.query.description})
        });
    }
});
*/



// Return the add a new skill form
router.get('/add', function(req, res) {
    skill_dal.getAll(function(err, result) {
        if(err) {
            res.send(err);
        }
        else {
            res.render('skill/skillAdd', {'skill': result});
        //    res.render('skill/skillAdd', {skill_name:req.query.skill_name, description:req.query.description}
        }
    });
});



// View the skill for the given id
router.get('/insert', function(req, res) {
    if(req.query.skill_name == null) {
        res.send('A type of skill must be provided.');
    }
    else if(req.query.description == null) {
        res.send('Description must provided(noooooooo)');
    }
    else {
        skill_dal.insert(req.query, function(err,result) {
            if(err) {
                console.log(err)
                res.send(err);
            }
            else {
                res.redirect(302, '/skill/all');
            }
        });
    }
});

/*
// View the skill for the given id
router.get('/insert', function(req, req2, res) {
    if(req.query.skill_name == null) {
        res.send('A type of skill must be provided.');
    }
    if(req2.query2.description == null){
        res.send('A description must be procided.');
    }
    //  else if(req.query.skill_id == null) {
    //     res.send('Description must provided(noooooooo)');
    // }
    else {
        skill_dal.insert(req.query, req2.query2, function(err, err2, result) {
            if(err && err2) {
                console.log(err, err2)
                res.send(err, err2);
            }
            else {
                res.redirect(302, '/skill/all');
            }
        });
    }
});
*/



router.get('/edit', function(req, res) {
    if(req.query.skill_id == null) {
        res.send('A skill id is required');
    }
    else {
        skill_dal.edit(req.query.skill_id, function(err, result) {
         //   res.render('skill/skillUpdate', {skill: req.query.skill_name, skill:req.query.description})
          //  res.render('skill/skillUpdate', {skill: result[0][0], skill: result[1][1]});
            res.render('skill/skillUpdate', {skill: result[0][0] });
        });
    }
});
/*
router.get('/edit2', function(req, res) {
    if(req.query.skill_id == null) {
        res.send('A skill id is required');
    }
    else {
        skill_dal.getById(req.query.skill_id, function(err, skill) {
            skill_dal.getAll(function(err, skill) {
                res.render('skill/skillUpdate', {skill: skill[0]})
            });
        });
    }
});

*/

router.get('/edit2', function(req, res){
    if(req.query.skill_id == null) {
        res.send('A skill id is required');
    }
    else {
        skill_dal.getById(req.query.skill_id, function(err, skill){
            skill_dal.getAll(function(err, skill) {
                res.render('skill/skillUpdate', { skill: skill});
             //   res.render('skill/skillUpdate', {skill_name:req.query.skill_name, description:req.query.description})
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