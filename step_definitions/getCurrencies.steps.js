const {Given,When,Then} = require("@cucumber/cucumber");
const {expect} = require("@playwright/test");
const lib = require("../unitdir/lib");
const assert = require('assert');

let result;


let supportedCurrencies = [];
let response = [];


When('I fetch the supported currencies', function () {
    result = lib.getCurrencies();
});

Then('the result should contain {string}', function (currency) {
    expect(result).toContain(currency);

});


Then('the result length should be {int}', function (length) {
    expect(result.length).toBe(length);

});




Given('the system supports {string}, {string}, and {string}', function (c1, c2, c3) {
  supportedCurrencies = [c1, c2, c3];
});



// When('I request the supported currencies', function () {
//   response = lib.getCurrencies();   // call your function
// });


Then('I should get [{string}, {string}, {string}]', function (c1, c2, c3) {


    const expected = [c1, c2, c3];
    expect(result).toEqual(expected);
    
//   assert.deepStrictEqual(
//     response,
//     expected,
//     `❌ Expected ${expected}, but got ${response}`
//   );
});