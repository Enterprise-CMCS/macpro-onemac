Feature: Waiver Package Details View:  Temporary Extension for a State User
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click Temporary Extension check box
        Then click on Type
        Then click on Status
        Then uncheck all of the status checkboxes

    Scenario: Screen Enhance: Temporary Extension Details View - Submitted
        Then click Submitted checkbox
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Submitted"
        Then verify package actions header is visible
        Then verify there are no package actions available
        Then verify the details section exists
        Then verify there is a Type header in the details section
        #Then verify the type is Temporary Extension
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists

        #This scenario isn't testable since submitted state temporary extensions
        #can not be withdrawn and these are not in seatool so status can not change
    # Scenario: Screen Enhance: Temporary Extension Details View - Withdrawal Requested
    #     Then click the Withdrawal Requested checkbox
    #     Then click the Waiver Number link in the first row
    #     Then verify the package details page is visible
    #     Then verify 2 action cards exist
    #     Then verify the status on the card is "Withdrawal Requested"
    #     Then verify package actions header is visible
    #     Then verify there are no package actions available
    #     Then verify the details section exists
    #     Then verify there is a Type header in the details section
    #     Then verify the type is Temporary Extension
    #     Then verify there is an Initial Submission Date header in the details section
    #     Then verify a date exists for the Initial Submission Date
    #     Then verify the attachments section exists
    #     Then verify the download all button exists
    #     Then verify the additional information section exists