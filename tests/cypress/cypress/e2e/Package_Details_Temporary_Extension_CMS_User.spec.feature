Feature: Waiver Package Details View: Temporary Extension for a CMS User
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login as EUA CMS Read Only User
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Type
        Then uncheck all of the type checkboxes

    Scenario: Screen Enhance: 1915b Temporary Extension Details View - Requested
        Then click 1915b Temporary Extension check box
        Then click on Type
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Requested"
        Then verify the package actions section is unavailable
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify the type is 1915b Temporary Extension
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists
        Then verify subject is not visible in the details section
        Then verify description is not visible in the details section

    Scenario: Screen Enhance: 1915c Temporary Extension Details View - Requested
        Then click 1915c Temporary Extension check box
        Then click on Type
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Requested"
        Then verify the package actions section is unavailable
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify the type is 1915c Temporary Extension
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists
        Then verify subject is not visible in the details section
        Then verify description is not visible in the details section