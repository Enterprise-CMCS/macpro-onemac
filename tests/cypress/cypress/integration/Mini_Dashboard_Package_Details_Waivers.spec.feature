Feature: OY2-11585 Waiver Package Details View: Base Waivers and Waiver Renewals
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And Click on Filter Button
        And click on Type

    Scenario: Screen Enhance: Base Waiver Details View - In Review
        And click 1915b Waiver Renewal check box
        And click on Type
        And click on Status
        And click all of the status checkboxes
        And click In Review checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "In Review"
        And verify package actions header is visible
        And verify withdraw package action exists
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify the type is Base Waiver
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is a Date Submitted header in the details section
        And verify a date exists for the Date Submitted
        And verify there is a Proposed Effective Date header in the details section
        And verify the Proposed Effective Date is NA

    Scenario: Screen Enhance: Base Waiver Details View - Terminated
        And click 1915b Waiver Renewal check box
        And click on Type
        And click on Status
        And click all of the status checkboxes
        And click Terminated checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Terminated"
        And verify there are no package actions available
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify the type is Base Waiver
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is a Date Submitted header in the details section
        And verify a date exists for the Date Submitted
        And verify there is a Proposed Effective Date header in the details section
        And verify the Proposed Effective Date is NA

    Scenario: Screen Enhance: Base Waiver Details View - Submitted
        And click 1915b Waiver Renewal check box
        And click on Type
        And click on Status
        And click all of the status checkboxes
        And click Submitted checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Submitted"
        And verify package actions header is visible
        And verify withdraw package action exists
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify the type is Base Waiver
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is a Date Submitted header in the details section
        And verify a date exists for the Date Submitted
        And verify there is a Proposed Effective Date header in the details section

    Scenario: Screen Enhance: Waiver Renewals Details View - Submitted
        And click 1915b Base Waiver check box
        And click on Type
        And click on Status
        And click all of the status checkboxes
        And click Submitted checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Submitted"
        And verify package actions header is visible
        And verify withdraw package action exists
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify the type is Waiver Renewal
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is a Date Submitted header in the details section
        And verify a date exists for the Date Submitted
        And verify there is a Proposed Effective Date header in the details section
        