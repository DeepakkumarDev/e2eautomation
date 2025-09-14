// const {test,expect} = require("@playwright/test");
// ESM version
import { test, expect } from "@playwright/test";

test("Login to ornage Hrm", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );

  await page.getByPlaceholder("Username").fill("Admin");
  await page.getByPlaceholder("Password").fill("admin123");

  await page.locator("button[type='submit']").click();

  console.log(await page.title());

  await expect(page).toHaveURL(/dashboard/);

  await page.getByAltText("profile picture").click();

  await page.getByRole("menuitem").last().click();

  await expect(page).toHaveURL(/auth\/login/);
});
