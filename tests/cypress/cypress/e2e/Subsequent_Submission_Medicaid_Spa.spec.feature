Feature: Medicaid SPA State Details View - Card View with Actions 
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then Click on Filter Button
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click Medicaid SPA check box
        Then click on Type
        Then click on Status
        Then uncheck all of the status checkboxes

    Scenario: Screen Enhance
        Then click Under Review checkbox
        Then Click on Filter Button
        Then click the actions button in row one
        Then verify Upload Subsequent Documents action exists
        Then click the SPA ID link in the first row
        Then verify the package details page is visible
        Then verify Upload Subsequent Documents action exists
        Then click the Upload Subsequent Documents action button
        Then verify the form title is "Upload Subsequent Medicaid SPA Documentation"
        Then verify the form header is "Medicaid SPA Subsequent Submission Details"
        Then verify the ID is prefilled
        Then verify the type is Medicaid SPA
        Then verify the Subsequent "Medicaid SPA" Documents section exists
        Then verify the Cover Letter attachment is not listed
        Then verify the Additional Information header exists
        Then verify the form Submit Button exists
        Then verify the submit button is disabled
        Then verify form cancel button exists

    Scenario: Upload Subsequent Documents from the package dashboard
        Then click Under Review checkbox
        Then Click on Filter Button
        Then click the actions button in row one
        Then click the Upload Subsequent Documents action button
        Then verify the form title is "Upload Subsequent Medicaid SPA Documentation"
        Then verify the ID is prefilled
        Then Add file for SPA Pages
        Then Type Additonal Info Comments in new form
        Then Click the Submit Button without waiting
        Then verify the modal pop-up is visible
        Then verify the detailed text in the modal contains "OneMAC is solely for file submission purposes."
        Then verify the yes, submit modal button is visible and clickable
        Then click modal cancel button

    Scenario: Upload Subsequent Documents from the details page
        Then click Under Review checkbox
        Then Click on Filter Button
        Then click the SPA ID link in the first row
        Then verify the package details page is visible
        Then click the Upload Subsequent Documents action button
        Then verify the form title is "Upload Subsequent Medicaid SPA Documentation"
        Then verify the ID is prefilled
        Then Add file for CMS Form 179
        Then Type Additonal Info Comments in new form
        Then Click the Submit Button without waiting
        Then verify the modal pop-up is visible
        Then verify the detailed text in the modal contains "OneMAC is solely for file submission purposes."
        Then verify the yes, submit modal button is visible and clickable
        Then click modal cancel button