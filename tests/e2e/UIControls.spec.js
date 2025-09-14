// const { context } = require("@cucumber/cucumber");
// const { test, expect } = require("@playwright/test");
import { context } from "@cucumber/cucumber";
import { test, expect } from "@playwright/test";

test("UI controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const userName = page.locator("#username");
  const userPassword = page.locator("#password");
  const adminRadio = page.locator("input[type='radio'][value='admin']");
  const userRadio = page.locator("input[type='radio'][value='user']");

  const blinkingText = page.locator(".blinkingText[target*='_blank']");

  // const userRadio = page.locator("label:has-text('User')");
  const dropdown = page.locator("select.form-control");
  const okayBtn = page.locator("#okayBtn");
  const terms = page.locator("#terms");
  const signIn = page.locator("#signInBtn");

  const documentLink = page.locator("[href*='documents-request']");

  await userName.fill("rahulshettyacademy");
  await userPassword.fill("learning");

  //   await userRadio.click();

  await page.locator(".radiotextsty").last().click();
  await okayBtn.click();

  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  console.log(await page.locator(".radiotextsty").last().isChecked());

  //   await expect(okayBtn).toBeHidden();

  await page.waitForTimeout(1000);
  await okayBtn.waitFor({ state: "hidden" });

  await dropdown.selectOption("consult");

  await terms.check({ force: true });
  await terms.uncheck();

  await expect(await terms.isChecked()).toBeFalsy();
  await expect(terms).not.toBeChecked();

  console.log(await blinkingText.textContent());

  await expect(blinkingText).toContainText(
    "Free Access to InterviewQues/ResumeAssistance/Material",
  );

  await expect(documentLink).toHaveAttribute("class", "blinkingText");

  await signIn.click();

  await page.waitForURL(/angularpractice/, { timeout: 15000 });

  await expect(page).toHaveURL(/angularpractice/);

  await page.pause();
});

test.only("Child windows handle", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const documentLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    // context.waitForEvent("page"),
    page.waitForEvent("popup"),
    await documentLink.click(),
  ]);

  const text = await newPage.locator(".red").textContent();
  console.log(text);

  const domainText = text.split("@")[1];
  console.log(domainText);

  const email = domainText.split(" ")[0];
  console.log(email);

  const userName = email.split(".com")[0];
  console.log(userName);

  await page.locator("#username").fill(userName);
  await page.locator("#password").fill("learning");
  await page.locator("#signInBtn").click();

  await page.waitForURL(/angularpractice/, { timeout: 15000 });

  await expect(page).toHaveURL(/angularpractice/);

  console.log(await page.locator(".card-body a").first().textContent());
});
