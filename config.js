var config = {}

config.host = process.env.HOST || "https://testingnodeprofile.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "bePUG1VcuyFNwL27cHi67CDjXaa55PF4x6PaIdZ0O9a1SybPmsUV5F1JQWf6fvaIVjOlSzkHh9kdwThcjoEwVg==";
config.databaseId = "missingdata";
config.collectionId = "profile";
config.consumerKey = 'q2JfZwE8BTIHHNruzRqaWubEI';
config.consumerSecret = 'FI4nM1BuayKsMBLZ2fA4zicaOkNUvjrhfRgiDYngVQVBtkXRyT';
config.callbackURL = 'http://localhost:8080/login/twitter/return';

module.exports = config;