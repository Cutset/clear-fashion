const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');

const parse = data => {
    const $ = cheerio.load(data);
  
    return $('.category-products .item .product-info')
      .map((i, element) => {
        const name = $(element)
          .find('.product-name')
          .text()
          .trim();
        console.log("name",name)
        const price = parseInt(
          $(element)
            .find('.price')
            .text());
        console.log("price",price)
        const brand = "Montlimart";
        const link = $(element)
          .find('.product-name')
          .children()
          .attr('href');
        console.log("link",link)
        const photo = $(element)
          .find('.product-image')
          .children()
          .children()
          .attr('src');
        console.log("photo",photo)
        const _id = uuidv5(link, uuidv5.URL);
        console.log("id",_id)
  
        return {_id, link, brand, price, name, photo};
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