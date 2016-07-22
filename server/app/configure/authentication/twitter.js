'use strict';

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function (app, db) {

    var db = require('../../../db/_db')
    var User = require('../../../db/models/user')(db)

    var twitterConfig = app.getValue('env').TWITTER;

    var twitterCredentials = {
        consumerKey: twitterConfig.consumerKey,
        consumerSecret: twitterConfig.consumerSecret,
        callbackUrl: twitterConfig.callbackUrl
    };

    var createNewUser = function (token, tokenSecret, profile) {
        console.log('GIVE ME THE SECRET', tokenSecret)

        var fakeEmail = `${profile.id}@twitter.com`

        return User.create({
            twitter_id: profile.id,
            firstName: profile.name,
            email: fakeEmail
        });
    };

    var verifyCallback = function (token, tokenSecret, profile, done) {
        console.log('TWITTER PROFILE', profile)
        User.findOne({
            where: {
                twitter_id: profile.id
            }
        })
            .then(function (user) {
                if (user) { // If a user with this twitter id already exists.
                    return user;
                } else { // If this twitter id has never been seen before and no user is attached.
                    console.log('ARE YOU HERE?!?')
                    return createNewUser(token, tokenSecret, profile);
                }
            })
            .then(function (user) {
                done(null, user);
            })
            .catch(function (err) {
                console.error('Error creating user from Twitter authentication', err);
                done(err);
            });

    };

    passport.use(new TwitterStrategy(twitterCredentials, verifyCallback));

    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {failureRedirect: '/login'}),
        function (req, res) {
            res.redirect('/');
        });

};
