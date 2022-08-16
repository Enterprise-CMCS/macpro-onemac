Feature: Package Dashboard Temporary Extension
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
        And search for approved Initial Waiver Number 1
        And click the Waiver Number link in the first row
        And click on the Temporary Extension nav button
        And verify the temporary extension exists
        And click on the link for temporary extension number 1
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify the type is 1915(b) Temporary Extension
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is a Date Submitted header in the details section
        And verify a date exists for the Date Submitted

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
        And search for approved Initial Waiver Number 1
        And click the Waiver Number link in the first row
        And click on the Temporary Extension nav button
        And click the action button for the temporary extension
        And click withdraw button on the temp extension page
        And click yes, withdraw package button
        And verify success message for Withdrawal

    Scenario: Verify user can create a temporary extension from the Temp. Extension Mini-Dashboard
        And click on the Waivers tab
        And search for approved Initial Waiver Number 1
        And click the Waiver Number link in the first row
        And click on the Temporary Extension nav button
        And Click the Request Extension button
        And Type Temporary Extension Number 3 With 5 Characters
        And upload Waiver Extension Request
        And Type Additonal Info Comments in new form
        And Click on Submit Button
        And verify submission successful message in the alert bar

    Scenario: Verify user can create a temporary extension from the package details Mini-Dashboard
        And click on the Waivers tab
        And search for approved Initial Waiver Number 1
        And click the Waiver Number link in the first row
        And verify Request a Temporary Extension package action exists
        And click Request a Temporary Extension package action
        And Type Temporary Extension Number 4
        And upload Waiver Extension Request
        And Type Additonal Info Comments in new form
        And Click on Submit Button
        And verify submission successful message in the alert bar

    Scenario: Verify user can create a temporary extension from the package dashboard waiver tab
        And click on the Waivers tab
        And search for approved Initial Waiver Number 1
        And click the actions button in row one
        And verify the Request Temporary Extension button is displayed
        And click the Request Temporary Extension button
        And Type Temporary Extension Number 5
        And upload Waiver Extension Request
        And Type Additonal Info Comments in new form
        And Click on Submit Button
        And verify submission successful message in the alert bar
