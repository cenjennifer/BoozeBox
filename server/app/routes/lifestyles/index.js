'use strict';

const router = require('express').Router();
const db = require('../../../db/_db');
const Lifestyle = require('../../../db/models/lifestyle')(db);
const Box = require('../../../db/models/box')(db);


module.exports = router;

router.get('/', function(req, res, next){
	Lifestyle.findAll()
	.then(function(lifestyles) {
		res.json(lifestyles);
	})
	.catch(next);
});

router.get('/:id', function(req, res, next){
	Lifestyle.findById(req.params.id)
	.then(function(lifestyle) {
		res.json(lifestyle);
	})
	.catch(next);
});

router.get('/:id/boxes', function(req, res, next){
   Box.findAll({
        where: {
            lifestyleId: req.params.id
        }
   })
   .then(function(boxes) {
        res.json(boxes);
   })
   .catch(next);
});


router.post('/', function(req, res, next) {
    Lifestyle.create(req.body)
        .then(function(lifestyle) {
            res.status(201).send(lifestyle);
        })
        .catch(next);
});

router.put('/:id', function(req, res, next) {
    Lifestyle.findById(req.params.id)
        .then(function(lifestyle) {
            if (lifestyle) {
                lifestyle.update(req.body)
                    .then(function(updatedLifestyle) {
                        res.send(updatedLifestyle);
                    });
            } else {
                next(404);
            }
        })
        .catch(next);
});

router.delete('/:id', function(req, res, next) {
    Lifestyle.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(destroyedLifestyle) {
            if (destroyedLifestyle) res.sendStatus(204);
            else next(404);
        })
        .catch(next);
});