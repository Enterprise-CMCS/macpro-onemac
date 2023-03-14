Feature: RAI Response for Medicaid SPA package view
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And Click on Filter Button
        And click on Type
        And uncheck all of the type checkboxes
        And click Medicaid SPA check box
        And click on Type
        And click on Status
        And uncheck all of the status checkboxes
    # Need seed data / reset data update
    #     And click RAI Issued checkbox
    #     And Click on Filter Button

    # Scenario: validate response to RAI from package details page
    #     And copy the ID from the link in the first row
    #     And click the SPA ID link in the first row
    #     And verify Respond to RAI action exists
    #     And click on Respond to RAI package action
    #     And verify the form is titled Formal Request for Additional Information Response
    #     And Add file for RAI Response
    #     And Click the Submit Button without waiting
    #     And verify the modal pop-up is visible
    #     And verify the title of the modal pop-up is Do you want to submit your official formal RAI response
    #     And verify the detailed text in the modal contains you are submitting your official formal RAI Response to start the 90 day clock review process

    # Scenario: validate response to RAI from package dashboard
    #     And copy the ID from the link in the first row
    #     And click the actions button in row one
    #     And verify the Respond to RAI button is displayed
    #     And click the Respond to RAI button
    #     And verify the form is titled Formal Request for Additional Information Response
    #     And Add file for RAI Response
    #     And Type Additonal Info Comments in new form
    #     And Click the Submit Button without waiting
    #     And verify the modal pop-up is visible
    #     And verify the title of the modal pop-up is Do you want to submit your official formal RAI response
    #     And verify the detailed text in the modal contains you are submitting your official formal RAI Response to start the 90 day clock review process
