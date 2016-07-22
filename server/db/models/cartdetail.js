'use strict';
var Sequelize = require('sequelize');

module.exports = function(db) {
    return db.define('cartdetail', {
        sessionId: {
            type: Sequelize.STRING
        },
        cartItems: {
            type: Sequelize.ARRAY(Sequelize.JSON),
            defaultValue: [],
        }
    }
    );
};