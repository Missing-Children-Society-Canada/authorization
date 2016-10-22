var config = {}

//DocumentDB: Profile Storage
config.host = process.env.DOC_DB;
config.authKey = process.env.AUTH_KEY;
config.databaseId = "missingdata";
config.collectionId = "twitter-profile";

config.collLink = 'dbs/' + config.databaseId + '/colls/' + config.collectionId;

//Twitter configration
config.consumerKey = process.env.TWITTER_CONSUMER_KEY;
config.consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
config.callbackURL = process.env.ROOT + '/login/twitter/return';

//Telemitry
config.appInsightsKey = 'c31db7e0-5df2-44ad-9e76-892af521eecf';

module.exports = config;