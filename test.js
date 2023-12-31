// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto('https://protocol.ooo/startups'); //　遷移先のURLに置き換えが必要

//   const items = await page.$$('a.ProfileCard_container__3qpEP'); // プロフィールカード要素を取得

//   for (const item of items) {
//     const divText = await item.$eval('div.ProfileCard_name__3j2Pq', div => div.innerText); // プロフィールカード要素の会社名を取得
//     console.log(`div tag text: ${divText}`);

//     const aHref = await page.evaluate(item => item.href, item); // プロフィールカード要素のリンクを取得

//     const newPage = await browser.newPage();
//     await newPage.goto(aHref); // プロフィールカード要素のリンクを開く

//     const profileCard = await newPage.$('a.OverviewItem_link__12f8U'); // 遷移先にある会社ホームページURLの要素を取得
//     const profileCardText = await newPage.evaluate(profileCard => profileCard.href, profileCard);
//     console.log(`ProfileCard text: ${profileCardText}`);

//     await newPage.close();
//   }

//   await browser.close();
// })();

// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,  // 動作確認するためheadlessモードにしない
//   });
//   const page = await browser.newPage();
// //   await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537');
//   await page.goto('https://startup-db.com/companies');
//   await page.screenshot({path: 'ScreenShot/example.png'});

//   await browser.close();
// })();




const puppeteer = require('puppeteer');
const axios = require('axios'); // axiosライブラリを追加

// Protocolのページから会社名と会社ホームページURLを取得して、Googleスプレッドシートに送信する
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto('https://protocol.ooo/startups'); //　遷移先のURLに置き換えが必要

//   const items = await page.$$('a.ProfileCard_container__3qpEP'); // 要素を取得

//   for (const item of items) {
//     const divText = await item.$eval('div.ProfileCard_name__3j2Pq', div => div.innerText); // プロフィールカード要素の会社名を取得
//     console.log(`div tag text: ${divText}`);

//     const aHref = await page.evaluate(item => item.href, item); // プロフィールカード要素のリンクを取得

//     const newPage = await browser.newPage();
//     await newPage.goto(aHref); // プロフィールカード要素のリンクを開く

//     const profileCard = await newPage.$('a.OverviewItem_link__12f8U'); // 遷移先にある会社ホームページURLの要素を取得
//     const profileCardText = await newPage.evaluate(profileCard => profileCard.href, profileCard);
//     console.log(`ProfileCard text: ${profileCardText}`);

//     // POSTリクエストでデータを送信します
//     const res = await axios.post('https://script.google.com/macros/s/AKfycbwfJl7uv_0RfgWOomPFrpe0PMGExUUkGfmNYEhf96AF0Tv2K2VAjttiQE8ksst_vG4b-Q/exec', {
//       companyName: divText,
//       companyURL: profileCardText
//     });
//     console.log(res.data);

//     await newPage.close();
//   }

//   await browser.close();
// })();

// スタートアップDBのページから会社名と会社ホームページURLを取得して、Googleスプレッドシートに送信する
(async () => {
    const browser = await puppeteer.launch({
        headless: false,  // 動作確認するためheadlessモードにしない
    });
    const page = await browser.newPage();
  
    await page.goto('https://startup-db.com/companies'); //　遷移先のURLに置き換えが必要
  
    const items = await page.$$('a.company-name'); // プロフィールカード要素を取得
  
    for (const item of items) {
      const aText = await item.evaluate(a => a.innerText); // 会社名を取得
      console.log(`a tag text: ${aText}`);
  
      const aHref = await item.evaluate(a => a.href); // リンクを取得
      console.log(`a tag href: ${aHref}`);
  
      const newPage = await browser.newPage();
      await newPage.goto(aHref); // リンクを開く
  
      const profileCard = await newPage.$('a.SdbExternalLink'); // 遷移先にある会社ホームページURLの要素を取得
      const profileCardText = await newPage.evaluate(profileCard => profileCard.href, profileCard);
      console.log(`ProfileCard text: ${profileCardText}`);

    // POSTリクエストでデータを送信します
    const res = await axios.post('https://script.google.com/macros/s/AKfycbwfJl7uv_0RfgWOomPFrpe0PMGExUUkGfmNYEhf96AF0Tv2K2VAjttiQE8ksst_vG4b-Q/exec', {
      companyName: aText,
      companyURL: profileCardText
    });
    console.log(res.data);

    await newPage.close();
  }

  await browser.close();
})();
