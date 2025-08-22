const {Given,When,Then} = require("@cucumber/cucumber");
const {expect} = require("@playwright/test");
const lib = require("../unitdir/lib");

let result;
let input ;

Given('my name is {string}', function (name) {
    input = name;

});


When('I greet', function () {
    result = lib.greet(input);
});


Then('I should see {string}', function (expected) {
    expect(result).toBe(expected);
    expect(result).toContain(input);
    expect(result).toMatch(/welcome/i);
    expect(result.toLowerCase()).toContain(input.toLowerCase());
    expect(result).toMatch(/^Welcome\s+\w+!$/);
    expect(result.startsWith("Welcome")).toBeTruthy();
    expect(result.endsWith("!")).toBeTruthy();
});

