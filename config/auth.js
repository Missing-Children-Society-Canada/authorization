// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth': {
		'clientID': '189849514869492', // your App ID
		'clientSecret': 'fce4a5d219289346239642928a1f7c79', // your App Secret
		'callbackURL': 'http://mcsc-authorization-dev.azurewebsites.net/auth/facebook/callback'
		//'callbackURL': 'http://localhost:8080/auth/facebook/callback'
	},

	'twitterAuth': {
		'consumerKey': 'q2JfZwE8BTIHHNruzRqaWubEI',
		'consumerSecret': 'FI4nM1BuayKsMBLZ2fA4zicaOkNUvjrhfRgiDYngVQVBtkXRyT',
		'callbackURL': 'http://mcsc-authorization-dev.azurewebsites.net/auth/twitter/callback'
		//'callbackURL': 'http://localhost:8080/auth/twitter/callback'
	},

	'instagramAuth': {
		'clientID': 'c63be8b7e41b496597cc6db47ebd55f3',
		'clientSecret': '7b8101ca372347c791285f8a6e0bb451',
		'callbackURL': 'http://mcsc-authorization-dev.azurewebsites.net/auth/instagram/callback'
		//'callbackURL': 'http://localhost:8080/auth/instagram/callback'
	}

};