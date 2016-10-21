var express = require('express');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var DocumentDBClient = require('documentdb').DocumentClient;
var appInsights = require("applicationinsights");
var config = require('./config');

appInsights.setup("c31db7e0-5df2-44ad-9e76-892af521eecf").start();

var docDbClient = new DocumentDBClient(config.host, { masterKey: config.authKey });

var expressPort = process.env.PORT || 8080;

passport.use(new Strategy({
  consumerKey: config.consumerKey,
  consumerSecret: config.consumerSecret,
  callbackURL: config.callbackURL
},
  function (token, tokenSecret, profile, cb) {

//WTF
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

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('profile', { user: req.user });
  });

app.listen(expressPort);