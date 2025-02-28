Feature: RAI Response for Renewal Waiver - Package View

    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with "an Active" "State Submitter" user
        Then click on Packages
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Status
        Then uncheck all of the status checkboxes
        Then click RAI Issued checkbox
        Then click on Status
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click 1915b Waiver Renewal check box
        Then Click on Filter Button

    Scenario: validate response to RAI from package dashboard
        Then click the actions button in row one
        Then click the Respond to RAI button
        Then verify "Waiver Number" is prefilled
        Then verify the attachment info descriptiion
        Then verify the attachment info link is for "Waiver RAI"
        Then attach "adobe.pdf" file to attachment 1
        Then Click the Submit Button without waiting
        Then verify the modal pop-up is visible
        Then verify the title of the modal pop-up is Do you want to submit your official formal RAI response
        Then verify the detailed text in the modal contains "you are submitting your official formal RAI Response to start the 90 day clock review process"
        Then click modal cancel button
        Then verify the modal pop-up is not visible

    Scenario: validate response to RAI from package details page
        Then click the Waiver Number link in the first row
        Then click on Respond to RAI package action
        Then verify "Waiver Number" is prefilled
        Then attach "adobe.pdf" file to attachment 1
        Then Click the Submit Button without waiting
        Then verify the modal pop-up is visible
        Then verify the title of the modal pop-up is Do you want to submit your official formal RAI response
        Then verify the detailed text in the modal contains "you are submitting your official formal RAI Response to start the 90 day clock review process"
        Then click modal cancel button
        Then verify the modal pop-up is not visible