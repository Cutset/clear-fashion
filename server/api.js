const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db = require('./db');
const { ObjectId } = require('mongodb');

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

//Get all products: 
app.get('/products', async(req, res) => {
  result = await db.find({});
  console.log(result.length);
  res.send(result);
});


//Get product with search params:
app.get('/products/search', async(req, res) => {
  //console.log(req.params._id)
  
  var queryMG = {}
  const limit = parseInt(req.query.limit);
  const brand = req.query.brand;
  const price = parseInt(req.query.price);

  if (brand !== undefined){
    queryMG["brand"] = brand;
  }
  if (price !== undefined){
    queryMG["price"] = {$lt:price};
  }
  if(limit !== undefined){
    result = await db.find(queryMG).limit(limit);
  }
  else{
    result = await db.find(queryMG);
  }
  console.log(result.length);
  res.send(result);
});

//Get product from id:
app.get('/products/:_id', async(req, res) => {
  //console.log(req.params._id)
  result = await db.find({"_id" : new ObjectId(req.params._id)});
  console.log(result.length);
  res.send(result);
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
