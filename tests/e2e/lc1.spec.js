import { test, expect } from "@playwright/test";
import { exec } from "child_process";

test.skip("Google website visiting lc1", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://google.com");
  console.log(await page.url());
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test.skip("UI Control lc1", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const url = "https://rahulshettyacademy.com/loginpagePractise/";
  const userName = "#username";
  const signIn = "#signInBtn";
  const password = "#password";
  ////input[@type='password'],[type='password']
  const invalidMsgText = "Incorrect username/password.";
  const cardBody = "//div[@class='card-body']//a[normalize-space()='iphone X']";
  const cardBodyLink = "//div[@class='card-body']//a";

  await page.goto(url);
  console.log(await page.url());
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  const invalidMsg = "//*[contains(@style, 'display: block;')]"; //.card-body a

  await page.locator(userName).fill("rahulshettyacademy");
  await page.locator(password).fill("learning");

  await Promise.all([page.locator(signIn).click(), page.waitForNavigation()]);

  //   console.log(await page.locator(invalidMsg).textContent());

  //   await expect(page.locator(invalidMsg)).toContainText(invalidMsgText);
  //   await expect(page.locator(invalidMsg)).toContainText(/Incorrect/);

  //   await expect(page).toHaveTitle("ProtoCommerce");

  //   console.log(await page.locator(cardBody).textContent());
  //   console.log(await page.locator(cardBodyLink).nth(0).textContent());
  //   console.log(await page.locator(cardBodyLink).first().textContent());

  const allTitles = await page.locator(cardBodyLink).allTextContents();
  console.log(allTitles);
});

test.skip("Browser context-validating Error login", async ({ page }) => {
  const url = "https://rahulshettyacademy.com/client/#/auth/login";
  const userNameLocator = "//input[@id='userEmail']";
  const passwordLocator = "//input[@id='userPassword']";
  const signInLocator = "//input[@id='login' and @value='Login']";
  const userName = "deepak.dev.mca22.du@gmail.com";
  const password = "Deepak@1029";
  const cardBody = "//div[@class='card-body']//b";

  await page.goto(url);
  await page.locator(userNameLocator).fill(userName);
  await page.locator(passwordLocator).fill(password);

  await page.locator(signInLocator).click();

  //   console.log(await page.locator(cardBody).nth(0).textContent());
  //   console.log(await page.locator(cardBody).first().textContent());

  await page.waitForLoadState("networkidle");

  const allTitles = await page.locator(cardBody).allTextContents();
  console.log(allTitles);
});

test.skip("Full ui control lc1", async ({ page }) => {
  const userName = "rahulshettyacademy";
  const password = "learning";
  const url = "https://rahulshettyacademy.com/loginpagePractise/";
  const userNameLocator = "//input[@id='username']";
  const passwordLocator = "//input[@id='password']";
  const signInLocator = "//input[@id='signInBtn']";
  const dropdown = "//select[@class='form-control']"; //select.form-control

  const optionValue = "consult";
  const userTypeLocator = "//input[@value='user' and @id='usertype']";
  const userTypeClass = ".radiotextsty";
  const okayButtonLocator =
    "//button[@id='okayBtn' and contains(@class,'btn') and contains(@class,'btn-success')]";
  // button#okayBtn.btn.btn-success
  const termsCheckbox = "//input[@id='terms' and @type='checkbox']";

  //   const otherPageLocator = "//a[@class='blinkingText' and @target='_blank']";
  //   //a[contains(@class,'blinkingText') and @target='_blank']
  const otherPageLocator = "a.blinkingText[target='_blank']";
  const otherPageLocatorHref = "//a[contains(@href, 'documents-request')]";
  const otherPageLocatorClass = "[href*='documents-request']";

  await page.goto(url);

  await page.locator(userNameLocator).fill(userName);

  await page.locator(passwordLocator).fill(password);

  // await page.locator(userTypeLocator).click();

  await page.locator(userTypeClass).last().click();

  await page.locator(okayButtonLocator).click();

  console.log(await page.locator(userTypeLocator).isChecked());

  await expect(page.locator(userTypeLocator)).toBeChecked();

  await page.locator(dropdown).selectOption(optionValue);

  await page.locator(termsCheckbox).click();

  await page.locator(termsCheckbox).uncheck();
  expect(await page.locator(termsCheckbox).isChecked()).toBeFalsy();

  await page.locator(termsCheckbox).check();

  expect(await page.locator(termsCheckbox).isChecked()).toBeTruthy();

  await expect(page.locator(otherPageLocatorHref)).toHaveAttribute(
    "class",
    "blinkingText",
  );
  console.log(await page.locator(otherPageLocatorHref).getAttribute("class"));

  await expect(await page.locator(otherPageLocatorClass)).toHaveAttribute(
    "class",
    /blinkingText/,
  );

  await page.locator(otherPageLocator).first().click();

  await page.locator(signInLocator).click();

  await page.pause();
});

test.only("Handling Child windows ", async ({ browser }) => {
  const url = "https://rahulshettyacademy.com/loginpagePractise/";
  const documentLinkLocator = "//a[contains(@href, 'documents-request')]";
  const paragraphLocator = "//p[@class='im-para red']";
  const userNameLocator = "//input[@id='username']";
  const passwordLocator = "//input[@id='password']";
  const signInLocator = "//input[@id='signInBtn']";
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);
  //   await page.locator(documentLinkLocator).click();
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.locator(documentLinkLocator).click(),
  ]);

  console.log(await newPage.locator(paragraphLocator).textContent());
  const paragraph = await newPage.locator(paragraphLocator).textContent();
  const email = paragraph.split("@")[1].split(" ")[0];
  console.log(email);
  const userName = email.split(".")[0];
  console.log(userName);

  await page.locator(userNameLocator).fill(userName);
  await page.locator(passwordLocator).fill("learning");
  await page.locator(signInLocator).click();

  await page.pause();
});
