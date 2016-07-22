// In app/routes/index.js
// router.use('/products', require('./products'));

const express = require('express');
const router = express.Router();
const models = require('../../../db/models/index');

//Q. Why do we need the routes connected to the db file?
//A. To preserve the relationships we defined in that main index.js file!
//If we were to try eagerloading in any of the Product methods we define via [include: someRelation]
//we would get the error: Product is not associated with someRelation!

const Product = models.Product;
const Box = models.Box;

router.param('productId', function(req, res, next, id) {
    if (!typeof id === 'number') {
        var err = new Error('ProductId is not a number');
        err.status = 500;
        return next(err);
    }
    Product.findById(id)
        .then(function(productFound) {
            if (!productFound) {
                var err = new Error('Product Not Found');
                err.status = 404;
                return next(err);
            }
            req.productById = productFound;
            next();
        })
        .catch(function(err) {
            return next(err);
        });
});

//get one product by product name
router.get('/search/', function(req, res) {
    Product.find({
        where:{
            'name': req.query.search
        }
        ,
        include: [{
            model: Box
        }]
    }).then(function(data) {
        res.send(data);        
    });
});

//get all products
router.get('/', function(req, res, next) {
    Product.findAll()
        .then(function(data) {
            var key = Object.keys(req.query)[0];

            //if req.query is used...
            if (req.query) {
                data = data.filter(function(product) {
                    return product.dataValues[key] === req.query[key];
                });
            }

            res.json(data);
        })
        .catch(function(err) {
            return next(err);
        });
});

//create one product
router.post('/', function(req, res) {
    var prop = req.body[0];
    Product.create(prop)
        .then(function(productCreated) {
            res.status(201);
            res.json(productCreated);
        });
});

//get one product
router.get('/:productId', function(req, res) {
    res.json(req.productById);
});

//create one product
router.post('/', function(req, res) {
    var prop = req.body[0];
    Product.create(prop)
        .then(function(productCreated) {
            res.status(201);
            res.json(productCreated);
        });
});


// update one product
router.put('/:productId', function(req, res) {
    var updateContent = req.body[0];
    req.productById.update(updateContent)
        .then(function(updatedProduct) {
            res.json(updatedProduct);
        });
});
//delete one product
router.delete('/:productId', function(req, res, next) {
    req.productById.destroy()
        .then(function(deletedProduct) {
            res.status(204);
            res.json(deletedProduct);
        });
});

module.exports = router;