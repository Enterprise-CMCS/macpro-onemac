Feature: RAI Response for Appendix K Amendment - Package View

    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And search for the Appendix K Amendment in RAI Issued status

    Scenario: Respond to RAI from package dashboard
        And click the actions button in row one
        And click the Respond to RAI button
        And verify the Appendix K Amendment in RAI Issued status is pre-populated and uneditable
        And Add file for Waiver RAI Response
        And Click on Submit Button
        And verify submission successful message in the alert bar
        And verify the Waivers tab is selected
        And search for the Appendix K Amendment in RAI Issued status
        And click the Waiver Number link in the first row
        And verify RAI Responses header exists
        And verify the first RAI Response header is titled
        And verify the Appendix K RAI Responses caret at the top of the list exists and is enabled
        And verify the title of the Appendix K RAI Responses caret at the top of the list is in Submitted on format
        And verify the Appendix K RAI response card at the top of the list exists
        And verify the download button for the Appendix K RAI response at the top of the list exists
        And verify the first RAI response does not have Additional Info

    Scenario: Respond to RAI from package details page
        And click the Waiver Number link in the first row
        And click on Respond to RAI package action
        And verify the Appendix K Amendment in RAI Issued status is pre-populated and uneditable
        And Add file for Waiver RAI Response
        And Click on Submit Button
        And verify submission successful message in the alert bar
        And verify the Waivers tab is selected
        And search for the Appendix K Amendment in RAI Issued status
        And click the Waiver Number link in the first row
        And verify RAI Responses header exists
        And verify the first RAI Response header is titled
        And verify the Appendix K RAI Responses caret at the top of the list exists and is enabled
        And verify the title of the Appendix K RAI Responses caret at the top of the list is in Submitted on format
        And verify the Appendix K RAI response card at the top of the list exists
        And verify the download button for the Appendix K RAI response at the top of the list exists
        And verify the first RAI response does not have Additional Info