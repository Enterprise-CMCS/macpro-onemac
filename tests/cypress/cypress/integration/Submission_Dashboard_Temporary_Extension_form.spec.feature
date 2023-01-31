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
        And Type existing waiver number into Approved Initial or Renewal Waiver Number field
        And verify Approved Initial or Renewal Waiver Number error message is not displayed

    Scenario: Create Temporary Extension with valid waiver number
        And Click on Waiver Action under Waiver Type
        And Click on New Waiver under Action type
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And Type new Waiver Number 2 in format SS-#####.R00.00
        And Upload 1915 b 4 file
        And Type "This is just a test" in Summary Box
        And Click on Submit Button
        And verify submission Successful message
        Then click on New Submission
        And Click on Waiver Action
        And Click on Request Temporary Extension
        And Type new Waiver Number 2 into Approved Initial or Renewal Waiver Number field
        And verify Approved Initial or Renewal Waiver Number error message is not displayed
        And Type TE number based on existing waiver number 2
        And verify error message is not present on Request Waiver Temporary Extenstion Page
        And upload Waiver Extension Request
        And Type "This test has a valid waiver number" in Summary Box
        And Click on Submit Button
        And verify submission Successful message

    Scenario: Verify user can not create Temporary Extension with invalid waiver number
        And Click on Request Temporary Extension
        And Type existing waiver number into Approved Initial or Renewal Waiver Number field
        And type in invalid Waiver Number
        And upload Waiver Extension Request
        And Type "This test has an invalid waiver number" in Summary Box
        And verify the submit button is disabled
