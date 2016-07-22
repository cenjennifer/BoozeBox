const express = require('express');
const router = express.Router();
const models = require('../../../db/models/index');

const Sale = models.Sale;
module.exports = router;

router.get('/', function(req, res, next) {
    // res.send(req.session);
});

router.post('/', function(req, res, next) {
	Sale.create({
		'dateOfSale': req.body.date,
		'cartObj': req.body.cart,
		'userRef': req.body.user
	})
	.then(function(orderAdded){
		console.log("hereee salee");
		res.send(orderAdded);
	});
});