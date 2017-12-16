var express = require('express');
var router = express.Router();
var shelter_dal = require('../model/shelter_dal');
var animal_dal = require('../model/animal_dal');

router.get('/all', function(req, res){
    animal_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.render('animal/animalViewAll', { 'result':result});
        }
    });
});




router.get('/', function(req, res){
    if(req.query.animal_id == null){
        res.send('animal_id is null');
    }
    else{
        animal_dal.getById(req.query.shelter_id, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.render('animal/animalViewById', {'result': result});
            }
        });
    }
});




router.get('/add', function(req, res){
    shelter_dal.getAll(function(err, result) {
        if(err){
            res.send(err);
        }
        else {
            res.render('animal/animalAdd', {'shelter': result});
        }
    });
});




router.get('/insert', function(req, res) {
    if(req.query.animal_name == null){
        res.send('Must provide a name for the animal.');
    }
    else if(req.query.age == null){
        res.send('Must provide a age');
    }
    else if(req.query.gender == null){
        res.send('Must provide a gender');
    }
    else if(req.query.date_entered == null){
        res.send('Must provide a date');
    }
    else if(req.query.shelter_id == null){
        res.send('At least one shelter must be selected');
    }
    else{
        animal_dal.insert(req.query, function(err, result){
            if(err){
                console.log(err);
                res.send(err);
            }
            else{
                res.redirect(302, '/animal/all');
            }
        });
    }
});




router.get('/edit2', function(req, res) {
    if(req.query.animal_id == null){
        res.send('A animal id is required');
    }
    else{
        animal_dal.edit(req.query.animal_id, function(err, result){
            res.render('animal/animalUpdate', {animal: result[0][0], shelter: result[1]});
        });
    }
});




router.get('/update', function(req, res){
    animal_dal.update(req.query, function(err, result){
        res.redirect(302, '/animal/all');
    });
});




router.get('/edit', function(req, res){
    if(req.query.animal_id == null){
        res.send('A animal id is required');
    }
    else{
        animal_dal.getById(req.query.animal_id, function(err, animal){
            shelter_dal.getAll(function(err, shelter){
                res.render('animal/animalUpdate', {animal: animal[0], shelter: shelter});
            });
        });
    }
});




router.get('/delete', function(req, res) {
    if(req.query.animal_id == null){
        res.send('animal_id is null');
    }
    else{
        animal_dal.delete(req.query.animal_id, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.redirect(302, '/animal/all');
            }
        });
    }
});

module.exports = router;