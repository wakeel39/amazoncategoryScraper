const puppeteer = require('puppeteer');
let bookingUrl = 'https://www.amazon.com/baby';

 async function getBookingByCategory(bookingUrl,pageNo){
     let originalUrl = bookingUrl;
     bookingUrl = bookingUrl+"?page="+pageNo;
	 const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(bookingUrl);
    
    // get hotel details
    let hotelData = await page.evaluate(() => {
		
        let hotels = [];
        // get the hotel elements
        let hotelsElms = document.querySelectorAll('li.s-result-item');
        hotels.push({totalPages : document.querySelector('span#s-result-count').innerText.split(" ")[0].split("-")[1] });
         
		//console.log(hotelsElms);
        // get the hotel data
        hotelsElms.forEach((hotelelement) => {
			console.log(hotelelement);
            let hotelJson = {};
            try {
                hotelJson.name = hotelelement.querySelector('h2.s-access-title').innerText;
                hotelJson.src = hotelelement.querySelector('img.s-access-image').src;
                hotelJson.url = hotelelement.querySelector('a.a-link-normal').href;

                //hotelJson.rating = hotelelement.querySelector('span.review-score-badge').innerText;
                //if(hotelelement.querySelector('strong.price')){
                   // hotelJson.price = hotelelement.querySelector('strong.price').innerText;
                //}
                //getBookingDetailsByUrl(hotelJson.src);
            }
            catch (exception){
				console.log(exception);
            }
            hotels.push(hotelJson);
        });
        return hotels;
    });

    //console.dir(hotelData);
    console.dir("page No Data "+pageNo+ " =========== \n");
    console.dir(hotelData);
    if(hotelData[0].totalPages > pageNo && pageNo < 3){
        pageNo++;
        getBookingByCategory(originalUrl,pageNo);
    }
 };



 getBookingByCategory(bookingUrl,1);



 async function getBookingDetailsByUrl(bookingUrl){
    const browser = await puppeteer.launch({ headless: true });
   const page = await browser.newPage();
   await page.setViewport({ width: 1920, height: 926 });
   await page.goto(bookingUrl);
   // let itemDetail = [];
   // get hotel details
   let item =  await page.evaluate(() => {
       
       let itemDetail = {};
       // get the hotel elements
       itemDetail.title = document.querySelector('span#productTitle').innerText;
       itemDetail.price = document.querySelector('span.priceBlockBuyingPriceString').innerText;
       itemDetail.detail = document.querySelector('table#productDetailsTable').innerText;
       itemDetail.star5 = document.querySelectorAll('tr.a-histogram-row>td.a-text-right>a')[0].innerText;
       itemDetail.star4 = document.querySelectorAll('tr.a-histogram-row>td.a-text-right>a')[1].innerText;
       itemDetail.star3 = document.querySelectorAll('tr.a-histogram-row>td.a-text-right>a')[2].innerText;
       itemDetail.star2 = document.querySelectorAll('tr.a-histogram-row>td.a-text-right>a')[3].innerText;
       itemDetail.star1 = document.querySelectorAll('tr.a-histogram-row>td.a-text-right>a')[4].innerText;
       itemDetail.totalReviews = document.querySelector('h2[data-hook="total-review-count"]').innerText.split(" ")[0];
       
       console.log("item details ",itemDetail);
       // get the hotel data
       
       return itemDetail;
   });

   console.log("itemdetails==",item);
};
//getBookingDetailsByUrl("https://www.amazon.com/Amazon-com-Gift-Card-Pink-Gold/dp/B07641DGK2/ref=lp_165796011_1_1_s_it/135-4003525-2755910");
 /*
(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(bookingUrl);

    // get hotel details
    let hotelData = await page.evaluate(() => {
		
        let hotels = [];
        // get the hotel elements
        let hotelsElms = document.querySelectorAll('li.s-result-item');
		console.log(hotelsElms);
        // get the hotel data
        hotelsElms.forEach((hotelelement) => {
			console.log(hotelelement);
            let hotelJson = {};
            try {
                hotelJson.name = hotelelement.querySelector('h2.s-access-title').innerText;
                hotelJson.src = hotelelement.querySelector('img.s-access-image').src;
				hotelJson.url = hotelelement.querySelector('a.a-link-normal').href;
                //hotelJson.rating = hotelelement.querySelector('span.review-score-badge').innerText;
                //if(hotelelement.querySelector('strong.price')){
                   // hotelJson.price = hotelelement.querySelector('strong.price').innerText;
                //}
            }
            catch (exception){
				console.log(exception);
            }
            hotels.push(hotelJson);
        });
        return hotels;
    });

    console.dir(hotelData);
})(); */