const { expect, test } = require("@playwright/test");
const fs = require("fs");

class BasePage {
  constructor() {}

  async loadUrl(url) {
    await page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async navigateBack() {
    await page.goBack();
  }

  async navigateBack() {
    await page.goForWard();
  }

  async reloadPage() {
    await page.reload();
  }
  async sendKeys(element, text) {
    await page.locator(element).fill(text);
  }

  async typeSlow(element, text, delay = 100) {
    await page.locator(element).type(text, { delay });
  }

  async click(element) {
    await page.locator(element).click();
  }
  async verifyElement(element) {
    try {
      const timeout = 3000;
      await page.locator(element).waitFor({ state: "visible", timeout });
      return await page.locator(element).isVisible();
    } catch {
      return false;
    }
  }

  async waitForLocator(element) {
    try {
      const timeout = 8000;
      await page.locator(element).waitFor({ state: "visible", timeout });
    } catch (error) {
      console.error(`Element ${element} did not become visible`);
      throw error;
    }
  }

  async verifyText(element, text) {
    let isVerify = false;
    await page.waitForLocator(element);
    if (await page.locator(element).isVisible()) {
      await expect(page.locator(element)).toHaveText(text);
      isVerify = true;
    } else {
      isVerify = false;
    }

    return isVerify;
  }

  async verifyContainsTexts(element, partialText, timeout = 5000) {
    let isVerify;
    await page.waitForLocator(element);
    const actualText = await page.locator(element).textContent({ timeout });
    if (await actualText.includes(partialText)) {
      await expect(actualText).toContains(partialText);
      isVerify = true;
    } else {
      isVerify = false;
    }
    return isVerify;
  }

  async getText(element) {
    await page.waitForLocator(element);
    return await page.locator(element).innerText();
  }

  async isVisible(element) {
    return await page.locator(element).isVisible();
  }

  async isEnabled(element) {
    return await page.locator(element).isEnabled();
  }

  async countElements(element) {
    return await page.locator(element).count();
  }

  async screenshot(path) {
    await page.screenshot({ path: path, fullPage: true });
  }

  async waitForURL(expectedUrl, options = {}) {
    await page.waitForURL(expectedUrl, options);
  }
}

module.exports = new BasePage();

// const { expect } = require("@playwright/test");

// class BasePage {
//     constructor() {}

//     async loadUrl(page, url) {
//         await page.goto(url, { waitUntil: "domcontentloaded" });
//     }

//     async navigateBack(page) {
//         await page.goBack();
//     }

//     async navigateForward(page) {
//         await page.goForward();
//     }

//     async reloadPage(page) {
//         await page.reload();
//     }

//     async sendKeys(page, element, text) {
//         await page.locator(element).fill(text);
//     }

//     async typeSlow(page, element, text, delay = 100) {
//         await page.locator(element).type(text, { delay });
//     }

//     async click(page, element) {
//         await page.locator(element).click();
//     }

//     async waitForLocator(page, element, timeout = 8000) {
//         await page.locator(element).waitFor({ state: "visible", timeout });
//     }

//     async verifyText(page, element, text) {
//         await this.waitForLocator(page, element);
//         await expect(page.locator(element)).toHaveText(text);
//     }

//     async verifyContainsText(page, element, partialText, timeout = 5000) {
//         await this.waitForLocator(page, element, timeout);
//         const actualText = await page.locator(element).textContent();
//         return actualText.includes(partialText);
//     }

//     async getText(page, element) {
//         await this.waitForLocator(page, element);
//         return await page.locator(element).innerText();
//     }

//     async isVisible(page, element) {
//         return await page.locator(element).isVisible();
//     }

//     async isEnabled(page, element) {
//         return await page.locator(element).isEnabled();
//     }

//     async countElements(page, element) {
//         return await page.locator(element).count();
//     }

//     async screenshot(page, path) {
//         await page.screenshot({ path: path, fullPage: true });
//     }

//     async waitForURL(page, url, timeout = 8000) {
//         await page.waitForURL(url, { timeout });
//     }
// }

// module.exports = new BasePage();
