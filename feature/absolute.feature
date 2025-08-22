Feature: Absolute Value
    In order to avoid negative numbers in my calculations
    As as user of the absolute function 
    I want the function to always return positive numbers or zero 

    
    Scenario Outline:Absolute function should always return positive value or zero
        Given I have the number <input>
        When I call the absolute function
        Then the result should be <expected>
        
        Examples:
            |input  |expected  |
            |5      |5         |
            |-3     |3         |
            |0      |0         |







# Feature: Absolute Value
#   In order to avoid negative numbers in my calculations
#   As a user of the absolute function
#   I want the function to always return positive numbers or zero

#   Scenario: Positive number input
#     Given I have the number 5
#     When I call the absolute function
#     Then the result should be 5

#   Scenario: Negative number input
#     Given I have the number -3
#     When I call the absolute function
#     Then the result should be 3

#   Scenario: Zero input
#     Given I have the number 0
#     When I call the absolute function
#     Then the result should be 0
