Feature: Waiver Package Details View: Temporary Extension for a CMS User
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login as EUA CMS Read Only User
        And click on the Waivers tab
        And Click on Filter Button
        And click on Type
        And uncheck all of the type checkboxes
        And click Temporary Extension check box
        And click on Type
        And click on Status
        And uncheck all of the status checkboxes

    Scenario: Screen Enhance: Temporary Extension Details View - Submitted - Intake Needed
        And click Submitted - Intake Needed checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Submitted - Intake Needed"
        And verify the package actions section is unavailable
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify the type is Temporary Extension
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify the supporting documentation section exists
        And verify the download all button exists
        And verify the additional information section exists