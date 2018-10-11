
const cheerio = require("cheerio");
const request = require("request");


console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from argaam's webdev board:" +
            "\n***********************************\n");

// Make a request call to grab the HTML body from the site of your choice
request("https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&pageno=02&marketId=0", function(error, response, html) {
//request("https://www.argaam.com/en/disclosures/dividends/previous-year", function(error, response, html) {

  // Load the HTML into cheerio and save it to a constiable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  const $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  const results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $("#divSearch tr").each(function(i, element) {
    const td = $(element).find("td")
      //if (td.length ===0) return
    //var auth = $(element).children().text(author-name);
    const name =td.eq(0).text()
    //var div = $(element).children().text();
    const price= td.eq(3).text()
    const divYield= td.eq(4).text()
    const distDate= td.eq(6).text()
    const decDate= td.eq(7).text()
    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      name, 
      price,
      divYield,
      distDate,
      decDate
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});
