var config = {}


config.host = process.env.HOST || "https://testingnodeprofile.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "oNsxipbyEVZ4si8kOGuFjEEHaNUNdleAEiF4YeJFTWXU9uVEnpoSdWqqnUY68xaF1PAjK9vC8i5Wv8b8lOlguQ==";
config.databaseId = "missingdata";
config.collectionId = "twitter-profile";


config.dbLink = 'dbs/' + config.databaseId;

config.collLink = config.dbLink + '/colls/' + config.collectionId;
//Twitter configration
config.consumerKey = 'q2JfZwE8BTIHHNruzRqaWubEI';
config.consumerSecret = 'FI4nM1BuayKsMBLZ2fA4zicaOkNUvjrhfRgiDYngVQVBtkXRyT';
config.callbackURL = 'http://localhost:8080/login/twitter/return';

module.exports = config;