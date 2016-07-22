var Sequelize = require('sequelize');

// var db = require('./_db');

module.exports = function(db) {
    return db.define('subscription', {
        startDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        endDate: {
            type: Sequelize.DATE //,
            // allowNull: false
        }
    }, {
        getterMethods: {
            isActive: function() {
                return this.endDate > Date.now() ? true : false;
            }
        }
    });
};
