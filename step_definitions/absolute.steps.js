const {Given,When, Then} = require("@cucumber/cucumber");
const {expect} = require("@playwright/test");
const lib = require("../unitdir/lib");
const assert = require("assert");


let number;
let result;

Given('I have the number {int}', function (input) {
  number = input;
});

When('I call the absolute function', function () {
  result = lib.absolute(number);
});

Then('the result should be {int}', function (expected) {
  
    expect(result).toBe(expected);
    assert.strictEqual(result,expected);
});
