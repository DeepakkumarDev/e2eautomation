Feature: Greet
    Scenario Outline: Greeting message 
        Given my name is "<name>"
        When I greet 
        Then I should see "Welcome <name>!"

        Examples:
            |name   |
            |mosh   |
            |Deepak |
            |Anshika|