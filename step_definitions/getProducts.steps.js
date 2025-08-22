const {Given,When,Then} = require("@cucumber/cucumber");
const {expect} = require("@playwright/test");
const lib = require("../unitdir/lib");

let productId ;
let result ;

Given('I have a product with id {int}', function (id) {
    productId = id;

});


When('I fetch the product', function () {
    result = lib.getProduct(productId);


});


Then('the product should have id {int}', function (id) {
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("id",id);


});

Then('the product should have price {int}', function (price) {
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("price",price);

});


Then('the product should have category {string}', function (category) {
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("category",category);


});
