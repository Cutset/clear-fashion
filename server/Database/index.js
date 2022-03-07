const { query } = require('express');
const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://cutset:root@waa.bctyg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'WAA_products';
const MONGODB_COLLECTION = 'WAA';

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
        client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
        await client.close();
    } catch (error) {
      console.error('🚨 MongoClient.close...', error);
    }
  };

  query_mongo = async str_query =>{

    try{
        client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
        database = client.db(MONGODB_DB_NAME);

        database.collection("WAA").find(str_query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            return result
            
        });
    }catch (error) {
      console.error('🚨 Query error: ', error);
    }
}

// Find all products related to a given brands
//console.log(query_mongo({ brand : "Dedicated"}));

// Find all products less than a price
// console.log(query_mongo({ price: { $lt: 45 } }));

// Find all products sorted by price
console.log(query_mongo({ $query: {}, $orderby: { price : -1 } }));

// Find all products sorted by date


// Find all products scraped less than 2 weeks


