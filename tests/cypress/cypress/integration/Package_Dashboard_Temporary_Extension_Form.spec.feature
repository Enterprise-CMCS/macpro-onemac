Feature: OY2-16333 Update Waiver Form: Temporary Extension
    Background: reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages

    Scenario: Verify user can create a temporary extension and that it is in the temporary extensions list
        Then click on New Submission
        And Click on Waiver Action
        And Click on Request Temporary Extension
        And Type Temporary Extension Number 1 With 5 Characters
        And upload Waiver Extension Request
        And Type "This is just a test" in Summary Box
        And Click on Submit Button
        And click on Packages
        And click on the Waivers tab
        And search for Base Waiver Number 1 with 12 Characters
        And click the Waiver Number link in the first row
        And click on the Temporary Extension nav button
        And verify the temporary extension exists

    Scenario: Verify user can withdraw temporary extension from mini-dashboard page
        Then click on New Submission
        And Click on Waiver Action
        And Click on Request Temporary Extension
        And Type Temporary Extension Number 2 With 5 Characters
        And upload Waiver Extension Request
        And Type "This is just a test" in Summary Box
        And Click on Submit Button
        And click on Packages
        And click on the Waivers tab
        And search for Base Waiver Number 1 with 12 Characters
        And click the Waiver Number link in the first row
        And click on the Temporary Extension nav button
        And click the action button for the temporary extension
        And click withdraw button on the temp extension page
        And click yes, withdraw package button
        And verify success message for Withdrawal
