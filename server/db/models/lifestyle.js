var Sequelize = require('sequelize');

module.exports = function(db){
	return db.define('lifestyle', {
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		photo: {
			type: Sequelize.STRING
		}
	});

}
