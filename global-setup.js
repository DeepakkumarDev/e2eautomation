// global-setup.js
const { chromium } = require("@playwright/test");

module.exports = async (config) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  global.page = await context.newPage(); // 🔥 global page available everywhere
};
