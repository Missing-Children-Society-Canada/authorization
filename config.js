var config = {}

config.host = process.env.HOST || "https://testingnodeprofile.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "oNsxipbyEVZ4si8kOGuFjEEHaNUNdleAEiF4YeJFTWXU9uVEnpoSdWqqnUY68xaF1PAjK9vC8i5Wv8b8lOlguQ==";
config.databaseId = "missingdata";
config.collectionId = "profile";

module.exports = config;