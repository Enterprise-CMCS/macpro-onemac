Feature: Subsequent Submission 1915b Waiver Amendment
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with "an Active" "State Submitter" user
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click 1915b Waiver Amendment check box
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
        Then verify the page header is "Upload Subsequent Waiver Amendment Documentation"
        Then verify the form title is "Waiver Amendment Subsequent Submission Details"
        Then verify "1915(b) Waiver Amendment Number" is prefilled
        Then verify Type is "1915(b) Waiver Amendment"
        Then verify the Subsequent "Waiver Amendment" Documents section exists
        Then verify label "Reason for subsequent submission" exists on page
        Then verify the submit button is disabled
        Then verify form cancel button exists
        Then attach "adobe.pdf" file to attachment 1
        Then into "Reason for subsequent submission" type "This is an automated subsequent submission test."
        Then Click the Submit Button without waiting
        Then verify the modal pop-up is visible
        Then verify the dialog title contains "Submit additional documents?"
        Then verify the detailed text in the modal contains "These documents will be added to the package and reviewed by CMS."
        Then verify the yes, submit modal button is visible and clickable
        Then click modal cancel button
        Then click form cancel button
        Then click Leave Anyway form button
        Then verify the package details page is visible

        Scenario: Screen Enhance - Subsequent Documents from the package dashboard
        Then click the actions button in row one
        Then verify Upload Subsequent Documents action exists
        Then click the Upload Subsequent Documents action button
        Then verify the page header is "Upload Subsequent Waiver Amendment Documentation"
        Then verify the form title is "Waiver Amendment Subsequent Submission Details"
        Then verify "1915(b) Waiver Amendment Number" is prefilled
        Then verify Type is "1915(b) Waiver Amendment"
        Then verify the Subsequent "Waiver Amendment" Documents section exists
        Then verify label "Reason for subsequent submission" exists on page
        Then verify the submit button is disabled
        Then verify form cancel button exists
        Then attach "adobe.pdf" file to attachment 1
        Then into "Reason for subsequent submission" type "This is an automated subsequent submission test."
        Then Click the Submit Button without waiting
        Then verify the modal pop-up is visible
        Then verify the dialog title contains "Submit additional documents?"
        Then verify the detailed text in the modal contains "These documents will be added to the package and reviewed by CMS."
        Then verify the yes, submit modal button is visible and clickable
        Then click modal cancel button
        Then click form cancel button
        Then click Leave Anyway form button
        Then i am on Dashboard Page

    Scenario: Upload Subsequent Documents from the package dashboard
        Then click the actions button in row one
        Then click the Upload Subsequent Documents action button
        Then verify the page header is "Upload Subsequent Waiver Amendment Documentation"
        Then attach "adobe.pdf" file to attachment 1
        Then into "Reason for subsequent submission" type "This is an automated subsequent submission test."
        Then Click the Submit Button without waiting
        Then verify the modal pop-up is visible
        Then verify the dialog title contains "Submit additional documents?"
        Then verify the detailed text in the modal contains "These documents will be added to the package and reviewed by CMS."
        Then verify the yes, submit modal button is visible and clickable
        Then click the yes, submit modal button
        Then i am on Dashboard Page
        Then verify the success message is "Documents submitted"

    Scenario: Upload Subsequent Documents from the details page
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then click the Upload Subsequent Documents action button
        Then verify the page header is "Upload Subsequent Waiver Amendment Documentation"
        Then attach "adobe.pdf" file to attachment 1
        Then into "Reason for subsequent submission" type "This is an automated subsequent submission test."
        Then Click the Submit Button without waiting
        Then verify the modal pop-up is visible
        Then verify the dialog title contains "Submit additional documents?"
        Then verify the detailed text in the modal contains "These documents will be added to the package and reviewed by CMS."
        Then verify the yes, submit modal button is visible and clickable
        Then click the yes, submit modal button
        Then verify the package details page is visible
        Then verify the success message is "Documents submitted"
        Then verify the Subsequent Documentation Uploaded caret button exists
        Then verify the Subsequent Documentation download all button exists