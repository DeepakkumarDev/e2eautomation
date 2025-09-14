// index.js (ESM, because "type": "module")
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const { test } = require("@playwright/test");
// console.log(test);

import { test, expect } from "@playwright/test";

test("End to automation", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const signIn = page.locator("#login");
  const cardTitles = page.locator(".card-body b");
  const addToCart = page.locator(
    "//button[normalize-space(text())='Add To Cart']",
  );

  const cart = page.locator("[routerlink*='cart']");

  const productAddedToCart = page.locator("div ul li h3");

  const checkout = page.locator("//button[normalize-space(text())='Checkout']");

  const productName = "ZARA COAT 3";

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  await userName.fill("deepak.dev.mca22.du@gmail.com");
  await password.fill("Deepak@1029");
  await signIn.click();

  console.log(await page.title());

  await page.waitForURL("**/dashboard/**"); // ✅ waits for dashboard in URL

  expect(await page.url()).toMatch(/dashboard/);
  expect(await page.url()).toContain("dashboard");

  console.log(await cardTitles.first().textContent());

  const firstProduct = await cardTitles.first().textContent();

  console.log(await cardTitles.allTextContents());

  for (let num = 0; num < (await cardTitles.count()); num++) {
    if ((await cardTitles.nth(num).textContent()) == productName) {
      await addToCart.nth(num).click();
      break;
    }
  }

  // for(let title of await cardTitles.allTextContents()){
  //     console.log(await title);
  // }

  // for(let num=0; num < await cardTitles.count();num++){
  //     console.log(await cardTitles.nth(num).textContent());
  // }

  // for(let i=0; i < await addToCart.count();i++){

  //     await addToCart.nth(i).click();

  // }

  await cart.click();

  console.log(await productAddedToCart.first().textContent());

  expect(await productAddedToCart.first().textContent()).toContain(productName);

  await checkout.click();
});
