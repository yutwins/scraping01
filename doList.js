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

// スタートアップDBのトップページから会社名と会社ホームページURLを取得して、Googleスプレッドシートに送信する。以降のページは会員登録が必要
// (async () => {
//     const browser = await puppeteer.launch({
//         headless: false,  // 動作確認するためheadlessモードにしない
//     });
//     const page = await browser.newPage();
  
//     await page.goto('https://startup-db.com/companies'); //　遷移先のURLに置き換えが必要
  
//     const items = await page.$$('a.company-name'); // プロフィールカード要素を取得
  
//     for (const item of items) {
//       const aText = await item.evaluate(a => a.innerText); // 会社名を取得
//       console.log(`a tag text: ${aText}`);
  
//       const aHref = await item.evaluate(a => a.href); // リンクを取得
//       console.log(`a tag href: ${aHref}`);
  
//       const newPage = await browser.newPage();
//       await newPage.goto(aHref); // リンクを開く
  
//       const profileCard = await newPage.$('a.SdbExternalLink'); // 遷移先にある会社ホームページURLの要素を取得
//       const profileCardText = await newPage.evaluate(profileCard => profileCard.href, profileCard);
//       console.log(`ProfileCard text: ${profileCardText}`);

//     // POSTリクエストでデータを送信します
//     const res = await axios.post('https://script.google.com/macros/s/AKfycbwfJl7uv_0RfgWOomPFrpe0PMGExUUkGfmNYEhf96AF0Tv2K2VAjttiQE8ksst_vG4b-Q/exec', {
//       companyName: aText,
//       companyURL: profileCardText
//     });
//     console.log(res.data);

//     await newPage.close();
//   }

//   await browser.close();
// })();

(async () => {
  const browser = await puppeteer.launch( {
    headless: false,  // 動作確認するためheadlessモードにしない
  });
  const page = await browser.newPage();

  do {
    await page.goto('https://startup-db.com/companies');
    // await page.screenshot({ path: `./ScreenShot/test.png` });

    const items = await page.$$('a.company-name'); // プロフィールカード要素を取得
    for (const item of items) {
      const aText = await item.evaluate(a => a.innerText); // 会社名を取得
      console.log(`a tag text: ${aText}`);
      const aHref = await item.evaluate(a => a.href); // リンクを取得
      const newPage = await browser.newPage();
      await newPage.goto(aHref);
      // await newPage.screenshot({ path: `./ScreenShot/${aText}.png` })
      const profileCard = await newPage.$('a.SdbExternalLink'); // 遷移先にある会社ホームページURLの要素を取得
      const profileCardText = await newPage.evaluate(profileCard => profileCard.href, profileCard); // 遷移先にある会社ホームページURLを取得
      console.log(`ProfileCard text: ${profileCardText}`);
    }
    // After processing all companies, go to the next page
    const nextButton = await page.$('a.section-pagination-link > div.SdbIcon.section-pagination-link-arrow');
    console.log(nextButton);

    if (nextButton) {
      const nextButtonHref = await nextButton.evaluate(a => a.parentElement.href);
      await page.goto(nextButtonHref);
    } else {
      break;
    }

  }while (true);

})();

// Web幹事サイトから会社名と会社ホームページURLを取得して、Googleスプレッドシートに送信する
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Replace with your URL
//   await page.goto('https://web-kanji.com/search/hokkaido--aomori--akita--yamagata--iwate--miyagi--fukushima--tokyo--kanagawa--saitama--chiba--tochigi--ibaraki--gunma--aichi--gifu--shizuoka--mie--niigata--yamanashi--nagano--ishikawa--toyama--fukui--osaka--hyogo--kyoto--shiga--nara--wakayama--okayama--hiroshima--tottori--shimane--yamaguchi--kagawa--tokushima--ehime--kochi--fukuoka--saga--nagasaki--kumamoto--oita--miyazaki--kagoshima--okinawa');

//   do {
//     const items = await page.$$('h3.companies-item-name > a');

//     for (const item of items) {
//       const aText = await item.evaluate(a => a.innerText);
//       console.log(`a tag text: ${aText}`);

//       const aHref = await item.evaluate(a => a.href);

//       const newPage = await browser.newPage();
//       await newPage.goto(aHref);

//       const dtElements = await newPage.$$('dl.company-data.is-narrow > dt');
//       let ddText = '';  // <- 初期化しておく
//       let nextElement;  // <- 初期化しておく
//       for (let dtElement of dtElements) {
//         const dtText = await newPage.evaluate(dt => dt.textContent, dtElement);

//         if (dtText.trim() === "URL") {
//           nextElement = await newPage.evaluateHandle(dt => dt.nextElementSibling, dtElement);
//           ddText = await newPage.evaluate(dd => dd.textContent, nextElement);
//           console.log(`URL: ${ddText}`);
//         }
//       }

//       // POSTリクエストでデータを送信します
//       const res = await axios.post('https://script.google.com/macros/s/AKfycbwfJl7uv_0RfgWOomPFrpe0PMGExUUkGfmNYEhf96AF0Tv2K2VAjttiQE8ksst_vG4b-Q/exec', {
//         companyName: aText,
//         companyURL: ddText  // <- "URL"が見つからない場合は空文字が送信されます
//       });
//       console.log(res.data);

//       await newPage.close();
//     }

//     // After processing all companies, go to the next page
//     const nextButton = await page.$('li.pagination-item > a[rel="next"]');
//     if (nextButton) {
//       const nextButtonHref = await nextButton.evaluate(a => a.href);
//       await page.goto(nextButtonHref);
//     } else {
//       break;
//     }
//   } while (true);

//   await browser.close();
// })();
