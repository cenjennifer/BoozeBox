'use strict';
var Sequelize = require('sequelize');
var crypto = require('crypto')
var _ = require('lodash')
module.exports = function (db) {

    return db.define('user', {
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING
        },
        salt: {
            type: Sequelize.STRING
        },
        twitter_id: {
            type: Sequelize.STRING
        },
        facebook_id: {
            type: Sequelize.STRING
        },
        google_id: {
            type: Sequelize.STRING
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        birthday:{ // check age before verifying they can make an acct
            type: Sequelize.DATEONLY
            // ,
            // validate:{
                // notNull: true,
                // isDate: true
                // isBefore: function(value,next){

                // var drinkingAge = new Date();
                // var drinkingAge = new Date(drinkingAge.getFullYear()-21, drinkingAge.getMonth(), drinkingAge.getDate())
                // var birth = new Date(value);
                // var curr = new Date();
                // var diff = curr-birth;
                // var age = Math.floor(diff/31536000000);

                //If user is less than 21 years old, pass an error to the next method.
                // if(age<21) return next("You must be over 21 years old to participate.");
                // if(birthday.getFullYear()>drinkingAge.getFullYear) console.log('Too young')
                // else console.log('old enough')

                // If we got this far, the age is verified.
                // Call next with no arguments upon success of verification.
                // next();
                // }
            // }
        },
        firstName:{
            type: Sequelize.STRING
        },
        lastName:{
            type: Sequelize.STRING
        },
        street_address:{
            type: Sequelize.STRING
        },
        city_address:{
            type: Sequelize.STRING
        },
        state_address:{
            type: Sequelize.STRING
        },
        zipcode_address:{
            type: Sequelize.INTEGER
        },
        country_address:{
            type: Sequelize.STRING
        },
        active_status:{
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        cc_fname:{
            type: Sequelize.STRING
        },
        cc_lname:{
            type: Sequelize.STRING
        },
        cc_number:{
            type: Sequelize.STRING
            // ,
            // isCreditCard: true
        },
        cc_cvv:{
            type: Sequelize.INTEGER
            // ,
            // validate:{
            //     max: 3
            // }
        },
        cc_expiration:{
            type: Sequelize.DATE
        },
        cc_streetaddress:{
            type: Sequelize.STRING
        },
        cc_cityaddress:{
            type: Sequelize.STRING
        },
        cc_stateaddress:{
            type: Sequelize.STRING
        },
        cc_zipcodeaddress:{
            type: Sequelize.INTEGER
        },
        cc_countryaddress:{
            type: Sequelize.STRING,
            defaultValue: "United States"
        },
    }, {
        instanceMethods: {
            sanitize: function () {
                return _.omit(this.toJSON(), ['password', 'salt']);
            },
            correctPassword: function (candidatePassword) {
                return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
            }
        },
        classMethods: {
            generateSalt: function () {
                return crypto.randomBytes(16).toString('base64');
            },
            encryptPassword: function (plainText, salt) {
                var hash = crypto.createHash('sha1');
                hash.update(plainText);
                hash.update(salt);
                return hash.digest('hex');
            }
        },
        hooks: {
            beforeValidate: function (user) {
                if (user.changed('password')) {
                    user.salt = user.Model.generateSalt();
                    user.password = user.Model.encryptPassword(user.password, user.salt);
                }
            }
        }
    });
};
