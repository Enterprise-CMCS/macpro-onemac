Feature: Subsequent Submission 1915c App K Waiver
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with "an Active" "State Submitter" user
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click 1915c Appendix K Amendment check box
        Then click on Type
        Then click on Status
        Then uncheck all of the status checkboxes
        Then click Under Review checkbox
        Then Click on Filter Button

    Scenario: Screen Enhance - Subsequent Documents from the details page
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify Upload Subsequent Documents action exists
        Then click the Upload Subsequent Documents action button
        Then verify the page header is "Upload Subsequent 1915(c) Appendix K Documentation"
        Then verify the form title is "1915(c) Appendix K Subsequent Submission Details"
        Then verify "Waiver Amendment Number" is prefilled
        Then verify Type is "1915(c) Appendix K Amendment"
        Then verify the Subsequent "1915(c) Appendix K" Documents section exists
        Then verify label "Reason for subsequent submission" exists on page
        Then verify the submit button is disabled
        Then verify form cancel button exists
        Then attach "adobe.pdf" file to attachment 1
        Then into "Reason for subsequent submission" type "This is an automated subsequent submission test."
        Then Click the Submit Button without waiting
        Then verify the modal pop-up is visible
        Then verify the dialog title contains "OneMAC only for document submission"
        Then verify the detailed text in the modal contains "States and CMS reviewers will communicate about the submission through email."
        Then verify the yes, submit modal button is visible and clickable
        Then click modal cancel button
        Then click form cancel button
        Then click Leave Anyway form button
        Then verify the package details page is visible

    Scenario: Screen Enhance - Subsequent Documents from the package dashboard
        Then click the actions button in row one
        Then verify Upload Subsequent Documents action exists
        Then click the Upload Subsequent Documents action button
        Then verify the page header is "Upload Subsequent 1915(c) Appendix K Documentation"
        Then verify the form title is "1915(c) Appendix K Subsequent Submission Details"
        Then verify "Waiver Amendment Number" is prefilled
        Then verify Type is "1915(c) Appendix K Amendment"
        Then verify the Subsequent "1915(c) Appendix K" Documents section exists
        Then verify label "Reason for subsequent submission" exists on page
        Then verify the submit button is disabled
        Then verify form cancel button exists
        Then attach "adobe.pdf" file to attachment 1
        Then into "Reason for subsequent submission" type "This is an automated subsequent submission test."
        Then Click the Submit Button without waiting
        Then verify the modal pop-up is visible
        Then verify the dialog title contains "OneMAC only for document submission"
        Then verify the detailed text in the modal contains "States and CMS reviewers will communicate about the submission through email."
        Then verify the yes, submit modal button is visible and clickable
        Then click modal cancel button
        Then click form cancel button
        Then click Leave Anyway form button
        Then i am on Dashboard Page

    Scenario: Upload Subsequent Documents from the package dashboard
        Then click the actions button in row one
        Then click the Upload Subsequent Documents action button
        Then verify the page header is "Upload Subsequent 1915(c) Appendix K Documentation"
        Then verify "Waiver Amendment Number" is prefilled
        Then attach "adobe.pdf" file to attachment 1
        Then into "Reason for subsequent submission" type "This is an automated subsequent submission test."
        Then Click the Submit Button without waiting
        Then verify the modal pop-up is visible
        Then verify the dialog title contains "OneMAC only for document submission"
        Then verify the detailed text in the modal contains "States and CMS reviewers will communicate about the submission through email."
        Then click the yes, submit modal button
        Then i am on Dashboard Page
        Then verify the success message is "Documents submitted"

    Scenario: Upload Subsequent Documents from the details page
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then click the Upload Subsequent Documents action button
        Then verify the page header is "Upload Subsequent 1915(c) Appendix K Documentation"
        Then verify "Waiver Amendment Number" is prefilled
        Then attach "adobe.pdf" file to attachment 1
        Then into "Reason for subsequent submission" type "This is an automated subsequent submission test."
        Then Click the Submit Button without waiting
        Then verify the modal pop-up is visible
        Then verify the dialog title contains "OneMAC only for document submission"
        Then verify the detailed text in the modal contains "States and CMS reviewers will communicate about the submission through email."
        Then verify the yes, submit modal button is visible and clickable
        Then click the yes, submit modal button
        Then verify the package details page is visible
        Then verify the success message is "Documents submitted"
        Then verify the Subsequent Documentation Uploaded caret button exists
        Then verify the Subsequent Documentation download all button exists