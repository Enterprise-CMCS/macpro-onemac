Feature: RAI Response for SPA package view
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And search for "MD-93-2234"

    Scenario: Respond to RAI from the Package details page and then verify RAI info in package details page
        And click the SPA ID link in the first row
        And click on Respond to RAI package action
        And Add file for RAI Response
        And Click on Submit Button
        And click on Packages
        And search for "MD-93-2234"
        And click the SPA ID link in the first row
        And verify RAI Responses header exists
        And verify the RAI Responses caret at the top of the list exists and is enabled
        And verify the RAI response card at the top of the list exists
        And verify the download button for the RAI response at the top of the list exists
        And verify the first RAI response does not have Additional Info

    Scenario: Respond to RAI from the Package page and then verify RAI info in package details page
        And click the actions button in row one
        And click the Respond to RAI button
        And Add file for RAI Response
        And Type Additonal Information Comments
        And Click on Submit Button
        And click on Packages
        And search for "MD-93-2234"
        And click the SPA ID link in the first row
        And verify RAI Responses header exists
        And verify the RAI Responses caret at the top of the list exists and is enabled
        And verify the RAI response card at the top of the list exists
        And verify the download button for the RAI response at the top of the list exists
        And verify the first RAI response has Additional Info
