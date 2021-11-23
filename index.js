const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const puppeteer = require('puppeteer');
async function scrapPrice(urldata){
    try{

        const browser = await puppeteer.launch({
            args: [
                '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X   10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0    Safari/537.36"'	
            ]
        });
        const [page] = await browser.pages();
        const webSiteUrl = urldata.url;
        await page.goto(webSiteUrl, {waitUntil: 'load', timeout: 30000});
        const data = await page.evaluate(() => document.querySelector('*').outerHTML);
        const dom = new JSDOM(data);
        let price = '';
        let amazon_price = dom.window.document.querySelectorAll("[id='priceblock_ourprice'],[id='priceblock_dealprice']")
        let thirdpartyprice = dom.window.document.querySelectorAll("[id='soldByThirdParty']")
        if(amazon_price && amazon_price.length){
            price = amazon_price[0].innerHTML
        }
        else if(thirdpartyprice && thirdpartyprice.length){
            let span = thirdpartyprice[0].getElementsByTagName('span')[0].innerHTML;
            price = thirdpartyprice[0].getElementsByTagName('span')[0].innerHTML;
        }
        
        let walmart = dom.window.document.querySelectorAll("[itemprop='price']");
        if(walmart.length){
            price = walmart[0].innerHTML;
        }
        
        let target1 = dom.window.document.querySelectorAll("[data-test='product-price']");
        if(target1.length){
          for (i = 0; i < target1.length; i++) {
            price = target1[i].innerHTML
          }
        }
        await browser.close();
        return({
            'product-price': price,
            'message': price&&price.length? 'scraping succesfull.':'unable to find price, please try once again.' 
            
        })
    }
    catch(err){
        return({
            'error': err,
            'message': 'unexpected error'
        })
    }
}
module.exports = {
    scrapPrice
};