Feature: Verify user can withdraw a package in Under Review Status in the package dashboard 
    Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with "an Active" "State Submitter" user
        Then click on Packages
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Status
        Then uncheck all of the status checkboxes
        Then click Under Review checkbox
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click 1915b Initial Waiver check box

    Scenario: Screen Enhance - Validate Initial Waiver Withdrawal Page from dashboard
        Then click the actions button in row one
        Then click withdraw package button
        Then verify the header is "Withdraw Waiver" on the withdrawal form
        Then verify the form intro exists on the "1915(b) Initial Waiver" withdrawal form
        Then verify the Waiver number header exists on the withdrawal form
        Then verify the Waiver number exists on the withdrawal form
        Then verify the Type header exists on the withdrawal form
        Then verify the type is "Initial Waiver"
        Then verify the Upload Supporting Documentation header exists on the withdrawal form
        Then verify the Additional Info header exists on the withdrawal form
        Then verify the submit button is disabled
        Then verify form cancel button exists
        Then click form cancel button
        Then click Stay on Page
        Then click form cancel button
        Then click Leave Anyway form button
        Then Click on My Account
        Then click the logout button


    Scenario: Screen Enhance - Validate Initial Waiver Withdrawal Page from details page
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then click withdraw button
        Then verify the header is "Withdraw Waiver" on the withdrawal form
        Then verify the form intro exists on the "1915(b) Initial Waiver" withdrawal form
        Then verify the Waiver number header exists on the withdrawal form
        Then verify the Waiver number exists on the withdrawal form
        Then verify the Type header exists on the withdrawal form
        Then verify the type is "Initial Waiver"
        Then verify the Upload Supporting Documentation header exists on the withdrawal form
        Then verify the Additional Info header exists on the withdrawal form
        Then verify the submit button is disabled
        Then verify form cancel button exists
        Then click form cancel button
        Then click Stay on Page
        Then click form cancel button
        Then click Leave Anyway form button
        Then Click on My Account
        Then click the logout button

    Scenario: Screen Enhance - Validate Form logic
        Then click the actions button in row one
        Then click withdraw package button
        Then verify the submit button is disabled
        Then add additional info comment in the withdrawal form
        Then verify the submit button is not disabled
        Then upload withdrawal documentation
        Then verify the submit button is not disabled
        Then clear additional info comment in the withdrawal form
        Then verify the submit button is not disabled
        Then Click the Submit Button without waiting
        Then verify yes, withdraw package button exists
        Then click modal cancel button
        Then Click on My Account
        Then click the logout button