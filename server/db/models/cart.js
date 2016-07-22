'use strict';
var Sequelize = require('sequelize');

module.exports = function( db){
	return db.define('cart', {
		purchaseStatus: {
			type: Sequelize.BOOLEAN,
			defaultValue: false
		},
		dateOfPurchase: {
			type: Sequelize.DATE
		},
		cartSession: {
			type: Sequelize.INTEGER
		}
	});
}




