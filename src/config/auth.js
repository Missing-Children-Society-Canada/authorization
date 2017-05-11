// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth': {
		'clientID': 'XXXXXXXXXXXXXXXXXXXXXXXXX', // your App ID
		'clientSecret': 'XXXXXXXXXXXXXXXXXXXXXXXXX', // your App Secret
		'callbackURL': 'XXXXXXXXXXXXXXXXXXXXXXXXX'
	},

	'twitterAuth': {
		'consumerKey': 'XXXXXXXXXXXXXXXXXXXXXXXXX',
		'consumerSecret': 'XXXXXXXXXXXXXXXXXXXXXXXXX',
		'callbackURL': 'XXXXXXXXXXXXXXXXXXXXXXXXX'
	},

	'instagramAuth': {
		'clientID': 'XXXXXXXXXXXXXXXXXXXXXXXXX',
		'clientSecret': 'XXXXXXXXXXXXXXXXXXXXXXXXX',
		'callbackURL': 'XXXXXXXXXXXXXXXXXXXXXXXXX'
	}
};