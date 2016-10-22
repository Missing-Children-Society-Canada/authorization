var config = {}

//DocumentDB: Profile Storage
config.databaseId = "missingdata";
config.FacebookCollectionId = "facebook-profile";
config.TwitterCollectionId = "twitter-profile";

//Twitter configration
config.callbackURL = process.env.ROOT + '/login/twitter/return';

//Telemitry
config.appInsightsKey = process.env.APP_INSIGHTS_KEY || 'XXXXXXXXXXXXXXXXXXXXXXXX';

module.exports = config;