const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');


/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
 const parse2 = data => {
  const $ = cheerio.load(data, {'xmlMode': true});

  return $('.columns-container .product-container:not([style])')
    .map((i, element) => {
      const link = $(element)
        .find('.product-name')
        .attr('href');
      const name = $(element)
        .find('.product-name')
        .attr('title'); 
      const price = parseInt(
        $(element)
          .find('.price.product-price')
          .text());
      const brand = "Adresse";
      const photo = $(element)
        .find('.product_img_link')
        .children()
        .attr('data-original');
      const _id = uuidv5(link, uuidv5.URL);
    
      return {_id, link, brand, price, name, photo};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse2(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
