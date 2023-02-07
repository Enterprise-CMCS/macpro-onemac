Feature: RAI Response for CHIP SPA package view
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on Type
        And uncheck all of the type checkboxes
        And click CHIP SPA check box
        And click on Type
        And click on Status
    # Need seed data / reset data update
    #     And uncheck all of the status checkboxes
    #     And click RAI Issued checkbox
    #     And Click on Filter Button

    # Scenario: Validate response to RAI page from the Package details page 
    #     And copy the ID from the link in the first row
    #     And click the SPA ID link in the first row
    #     And verify Respond to RAI action exists
    #     And click on Respond to RAI package action
    #     And verify the form is titled Formal Request for Additional Information Response
    #     And Add file for Revised Amended State Plan Language
    #     And Add file for Official RAI Response
    #     And Click the Submit Button without waiting
    #     And verify the modal pop-up is visible
    #     And verify the title of the modal pop-up is Do you want to submit your official formal RAI response
    #     And verify the detailed text in the modal contains you are submitting your official formal RAI Response to restart the SPA review process and a new 90th day will be identified
    #     And click modal cancel button
    #     And verify the modal pop-up is not visible

    # Scenario: Validate response to RAI from the Package page
    #     And copy the ID from the link in the first row
    #     And click the actions button in row one
    #     And verify the Respond to RAI button is displayed
    #     And click the Respond to RAI button
    #     And verify the form is titled Formal Request for Additional Information Response
    #     And Add file for Revised Amended State Plan Language
    #     And Add file for Official RAI Response
    #     And Type Additonal Info Comments in new form
    #     And Click the Submit Button without waiting
    #     And verify the modal pop-up is visible
    #     And verify the title of the modal pop-up is Do you want to submit your official formal RAI response
    #     And verify the detailed text in the modal contains you are submitting your official formal RAI Response to restart the SPA review process and a new 90th day will be identified
    #     And click modal cancel button
    #     And verify the modal pop-up is not visible
