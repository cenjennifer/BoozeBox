var Sequelize = require('sequelize');
var db = require('../_db');
var Product = require('./product.js')(db);

module.exports = function(db){
	return db.define('box', {
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		photo: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.TEXT
		}
	}
	);
};
