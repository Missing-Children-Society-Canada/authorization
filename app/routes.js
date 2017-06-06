const User = require('../app/models/user')
module.exports = function (app, passport) {

	// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', function (req, res) {
		res.render('index.ejs');
	});

	// PROFILE SECTION =========================
	app.get('/profile', isLoggedIn, function (req, res) {
		res.render('profile.ejs', {
			user: req.user
		});
	});

	// LOGOUT ==============================
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	// Show amount of users and social media accounts
	app.get('/stats',function(req,res){
		// Get All users
		User.find({},function(err,user){
			// Get the user count and the social media counts
			const userCount = user.length;
			const twitterCount = user.filter(function(account){return account.twitter.id != undefined}).length;
			const instagramCount = user.filter(function(account){return account.instagram.id != undefined}).length;
			const facebookCount = user.filter(function(account){return account.facebook.id != undefined}).length;
			const socialMediaCount = twitterCount + instagramCount + facebookCount;
			
			// Put it in js object
			const data = {
				"userCount":userCount,
				"twitterCount":twitterCount,
				"instagramCount":instagramCount,
				"facebookCount":facebookCount,
				"socialMediaCount": socialMediaCount
			};
			
			// if no errors then send the js data
			if(!err) res.status(200).json(data);
			// send error 400 if there is error fetching data
			else res.status(400).send();
		});
	});

	// =============================================================================
	// AUTHENTICATE (FIRST LOGIN) ==================================================
	// =============================================================================

	// facebook -------------------------------

	// send to facebook to do the authentication
	app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email', 'user_birthday', 'user_location', 'user_hometown', 'user_posts'] }));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect: '/profile',
			failureRedirect: '/'
		}));

	// twitter --------------------------------

	// send to twitter to do the authentication
	app.get('/auth/twitter', passport.authenticate('twitter', { scope: 'email' }));

	// handle the callback after twitter has authenticated the user
	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect: '/profile',
			failureRedirect: '/'
		}));

	// instagram ---------------------------------

	// send to instagram to do the authentication
	app.get('/auth/instagram', passport.authenticate('instagram', { scope: 'basic' }));

	// the callback after instagram has authenticated the user
	app.get('/auth/instagram/callback',
		passport.authenticate('instagram', {
			successRedirect: '/profile',
			failureRedirect: '/'
		}));

	// =============================================================================
	// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
	// =============================================================================

	// facebook -------------------------------

	// send to facebook to do the authentication
	app.get('/connect/facebook', passport.authorize('facebook', { scope: ['public_profile', 'email', 'user_birthday', 'user_location', 'user_hometown', 'user_posts'] }));

	// handle the callback after facebook has authorized the user
	app.get('/connect/facebook/callback',
		passport.authorize('facebook', {
			successRedirect: '/profile',
			failureRedirect: '/'
		}));

	// twitter --------------------------------

	// send to twitter to do the authentication
	app.get('/connect/twitter', passport.authorize('twitter', { scope: 'email' }));

	// handle the callback after twitter has authorized the user
	app.get('/connect/twitter/callback',
		passport.authorize('twitter', {
			successRedirect: '/profile',
			failureRedirect: '/'
		}));


	// instagram ---------------------------------

	// send to instagram to do the authentication
	app.get('/connect/instagram', passport.authorize('instagram', { scope: 'basic' }));

	// the callback after instagram has authorized the user
	app.get('/connect/instagram/callback',
		passport.authorize('instagram', {
			successRedirect: '/profile',
			failureRedirect: '/'
		}));

	// =============================================================================
	// UNLINK ACCOUNTS =============================================================
	// =============================================================================
	// used to unlink accounts. for social accounts, just remove the token
	// for local account, remove email and password
	// user account will stay active in case they want to reconnect in the future

	// facebook -------------------------------
	app.get('/unlink/facebook', function (req, res) {
		var user = req.user;
		user.facebook.token = undefined;
		user.save(function (err) {
			res.redirect('/profile');
		});
	});

	// twitter --------------------------------
	app.get('/unlink/twitter', function (req, res) {
		var user = req.user;
		user.twitter.token = undefined;
		user.save(function (err) {
			res.redirect('/profile');
		});
	});

	// instagram ---------------------------------
	app.get('/unlink/instagram', function (req, res) {
		var user = req.user;
		user.instagram.token = undefined;
		user.save(function (err) {
			res.redirect('/profile');
		});
	});


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}