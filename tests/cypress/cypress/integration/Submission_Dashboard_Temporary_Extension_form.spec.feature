Feature: Temporary Extension form
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on Waiver Action


    Scenario: Screen enhancement - Temp Extension waiver format
        And Click on Request Temporary Extension
        And Type waiver number with 4 characters on Request Waiver Temporary Extenstion Page
        And verify error message is not present on Request Waiver Temporary Extenstion Page
        And clear Waiver Number Input box on Request Waiver Temporary Extenstion Page
        And Type Valid Waiver Number With 5 Characters
        And verify error message is not present on Request Waiver Temporary Extenstion Page
        And clear Waiver Number Input box on Request Waiver Temporary Extenstion Page
        And type in invalid Waiver Number
        And verify error message is present on submission dashboard New Waiver Page
        And clear Waiver Number Input box on Request Waiver Temporary Extenstion Page
        And type waiver number with state abbreviation different from user on Request Waiver Temporary Extenstion Page
        And verify that error message for incorrect Waiver Number is Displayed

    Scenario: Screen enhancement - Temp Extension Approved Initial or Renewal Waiver Number field
        And Click on Request Temporary Extension
        And Type "M" into Approved Initial or Renewal Waiver Number field
        And verify Approved Initial or Renewal Waiver Number error message is displayed
        And verify Approved Initial or Renewal Waiver Number error message text is correct
        And clear Approved Initial or Renewal Waiver Number input box
        And verify Approved Initial or Renewal Waiver Number error message is not displayed
        And Type existing waiver number 2 into Approved Initial or Renewal Waiver Number field
        And verify Approved Initial or Renewal Waiver Number error message is not displayed

    Scenario: Verify user can not create Temporary Extension with invalid waiver number
        And Click on Request Temporary Extension
        And Type existing waiver number into Approved Initial or Renewal Waiver Number field
        And type in invalid Waiver Number
        And upload Waiver Extension Request
        And Type "This test has an invalid waiver number" in Summary Box
        And verify the submit button is disabled
