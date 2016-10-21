var DocumentDBClient = require('documentdb').DocumentClient;
var docdbUtils = require('./docdbUtils');
var async = require('async');

function ProfileDao(documentDBClient, databaseId, collectionId) {
    this.client = documentDBClient;
    this.databaseId = databaseId;
    this.collectionId = collectionId;

    this.database = null;
    this.collection = null;
}

module.exports = ProfileDao;

ProfileDao.prototype = {
    init: function (callback) {
        var self = this;

        docdbUtils.getOrCreateDatabase(self.client, self.databaseId, function (err, db) {
            if (err) {
             //   callback(err);
            } else {
                self.database = db;
                docdbUtils.getOrCreateCollection(self.client, self.database._self, self.collectionId, function (err, coll) {
                    if (err) {
                      //  callback(err);

                    } else {
                        self.collection = coll;
                    }
                });
            }
        });
    },

    find: function (querySpec, callback) {
        var self = this;

        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
              //  callback(err);

            } else {
                callback(null, results);
            }
        });
    },

    addProfile: function (profile, callback) {
        var self = this;

        profile.date = Date.now();
        
        self.client.createDocument(self.collection._self, profile, function (err, doc) {
            if (err) {
            //    callback(err);

            } else {
                callback(null, doc);
            }
        });
    },

    updateItem: function (id, callback) {
        var self = this;

        self.getItem(id, function (err, doc) {
            if (err) {
            //    callback(err);

            } else {
                doc.completed = true;

                self.client.replaceDocument(doc._self, doc, function (err, replaced) {
                    if (err) {
                        callback(err);

                    } else {
                        callback(null, replaced);
                    }
                });
            }
        });
    },

    getProfile: function (id, callback) {
        var self = this;

        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id = @id',
            parameters: [{
                name: '@id',
                value: id
            }]
        };

        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
             //   callback(err);

            } else {
                callback(null, results[0]);
            }
        });
    }
};