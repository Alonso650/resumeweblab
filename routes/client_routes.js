var express = require('express');
var router = express.Router();
var client_dal = require('../model/client_dal');
var animal_dal = require('../model/animal_dal');




router.get('/all', function(req, res) {
    client_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('client/clientViewAll', { 'result':result });
        }
    });

});




router.get('/', function(req, res){
    if(req.query.client_id == null) {
        res.send('client_id is null');
    }
    else {
        client_dal.getById(req.query.client_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('client/clientViewById', {'result': result});
            }
        });
    }
});




router.get('/add', function(req, res){
    animal_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('client/clientAdd', {'animal': result});
        }
    });
});




router.get('/insert', function(req, res){
    if(req.query.client_first_name == null) {
        res.send('Client Name must be provided.');
    }
    else if(req.query.animal_id == null) {
        res.send('At least one animal must be selected');
    }
    else {
        client_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                res.redirect(302, '/client/all');
            }
        });
    }
});




router.get('/edit', function(req, res){
    if(req.query.client_id == null) {
        res.send('A client id is required');
    }
    else {
        client_dal.edit(req.query.client_id, function(err, result){
            res.render('client/clientUpdate', {client: result[0][0], animal: result[1]});
        });
    }

});




router.get('/edit2', function(req, res){
    if(req.query.client_id == null) {
        res.send('A client id is required');
    }
    else {
        client_dal.getById(req.query.client_id, function(err, client){
            animal_dal.getAll(function(err, animal) {
                res.render('client/clientUpdate', {client: client[0], animal: animal});
            });
        });
    }

});




router.get('/update', function(req, res) {
    client_dal.update(req.query, function(err, result){
        res.redirect(302, '/client/all');
    });
});




router.get('/delete', function(req, res){
    if(req.query.client_id == null) {
        res.send('client_id is null');
    }
    else {
        client_dal.delete(req.query.client_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/client/all');
            }
        });
    }
});

module.exports = router;
