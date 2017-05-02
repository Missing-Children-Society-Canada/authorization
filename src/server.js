var express = require('express');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var DocumentDBClient = require('documentdb').DocumentClient;
var appInsights = require("applicationinsights");
var config = require('./config');

appInsights.setup(config.appInsightsKey).start();

var docDbClient = new DocumentDBClient(config.host, { masterKey: config.authKey });

var expressPort = process.env.PORT || 80;

passport.use(new Strategy({
  consumerKey: config.ConsumerKey,
  consumerSecret: config.ConsumerSecret,
  callbackURL: config.CallbackURL
},
  function (token, tokenSecret, profile, cb) {
    var now = new Date();

    var collLink = 'dbs/' + config.databaseId + '/colls/' + config.TwitterCollectionId;
    docDbClient.createDocument(collLink, profile, function (err, document) {
      if (err) {
        appInsights.client.trackException(err);
      }
    });

    appInsights.client.trackDependency("documentdb", "twitter-save-profile", Date.now() - now, true);

    return cb(null, profile);
  }));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get('/',
  function (req, res) {
    res.render('home', { user: req.user });
  });

app.get('/login/twitter', passport.authenticate('twitter'));

app.get('/login/twitter/return',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/');
  });

/**
app.get('/login/facebook', passport.authenticate('facebook'));

app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/');
  });
 */

app.listen(expressPort);