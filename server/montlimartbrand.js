const fetch = require('node-fetch');
const cheerio = require('cheerio');


const scrape = async url => {
    const response = await fetch(url);
  
    const body = await response.text;
    
    const $ = cheerio.load(body);

    console.log($("a.title")
                .first()
                .text()

                )


    // console.log($("h2.product-name")
    //         .find("a.title")
    //         .first()
    //         .text());

            
}

scrape('https://www.montlimart.com/toute-la-collection.html');


// const parse_montlimart = data => {
//     const $ = cheerio.load(data);

//     parsed_data = $()

//     return $('.productList-container .productList')
//     .map((i, element) => {
//       const name = $(element)
//         .find('.productList-title')
//         .text()
//         .trim()
//         .replace(/\s/g, ' ');
//       const price = parseInt(
//         $(element)
//           .find('.productList-price')
//           .text()
//       );

//       return {name, price};
//     })
//     .get();
// };