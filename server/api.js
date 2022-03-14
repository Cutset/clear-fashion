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
  result = await db.find({})
  console.log(result.length)
  res.send(result);
});

//Get product from id:
app.get('/products/:_id', async(req, res) => {
  //console.log(req.params._id)
  result = await db.find({"_id" : new ObjectId(req.params._id)})
  console.log(result.length)
  res.send(result);
});


app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
