var DocumentDBClient = require('documentdb').DocumentClient;
var config.host = "https://testingnodeprofile.documents.azure.com:443/";
var databasename = config.databaseId;
var collectionname =config.facebookcollection;
                     // Add your endpoint
var masterKey = config.authKey;
var client = new DocumentDBClient(host, { masterKey: masterKey });
var databaseDefinition = { id: databaseDefinition };
var collectionDefinition = { id: collectionname };

client.createDatabase(databaseDefinition, function (err, database) {
    if (err) return console.log(err);
    console.log('created db');
    client.createCollection(databaseDefinition, collectionDefinition, function (err, collection) {
        if (err) return console.log(err);
        console.log('created collection');
          });
});
function cleanup(client, database) {
    client.deleteDatabase(database._self, function (err) {
        if (err) console.log(err);
    })
}