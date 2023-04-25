Feature: Waiver Package Details View: Appendix K Amendment for a CMS User
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login as EUA CMS Read Only User
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click 1915c Appendix K Amendment check box
        Then click on Type
        Then click on Status
        Then uncheck all of the status checkboxes

    Scenario: Screen Enhance: Appendix K Details View - Submitted - Intake Needed
        Then click Submitted - Intake Needed checkbox
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Submitted - Intake Needed"
        Then verify the package actions section is unavailable
        Then verify the details section exists
        Then verify the package details title contains "Appendix K Amendment Package"
        Then verify the waiver authority header exists
        Then verify the waiver authority is 1915c HCBS
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Amendment Title header in the details section
        Then verify there is an Amendment Title under the header
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists

    Scenario: Screen Enhance: Appendix K Details View - Pending
        Then click the Pending checkbox
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Pending"
        Then verify the package actions section is unavailable
        Then verify the details section exists
        Then verify the package details title contains "Appendix K Amendment Package"
        Then verify the waiver authority header exists
        Then verify the waiver authority is 1915c HCBS
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Amendment Title header in the details section
        Then verify there is an Amendment Title under the header
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists

    Scenario: Screen Enhance: Appendix K Details View - Pending - RAI
        Then click Pending - RAI checkbox
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Pending - RAI"
        Then verify the package actions section is unavailable
        Then verify the details section exists
        Then verify the package details title contains "Appendix K Amendment Package"
        Then verify the waiver authority header exists
        Then verify the waiver authority is 1915c HCBS
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Amendment Title header in the details section
        Then verify there is an Amendment Title under the header
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists


    Scenario: Screen Enhance: Appendix K Details View - Approved
        Then click Approved checkbox
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Approved"
        Then verify the package actions section is unavailable
        Then verify the details section exists
        Then verify the package details title contains "Appendix K Amendment Package"
        Then verify the waiver authority header exists
        Then verify the waiver authority is 1915c HCBS
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Amendment Title header in the details section
        Then verify there is an Amendment Title under the header
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify the Proposed Effective Date is a date formated like Mon dd yyyy
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists

    Scenario: Screen Enhance: Appendix K Details View - Disapproved
        Then click Disapproved checkbox
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Disapproved"
        Then verify the package actions section is unavailable
        Then verify the details section exists
        Then verify the package details title contains "Appendix K Amendment Package"
        Then verify the waiver authority header exists
        Then verify the waiver authority is 1915c HCBS
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Amendment Title header in the details section
        Then verify there is an Amendment Title under the header
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists

    Scenario: Screen Enhance: Appendix K Details View - Withdrawn
        Then click the Package Withdrawn checkbox
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Package Withdrawn"
        Then verify the package actions section is unavailable
        Then verify the details section exists
        Then verify the package details title contains "Appendix K Amendment Package"
        Then verify the waiver authority header exists
        Then verify the waiver authority is 1915c HCBS
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Amendment Title header in the details section
        Then verify there is an Amendment Title under the header
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists

    Scenario: Screen Enhance: Appendix K Details View - Pending - Concurrence
        Then click the Pending - Concurrence checkbox
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Pending - Concurrence"
        Then verify the package actions section is unavailable
        Then verify the details section exists
        Then verify the package details title contains "Appendix K Amendment Package"
        Then verify the waiver authority header exists
        Then verify the waiver authority is 1915c HCBS
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Amendment Title header in the details section
        Then verify there is an Amendment Title under the header
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists

    Scenario: Screen Enhance: Appendix K Details View - Pending - Approval
        Then click the Pending - Approval checkbox
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Pending - Approval"
        Then verify the package actions section is unavailable
        Then verify the details section exists
        Then verify the package details title contains "Appendix K Amendment Package"
        Then verify the waiver authority header exists
        Then verify the waiver authority is 1915c HCBS
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Amendment Title header in the details section
        Then verify there is an Amendment Title under the header
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists