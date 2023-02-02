Feature: Waiver Package Details View: 1915 b Waiver Amendment for a State User
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And Click on Filter Button
        And click on Type
        And uncheck all of the type checkboxes
        And click 1915b Waiver Amendment check box
        And click on Type
        And click on Status
        And uncheck all of the status checkboxes

    Scenario: Screen Enhance: 1915 b Waiver Amendment Details View - Submitted
        And click Submitted checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Submitted"
        And verify package actions header is visible
        And verify there are no package actions available
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

    Scenario: Screen Enhance: 1915 b Waiver Amendment Details View - Under Review
        And click Under Review checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Under Review"
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

    Scenario: Screen Enhance: 1915 b Waiver Amendment Details View - RAI Issued
        And click RAI Issued checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "RAI Issued"
        And verify package actions header is visible
        And verify withdraw package action exists
        And verify Respond to RAI action exists
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

    Scenario: Screen Enhance: 1915 b Waiver Amendment Details View - Approved
        And click Approved checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Approved"
        And verify package actions header is visible
        And verify there are no package actions available
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify the type is 1915b Waiver Amendment
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the Proposed Effective Date is a date formated like Mon dd yyyy
        And verify the supporting documentation section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance: 1915 b Waiver Amendment Details View - Disapproved
        And click Disapproved checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Disapproved"
        And verify package actions header is visible
        And verify there are no package actions available
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

    Scenario: Screen Enhance: 1915 b Waiver Amendment Details View - Withdrawal Requested
        And click the Withdrawal Requested checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Withdrawal Requested"
        And verify package actions header is visible
        And verify there are no package actions available
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

    Scenario: Screen Enhance: 1915 b Waiver Amendment Details View - Package Withdrawn
        And click the Package Withdrawn checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Package Withdrawn"
        And verify package actions header is visible
        And verify there are no package actions available
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