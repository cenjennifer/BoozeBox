'use strict';
const MODELS = '../../../db/models';

var router = require('express').Router();
var db = require('../../../db/_db');
var User = require(`${MODELS}/user`)(db);
var Subscription = require(`${MODELS}/subscription`)(db);
var Cart = require(`${MODELS}/cart`)(db);


module.exports = router;

router.get('/', function(req, res, next){
	User.findAll()
	.then(users => res.json(users))
	.catch(next)
})

router.param('id', function(req, res, next, id){
	User.findById(id)
	.then(user => {
		if(!user) throw new Error('Not Found')
		req.user = user
		next()
	})
	.catch(next);
})

router.param('subId', function(req, res, next, subId){
	Subscription.findById(subId)
	.then(subscription => {
		if(!subscription) {
			throw new Error('Not Found')
		}
		req.subscription = subscription
		next()
	})
	.catch(next)
})

router.get('/:id', function(req, res, next){
	res.json(req.user)
	
})

router.get('/:id/subscriptions', function(req, res, next){
	Subscription.findAll({
		where: {
			userId: req.user.id
		}
	})
	.then(subscriptions => res.json(subscriptions))
})

router.get('/:id/subscriptions/:subId', function(req, res, next){
	res.json(req.subscription)
	
})

router.post('/', function(req, res, next){
	User.create(req.body)
	.then(user => res.status(201).json(user))
	.catch(next)
})

router.post('/:id/subscriptions', function(req, res, next){
	req.user.createSubscription(req.body)
	.then(subscription => res.status(201).json(subscription))
	.catch(next)
})

router.put('/:id', function(req, res, next){
	if(!req.user) throw new Error('Not Found')
	req.user.update(req.body)
	.then(user => res.json(user))
	.catch(next)
})

router.put('/:id/subscriptions/:subId', function(req, res, next){
	if(!req.subscription) throw new Error('Not Found')
	req.subscription.update(req.body)
	.then(subscription => res.json(subscription))
	.catch(next)
})

router.delete('/:id', function(req, res, next){
	if(!req.user) throw new Error('Not Found')
	req.user.destroy()
	.then(() => res.status(204).end())
	.catch(next)
})

router.delete('/:id/subscriptions/:subId', function(req, res, next){
	if(!req.subscription) throw new Error('Not Found')
	req.subscription.destroy()
	.then(() => res.status(204).end())
	.catch(next)
})
