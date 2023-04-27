Feature: Medicaid SPA CMS Details View - Card View with Actions 
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login as EUA CMS Read Only User
        Then Click on Filter Button
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click Medicaid SPA check box
        Then click on Type
        Then click on Status
        Then uncheck all of the status checkboxes

    Scenario: Screen Enhance - Submitted - Intake Needed Medicaid SPA
        Then click Submitted - Intake Needed checkbox
        Then Click on Filter Button
        Then click the SPA ID link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Submitted - Intake Needed"
        Then verify the package actions section is unavailable
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify the type is Medicaid SPA
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify there is a Subject header in the details section
        Then verify there is a description header in the details section
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists

    Scenario: Screen Enhance - Pending Medicaid SPA
        Then click the Pending checkbox
        Then Click on Filter Button
        Then click the SPA ID link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Pending"
        Then verify the package actions section is unavailable
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify the type is Medicaid SPA
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify there is a Subject header in the details section
        Then verify the subject has a value displayed in the details section
        Then verify there is a description header in the details section
        Then verify the description has a value displayed in the details section
        Then verify the attachments section exists
        #Then verify the download all button exists
        Then verify the additional information section exists

    Scenario: Screen Enhance - Withdrawn Medicaid SPA
        Then click the Package Withdrawn checkbox
        Then Click on Filter Button
        Then click the SPA ID link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Withdrawn"
        Then verify the package actions section is unavailable
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify the type is Medicaid SPA
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify there is a Subject header in the details section
        Then verify the subject has a value displayed in the details section
        Then verify there is a description header in the details section
        Then verify the description has a value displayed in the details section
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists

    Scenario: Screen Enhance - Disapproved Medicaid SPA
        Then click Disapproved checkbox
        Then Click on Filter Button
        Then click the SPA ID link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Disapproved"
        Then verify the package actions section is unavailable
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify the type is Medicaid SPA
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify there is a Subject header in the details section
        Then verify the subject has a value displayed in the details section
        Then verify there is a description header in the details section
        Then verify the description has a value displayed in the details section
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists

    # Need seed data / reset data update
    Scenario: Screen Enhance - Pending - RAI Medicaid SPA
        Then click Pending - RAI checkbox
        Then Click on Filter Button
        Then click the SPA ID link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Pending - RAI"
        Then verify the package actions section is unavailable
        Then verify the package details page is visible
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify the type is Medicaid SPA
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify there is a Subject header in the details section
        Then verify the subject has a value displayed in the details section
        Then verify there is a description header in the details section
        Then verify the description has a value displayed in the details section
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists

    Scenario: Screen Enhance - Approved Medicaid SPA
        Then click Approved checkbox
        Then Click on Filter Button
        Then click the SPA ID link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Approved"
        Then verify there is not a 90th day date on the card
        Then verify the package actions section is unavailable
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify the type is Medicaid SPA
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify there is a Subject header in the details section
        Then verify the subject has a value displayed in the details section
        Then verify there is a description header in the details section
        Then verify the description has a value displayed in the details section
        Then verify the Proposed Effective Date is a date formated like Mon dd yyyy
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists

    Scenario: Screen Enhance - Pending - Concurrence Medicaid SPA
        Then click the Pending - Concurrence checkbox
        Then Click on Filter Button
        Then click the SPA ID link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Pending - Concurrence"
        Then verify the package actions section is unavailable
        Then verify the package details page is visible
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify a type containing SPA exists for the Type
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify there is a Subject header in the details section
        Then verify the subject has a value displayed in the details section
        Then verify there is a description header in the details section
        Then verify the description has a value displayed in the details section
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists

    Scenario: Screen Enhance - Pending - Approval Medicaid SPA
        Then click the Pending - Approval checkbox
        Then Click on Filter Button
        Then click the SPA ID link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Pending - Approval"
        Then verify the package actions section is unavailable
        Then verify the package details page is visible
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify a type containing SPA exists for the Type
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify there is a Subject header in the details section
        Then verify the subject has a value displayed in the details section
        Then verify there is a description header in the details section
        Then verify the description has a value displayed in the details section
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists