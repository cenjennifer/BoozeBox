var Sequelize = require('sequelize');

module.exports = function(db){
	return db.define('plan', {
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		price: {
			type: Sequelize.DECIMAL(10,2),
			allowNull: false
		}
	});

}
