// tests/e2e/order.test.js
import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../../utils/APIUtils.js";

const loginPayload = {
  userEmail: "deepak.dev.mca22.du@gmail.com",
  userPassword: "Deepak@1029",
};

const orderPayload = {
  orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }],
};

let apiContext;
let token;
let orderId;

test.beforeAll(async () => {
  apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);

  token = await apiUtils.getToken();
  orderId = await apiUtils.createOrder(orderPayload);
});

test("Verify created order in UI", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const url = "https://rahulshettyacademy.com/client";

  const orderTabsLocator = "//button[@routerlink='/dashboard/myorders']";
  const tbodyLocator = "tbody";
  const rowsLocator = "//tbody//tr";
  const viewsLocator = "button:has-text('View')";
  const summaryOrderIdLocator = "//div[@class='col-text -main']";

  // Inject token into local storage before loading the page
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto(url);
  await page.locator(orderTabsLocator).click();
  await page.locator(tbodyLocator).waitFor();

  const rows = page.locator(rowsLocator);
  const count = await rows.count();
  let found = false;

  for (let i = 0; i < count; i++) {
    const tableOrderId = (await rows.nth(i).locator("th").textContent()).trim();

    if (tableOrderId === orderId) {
      found = true;
      console.log(`✅ Order found in table: ${tableOrderId}`);

      await rows.nth(i).locator(viewsLocator).click();
      const summaryOrderId = (
        await page.locator(summaryOrderIdLocator).textContent()
      ).trim();

      console.log(`📄 Order ID in summary page: ${summaryOrderId}`);
      await expect(summaryOrderId).toBe(orderId);

      break;
    }
  }

  await expect(found).toBeTruthy();
});

// import { test, expect, request } from "@playwright/test";
// const apiUrl = "https://rahulshettyacademy.com/api/ecom/auth/login";
// const apiOrderUrl =
//   "https://rahulshettyacademy.com/api/ecom/order/create-order";
// const loginPayload = {
//   userEmail: "deepak.dev.mca22.du@gmail.com",
//   userPassword: "Deepak@1029",
// };

// const orderPayload = {
//   orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }],
// };
// let orderId;
// let token;

// test.beforeAll(async () => {
//   // Login
//   const apiContext = await request.newContext();
//   const loginResponse = await apiContext.post(apiUrl, { data: loginPayload });
//   await expect(loginResponse.ok()).toBeTruthy();
//   const loginResponseJson = await loginResponse.json();
//   token = loginResponseJson.token;
//   console.log(token);

//   //create order
//   const orderResponse = await apiContext.post(apiOrderUrl, {
//     data: orderPayload,
//     headers: {
//       Authorization: token,
//       "Content-Type": "application/json",
//     },
//   });
//   const orderResponseJson = await orderResponse.json();
//   orderId = await orderResponseJson.orders;
//   console.log(orderId);
//   console.log(await orderResponseJson.message);
//   console.log(await orderResponseJson.productOrderId);
// });

// test.beforeEach(() => {});

// test("Login to the client page using api ", async ({ browser }) => {
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   const url = "https://rahulshettyacademy.com/client/#/auth/login";
//   const emailId = "deepak.dev.mca22.du@gmail.com";
//   //   const password = "Deepak@1029";
//   const emailLocator = "//input[@id='userEmail']";
//   const passwordLocator = "//input[@id='userPassword']";
//   const loginInLocator = "//input[@id='login']";
//   const cardBody = "//div[@class='card-body']";
//   const cardBodyTitle = "//div[@class='card-body']//b"; //(//div[@class='card-body'])[1]//h5
//   const addToCartLocator =
//     "//div[@class='card-body']//button[i[contains(@class,'fa') and contains(@class,'fa-shopping-cart')]]";
//   // "//div[@class='card-body']//button//i[contains(@class,'fa') and contains(@class,'fa-shopping-cart')]";
//   const productName = "ZARA COAT 3";
//   const cart = "//button[@routerlink='/dashboard/cart']";
//   const cartProduct = "//h3[normalize-space()='ZARA COAT 3']";
//   const checkout = "//button[contains(normalize-space(),'Checkout')]"; //text='Checkout'
//   const userDetailsLabel = "//div[@class=\'details__user\']//label";
//   const userDetailsInput = "(//div[@class='details__user']//input)";
//   const selectCountryLocator = "//input[@placeholder='Select Country']";
//   const sectionSelectionLocator = "//section//button//span";
//   const selectOptionsCountryLocator =
//     "//section[@class='ta-results list-group ng-star-inserted']//button//span";
//   // "//section[@class='ta-results list-group ng-star-inserted']//button";
//   const placeorderLocator = "//a[normalize-space()='Place Order']";

//   const orderPlacedTitleLocator = "//h1[contains(@class,'hero-primary')]";
//   const orderIdLocator = "label[class='ng-star-inserted']";
//   const orderTabsLocator = "//button[@routerlink='/dashboard/myorders']";
//   const tableOrderIdLocator = "//tbody//tr/th";
//   const tableViewButton = "//tbody//tr//button[contains(text(),'View')]";
//   const orderIdSummaryLocator = "//div[@class='col-text -main']";

//   await page.addInitScript((value) => {
//     window.localStorage.setItem("token", value);
//   }, token);
//   await page.goto(url);

//   await page.locator(orderTabsLocator).click();
//   // console.log(await page.locator(tableOrderIdLocator).count());

//   const totalRow = await page.locator(tableOrderIdLocator).count();

//   for (let i = 0; i < totalRow; i++) {
//     console.log(await page.locator(tableOrderIdLocator).nth(i).textContent());
//     let tableOrderId = await page
//       .locator(tableOrderIdLocator)
//       .nth(i)
//       .textContent();

//     if (tableOrderId === orderId) {
//       console.log(
//         `Order id matched tableOrderId is :${tableOrderId} and the actual Order Id is ${orderId}`,
//       );
//       await page.locator(tableViewButton).nth(i).click();
//       console.log(await page.locator(orderIdSummaryLocator).textContent());
//       await expect(orderId.includes(tableOrderId)).toBeTruthy();
//       await expect(
//         orderId.includes(
//           await page.locator(orderIdSummaryLocator).textContent(),
//         ),
//       ).toBeTruthy();
//       break;
//     }
//   }

//   await await page.pause();
// });

// import { test, expect, request } from "@playwright/test";

// const apiUrl = "https://rahulshettyacademy.com/api/ecom/auth/login";
// const apiOrderUrl =
//   "https://rahulshettyacademy.com/api/ecom/order/create-order";

// const loginPayload = {
//   userEmail: "deepak.dev.mca22.du@gmail.com",
//   userPassword: "Deepak@1029",
// };

// let token;
// let orderId;

// test.beforeAll(async () => {
//   // Login and get token
//   const apiContext = await request.newContext();
//   const loginResponse = await apiContext.post(apiUrl, { data: loginPayload });
//   // await expect(loginResponse.ok()).toBeTruthy();
//   expect(loginResponse.ok()).toBeTruthy();
//   const loginResponseJson = await loginResponse.json();
//   token = loginResponseJson.token;
//   console.log("🔑 Token:", token);

//   // Create order
//   const orderPayload = {
//     orders: [
//       { country: "India", productOrderedId: "68a961459320a140fe1ca57a" },
//     ],
//   };

//   const orderResponse = await apiContext.post(apiOrderUrl, {
//     data: orderPayload,
//     headers: {
//       Authorization: token,
//       "Content-Type": "application/json",
//     },
//   });

//   await expect(orderResponse.ok()).toBeTruthy();
//   const orderResponseJson = await orderResponse.json();

//   orderId = orderResponseJson.orders[0]; // the new order id
//   console.log("✅ Order Created with ID:", orderId);
//   console.log("📢 Message:", orderResponseJson.message);
// });

// test("Verify created order in UI", async ({ browser }) => {
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   const url = "https://rahulshettyacademy.com/client";

//   // Inject token into localStorage
//   await page.addInitScript((value) => {
//     window.localStorage.setItem("token", value);
//   }, token);

//   await page.goto(url);

//   // Navigate to My Orders
//   await page.locator("//button[@routerlink='/dashboard/myorders']").click();
//   await page.locator("tbody").waitFor();

//   const rows = page.locator("//tbody//tr");
//   const count = await rows.count();

//   let found = false;

//   for (let i = 0; i < count; i++) {
//     const tableOrderId = (await rows.nth(i).locator("th").textContent()).trim();

//     if (tableOrderId === orderId) {
//       found = true;
//       console.log(`🎯 Order found in table: ${tableOrderId}`);

//       // Click View button for this order
//       await rows.nth(i).locator("button:has-text('View')").click();

//       // Verify summary order id
//       const summaryOrderId = (
//         await page.locator("//div[@class='col-text -main']").textContent()
//       ).trim();
//       console.log(`📦 Order ID in summary page: ${summaryOrderId}`);

//       await expect(summaryOrderId).toBe(orderId);
//       break;
//     }
//   }

//   await expect(found).toBeTruthy(); // ensures the order was in table
// });
// );
