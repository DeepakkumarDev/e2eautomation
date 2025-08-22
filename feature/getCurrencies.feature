Feature: Get Supported Currencies
  In order to know which currencies are supported
  As a system
  I want to return the list of supported currencies


  Scenario: Verify supported currencies list
    When I fetch the supported currencies
    Then the result should contain "USD"
    And the result should contain "AUD"
    And the result should contain "EUR"
    And the result length should be 3

  Scenario: Verify supported currencies with Given
    Given the system supports "USD", "AUD", and "EUR"
    When I fetch the supported currencies
    # When I request the supported currencies
    Then I should get ["USD", "AUD", "EUR"]


  Scenario Outline: Verify each currency is supported individually
    When I fetch the supported currencies
    Then the result should contain "<currency>"

    Examples:
      | currency |
      | USD      |
      | AUD      |
      | EUR      |