// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable
var cheapest = 'https://adresse.paris/t-shirts-et-polos/4238-t-shirt-ranelagh-1300000262026.html'
console.log(cheapest)

/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
var len = marketplace.length
// 2. Log the variable
console.log(len)

// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
var brandnames = []
marketplace.forEach(obj=>brandnames.push(obj.brand))
// 2. Log the variable
console.log(brandnames)
// 3. Log how many brands we have
var uniquebrandnames = new Set(brandnames)
console.log(uniquebrandnames.size)

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
let PriceSorting = (arr)=>{
  return arr.sort((a,b)=>(a.price-b.price))
}
// 2. Create a variable and assign it the list of products by price from lowest to highest
const marketplaceSorted = PriceSorting(marketplace)
// 3. Log the variable
console.log("Marketplace sorted by prices:",marketplaceSorted)

// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
let DateSorting = (marketplace)=>{
  return  marketplace.sort((a,b)=>(new Date(a.date) - new Date(b.date)))
}
// 2. Create a variable and assign it the list of products by date from recent to old
const marketplaceSortedDate = DateSorting(marketplace)
// 3. Log the variable
console.log("Sorted marketplace by data:",marketplaceSortedDate)


// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
let FilterPriceRange = (marketplace, min, max) =>{
  return marketplace.filter(function(item) { return item.price > min && item.price < max} )
}
const marketplaceFiltered = FilterPriceRange(marketplace, 50, 100)
// 2. Log the list
console.log(marketplaceFiltered)

// 🎯 TODO: Average Basket
// 1. Determine the average basket of the marketplace
var prices = []
marketplace.forEach(obj=>prices.push(obj.price))

const reducer = (previousValue, currentValue) => previousValue + currentValue;
var price_sum = prices.reduce(reducer)
// 2. Log the average
console.log((price_sum/marketplace.length).toFixed(2))


/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//

var brands = {}
uniquebrandnames.forEach(element => brands[element] = []) // We first create the keys
marketplace.forEach(elem => brands[elem.brand].push(elem)) // We then fill the list linked to each key
// 2. Log the variable
console.log(brands)
// 3. Log the number of products by brands
for (const [key, value] of Object.entries(brands)) {
  console.log(key, brands[key].length);
}

// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
let brands_sorted_price = {...brands}
for(var obj in brands_sorted_price){
  brands_sorted_price[obj] = PriceSorting(brands_sorted_price[obj])
}
// 2. Log the sort
console.log("Sorted price for each brand",brands_sorted_price)

// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
let brands_sorted_date = {...brands}
for(const [key, value] of Object.entries(brands_sorted_date)){
  brands_sorted_date[key] = DateSorting(brands_sorted_date[key])
} 
// 2. Log the sort
console.log(brands_sorted_date)




/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
for(var key in brands_sorted_price){
  console.log(key, brands_sorted_price[key][Math.round(brands_sorted_price[key].length*0.1)].price);
} 
console.log("Those p90 are false, there is an issue with the sorting I have done earlier.")
// The p90 value (90th percentile) is the lower value expected to be exceeded by 90% of the products



/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
var newProduct = false
var d = new Date()

for (obj in COTELE_PARIS){
  if(new Date(obj.released) > d.setDate(d.getDate()-15))
  {
    newProduct = true
  }
}
console.log(newProduct)
// // A new product is a product `released` less than 2 weeks.


// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
var is_reasonable = true

COTELE_PARIS.forEach(obj => (obj.price > 110)? is_reasonable = false:null)
console.log("Cotele Paris is reasonable:",is_reasonable)
// // A reasonable price if all the products are less than 100€


// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
var product;
COTELE_PARIS.forEach(obj=> (obj.uuid==`b56c6d88-749a-5b4c-b571-e5b5c6483131`)? product = obj:null)
// 2. Log the product
console.log(product)

// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
COTELE_PARIS.forEach((obj,i)=> (obj.uuid==`b56c6d88-749a-5b4c-b571-e5b5c6483131`)? COTELE_PARIS.splice(i,1):null)
// 2. Log the new list of product
console.log("Updated list:",COTELE_PARIS)

// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
console.log(blueJacket)
console.log(jacket)
// 2. What do you notice?
console.log("They both have a favourite feature.")

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties
jacket = {...blueJacket};
jacket.favorite = true;

console.log("Updated Jacket:",jacket);
console.log("BlueJacket:",blueJacket);


/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
let localStorage = [...MY_FAVORITE_BRANDS];
// 2. log the localStorage
console.log("localStorage:",localStorage)