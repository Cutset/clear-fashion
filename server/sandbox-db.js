/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sites/dedicatedbrand');
const loom = require('./sites/loom');
const db = require('./db');
const montlimart = require("./sources/montlimart");
const adresse = require("./sources/adresse")

async function sandbox() {
  try {
    let products = [];

    //Scraping Adresse
    let page = 'https://adresse.paris/630-toute-la-collection';
    results = await scraper(adresse,page);
    products.push(results);
    
    //Scraping Loom
    page = 'https://www.loom.fr/collections/tous-les-vetements';
    results = await scraper(loom,page);
    products.push(results);

    //Scraping Dedicated
    pages = ['https://www.dedicatedbrand.com/en/men/all-men','https://www.dedicatedbrand.com/en/women/all-women'];
    for (let page of pages){
      results = await scraper(dedicatedbrand,page);
      products.push(results);
    }
    
    //Scraping Montlimart
    page = ['https://www.montlimart.com/toute-la-collection.html?p='];
    var results_before = [];
    
    for (let step = 1;; step++){

      url = page + step.toString();
      results = await scraper(montlimart, url);

      if(JSON.stringify(results) === JSON.stringify(results_before)){
        break;
      }
      else{
        products.push(results);
        results_before = results;
      }
    }

    products = products.flat();
    console.log(`\n👕 ${products.length} total of products found\n`);
    
    const result = await db.insert(products);

    console.log(`💽  ${result.insertedCount} inserted products`);
    db.close();

  } catch (e) {
    console.error(e);
  }
}

sandbox();
//db.dropDatabase()