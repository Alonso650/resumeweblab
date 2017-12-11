var express = require('express');
var router = express.Router();
var address_dal = require('../model/address_dal');

//View All address(es)

router.get('/all', function(req, res) {
    address_dal.getAll(function(err, result) {
        if(err) {
            res.send(err);
        }
        else {
            res.render('address/addressViewAll', { 'result':result });
        }
    });

});




// View the company for the given id
router.get('/', function(req, res){
    if(req.query.address_id == null) {
        res.send('address_id is null');
    }
    else {
        address_dal.getById(req.query.address_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('address/addressViewById', {'result': result});
            }
        });
    }
});

router.get('/add', function(req, res) {
    address_dal.getAll(function(err, result) {
        if(err) {
            res.send(err);
        }
        else {
            res.render('address/addressAdd', {'address': result});
        }
    });
});

router.get('/insert', function(req, res) {
    if(req.query.street == null){
        res.send('An address must be provided.');
    }
    else if(req.query.zip_code == null) {
        res.send('zip code must be provided');
    }
    else {
        address_dal.insert(req.query, function(err, result) {
            if(err) {
                console.log(err)
                res.send(err);
            }
            else{
                res.redirect(302, '/address/all');
            }
        });
    }
});

router.get('/edit', function(req, res) {
    if(req.query.address_id == null) {
        res.send('A address id is required');
    }
    else {
        address_dal.edit(req.query.address_id, function(err, result) {
            res.render('address/addressUpdate', {address: result[0][0] ,street: result[1]});
        });
    }
});

router.get('/edit2', function(req, res) {
    if(req.query.address_id == null) {
        res.send('A address id is required');
    }
    else {
        address_dal.getById(req.query.address_id, function(err, address) {
            address_dal.getAll(function(err, address) {
                res.render('address/addressUpdate', {address: address});
            });
        });
    }
});

router.get('/update', function(req, res) {
    address_dal.update(req.query, function(err, result) {
        res.redirect(302, '/address/all');
    });
});

router.get('/delete', function(req, res) {
    if(req.query.address_id == null) {
        res.send('address_id is null');
    }
    else{
        address_dal.delete(req.query.address_id, function(err, result) {
            if(err){
                res.send(err);
            }
            else{
                res.redirect(302,'/address/all');
            }
        });
    }
});

module.exports = router;