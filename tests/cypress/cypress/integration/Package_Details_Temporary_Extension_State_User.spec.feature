Feature: Waiver Package Details View:  Temporary Extension for a State User
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on the Waivers tab
        And Click on Filter Button
        And click on Type
        And uncheck all of the type checkboxes
        And click Temporary Extension check box
        And click on Type
        And click on Status
        And uncheck all of the status checkboxes

    Scenario: Screen Enhance: Temporary Extension Details View - Submitted
        And click Submitted checkbox
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Submitted"
        And verify package actions header is visible
        And verify there are no package actions available
        And verify the details section exists
        And verify there is a Type header in the details section
        #And verify the type is Temporary Extension
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify the attachments section exists
        And verify the download all button exists
        And verify the additional information section exists

        #This scenario isn't testable since submitted state temporary extensions
        #can not be withdrawn and these are not in seatool so status can not change
    # Scenario: Screen Enhance: Temporary Extension Details View - Withdrawal Requested
    #     And click the Withdrawal Requested checkbox
    #     And click the Waiver Number link in the first row
    #     And verify the package details page is visible
    #     And verify action card exists
    #     And verify the status on the card is "Withdrawal Requested"
    #     And verify package actions header is visible
    #     And verify there are no package actions available
    #     And verify the details section exists
    #     And verify there is a Type header in the details section
    #     And verify the type is Temporary Extension
    #     And verify there is an Initial Submission Date header in the details section
    #     And verify a date exists for the Initial Submission Date
    #     And verify the attachments section exists
    #     And verify the download all button exists
    #     And verify the additional information section exists