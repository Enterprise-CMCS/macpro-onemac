Feature: RAI Response for SPA package view
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on Status
        And click all of the status checkboxes
        And click RAI Issued checkbox
        And Click on Filter Button

    Scenario: Respond to RAI from the Package details page and then verify RAI info in package details page
        And copy the ID from the link in the first row
        And click the SPA ID link in the first row
        And verify Respond to RAI action exists
        And click on Respond to RAI package action
        And Add file for RAI Response
        And Click on Submit Button
        And click on Packages
        And search for the ID copied from the link in the first row
        And click the SPA ID link in the first row
        And verify RAI Responses header exists
        And verify the RAI Responses caret at the top of the list exists and is enabled
        And verify the RAI response card at the top of the list exists
        And verify the download button for the RAI response at the top of the list exists
        And verify the first RAI response does not have Additional Info

    Scenario: Respond to RAI from the Package page and then verify RAI info in package details page
        And copy the ID from the link in the first row
        And click the actions button in row one
        And verify the Respond to RAI button is displayed
        And click the Respond to RAI button
        And Add file for RAI Response
        And Type Additonal Information Comments
        And Click on Submit Button
        And click on Packages
        And search for the ID copied from the link in the first row
        And click the SPA ID link in the first row
        And verify RAI Responses header exists
        And verify the RAI Responses caret at the top of the list exists and is enabled
        And verify the RAI response card at the top of the list exists
        And verify the download button for the RAI response at the top of the list exists
        And verify the first RAI response has Additional Info
