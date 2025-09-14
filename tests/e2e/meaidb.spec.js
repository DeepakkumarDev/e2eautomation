// const { test, expect } = require("@playwright/test");
// const path = require("path");
// const { spawn } = require("child_process");

// ESM version
import { test, expect } from "@playwright/test";
import path from "path";
import { spawn } from "child_process";

test("Fill form, submit, and download Excel", async ({ page }) => {
  await page.goto("https://tradestat.commerce.gov.in/");

  await page.selectOption("select[name='ddMonth']", { label: "April" });
  await page.selectOption("select[name='ddYear']", { label: "2024" });
  await page.locator("#radio1").check();
  await page.selectOption("#Commoditylevl", { label: "2 digit Level" });
  await page.selectOption("select[name='ddReportVal']", {
    label: "US $ Million",
  });
  await page.locator("button[type='submit']").click();

  await page.waitForSelector("table");
  console.log("✅ Table loaded");

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page
      .locator("button.btn.btn-secondary.buttons-excel.buttons-html5")
      .click(),
  ]);

  const filePath = path.resolve(
    process.cwd(),
    await download.suggestedFilename(),
  );
  await download.saveAs(filePath);
  console.log(`✅ Excel file downloaded to: ${filePath}`);

  const analyzerPath = path.resolve(__dirname, "../scripts/analyze.py");
  console.log(`🐍 Running Python analyzer at: ${analyzerPath}`);

  await new Promise((resolve, reject) => {
    const python = spawn("python", [analyzerPath, filePath], {
      cwd: process.cwd(),
      env: { ...process.env, PYTHONIOENCODING: "utf-8" },
    });

    let output = "";
    let errorOutput = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    python.on("close", (code) => {
      if (output) {
        console.log("📊 Python Output:\n" + output.trim());
      }
      if (errorOutput) {
        console.error("❌ Python Error:\n" + errorOutput.trim());
      }

      console.log(`🐍 Python script exited with code ${code}`);

      if (code === 0) {
        resolve(output);
      } else {
        reject(
          new Error(`Python script failed with code ${code}\n${errorOutput}`),
        );
      }
    });
  });
});

// const { test, expect } = require("@playwright/test");
// const fs = require("fs");
// const path = require("path");
// const { spawn } = require("child_process");

// test("Fill form, submit, and download Excel", async ({ page }) => {
//   // Go to the site
//   await page.goto("https://tradestat.commerce.gov.in/");

//   // ✅ Select Month (example: "April")
//   await page.selectOption("select[name='ddMonth']", { label: "April" });

//   // ✅ Select Year (example: "2024")
//   await page.selectOption("select[name='ddYear']", { label: "2024" });

//   // ✅ Select Radio Button (Exports)
//   await page.locator("#radio1").check();

//   // ✅ Select Commodity (example: "2 digit Level")
//   await page.selectOption("#Commoditylevl", { label: "2 digit Level" });

//   // ✅ Select Value In (example: "US $ Million")
//   await page.selectOption("select[name='ddReportVal']", { label: "US $ Million" });

//   // ✅ Submit form
//   await page.locator("button[type='submit']").click();

//   // ✅ Wait for results page (table) to load
//   await page.waitForSelector("table");
//   console.log("✅ Table loaded");

//   // ✅ Wait for download event when clicking Excel button
//   const [download] = await Promise.all([
//     page.waitForEvent("download"), // wait for download to start
//     page.locator("button.btn.btn-secondary.buttons-excel.buttons-html5").click()

//   ]);

//   // ✅ Save file to current directory
//   const filePath = path.join(process.cwd(), await download.suggestedFilename());
//   await download.saveAs(filePath);

//   console.log(`✅ Excel file downloaded to: ${filePath}`);

// // Step 4: Build path to analyzer.py
//  // Step 4: Path to Python analyzer
//   const analyzerPath = path.resolve(__dirname, "../scripts/analyze.py");
//   console.log(`🐍 Running Python analyzer at: ${analyzerPath}`);

//   // Step 5: Spawn Python
//   const python = spawn("python", [analyzerPath, filePath], { cwd: process.cwd() });

//   let output = "";
//   let errorOutput = "";

//   python.stdout.on("data", (data) => {
//     output += data.toString();
//   });

//   python.stderr.on("data", (data) => {
//     errorOutput += data.toString();
//   });

//   python.on("close", (code) => {
//     if (output) {
//       console.log("📊 Python Output:\n" + output.trim());
//     }
//     if (errorOutput) {
//       console.error("❌ Python Error:\n" + errorOutput.trim());
//     }
//     console.log(`🐍 Python script exited with code ${code}`);
//     expect(code).toBe(0);

//     console.log(output);
//     console.log(errorOutput);

//   });
// });

// const { test, expect } = require("@playwright/test");
// const path = require("path");

// test("Fill form and submit TradeStat data", async ({ page }) => {
//   // Go to the site
//   await page.goto("https://tradestat.commerce.gov.in/");

//   // ✅ Select Month (example: "April")
//   await page.selectOption("select[name='ddMonth']", { label: "April" });

//   // ✅ Select Year (example: "2024")
//   await page.selectOption("select[name='ddYear']", { label: "2024" });

//   // ✅ Select Radio Button (Imports/Exports) -> clicking Exports
//   const exportRadio = page.locator("#radio1");
//   await exportRadio.check();

//   // ✅ Select Commodity (example: "01 Live animals")
//   await page.selectOption("#Commoditylevl", { label: "2 digit Level" });

//   // ✅ Select Value In (example: "Value in US $ Million")
//   await page.selectOption("select[name='ddReportVal']", { label: "US $ Million" });

//   // ✅ Click Submit button
//   await page.locator("button[type='submit']").click();

//   // ✅ Wait for results page (table) to load
//   await page.waitForSelector("table");

//   // Print confirmation
//   console.log("✅ Form submitted successfully and table loaded");
//   const [download] = await Promise.all([
//     page.waitForEvent("download"), // wait for download to start
//     page.locator("button.btn.btn-secondary.buttons-excel.buttons-html5").click()
//   ]);

//   // ✅ Save file to current directory
//   const filePath = path.join(process.cwd(), await download.suggestedFilename());
//   await download.saveAs(filePath);

//   console.log(`✅ Excel file downloaded to: ${filePath}`);

// });

// const { test, expect } = require("@playwright/test");

// test("Download the meaidb data", async ({ page }) => {
//   await page.goto("https://tradestat.commerce.gov.in/");
//   console.log(await page.title());

//   // Months
//   const monthOptions = page.locator("select[name='ddMonth'] option");
//   const monthOptionsText = await monthOptions.allTextContents();
//   const months = monthOptionsText.map(text => text.trim()).filter(t => t !== "");
//   console.log("Months:", months);

//   console.log("First month:", months[0]);
//   console.log("Second month:", months[1]);

//   // Years
//   const yearOptions = page.locator("select[name='ddYear'] option");
//   const yearOptionsText = await yearOptions.allTextContents();   // ✅ fixed with await
//   const years = yearOptionsText.map(text => text.trim()).filter(t => t !== "");
//   console.log("Years:", years);

//   // Radio button
//   const radioButton = page.locator("#radio1");
//   console.log("Radio checked:", await radioButton.isChecked());

//   // Commodities
//   const commodities = page.locator("#Commoditylevl option");
//   console.log("Commodities:", await commodities.allTextContents());

//   // Values In
//   const valuesIn = page.locator("select[name='ddReportVal'] option");
//   console.log("Values In:", await valuesIn.allTextContents());

// });
