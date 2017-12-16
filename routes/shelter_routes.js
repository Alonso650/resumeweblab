var express = require('express');
var router = express.Router();
var shelter_dal = require('../model/shelter_dal');
var shelter_address_dal = require('../model/shelter_address_dal');

router.get('/all', function(req, res){
    shelter_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.render('shelter/shelterViewAll', { 'result':result});
        }
    });
});




router.get('/', function(req, res){
    if(req.query.shelter_id == null){
        res.send('shelter_id is null');
    }
    else{
        shelter_dal.getById(req.query.shelter_id, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.render('shelter/shelterViewById', {'result': result});
            }
        });
    }
});




router.get('/add', function(req, res){
    shelter_address_dal.getAll(function(err, result) {
        if(err){
            res.send(err);
        }
        else {
            res.render('shelter/shelterAdd', {'shelter_address': result});
        }
    });
});




router.get('/insert', function(req, res) {
    if(req.query.shelter_name == null){
        res.send('Must provide a shelter name.');
    }
    else if(req.query.address_id == null){
        res.send('At least one address must be selected');
    }
    else{
        shelter_dal.insert(req.query, function(err, result){
            if(err){
                console.log(err)
                res.send(err);
            }
            else{
                res.redirect(302, '/shelter/all');
            }
        });
    }
});




router.get('/edit2', function(req, res) {
    if(req.query.shelter_id == null){
        res.send('A shelter id is required');
    }
    else{
        shelter_dal.edit(req.query.shelter_id, function(err, result){
                res.render('shelter/shelterUpdate', {shelter: result[0][0], shelter_address: result[1]});
            });
    }
});




router.get('/update', function(req, res){
    shelter_dal.update(req.query, function(err, result){
        res.redirect(302, '/shelter/all');
    });
});




router.get('/edit', function(req, res){
    if(req.query.shelter_id == null){
        res.send('A shelter id is required');
    }
    else{
        shelter_dal.getById(req.query.shelter_id, function(err, shelter){
            shelter_address_dal.getAll(function(err, shelter_address){
                res.render('shelter/shelterUpdate', {shelter: shelter[0], shelter_address: shelter_address});
            });
        });
    }
});




router.get('/delete', function(req, res) {
    if(req.query.shelter_id == null){
        res.send('shelter_id is null');
    }
    else{
        shelter_dal.delete(req.query.shelter_id, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.redirect(302, '/shelter/all');
            }
        });
    }
});

module.exports = router;