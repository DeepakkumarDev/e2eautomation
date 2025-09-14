// const {test,expect} = require("@playwright/test");

// const lib = require("../../unitdir/lib");

// import { test, expect } from "@playwright/test";
// import lib from "../../unitdir/lib.js";
import { test, expect } from "@playwright/test";
import {
  registerUser,
  getProduct,
  getCurrencies,
  greet,
  absolute,
} from "../../unitdir/lib.js";

test.describe("registerUser", () => {
  test("should throw if username is falsy", () => {
    // null,undefined,NaN,'0,false
    expect(() => {
      lib.registerUser(null);
    }).toThrow();
    const args = [null, undefined, NaN, "", 0, false];

    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });
  test("Should return a user object if valid username is passed", () => {
    const result = lib.registerUser("mosh");
    expect(result).toMatchObject({ username: "mosh" });
    expect(result.id).toBeGreaterThan(0);
  });
});

test.describe.skip("getProducts", () => {
  test("should return product with the given id", () => {
    const result = lib.getProduct(1);
    expect(result).toHaveProperty("id", 1);
  });

  test("Should return full product object", () => {
    const result = lib.getProduct(1);
    expect(result).toEqual({ id: 1, price: 10, category: "a" });
  });

  test("should return a valid product object with correct properties", () => {
    const result = lib.getProduct(1);
    expect(result).toMatchObject({ id: 1 });
    expect(result.id).toBe(1);
    expect(result.price).toBeGreaterThan(0);
    expect(result.category).toBe("a");
    expect(result).toHaveProperty("price", 10);
    expect(typeof result.id).toBe("number");
    expect(result.category).toMatch(/[a-z]/);
    expect(result).not.toBeNull();
    expect(result).not.toEqual({});
  });
});

test.describe.skip("getCurrencies", () => {
  test("should return the supported currencies ", () => {
    const result = lib.getCurrencies();

    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    // Too specific
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");
    expect(result[2]).toBe("EUR");
    expect(result.length).toBe(3);

    // proper way
    expect(result).toContain("AUD");
    expect(result).toContain("USD");
    expect(result).toContain("EUR");

    // IDEAL way

    expect(result).toEqual(expect.arrayContaining(["EUR", "AUD", "USD"]));

    // Exact Match
    expect(result).toEqual(["USD", "AUD", "EUR"]);
    expect(result).not.toEqual(["INR", "GBP"]);

    // Length Checks
    expect(result).toHaveLength(3);
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(5);
    expect(result.length).toBeGreaterThanOrEqual(3);

    // Contains items
    expect(result).toContain("USD");

    expect(result).toEqual(expect.arrayContaining(["USD", "AUD"]));

    expect(result).not.toContain("INR");

    // Order Adnostic
    expect(result).toEqual(expect.arrayContaining(["EUR", "AUD", "USD"]));

    // CHECK INDEX POSITION

    expect(result[0]).toBe("USD");
    expect(result.at(-1)).toBe("EUR");

    expect(result).toEqual(expect.arrayContaining(["USD"]));

    expect(new Set(result)).toEqual(new Set(["USD", "AUD", "EUR"]));

    expect(result.every((el) => typeof el === "string")).toBe(true);

    expect(result.some((el) => el === "EUR")).toBe(true);

    expect([...result].sort()).toEqual(["AUD", "EUR", "USD"]);

    const arr = [{ code: "USD" }, { code: "EUR" }];

    expect(arr).toContainEqual({ code: "USD" });
  });
});

test.describe.skip("greet", () => {
  test("greeting message", () => {
    let name = "Mosh";
    const result = lib.greet(name);
    expect(result).toBe("Welcome Mosh!");
    expect(result).toContain("Mosh");
    expect(result).toMatch(/Mosh/);
    expect(result.startsWith("Welcome")).toBeTruthy();
    expect(result.endsWith("!")).toBeTruthy();
    expect(result).toMatch(/welcome mosh!/i);
    expect(result).toEqual(expect.stringContaining("Mosh"));
    expect(result).toEqual(expect.stringMatching(/Welcome/));
  });
});

test.describe.skip("absolute", () => {
  test(" should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  test(" should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  test("should return 0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

// test("absolute - should return a positive number if input is positive",()=>{
//     const result = lib.absolute(1);

//     expect(result).toBe(1);

// });

// test("absolute should return a positive number if input is negative",()=>{
//     const result = lib.absolute(-1);
//     expect(result).toBe(1);

// });

// test("absolute - should return 0 if input is 0",()=>{
//     const result = lib.absolute(0);
//     expect(result).toBe(0);
// });

// test.skip("Our first test in playwright",()=>{
//     throw new Error('something failed')

// });
