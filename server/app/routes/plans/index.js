'use strict';

const router = require('express').Router();
const db = require('../../../db/_db');
const models = require('../../../db/models/index.js');
const Plan = models.Plan;


module.exports = router;

router.get('/', function(req, res, next){
	Plan.findAll()
	.then(function(plans) {
		res.json(plans);
	});
});

