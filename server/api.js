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
  var queryAgg = [];
  queryAgg.push({$match : {}});
  queryAgg.push({ $sort: { price: 1 } });
  result = await db.aggregate(queryAgg);
  console.log(result.length);
  res.send({"limit":undefined,"total":result.length,"result" : result});
});


//Get product with search params:
app.get('/products/search', async(req, res) => {
  //console.log(req.params._id)
  
  var match = {};
  var queryAgg = [];
  
  const limit = parseInt(req.query.limit);
  const brand = req.query.brand;
  const price = parseInt(req.query.price);
  var sort = parseInt(req.query.sort);

  if (isNaN(sort)){ //we will sort by ascending price if there are no instruction about sorting
    sort = 1;
  }
  if (brand !== undefined){
    match["brand"] = brand;
  }
  if (isNaN(price)){
  }
  else{
  console.log("not different");
  match["price"] = {$lt:price};
  }
  if(isNaN(limit)){
    queryAgg.push({$match : match});
    queryAgg.push({ $sort: { price: sort } });
    result = await db.aggregate(queryAgg);
  }
  else{
    queryAgg.push({$match : match});
    queryAgg.push({$limit : limit});
    queryAgg.push({ $sort: { price: sort} });
    console.log("query : ", queryAgg);
    result = await db.aggregate(queryAgg);
  }
  console.log(result.length);
  res.send({"limit" : limit, "total" : result.length, "result" : result});
});

//Get product from id:
app.get('/products/:_id', async(req, res) => {
  result = await db.find({"_id" : new ObjectId(req.params._id)});
  console.log(result.length);
  res.send({"limit":undefined,"total":result.length,"result" : result});
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);