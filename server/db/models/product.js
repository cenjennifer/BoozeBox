'use strict';
var Sequelize = require('sequelize');

// var db = require('./_db');

module.exports = function(db) {
    return db.define('product', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
};

