// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth': {
		'clientID': process.env.FACEBOOK_CONSUMER_KEY || '189849514869492', // your App ID 
		'clientSecret': process.env.FACEBOOK_CONSUMER_SECRET || 'fce4a5d219289346239642928a1f7c79', // your App Secret 
		'callbackURL': 'http://mcsc-authorization-dev.azurewebsites.net/auth/facebook/callback'
		//'callbackURL': 'http://localhost:8080/auth/facebook/callback'
		// 'callbackURL' : process.env.ROOT + '/auth/facebook/callback';
	},

	'twitterAuth': {
		'consumerKey': process.env.TWITTER_CONSUMER_KEY || 'q2JfZwE8BTIHHNruzRqaWubEI',
		'consumerSecret': process.env.TWITTER_CONSUMER_SECRET || 'FI4nM1BuayKsMBLZ2fA4zicaOkNUvjrhfRgiDYngVQVBtkXRyT',
		'callbackURL': 'http://mcsc-authorization-dev.azurewebsites.net/auth/twitter/callback'
		//'callbackURL': 'http://localhost:8080/auth/twitter/callback'
		// 'callbackURL' : process.env.ROOT + '/auth/twitter/callback';
	},

	'instagramAuth': {
		'clientID': process.env.INSTAGRAM_CONSUMER_KEY || 'c63be8b7e41b496597cc6db47ebd55f3',
		'clientSecret': process.env.INSTAGRAM_CONSUMER_SECRET || '7b8101ca372347c791285f8a6e0bb451',
		'callbackURL': 'http://mcsc-authorization-dev.azurewebsites.net/auth/instagram/callback'
		//'callbackURL': 'http://localhost:8080/auth/instagram/callback'
		// 'callbackURL' : process.env.ROOT + '/auth/instagram/callback';
	},

	'functions': {
		'callbackURL': 'https://mscs-cf-functions.azurewebsites.net/api/ig_subscriptions'
	}

};