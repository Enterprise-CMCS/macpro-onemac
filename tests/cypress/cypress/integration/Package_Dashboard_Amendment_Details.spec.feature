Feature: Amendment details
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And Click on Filter Button
        And click on Type
        And uncheck all of the type checkboxes

    Scenario: Screen Enhance: 1915 b Waiver Amendment Details View - Submitted
        And click 1915b Waiver Amendment check box
        And click on Type
        And click on Status
        And uncheck all of the status checkboxes
        And click Submitted checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Submitted"
        And verify package actions header is visible
        And verify withdraw package action exists
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify the type is 1915b Waiver Amendment
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the supporting documentation section exists
        And verify the download all button exists
        And verify the additional information section exists