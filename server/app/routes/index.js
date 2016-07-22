'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/products', require('./products'));
router.use('/users', require('./users'));
router.use('/boxes', require('./boxes'));
router.use('/lifestyles', require('./lifestyles'));
router.use('/cartdetail', require('./cartdetail'));
router.use('/email', require('./email'));
router.use('/plans', require('./plans'));
router.use('/sale', require('./sale'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
