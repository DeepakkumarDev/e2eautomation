// const {test,expect} = require("@playwright/test");

// ESM version
import { test, expect } from "@playwright/test";

test.skip("Login to page", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await page.locator("#username").fill("rahulshettyacademy");

  // await page.locator("#password").fill("learning");
  await page.locator("[type='password']").fill("learning1");

  await page.locator("#signInBtn").click();

  await page.locator("[style*='block']");

  // await expect(page).toHaveURL(/angularpractice/);

  console.log(await page.locator("[style*='block']").textContent());

  await expect(page.locator("[style*='block']")).toContainText(
    "Incorrect username/password",
  );
});

test.describe.skip("Login to the U for valid and invalid credentials", () => {
  test("Login via valid user credentials", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");
    const userPassword = page.locator("#password");
    const signInBtn = page.locator("#signInBtn");

    await userName.fill("rahulshettyacademy");
    await userPassword.fill("learning");
    await signInBtn.click();

    await expect(page).toHaveURL(/angularpractice/);
  });

  test("Login using invalid user credentials", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");
    const userPassword = page.locator("#password");
    const signInBtn = page.locator("#signInBtn");
    const invalidMessage = page.locator("[style*='block']");

    await userName.fill("rahulshettyacademy");
    await userPassword.fill("learning1");
    await signInBtn.click();

    await expect(invalidMessage).toContainText("Incorrect username/password");
  });
});

let page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test.afterEach(async () => {
  await page.close();
});

test.describe("Login Tests", () => {
  test("Valid login", async () => {
    const cardTitles = page.locator(".card-body a");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("learning");
    // await page.locator("#signInBtn").click();

    await Promise.all([
      page.waitForNavigation(),
      page.locator("#signInBtn").click(),
    ]);

    console.log(await page.url());
    await expect(page).toHaveURL(/angularpractice/);

    // console.log(await page.locator(".card-body .card-title a").first().textContent());
    // console.log(await page.locator(".card-body a").first().textContent());
    // console.log(await page.locator(".card-body a").nth(0).textContent());

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
  });

  test("Invalid login", async () => {
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("wrongPassword");
    await page.locator("#signInBtn").click();

    console.log(await page.locator("[style*='block']").textContent());

    await await expect(page.locator("[style*='block']")).toContainText(
      "Incorrect username/password",
    );
  });
});
