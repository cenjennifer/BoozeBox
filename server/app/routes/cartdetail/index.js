const express = require('express');
const router = express.Router();
const models = require('../../../db/models/index');

const Cart_Detail = models.Cart_Detail;

//routes for non-login users
router.get('/sessionStuff', function(req, res, next) {
    res.send(req.session); //is there somewhere else I can get this?
});

router.put('/sessionStuff', function(req, res, next) {
    if (!req.body.updateQuantity) { //remove item in cart
        req.session.cart.splice(req.body.itemIndex, 1);
    } else { //update quantity of an item in cart
        req.session.cart[req.body.itemIndex].boxQuantity = req.body.updateQuantity;
    }
    res.send(req.session);
});

router.post('/sessionStuff', function(req, res, next) {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    if (req.body.boxQuantity) {
        req.session.cart.push(req.body);
    }
    res.send(req.session);
});

router.delete('/sessionStuff', function(req, res, next) {
    req.session.cart = [];
    res.send(req.session.cart);
});

//routes for logged in users
router.get('/', function(req, res, next) {
    Cart_Detail.findOrCreate({
            where: {
                sessionId: req.sessionID
            }
        })
        .spread(function(cart, isCartCreated) {
            res.send(cart);
        });
});

router.post('/', function(req, res) {
    Cart_Detail.findOne({
            where: {
                sessionId: req.sessionID
            }
        })
        .then(function(cartDetail) {
            cartDetail.update({
                    cartItems: req.session.cart // [{cart: blah, quantity: 10},{cart: blah, quantity: 10}]
            });
            return cartDetail.update({
                "cartItems": req.session.cart
            });
        })
        .then(function(response){
            res.send(response);
        });
});

router.put('/', function(req, res) {
    Cart_Detail.findOne({
            where: {
                sessionId: req.sessionID
            }
        })
        .then(function(response) {
            return response.update({"cartItems":req.body.updateCart});
        })
        .then(function(response){
            res.send(response);
        });
});

module.exports = router;