var express = require('express');
var router = express.Router();
var volunteer_dal = require('../model/volunteer_dal');
var shelter_dal = require('../model/shelter_dal');
var animal_dal = require('../model/animal_dal');



router.get('/all', function(req, res){
    volunteer_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.render('volunteer/volunteerViewAll', {'result': result});
        }
    });
});




router.get('/', function(req, res){
    if(req.query.volunteer_id == null){
        res.send('volunteer_id is null');
    }
    else{
        volunteer_dal.getInfo(req.query.volunteer_id, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.render('volunteer/volunteerViewById',
                    {'volunteer':result[2][0], 'shelter': result[0], 'animal': result[1]});
            }
        });
    }
});




router.get('/add', function(req, res) {
    shelter_dal.getAll(function (err, shelter) {
        animal_dal.getAll(function (err, animal) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('volunteer/volunteerAdd', {'shelter': shelter, 'animal': animal})
            }
        });
    });
});

router.get('/insert', function(req, res){
    if(req.query.volunteer_first_name == null){
        res.send('First name must be provided.');
    }
    else if(req.query.volunteer_last_name == null){
        res.send('last name must be provided');
    }
    else{
        volunteer_dal.insert(req.query, function(err, result){
            if(err){
                console.log(err);
                res.send(err);
            }
            else{
                res.redirect(302, '/volunteer/all');
            }
        });
    }
});


router.get('/edit', function(req, res){
    if(req.query.volunteer_id == null){
        res.send('A volunteer id is required');
    }
    else{
        volunteer_dal.edit(req.query.volunteer_id, function(err, result){
            res.render('volunteer/volunteerUpdate', {volunteer: result[0][0], shelter: result[1], animal: result[2]});
        });
    }
});



router.get('/update', function(req, res) {
        volunteer_dal.updateAnimal(req.query, function (err, result) {
            res.redirect(302, '/volunteer/all');
        });
});



router.get('/delete', function(req, res){
    if(req.query.volunteer_id == null){
        res.send('volunteer_id is null');
    }
    else{
        volunteer_dal.delete(req.query.volunteer_id, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.redirect(302, '/volunteer/all');
            }
        });
    }
});

module.exports = router;