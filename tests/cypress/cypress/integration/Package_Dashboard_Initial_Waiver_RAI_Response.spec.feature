Feature: RAI Response for Initial Waiver - Package View

    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click RAI Issued checkbox
        And click on Status
        And click on Type
        And uncheck all of the type checkboxes
        And click 1915b Initial Waiver check box
        And Click on Filter Button

    Scenario: validate response to RAI from package dashboard
        And click the actions button in row one
        And click the Respond to RAI button
        And verify the package ID is prefilled in the form
        And Add file for Waiver RAI Response
        And verify the submit button is enabled 

    Scenario: validate response to RAI from package details page
        And click the Waiver Number link in the first row
        And click on Respond to RAI package action
        And verify the package ID is prefilled in the form
        And Add file for Waiver RAI Response
        And verify the submit button is enabled 