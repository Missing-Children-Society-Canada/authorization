var config = {}

//DocumentDB: Profile Storage
config.host = process.env.DOC_DB || 'https://XXXXXXXXXXXXXXXXXXXXXXXX.documents.azure.com:443/';
config.authKey = process.env.AUTH_KEY || 'XXXXXXXXXXXXXXXXXXXXXXXX==';
config.databaseId = "missingdata";
config.FacebookCollectionId = "facebook-profile";
config.TwitterCollectionId = "twitter-profile";

//Twitter configration
config.consumerKey = process.env.TWITTER_CONSUMER_KEY || 'XXXXXXXXXXXXXXXXXXXXXXXX';
config.consumerSecret = process.env.TWITTER_CONSUMER_SECRET || 'XXXXXXXXXXXXXXXXXXXXXXXX';
config.callbackURL = process.env.ROOT + '/login/twitter/return';

//Telemitry
config.appInsightsKey = process.env.APP_INSIGHTS_KEY || 'XXXXXXXXXXXXXXXXXXXXXXXX';

module.exports = config;