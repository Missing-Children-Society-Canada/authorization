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
    }
};