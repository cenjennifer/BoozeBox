'use strict';
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (app, db) {

    var db = require('../../../db/_db')
    var User = require('../../../db/models/user')(db)

    var facebookConfig = app.getValue('env').FACEBOOK;

    var facebookCredentials = {
        clientID: facebookConfig.clientID,
        clientSecret: facebookConfig.clientSecret,
        callbackURL: facebookConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {

        User.findOne({
                where: {
                    facebook_id: profile.id
                }
            })
            .then(function (user) {
                if (user) {
                    return user;
                } else {
                    return User.create({
                        email: profile.email,
                        name: profile.name,
                        facebook_id: profile.id
                    });
                }
            })
            .then(function (userToLogin) {
                done(null, userToLogin);
            })
            .catch(function (err) {
                console.error('Error creating user from Facebook authentication', err);
                done(err);
            })

    };

    passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {failureRedirect: '/login'}),
        function (req, res) {
            res.redirect('/');
        });

};
