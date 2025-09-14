import { test, expect } from "@playwright/test";

test.skip("Popup validations", async ({ page }) => {
  const url = "https://rahulshettyacademy.com/AutomationPractice/";
  const googleUrl = "https://google.com";
  await page.goto(url);
  await page.goto(googleUrl);
  await page.goBack();
  await page.goForward();
});

test.skip("Element Hidden", async ({ page }) => {
  const url = "https://rahulshettyacademy.com/AutomationPractice/";
  const hideLocator = "//input[@id='hide-textbox']";
  const showLocator = "//input[@id='show-textbox']";
  const showElementLocator = "//input[@style='display: block;']";
  await page.goto(url);
  await page.locator(showLocator).click();
  await expect(await page.locator(showElementLocator)).toBeVisible();
  await page.locator(hideLocator).click();
  await expect(await page.locator(showElementLocator)).not.toBeVisible();
});

test.skip("Handling java popups that is basically dialogue", async ({
  page,
}) => {
  const url = "https://rahulshettyacademy.com/AutomationPractice/";
  const alertLocator = "//input[@id='alertbtn' and @value='Alert']";
  const confirmLocator = "//input[@id='confirmbtn' and @value='Confirm']";
  const nameLocator = "//input[@id='name']";
  const mouseHoverLocator = "//button[@id='mousehover']";
  const topLocator = "a[href='#top']";
  await page.goto(url);
  await page.locator(nameLocator).type("Deepak");
  //   page.on("dialog", (dialog) => dialog.dismiss());
  page.on("dialog", (dialog) => dialog.accept());
  await page.locator(alertLocator).click();
  await page.locator(mouseHoverLocator).hover();

  await expect(await page.locator(topLocator)).toBeVisible();
  await page.pause();
});

test.skip("Handling IFrame ui", async ({ page }) => {
  const url = "https://rahulshettyacademy.com/AutomationPractice/";
  const iframeLocator = "//iframe[@id='courses-iframe']";
  const allAccessPlanLocator =
    "//a[@href='lifetime-access' and @class='new-navbar-highlighter']";
  const iframeTextLocator = "div[class='text'] h2";
  await page.goto(url);
  const framesPage = page.frameLocator(iframeLocator);
  await framesPage.locator(allAccessPlanLocator).click();
  console.log(await framesPage.locator(iframeTextLocator).textContent());
  const rawText = await framesPage.locator(iframeTextLocator).textContent();
  const digits = rawText.split(" ")[1];
  console.log(digits);

  // await page.pause();
});
