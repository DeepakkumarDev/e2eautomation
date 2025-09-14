import { test, expect, chromium } from "@playwright/test";

test("Login to the client page", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const url = "https://rahulshettyacademy.com/client/#/auth/login";
  const emailId = "deepak.dev.mca22.du@gmail.com";
  const password = "Deepak@1029";
  const emailLocator = "//input[@id='userEmail']";
  const passwordLocator = "//input[@id='userPassword']";
  const loginInLocator = "//input[@id='login']";
  const cardBody = "//div[@class='card-body']";
  const cardBodyTitle = "//div[@class='card-body']//b"; //(//div[@class='card-body'])[1]//h5
  const addToCartLocator =
    "//div[@class='card-body']//button[i[contains(@class,'fa') and contains(@class,'fa-shopping-cart')]]";
  // "//div[@class='card-body']//button//i[contains(@class,'fa') and contains(@class,'fa-shopping-cart')]";
  const productName = "ZARA COAT 3";
  const cart = "//button[@routerlink='/dashboard/cart']";
  const cartProduct = "//h3[normalize-space()='ZARA COAT 3']";
  const checkout = "//button[contains(normalize-space(),'Checkout')]"; //text='Checkout'
  const userDetailsLabel = "//div[@class=\'details__user\']//label";
  const userDetailsInput = "(//div[@class='details__user']//input)";
  const selectCountryLocator = "//input[@placeholder='Select Country']";
  const sectionSelectionLocator = "//section//button//span";
  const selectOptionsCountryLocator =
    "//section[@class='ta-results list-group ng-star-inserted']//button//span";
  // "//section[@class='ta-results list-group ng-star-inserted']//button";
  const placeorderLocator = "//a[normalize-space()='Place Order']";

  const orderPlacedTitleLocator = "//h1[contains(@class,'hero-primary')]";
  const orderIdLocator = "label[class='ng-star-inserted']";
  const orderTabsLocator = "//button[@routerlink='/dashboard/myorders']";
  const tableOrderIdLocator = "//tbody//tr/th";
  const tableViewButton = "//tbody//tr//button[contains(text(),'View')]";
  const orderIdSummaryLocator = "//div[@class='col-text -main']";

  await page.goto(url);
  await page.locator(emailLocator).fill(emailId);
  await page.locator(passwordLocator).fill(password);
  await page.locator(loginInLocator).click();

  // console.log(await page.locator(cardBodyTitle).nth(0).textContent());

  // console.log(await page.locator(cardBodyTitle).first().textContent());

  await page.waitForLoadState("networkidle");
  // await page.waitForLoadState("domcontentloaded");
  // await page.waitForLoadState("load");

  const allTitles = await page.locator(cardBodyTitle).allTextContents();

  for (let i = 0; i < (await page.locator(cardBody).count()); i++) {
    if (
      // (await page.locator(cardBodyTitle).nth(i).textContent()) === productName
      (await page
        .locator(cardBody)
        .nth(i)
        .locator("h5")
        .nth(i)
        .textContent()) === productName
    ) {
      console.log(
        await page.locator(cardBody).nth(i).locator("h5").nth(i).textContent(),
      );

      // await page.locator(addToCartLocator).nth(i).click();
      await page.locator(cardBody).nth(i).locator("button").nth(1).click();

      console.log(
        await page
          .locator(cardBody)
          .nth(i)
          .locator("button")
          .nth(1)
          .textContent(),
      );

      break;
    }
  }
  await page.locator(cart).click();
  // await page.locator("div ul li").first().waitFor();
  expect(await page.locator(cartProduct).textContent()).toContain(productName);
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  await expect(bool).toBeTruthy();
  await page.locator(checkout).click();

  const rawText = await page.locator(userDetailsLabel).textContent();
  const userEmail = rawText ? rawText.trim() : "";
  console.log(userEmail);

  await expect(userEmail).toContain(emailId);

  await page.locator(selectCountryLocator).type("ind", { delay: 100 });

  // console.log(
  //   await page.locator(sectionSelectionLocator).first().textContent(),
  // );

  // await page.waitForLoadState("networkidle");
  // await page.waitForLoadState("domcontentloaded");
  // await page.waitForLoadState("load");
  // await page.locator(sectionSelectionLocator).waitFor({ state: "visible" });//it will not wok if you do not acces first element
  // await page
  //   .locator(sectionSelectionLocator)
  //   .first()
  //   .waitFor({ state: "visible" });
  // await expect(page.locator(sectionSelectionLocator)).toHaveCount(3);
  // await expect(page.locator(sectionSelectionLocator).first()).toBeVisible();
  // console.log(await page.locator(sectionSelectionLocator).allTextContents());

  const dropdown = page.locator(selectOptionsCountryLocator);
  // await dropdown.first().waitFor();
  await dropdown.first().waitFor({ state: "visible" });

  const optionsCount = await dropdown.count();
  console.log(optionsCount);

  for (let i = 0; i < optionsCount; i++) {
    console.log(await dropdown.nth(i).textContent());
    const optionsRawText = await dropdown.nth(i).textContent();
    const country = optionsRawText ? optionsRawText.trim() : " ";
    if (country === "India") {
      await dropdown.nth(i).click();
      break;
    }
  }

  await page.locator(placeorderLocator).click();

  console.log(await page.locator(orderPlacedTitleLocator).textContent());

  // await expect(page.locator(placeorderLocator).textContent()).toHaveText(
  //   "Thankyou for the order.",
  // );

  const rawOrderId = await page.locator(orderIdLocator).textContent();
  const orderId = rawOrderId.trim().replace(/\|/g, "").trim();
  console.log(orderId);

  await page.locator(orderTabsLocator).click();
  console.log(await page.locator(tableOrderIdLocator).count());

  const totalRow = await page.locator(tableOrderIdLocator).count();

  for (let i = 0; i < totalRow; i++) {
    console.log(await page.locator(tableOrderIdLocator).nth(i).textContent());
    let tableOrderId = await page
      .locator(tableOrderIdLocator)
      .nth(i)
      .textContent();

    if (tableOrderId === orderId) {
      console.log(
        `Order id matched tableOrderId is :${tableOrderId} and the actual Order Id is ${orderId}`,
      );
      await page.locator(tableViewButton).nth(i).click();
      console.log(await page.locator(orderIdSummaryLocator).textContent());
      await expect(orderId.includes(tableOrderId)).toBeTruthy();
      await expect(
        orderId.includes(
          await page.locator(orderIdSummaryLocator).textContent(),
        ),
      ).toBeTruthy();
      break;
    }
  }

  await await page.pause();

  console.log(allTitles);
});
