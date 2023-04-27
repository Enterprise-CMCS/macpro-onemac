Feature: Verify user can withdraw a package in Under Review Status in the package dashboard 
    Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click Under Review checkbox
        And click on Type
        And uncheck all of the type checkboxes
        And click 1915b Initial Waiver check box

    Scenario: Screen Enhance - Validate Initial Waiver Withdrawal Page from dashboard
        And click the actions button in row one
        And click withdraw package button
        And verify the header is "Withdraw Waiver" on the withdrawal form
        And verify the form intro exists on the withdrawal form
        And verify the Waiver number header exists on the withdrawal form
        And verify the Waiver number exists on the withdrawal form
        And verify the Type header exists on the withdrawal form
        And verify the type is "Initial Waiver"
        And verify the Upload Supporting Documentation header exists on the withdrawal form
        And verify the Additional Info header exists on the withdrawal form
        And verify the submit button is disabled
        And verify form cancel button exists
        And click form cancel button
        And click Stay on Page
        And click form cancel button
        And click Leave Anyway form button
        Then Click on My Account
        And click the logout button

    Scenario: Screen Enhance - Validate Initial Waiver Withdrawal Page from details page
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And click withdraw button
        And verify the header is "Withdraw Waiver" on the withdrawal form
        And verify the form intro exists on the withdrawal form
        And verify the Waiver number header exists on the withdrawal form
        And verify the Waiver number exists on the withdrawal form
        And verify the Type header exists on the withdrawal form
        And verify the type is "Initial Waiver"
        And verify the Upload Supporting Documentation header exists on the withdrawal form
        And verify the Additional Info header exists on the withdrawal form
        And verify the submit button is disabled
        And verify form cancel button exists
        And click form cancel button
        And click Stay on Page
        And click form cancel button
        And click Leave Anyway form button
        Then Click on My Account
        And click the logout button
    
    Scenario: Screen Enhance - Validate Form logic
        And click the actions button in row one
        And click withdraw package button
        And verify the submit button is disabled
        And add additional info comment in the withdrawal form
        And verify the submit button is not disabled
        And upload withdrawal documentation
        And verify the submit button is not disabled
        And clear additional info comment in the withdrawal form
        And verify the submit button is not disabled
        And Click the Submit Button without waiting
        And verify yes, withdraw package button exists
        And click modal cancel button
        Then Click on My Account
        And click the logout button