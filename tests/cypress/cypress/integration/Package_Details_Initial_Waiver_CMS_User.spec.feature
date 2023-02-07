Feature: Waiver Package Details View: Initial Waivers
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login as EUA CMS Read Only User
        And click on the Waivers tab
        And Click on Filter Button
        And click on Type
        And uncheck all of the type checkboxes
        And click 1915b Initial Waiver check box
        And click on Type
        And click on Status
        And uncheck all of the status checkboxes

    Scenario: Screen Enhance: Initial Waiver Details View - Submitted - Intake Needed
        And click Submitted - Intake Needed checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Submitted - Intake Needed"
        And verify the package actions section is unavailable
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify the type is Initial Waiver
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the supporting documentation section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance: Initial Waiver Details View - Pending
        And click the Pending checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Pending"
        And verify the package actions section is unavailable
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify the type is Initial Waiver
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the Proposed Effective Date is Pending
        And verify the supporting documentation section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance: Initial Waiver Details View - Terminated
        And click Waiver Terminated checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Terminated"
        And verify the package actions section is unavailable
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify the type is Initial Waiver
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the Proposed Effective Date is Pending
        And verify the supporting documentation section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance: Initial Waiver Details View - Pending - RAI
        And click Pending - RAI checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Pending - RAI"
        And verify the package actions section is unavailable
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify the type is Initial Waiver
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the supporting documentation section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance: Initial Waiver Details View - Approved
        And click Approved checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Approved"
        And verify the package actions section is unavailable
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify the type is Initial Waiver
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the supporting documentation section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance: Initial Waiver Details View - Disapproved
        And click Disapproved checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Disapproved"
        And verify the package actions section is unavailable
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify the type is Initial Waiver
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the supporting documentation section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance: Initial Waiver Details View - Withdrawn
        And click the Package Withdrawn checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Package Withdrawn"
        And verify the package actions section is unavailable
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify the type is Initial Waiver
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the supporting documentation section exists
        And verify the download all button exists
        And verify the additional information section exists

    # Need seed data / reset data update
    # Scenario: Screen Enhance: Initial Waiver Details View - Pending - Concurrence
    #     And click the Pending - Concurrence checkbox
    #     And click the Waiver Number link in the first row
    #     And verify the package details page is visible
    #     And verify action card exists
    #     And verify the status on the card is "Pending - Concurrence"
    #     And verify the package actions section is unavailable
    #     And verify the details section exists
    #     And verify there is a Type header in the details section
    #     And verify the type is Initial Waiver
    #     And verify there is a State header in the details section
    #     And verify a state exists for the State
    #     And verify there is an Initial Submission Date header in the details section
    #     And verify a date exists for the Initial Submission Date
    #     And verify there is a Proposed Effective Date header in the details section
    #     And verify the supporting documentation section exists
    #     And verify the download all button exists
    #     And verify the additional information section exists

    # Need seed data / reset data update
    # Scenario: Screen Enhance: Initial Waiver Details View - Pending - Approval
    #     And click the Pending - Approval checkbox
    #     And click the Waiver Number link in the first row
    #     And verify the package details page is visible
    #     And verify action card exists
    #     And verify the status on the card is "Pending - Approval"
    #     And verify the package actions section is unavailable
    #     And verify the details section exists
    #     And verify there is a Type header in the details section
    #     And verify the type is Initial Waiver
    #     And verify there is a State header in the details section
    #     And verify a state exists for the State
    #     And verify there is an Initial Submission Date header in the details section
    #     And verify a date exists for the Initial Submission Date
    #     And verify there is a Proposed Effective Date header in the details section
    #     And verify the supporting documentation section exists
    #     And verify the download all button exists
    #     And verify the additional information section exists