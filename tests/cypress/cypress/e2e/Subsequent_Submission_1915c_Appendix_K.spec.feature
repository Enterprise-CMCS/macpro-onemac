Feature: Subsequent Submission 1915c App K Waiver
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
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

    Scenario: Screen Enhance
        Then click the actions button in row one
        Then verify Upload Subsequent Documents action exists
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify Upload Subsequent Documents action exists
        Then click the Upload Subsequent Documents action button
        Then verify the form title is "Upload Subsequent Waiver Documentation"
        Then verify the form header is "Initial Waiver Subsequent Submission Details"
        Then verify the Waiver Number is prefilled
        Then verify the type is 1915c Appendix K Amendment
        Then verify the Subsequent "Waiver Appendix K" Documents section exists
        Then verify the Additional Information header exists
        Then verify the form Submit Button exists
        Then verify the submit button is disabled
        Then verify form cancel button exists

    Scenario: Upload Subsequent Documents from the package dashboard
        Then click the actions button in row one
        Then click the Upload Subsequent Documents action button
        Then verify the form title is "Upload Subsequent Waiver Documentation"
        Then verify the Waiver Number is prefilled
        Then Add file for Subsequent Submission
        Then Type Additonal Info Comments in new form
        Then Click the Submit Button without waiting
        Then verify the modal pop-up is visible
        Then verify the detailed text in the modal contains "OneMAC is solely for file submission purposes."
        Then click the yes, submit modal button
        Then verify the success message is "Success"
        Then verify the Waivers tab is selected

    Scenario: Upload Subsequent Documents from the details page
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then click the Upload Subsequent Documents action button
        Then verify the form title is "Upload Subsequent Waiver Documentation"
        Then verify the Waiver Number is prefilled
        Then Add file for Subsequent Submission
        Then Type Additonal Info Comments in new form
        Then Click the Submit Button without waiting
        Then verify the modal pop-up is visible
        Then verify the detailed text in the modal contains "OneMAC is solely for file submission purposes."
        Then click the yes, submit modal button
        Then verify the success message is "Success"
        Then verify the package details page is visible