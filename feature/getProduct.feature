Feature: Get Product by ID
  As a system
  I want to fetch product details
  So that I can validate the returned product object

  # Basic check
  Scenario: Get product with a specific ID
    Given I have a product with id 1
    When I fetch the product
    Then the product should have id 1
    And the product should have price 10
    And the product should have category "a"

  # Another example
  Scenario: Get product with another ID
    Given I have a product with id 5
    When I fetch the product
    Then the product should have id 5
    And the product should have price 50
    And the product should have category "e"

  # Using Scenario Outline for multiple inputs
  Scenario Outline: Verify product object with different IDs
    Given I have a product with id <id>
    When I fetch the product
    Then the product should have id <id>
    And the product should have price <price>
    And the product should have category <category>

    Examples:
      | id |price   |category|
      | 1  |10      |"a"     |
      | 2  |20      |"b"     |
      | 3  |30      |"c"     |
      | 10 |100     |"z"     |