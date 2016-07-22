'use strict';

const router = require('express').Router();
const db = require('../../../db/_db');
const models = require('../../../db/models/index.js');
const Box = models.Box;
const Lifestyle = models.Lifestyle;
const Product = models.Product;
const Review = models.Review;


module.exports = router;

router.get('/', function(req, res, next) {
    Box.findAll({ include: [Lifestyle] })
        .then(function(boxes) {
            res.json(boxes);
        })
        .catch(next);
});

router.get('/lifestyle/:lifestyleId', function(req, res, next) {
    Box.findAll({
            include: [Lifestyle],
            where: {
                lifestyleId: req.params.lifestyleId
            }
        })
        .then(function(boxes) {
            res.json(boxes);
        })
        .catch(next);
});

//Remove product from box
router.put('/:id/product/:productId', function(req, res, next) {
    var product;

    Product.findById(req.params.productId)
        .then(function(foundProduct) {
            product = foundProduct;
            return foundProduct;
        })
        .then(function() {
            return Box.findById(req.params.id);
        })
        .then(function(foundBox) {
            return foundBox.removeProduct(product);
        })
        .then(function(response) {
            res.json(response);
        })
        .catch(next);
});

//Add product to box
router.post('/:id/product/:product', function(req, res, next) {
    var box;
    Box.findById(req.params.id)
    .then(function(foundBox) {
        box = foundBox;
        return foundBox;
    })
    .then(function() {
        return Product.findOrCreate({
            where: { name: req.params.product },
            defaults: { name: req.params.product }
        });
    })
    .then(function(newProduct) {
        return box.addProduct(newProduct[0]);
    })
    .then(function(relationshipAdded) {
        res.json(relationshipAdded);
    })
    .catch(next);
});

router.get('/:id', function(req, res, next) {
    Box.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: Product
            }
        })
        .then(function(box) {
            res.json(box);
        })
        .catch(next);
});



router.get('/:id/reviews', function(req, res, next){
    Review.findAll({
        where: {
            boxId: req.params.id
        }
    })
    .then(reviews => {
        if(!reviews) throw new Error('Not found')
        else res.json(reviews)
    })
    .catch(next);
});


router.post('/', function(req, res, next) {
    Box.create(req.body)
        .then(function(box) {
            res.status(201).send(box);
        })
        .catch(next);
});

router.post('/:id/reviews', function(req, res, next) {
    req.body.boxId = req.params.id
    Review.create(req.body)
        .then(review => res.json(review))
        .catch(next)
});

router.put('/:id', function(req, res, next) {
    Box.findById(req.params.id)
        .then(function(box) {
            if (box) {
                box.update(req.body)
                    .then(function(updatedBox) {
                        res.send(updatedBox);
                    });
                next();
            } else {
                next(404);
            }
        })
        .catch(next);
});

router.delete('/:id', function(req, res, next) {
    Box.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(destroyedBox) {
            if (destroyedBox) res.sendStatus(204);
            else next(404);
        })
        .catch(next);
});

router.delete('/:id/reviews/:reviewId', function(req, res, next) {
    Review.destroy({
            where: {
                id: req.params.reviewId
            }
        })
        .then(() => res.status(204).end())
        .catch(next)
});
