'use strict';
var Sequelize = require('sequelize');

module.exports = function(db) {

    return db.define('review', {
        text: {
            type: Sequelize.TEXT
        },
        rating: {
            type: Sequelize.INTEGER,
            validate: { min: 1, max: 5 }
        },
        timestamp: {
            type: Sequelize.DATE
        }
    });



};
