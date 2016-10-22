var config = {}

//DocumentDB: Profile Storage
config.host = "https://testingnodeprofile.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "5dX4ZXzSUPn1VuHP59K1IQGDEJbiUojGZuHc6HrivRSWIxs5lZrtAYnEidoZi4E7jlPTBP4kcFoiRzn4tLZAwQ====";
config.databaseId = "missingdata";
config.collectionId = "twitter-profile";

config.dbLink = 'dbs/' + config.databaseId;
config.collLink = 'dbs/' + config.databaseId + '/colls/' + config.collectionId;

//Twitter configration
config.consumerKey = 'q2JfZwE8BTIHHNruzRqaWubEI';
config.consumerSecret = 'FI4nM1BuayKsMBLZ2fA4zicaOkNUvjrhfRgiDYngVQVBtkXRyT';
config.callbackURL = 'http://mcsc-authorization-dev.azurewebsites.net/login/twitter/return';

module.exports = config;