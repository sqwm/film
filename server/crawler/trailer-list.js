const puppeteer = require('puppeteer');
const url = `https://movie.douban.com/tag/#/?sort=R&range=6,10&tags=`;
const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
});
(async () => {
    console.log('start visit the target page');
    const browser = await puppeteer.launch({
        args: ['--no--sandbox'],
        dumpio: false
    });
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: 'networkidle2'
    });
    console.log("循环一次结束");

    await sleep(3000);
    console.log("循环2次结束");

    await page.waitForSelector('.more');

    console.log("循环3次结束");

    for (let i = 0; i < 1; i++) {
        await sleep(3000);
        await page.click('.more');
        console.log("for循环结束");
    }
    console.log("循环4次结束");

    const result = await page.evaluate(() => {
        let $ = window.$;
        let items = $('.list-wp a');
        let links = [];

        if (items.length >= 1) {
            items.each((index, item) => {
                let it = $(item);
                let doubanId = it.find('div').data('id');
                let title = it.find('.title').text();
                let rate = Number(it.find('.rate').text());
                let poster = it.find('img').attr('src').replace('s_radio', 'l_ratio');
                links.push({
                    doubanId,
                    title,
                    rate,
                    poster
                })
            })
        }
        return links
    });
    console.log("等待结果");
    browser.close();
    process.send({result});
    process.exit(0);
})();