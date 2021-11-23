# scrap-the-price

This package is useful in scraping the price of a product in amazon.in,
walmart and target. this works only if you provide the url of the
product page.

Example Usage
-------------

* * * * *

const scraptheprice = require('scrap-the-price')

const priceData = await scraptheprice.scrapPrice({ url: 'product-url'})
//or
scraptheprice.scrapPrice({url: 'product-url'})
    .then(function(pricedata){
        console.log(pricedata)
    })
    .catch(function(err){
        console.log(err)
    })

// output

// { productPrice: '\$25', message: 'scraping succesfull.'}

// or

// { productPrice: "", message: 'unable to find price, please try once
again.'}

// or

// { error: "", message: 'unexpected error.'}