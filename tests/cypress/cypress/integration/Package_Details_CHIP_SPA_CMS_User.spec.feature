Feature: CHIP SPA CMS Details View - Card View with Actions 
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login as EUA CMS Read Only User
        And click on Packages
        And Click on Filter Button
        And click on Type
        And uncheck all of the type checkboxes
        And click CHIP SPA check box
        And click on Type
        And click on Status
        And uncheck all of the status checkboxes

    Scenario: Screen Enhance - Submitted - Intake Needed CHIP SPA
        And click Submitted - Intake Needed checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Submitted - Intake Needed"
        And verify the package actions section is unavailable
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the supporting documentation section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance - Pending CHIP SPA
        And click the Pending checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Pending"
        And verify the package actions section is unavailable
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the supporting documentation section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance - Withdrawn CHIP SPA
        And click the Package Withdrawn checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Withdrawn"
        And verify the package actions section is unavailable
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the supporting documentation section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance - Disapproved CHIP SPA
        And click Disapproved checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Disapproved"
        And verify the package actions section is unavailable
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the supporting documentation section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance - Pending - RAI CHIP SPA
        And click Pending - RAI checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Pending - RAI"
        And verify the package actions section is unavailable
        And verify the package details page is visible
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the supporting documentation section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance - Approved CHIP SPA
        And click Approved checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Approved"
        And verify there is not a 90th day date on the card
        And verify the package actions section is unavailable
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the Proposed Effective Date is a date formated like Mon dd yyyy
        And verify the supporting documentation section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance - Pending - Concurrence CHIP SPA
        And click the Pending - Concurrence checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Pending - Concurrence"
        And verify the package actions section is unavailable
        And verify the package details page is visible
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the supporting documentation section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance - Pending - Approval CHIP SPA
        And click the Pending - Approval checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Pending - Approval"
        And verify the package actions section is unavailable
        And verify the package details page is visible
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the supporting documentation section exists
        And verify the download all button exists
        And verify the additional information section exists