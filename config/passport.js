// load all the things we need
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;

var request = require('request');
var auth = require('./auth');

// load up the user model
var User = require('../app/models/user');

// load the auth variables
var configAuth = require('./auth'); // use this one for testing

module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'age_range', 'birthday', 'email', 'first_name', 'gender', 'hometown', 'last_name'],
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
        function (req, token, refreshToken, profile, done) {
            
            
            // asynchronous
            process.nextTick(function () {

                // check if the user is already logged in
                if (!req.user) {

                    User.findOne({ 'facebook.id': profile.id }, function (err, user) {
                        if (err)
                            return done(err);

                        if (user) {

                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.facebook.token) {
                                user.facebook.token = token;
                                if (typeof profile.name.givenName !== 'undefined') {
                                    user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                                }
                                if (typeof profile.emails !== 'undefined' && profile.emails.length > 0) {
                                    user.facebook.email = profile.emails[0].value;
                                }
                                if (typeof profile.photos !== 'undefined' && profile.photos.length > 0) {
                                    user.facebook.profilepic = profile.photos[0].value;
                                }
                                user.displayName = profile.displayName;
                                user.gender = profile.gender;
                                user.birthday = profile.birthday;
                                user.hometown = profile.hometown;
                                user.location = profile.location;
                            }

                            return done(null, user); // user found, return that user
                        } else {
                            console.log(profile);
                            // if there is no user, create them
                            var newUser = new User();
                            newUser.facebook.id = profile.id;
                            newUser.facebook.token = token;
                            
                            if (typeof profile.name.givenName !== 'undefined') {
                                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                            }
                            if (typeof profile.emails !== 'undefined' && profile.emails.length > 0) {
                                newUser.facebook.email = profile.emails[0].value;
                            }
                            if (typeof profile.photos !== 'undefined' && profile.photos.length > 0) {
                                newUser.facebook.profilepic = profile.photos[0].value;
                            }

                            console.log("Gender ");
                            console.log(profile.gender);
                            newUser.facebook.displayName = profile.displayName;
                            newUser.facebook.gender = profile.gender;
                            newUser.facebook.birthday = profile._json.birthday;
                            newUser.facebook.hometown = profile._json.hometown;
                            newUser.facebook.location = profile._json.location;

                            console.log("NEW USER ");
                            console.log(newUser);

                            newUser.save(function (err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }
                    });

                } else {
                    // user already exists and is logged in, we have to link accounts
                    var user = req.user; // pull the user out of the session

                    user.facebook.id = profile.id;
                    user.facebook.token = token;
                    user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    if (typeof profile.emails !== 'undefined' && profile.emails.length > 0) {
                        user.facebook.email = profile.emails[0].value;
                    }
                    if (typeof profile.photos !== 'undefined' && profile.photos.length > 0) {
                        user.facebook.profilepic = profile.photos[0].value;
                    }

                    user.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });

                }
            });

        }));

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({

        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
        function (req, token, tokenSecret, profile, done) {

            // asynchronous
            process.nextTick(function () {

                // check if the user is already logged in
                if (!req.user) {

                    User.findOne({ 'twitter.id': profile.id }, function (err, user) {
                        if (err)
                            return done(err);

                        if (user) {
                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.twitter.token) {
                                user.twitter.token = token;
                                user.twitter.username = profile.username;
                                user.twitter.displayName = profile.displayName;
                                if (typeof profile.photos !== 'undefined' && profile.photos.length > 0) {
                                    user.twitter.profilepic = profile.photos[0].value;
                                }

                                user.save(function (err) {
                                    if (err)
                                        throw err;
                                    return done(null, user);
                                });
                            }

                            return done(null, user); // user found, return that user
                        } else {
                            // if there is no user, create them
                            var newUser = new User();

                            newUser.twitter.id = profile.id;
                            newUser.twitter.token = token;
                            newUser.twitter.username = profile.username;
                            newUser.twitter.displayName = profile.displayName;
                            if (typeof profile.photos !== 'undefined' && profile.photos.length > 0) {
                                newUser.twitter.profilepic = profile.photos[0].value;
                            }

                            newUser.save(function (err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }
                    });

                } else {
                    // user already exists and is logged in, we have to link accounts
                    var user = req.user; // pull the user out of the session

                    user.twitter.id = profile.id;
                    user.twitter.token = token;
                    user.twitter.username = profile.username;
                    user.twitter.displayName = profile.displayName;
                    if (typeof profile.photos !== 'undefined' && profile.photos.length > 0) {
                        user.twitter.profilepic = profile.photos[0].value;
                    }

                    user.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }

            });

        }));

    // =========================================================================
    // INSTAGRAM ==================================================================
    // =========================================================================
    passport.use(new InstagramStrategy({

        clientID: configAuth.instagramAuth.clientID,
        clientSecret: configAuth.instagramAuth.clientSecret,
        callbackURL: configAuth.instagramAuth.callbackURL,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
        function (req, token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function () {

                // check if the user is already logged in
                if (!req.user) {

                    User.findOne({ 'instagram.id': profile.id }, function (err, user) {
                        if (err)
                            return done(err);

                        if (user) {

                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.instagram.token) {
                                user.instagram.token = token;
                                user.instagram.name = profile.displayName;
                                user.instagram.username = profile.username;
                                if (typeof profile.photos !== 'undefined' && profile.photos.length > 0) {
                                    user.instagram.profilepic = profile.photos[0].value;
                                }

                                user.save(function (err) {
                                    if (err)
                                        throw err;
                                    return done(null, user);
                                });
                            }

                            return done(null, user);
                        } else {
                            var newUser = new User();

                            newUser.instagram.id = profile.id;
                            newUser.instagram.token = token;
                            newUser.instagram.displayName = profile.displayName;
                            newUser.instagram.username = profile.username;

                            if (typeof profile.photos !== 'undefined' && profile.photos.length > 0) {
                                newUser.instagram.profilepic = profile.photos[0].value;
                            }

                            newUser.save(function (err) {
                                if (err)
                                    throw err;
                                return registerIGSubscription(() => done(null, newUser));
                            });
                        }
                    });

                } else {
                    // user already exists and is logged in, we have to link accounts
                    var user = req.user; // pull the user out of the session
                    user.instagram.id = profile.id;
                    user.instagram.token = token;
                    user.instagram.displayname = profile.displayName;
                    user.instagram.username = profile.username
                    if (typeof profile.photos !== 'undefined' && profile.photos.length > 0) {
                        user.instagram.profilepic = profile.photos[0].value;
                    }

                    user.save(function (err) {
                        if (err)
                            throw err;
                        return registerIGSubscription(() => done(null, user));
                    });

                }

            });
        }));
};

function registerIGSubscription(userid, cb) {
    request.post("https://api.instagram.com/v1/subscriptions/", {
        form: {
            client_id: auth.instagramAuth.clientID,
            client_secret: auth.instagramAuth.clientSecret,
            object: "user",
            aspect: "media",
            verify_token: process.env.IG_VERIFY_TOKEN,
            callback_url: auth.functions.callbackURL
        }
    }, cb);
}