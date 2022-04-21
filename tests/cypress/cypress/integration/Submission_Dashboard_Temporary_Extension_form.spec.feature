Feature: Temporary Extension form - Add warning messaging and relaxing the ID validation rules
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on Waiver Action
        And Click on Request Temporary Extension


    Scenario: Screen enhancement - verify warning messages have been relaxed
        And Type waiver number with 4 characters on Request Waiver Temporary Extenstion Page
        And verify error message is not present on Request Waiver Temporary Extenstion Page
        And clear Waiver Number Input box on Request Waiver Temporary Extenstion Page
        And Type Valid Waiver Number With 5 Characters
        And verify error message is not present on Request Waiver Temporary Extenstion Page
        And clear Waiver Number Input box on Request Waiver Temporary Extenstion Page
        And type in invalid Waiver Number
        And verify error message is not present on Request Waiver Temporary Extenstion Page
        And clear Waiver Number Input box on Request Waiver Temporary Extenstion Page
        And type waiver number with state abbreviation different from user on Request Waiver Temporary Extenstion Page
        And verify that error message for incorrect Waiver Number is Displayed

    Scenario: Create Temporary Extension with valid waiver number
        And Type existing Unique Valid Waiver Number With 5 Characters
        And upload Waiver Extension Request
        And Type "This test has a valid waiver number" in Summary Box
        And Click on Submit Button

    Scenario: Create Temporary Extension with invalid waiver number
        And type in invalid Waiver Number
        And upload Waiver Extension Request
        And Type "This test has an invalid waiver number" in Summary Box
        And Click on Submit Button