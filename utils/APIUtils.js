// utils/APIUtils.js
import { test, expect, request } from "@playwright/test";
export class APIUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.apiUrl = "https://rahulshettyacademy.com/api/ecom/auth/login";
    this.apiOrderUrl =
      "https://rahulshettyacademy.com/api/ecom/order/create-order";
    this.loginPayload = loginPayload;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(this.apiUrl, {
      data: this.loginPayload,
    });

    expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log(`✅ Token generated: ${token}`);
    return token;
  }

  async createOrder(orderPayload) {
    const token = await this.getToken();

    const orderResponse = await this.apiContext.post(this.apiOrderUrl, {
      data: orderPayload,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    expect(orderResponse.ok()).toBeTruthy();

    const orderResponseJson = await orderResponse.json();
    const orderId = orderResponseJson.orders[0];

    console.log(`✅ Order created with ID: ${orderId}`);
    console.log(`ℹ️ Message: ${orderResponseJson.message}`);

    return orderId;
  }
}

// module.exports = { APIUtils };
