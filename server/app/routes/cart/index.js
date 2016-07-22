// const express = require('express');
// const router = express.Router();
// const models = require('../../../db/models/index');

// const Cart_Detail = models.Cart; //need to update...

// router.param('cartDetailId', function(req, res, next, id){
// 	if (!typeof id === 'number') {
//         var err = new Error('cartDetailId is not a number');
//         err.status = 500;
//         return next(err);
//     }
//     Cart_Detail.findById(id)
//         .then(function(cartDetailFound) {
//             if (!cartDetailFound) {
//                 var err = new Error('Cart Detail Not Found');
//                 err.status = 404;
//                 return next(err);
//             }
//             req.cartDetailById = cartDetailFound;
//             next();
//         })
//         .catch(function(err) {
//             return next(err);
//         });
// });

// //get all cart detail ...might not need
// router.get('/', function(req, res, next) {
//     Cart_Detail.findAll()
//         .then(function(data) {
//             var key = Object.keys(req.query)[0];

//           	//if req.query is used...
//             if (req.query){
//                 data = data.filter(function(cartDetail) {
//                     return cartDetail.dataValues[key] === req.query[key];
//                 });
//             }

//             res.json(data);
//         })
//         .catch(function(err) {
//             return next(err);
//         });
// });

// //add one item to the Cart_Detail table
// router.post('/', function(req, res) {
//     var prop = req.body[0];
//     Cart_Detail.create(prop)
//         .then(function(cartDetailCreated) {
//             res.status(201);
//             res.json(cartDetailCreated);
//         });
// });


// //update one item in the Cart_Detail table
// router.put('/:cartDetailId', function(req, res) {
//     var updateContent = req.body[0];
//     req.cartDetailById.update(updateContent)
//         .then(function(updatedProduct) {
//             res.json(updatedProduct);
//         });
// });
// //delete one item in the Cart_Detail table
// router.delete('/:cartDetailId', function(req, res) {
//     req.cartDetailById.destroy()
//         .then(function(deletedProduct) {
//             res.status(204);
//             res.json(deletedProduct);
//         });
// });

// module.exports = router;