Feature: OY2_7522_Verify_Invalid_CHIP_SPAID_Message
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission

    Scenario: State Submitter user see error message when waiver number not exist in 1915c Appendix forms
        And Click on State Plan Amendment SPA
        And click on CHIP SPA
        And type in SPA ID in CHIP SPA page
        And verify error message is not present on Submit New CHIP SPA Page
        And type in invalid SPA ID
        And verify that error message for incorrect SPA ID is Displayed