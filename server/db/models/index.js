'use strict';
var db = require('../_db');

var User = require('./user')(db);
var Box = require('./box')(db);
var Lifestyle = require('./lifestyle')(db);
var Product = require('./product')(db);
var Plan = require('./plan')(db);
var Subscription = require('./subscription')(db);
var Cart_Detail = require('./cartdetail')(db);
var Review = require('./review.js')(db);
var Sale = require('./sale.js')(db);

// Relationships
Review.belongsTo(User);
Review.belongsTo(Box);

User.belongsToMany(Plan, {through: 'UserPlan'});
Subscription.belongsTo(Plan);
Subscription.belongsTo(User);

Plan.belongsTo(Lifestyle);
Box.belongsTo(Lifestyle);

Product.belongsToMany(Box, {through: 'ProductBox' });
Box.belongsToMany(Product, {through: 'ProductBox' });

Sale.belongsTo(User);
Sale.belongsToMany(Box, {through: 'SaleBox'}); // Need? 
Sale.belongsToMany(Subscription, {through: 'SaleSubscription'}) // Will have a reference to subscription, plan, and user id

module.exports = {
	db: db,
	User: User,
	Box: Box,
	Lifestyle: Lifestyle,
	Product: Product,
	Plan: Plan,
	Subscription: Subscription,
	Cart_Detail: Cart_Detail,
	Review: Review,
	Sale: Sale
}