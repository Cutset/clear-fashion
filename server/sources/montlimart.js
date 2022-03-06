const fetch = require('node-fetch');
const cheerio = require('cheerio');

const parse = data => {
    const $ = cheerio.load(data);
  
    return $('.category-products .item .product-info')
      .map((i, element) => {
        const name = $(element)
          .find('.product-name')
          .text()
          .trim();
          //.replace(/\s/g, ' ');
        const price = parseInt(
          $(element)
            .find('.price')
            .text()
        );
  
        return {name, price};
      })
      .get();
  };

  module.exports.scrape = async url => {
    try {
      const response = await fetch(url);
  
      if (response.ok) {
        const body = await response.text();
  
        return parse(body);
      }
  
      console.error(response);
  
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };