// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto('https://protocol.ooo/startups'); // あなたのウェブサイトのURLに置き換えてください。

//   // 'ProfileCard_container__3qpEP'クラスの要素を取得
//   const items = await page.$$('a.ProfileCard_container__3qpEP');

//   for (const item of items) {
//     // divタグのテキストを取得
//     const divText = await item.$eval('div.ProfileCard_name__3j2Pq', div => div.innerText);
//     // console.log(`p tag text: ${divText}`);

//     // aタグのhref属性を取得
//     const aHref = await item.$eval('a', a => a.getAttribute('href'));

//     // 新しいタブでaタグのリンクを開く
//     const newPage = await browser.newPage();
//     await newPage.goto(aHref);

//     // 遷移先の特定の要素を取得
//     const profileCard = await newPage.$('a.ProfileCard_container__3qpEP');
//     // 特定の要素からテキストや属性を取得するには、適切なプロパティ（innerText, getAttributeなど）を用いてください。
//     // ここではinnerTextを例に取っています。
//     const profileCardText = await newPage.evaluate(profileCard => profileCard.href, profileCard);
//     console.log(`ProfileCard text: ${profileCardText}`);

//     await newPage.close();
//   }

//   await browser.close();
// })();

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://protocol.ooo/startups'); //　遷移先のURLに置き換えが必要

  const items = await page.$$('a.ProfileCard_container__3qpEP'); // プロフィールカード要素を取得

  for (const item of items) {
    const divText = await item.$eval('div.ProfileCard_name__3j2Pq', div => div.innerText); // プロフィールカード要素の会社名を取得
    console.log(`div tag text: ${divText}`);

    const aHref = await page.evaluate(item => item.href, item); // プロフィールカード要素のリンクを取得

    const newPage = await browser.newPage();
    await newPage.goto(aHref); // プロフィールカード要素のリンクを開く

    const profileCard = await newPage.$('a.OverviewItem_link__12f8U'); // 遷移先にある会社ホームページURLの要素を取得
    const profileCardText = await newPage.evaluate(profileCard => profileCard.href, profileCard);
    console.log(`ProfileCard text: ${profileCardText}`);

    await newPage.close();
  }

  await browser.close();
})();

