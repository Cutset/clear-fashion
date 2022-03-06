/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const montlimart = require("./sources/montlimart");

async function sandbox (website = 1, eshop = 'https://www.dedicatedbrand.com/en/men/news') {

  if (website == 1){
    eshop = 'https://www.dedicatedbrand.com/en/men/news';
  }
  else if (website == 2){
    eshop = "https://www.montlimart.com/toute-la-collection.html";
  }
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    if (website == 1){
      const products = await dedicatedbrand.scrape(eshop);
    }
    else if (website == 2){
      const products = await montlimart.scrape(eshop);
    }

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(1, eshop);
