Feature: OY2-13094 Package Dashboard - Filter by State
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user

    Scenario: Screen enhancement
        And Click on Filter Button
        And verify state dropdown filter exists
        And click on state dropdown filter
        And verify state filter select exists
        And verify no states are selected
    
    Scenario: filter by state full name
        And Click on Filter Button
        And click on state dropdown filter
        And set value on state filter select to "Maryland"
        And verify states selected includes "Maryland"
        And verify "MD" is showing in the state column
    
    Scenario: filter by state Abbrev
        And Click on Filter Button
        And click on state dropdown filter
        And set value on state filter select to "NJ"
        And verify states selected includes "New Jersey"

    Scenario:  filter by non-state
        And Click on Filter Button
        And click on state dropdown filter
        And set value on state filter select to "foobar"
        And verify no states are selected

    Scenario: filter and then reset
        And Click on Filter Button
        And click on state dropdown filter
        And set value on state filter select to "Maryland"
        And verify states selected includes "Maryland"
        And click on reset button
        And verify no states are selected

    Scenario: filter and then remove state
        And Click on Filter Button
        And click on state dropdown filter
        And set value on state filter select to "Maryland"
        And verify remove "Maryland" button exists
        And click remove "Maryland" button