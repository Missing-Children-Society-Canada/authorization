

var DocumentDBClient = require('documentdb').DocumentClient;

var host = "https://testingnodeprofile.documents.azure.com:443/";
                     // Add your endpoint
var masterKey = "bePUG1VcuyFNwL27cHi67CDjXaa55PF4x6PaIdZ0O9a1SybPmsUV5F1JQWf6fvaIVjOlSzkHh9kdwThcjoEwVg=="; // Add the masterkey of the endpoint
var client = new DocumentDBClient(host, { masterKey: masterKey });
var databaseDefinition = { id: "missingdata" };
var collectionDefinition = { id: "profile" };
var documentDefinition = { id: "hello world doc 6", content: "Hello World!" };


client.createDatabase(databaseDefinition, function (err, database) {
    if (err) return console.log(err);
    console.log('created db');
    client.createCollection(databaseDefinition, collectionDefinition, function (err, collection) {
        if (err) return console.log(err);
        console.log('created collection');
        client.createDocument(collection._self, documentDefinition, function (err, document) {
            if (err) return console.log(err);
            console.log('Created Document with content: ', document.content);
            cleanup(client, database);
        });
    });
});
function cleanup(client, database) {
    client.deleteDatabase(database._self, function (err) {
        if (err) console.log(err);
    })
}
