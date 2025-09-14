import { test, expect, chromium } from "@playwright/test";

test("First Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://google.com");

  console.log(await page.title());

  await expect(page).toHaveTitle("Google");
});
