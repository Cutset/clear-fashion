/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sites/dedicatedbrand');
const loom = require('./sites/loom');
const db = require('./db');
const montlimart = require("./sources/montlimart");
const adresse = require("./sources/adresse")

async function sandbox () {
  try {
    let products = [];
    let pages = [
      'https://www.dedicatedbrand.com/en/men/basics',
      'https://www.dedicatedbrand.com/en/men/sale'
    ];

    console.log(`🕵️‍♀️  browsing ${pages.length} pages with for...of`);

    // Way 1 with for of: we scrape page by page
    for (let page of pages) {
      console.log(`🕵️‍♀️  scraping ${page}`);

      let results = await dedicatedbrand.scrape(page);

      console.log(`👕 ${results.length} products found`);

      products.push(results);
    }

    pages = [
      'https://www.loom.fr/collections/hauts-homme',
      'https://www.loom.fr/collections/bas-homme'
    ];

    console.log('\n');

    console.log(`🕵️‍♀️  browsing ${pages.length} pages with Promise.all`);

    const promises = pages.map(page => loom.scrape(page));
    const results = await Promise.all(promises);

    console.log(`👕 ${results.length} results of promises found`);
    console.log(`👕 ${results.flat().length} products found`);

    console.log(results);
    console.log(results.flat());

    products.push(results.flat());
    products = products.flat();

    console.log('\n');

    console.log(`👕 ${products.length} total of products found`);

    console.log('\n');

    const result = await db.insert(products);

    console.log(`💽  ${result.insertedCount} inserted products`);

    console.log('\n');

    console.log('💽  Find Loom products only');

    const loomOnly = await db.find({'brand': 'loom'});

    console.log(`👕 ${loomOnly.length} total of products found for Loom`);
    console.log(loomOnly);
    
    db.close();
  } catch (e) {
    console.error(e);
  }
}

async function scraper(eshop_scraper,url){
    console.log(`🕵️‍♀️  scraping ${url}`);
    let results = await eshop_scraper.scrape(url);

    console.log(`👕 ${results.length} products found`);
    return results;
}

async function sandbox2 () {
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
      console.log("step", step);
      url = page + step.toString();
      console.log('url', url);
      results = await scraper(montlimart, url);

      console.log("actuels",results)
      console.log('precedents',results_before)
      if(JSON.stringify(results) === JSON.stringify(results_before)){
        console.log("MEME PRODUITS")
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

sandbox2();
//db.dropDatabase()
