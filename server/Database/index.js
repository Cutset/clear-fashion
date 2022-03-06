const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://cutset:root@waa.bctyg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'WAA_products';
const MONGODB_COLLECTION = 'WAA';

const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
//const db =  client.db(MONGODB_DB_NAME)

let client = null;
let database = null;

const getDB = module.exports.getDB = async () => {
    try {
      if (database) {
        return database;
      }
  
      client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
      database = client.db(MONGODB_DB_NAME);
  
      console.log('💽  Connected');

      return database;
    } catch (error) {
      console.error('🚨 Connection failed', error);
      return null;
    }
  };

module.exports.insert = async products => {
    try {
      const db = await getDB();
      const collection = db.collection(MONGODB_COLLECTION);
      const result = await collection.insertMany(products);
  
      return result;
    } catch (error) {
      console.error('🚨 collection.insertMany...', error);
      fs.writeFileSync('products.json', JSON.stringify(products));
      return {
        'insertedCount': 0
      };
    }
  };


  module.exports.close = async () => {
    try {
      await client.close();
    } catch (error) {
      console.error('🚨 MongoClient.close...', error);
    }
  };