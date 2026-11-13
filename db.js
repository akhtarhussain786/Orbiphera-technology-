const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.warn('⚠️ MONGODB_URI is not set. Database connection skipped.');
  module.exports = null;
} else {
  const client = new MongoClient(uri);

  // Test the connection
  client.connect()
    .then(() => console.log("Connected:", client.db().databaseName))
    .catch(err => console.error("Connection error:", err));

  module.exports = client;
}

