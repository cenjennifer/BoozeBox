'use strict';
var Sequelize = require('sequelize');

module.exports = function(db) {

    return db.define('sale', {
        dateOfSale: {
            type: Sequelize.DATE
        },
        cartObj: {
            type: Sequelize.JSON
        },
        userRef: { // User Id? Depending on how Jennifer posts to this db.
            type: Sequelize.INTEGER
        }

    });
};
