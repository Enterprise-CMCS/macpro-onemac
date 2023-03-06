Feature: Waiver Package Details View: Appendix K Amendment for a CMS User
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login as EUA CMS Read Only User
        And click on the Waivers tab
        And Click on Filter Button
        And click on Type
        And uncheck all of the type checkboxes
        And click 1915c Appendix K Amendment check box
        And click on Type
        And click on Status
        And uncheck all of the status checkboxes

    Scenario: Screen Enhance: Appendix K Details View - Submitted - Intake Needed
        And click Submitted - Intake Needed checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Submitted - Intake Needed"
        And verify the package actions section is unavailable
        And verify the details section exists
        And verify the waiver authority header exists
        And verify the waiver authority is 1915c HCBS
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Amendment Title in the details section
        And verify the Amendment Title is "Appendix K Amendment"
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the attachments section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance: Appendix K Details View - Pending
        And click the Pending checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Pending"
        And verify the package actions section is unavailable
        And verify the details section exists
        And verify the waiver authority header exists
        And verify the waiver authority is 1915c HCBS
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Amendment Title in the details section
        And verify the Amendment Title is "Appendix K Amendment"
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the attachments section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance: Appendix K Details View - Pending - RAI
        And click Pending - RAI checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Pending - RAI"
        And verify the package actions section is unavailable
        And verify the details section exists
        And verify the waiver authority header exists
        And verify the waiver authority is 1915c HCBS
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Amendment Title in the details section
        And verify the Amendment Title is "Appendix K Amendment"
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the attachments section exists
        And verify the download all button exists
        And verify the additional information section exists

    # Need seed data / reset data update
    # Scenario: Screen Enhance: Appendix K Details View - Approved
    #     And click Approved checkbox
    #     And click the Waiver Number link in the first row
    #     And verify the package details page is visible
    #     And verify action card exists
    #     And verify the status on the card is "Approved"
    #     And verify the package actions section is unavailable
    #     And verify the details section exists
    #     And verify the waiver authority header exists
    #     And verify the waiver authority is 1915c HCBS
    #     And verify there is a State header in the details section
    #     And verify a state exists for the State
    #     And verify there is an Amendment Title in the details section
    #     And verify the Amendment Title is "Appendix K Amendment"
    #     And verify there is an Initial Submission Date header in the details section
    #     And verify a date exists for the Initial Submission Date
    #     And verify there is a Proposed Effective Date header in the details section
    #     And verify the Proposed Effective Date is a date formated like Mon dd yyyy
    #     And verify the attachments section exists
    #     And verify the download all button exists
    #     And verify the additional information section exists

    # Scenario: Screen Enhance: Appendix K Details View - Disapproved
    #     And click Disapproved checkbox
    #     And click the Waiver Number link in the first row
    #     And verify the package details page is visible
    #     And verify action card exists
    #     And verify the status on the card is "Disapproved"
    #     And verify the package actions section is unavailable
    #     And verify the details section exists
    #     And verify the waiver authority header exists
    #     And verify the waiver authority is 1915c HCBS
    #     And verify there is a State header in the details section
    #     And verify a state exists for the State
    #     And verify there is an Amendment Title in the details section
    #     And verify the Amendment Title is "Appendix K Amendment"
    #     And verify there is an Initial Submission Date header in the details section
    #     And verify a date exists for the Initial Submission Date
    #     And verify there is a Proposed Effective Date header in the details section
    #     And verify the attachments section exists
    #     And verify the download all button exists
    #     And verify the additional information section exists

    Scenario: Screen Enhance: Appendix K Details View - Withdrawn
        And click the Package Withdrawn checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Package Withdrawn"
        And verify the package actions section is unavailable
        And verify the details section exists
        And verify the waiver authority header exists
        And verify the waiver authority is 1915c HCBS
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Amendment Title in the details section
        And verify the Amendment Title is "Appendix K Amendment"
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the attachments section exists
        And verify the download all button exists
        And verify the additional information section exists

    # Need seed data / reset data update
    # Scenario: Screen Enhance: Appendix K Details View - Pending - Concurrence
    #     And click the Pending - Concurrence checkbox
    #     And click the Waiver Number link in the first row
    #     And verify the package details page is visible
    #     And verify action card exists
    #     And verify the status on the card is "Pending - Concurrence"
    #     And verify the package actions section is unavailable
    #     And verify the details section exists
    #     And verify the waiver authority header exists
    #     And verify the waiver authority is 1915c HCBS
    #     And verify there is a State header in the details section
    #     And verify a state exists for the State
    #     And verify there is an Amendment Title in the details section
    #     And verify the Amendment Title is "Appendix K Amendment"
    #     And verify there is an Initial Submission Date header in the details section
    #     And verify a date exists for the Initial Submission Date
    #     And verify there is a Proposed Effective Date header in the details section
    #     And verify the attachments section exists
    #     And verify the download all button exists
    #     And verify the additional information section exists

    # Scenario: Screen Enhance: Appendix K Details View - Pending - Approval
    #     And click the Pending - Approval checkbox
    #     And click the Waiver Number link in the first row
    #     And verify the package details page is visible
    #     And verify action card exists
    #     And verify the status on the card is "Pending - Approval"
    #     And verify the package actions section is unavailable
    #     And verify the details section exists
    #     And verify the waiver authority header exists
    #     And verify the waiver authority is 1915c HCBS
    #     And verify there is a State header in the details section
    #     And verify a state exists for the State
    #     And verify there is an Amendment Title in the details section
    #     And verify the Amendment Title is "Appendix K Amendment"
    #     And verify there is an Initial Submission Date header in the details section
    #     And verify a date exists for the Initial Submission Date
    #     And verify there is a Proposed Effective Date header in the details section
    #     And verify the attachments section exists
    #     And verify the download all button exists
    #     And verify the additional information section exists