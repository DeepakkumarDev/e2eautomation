// // tests/e2e/connect.spec.js
// // const { test, expect, chromium } = require("@playwright/test");
// // const ConnectPage = require("../../pages/ConnectPage");
// // const testData = require("../../config/TestData/TestData.json");

// import { test, expect, chromium } from "@playwright/test";
// import ConnectPage from "../../pages/ConnectPage.js";
// import testData from "../../config/TestData/TestData.json" assert { type: "json" };

// let connectPage;
// let browser, context;

// test.beforeAll(async () => {
//   browser = await chromium.launch({ headless: false });
//   context = await browser.newContext();
//   global.page = await context.newPage(); // 🔥 set global page
// });

// test.afterAll(async () => {
//   await browser.close();
// });

// test.describe("Connect Page Tests", () => {
//   test.beforeEach(async () => {
//     connectPage = new ConnectPage();
//   });

//   test("Valid Login - should navigate to homepage", async () => {
//     await connectPage.launchURL(testData.url);
//     await connectPage.enterCredentials(
//       testData.validUser.username,
//       testData.validUser.password,
//     );
//     await connectPage.verifyConnectHomePage();
//   });

//   test("Invalid Login - should show error message", async () => {
//     await connectPage.launchURL(testData.url);
//     await connectPage.enterCredentials(
//       testData.invalidUser.username,
//       testData.invalidUser.password,
//     );
//     await connectPage.verifyErrorMessage("Incorrect username/password.");
//   });
// });

// const { test } = require("@playwright/test");
// const ConnectPage = require("../../pages/ConnectPage");
// const testData = require("../../config/TestData/TestData.json");

// test.describe("Connect Page Tests", () => {
//     test("Valid Login - should navigate to homepage", async ({ browser }) => {
//         const context = await browser.newContext();
//         const page = await context.newPage();
//         const connectPage = new ConnectPage(page);

//         await connectPage.launchURL(testData.url);
//         await connectPage.enterCredentials(testData.validUser.username, testData.validUser.password);
//         await connectPage.verifyConnectHomePage();
//     });

//     test("Invalid Login - should show error message", async ({ browser }) => {
//         const context = await browser.newContext();
//         const page = await context.newPage();
//         const connectPage = new ConnectPage(page);

//         await connectPage.launchURL(testData.url);
//         await connectPage.enterCredentials(testData.invalidUser.username, testData.invalidUser.password);
//         await connectPage.verifyErrorMessage("Incorrect username/password.");
//     });
// });
