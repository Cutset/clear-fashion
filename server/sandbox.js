/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const montlimart = require("./sources/montlimart");
const adresse = require("./sources/adresse")

// async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/news') {

//   try {
//     console.log(`🕵️‍♀️  browsing ${eshop} source`);
//     const products = await dedicatedbrand.scrape(eshop);

//     console.log(products);
//     console.log('done');
//     process.exit(0);
//   } catch (e) {
//     console.error(e);
//     process.exit(1);
//   }
// }

/**
 * Scrapes and fetches the products of the Montlimart eshop
 * @param {url for the website} eshop 
 */
// async function sandboxMontlimart (eshop = 'https://www.montlimart.com/toute-la-collection.html') {

//   try {
//     console.log(`🕵️‍♀️  browsing ${eshop} source`);
//     const products = await montlimart.scrape(eshop);

//     console.log(products);
//     console.log('done');
//     process.exit(0);
//   } catch (e) {
//     console.error(e);
//     process.exit(1);
//   }
// }

/**
 * Scrapes and fetches the products of the ADRESSE Paris eshop
 * @param {url for the eshop's website} eshop 
 */
async function sandboxAdresse (eshop = 'https://adresse.paris/630-toute-la-collection') {

  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    const products = await adresse.scrape(eshop);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}


const [,, eshop] = process.argv;

//sandbox(eshop);
//sandboxMontlimart(eshop);
sandboxAdresse(eshop)