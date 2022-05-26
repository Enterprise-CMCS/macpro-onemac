Feature: OY2_3900_SPA_Waivers_FormatTest
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission

    Scenario: Verify the SPA ID format check on Submit New SPA
        And Click on State Plan Amendment SPA
        And click on Medicaid SPA
        And type in SPA ID 1
        And verify error message is not present
        And clear SPA ID Input box
        And Return to dashboard Page
        Then click on New Submission
        And Click on State Plan Amendment SPA
        And click on Medicaid SPA
        And type in invalid SPA ID
        And verify that error message for incorrect SPA ID is Displayed
        And Return to dashboard Page

    #Feature: OY2_7522_Verify_Invalid_CHIP_SPAID_Message
    Scenario: Verify the SPA ID format check on Respond to SPA RAI
        And Click on State Plan Amendment SPA
        And click on CHIP SPA
        And type in CHIP ID
        And verify error message is not present on Submit New CHIP SPA Page
        And clear SPA ID Input box CHIP SPA page
        And type in CHIP ID
        And verify error message is not present
        And clear SPA ID Input box
        And type in invalid SPA ID on CHIP SPA page
        And verify that error message for incorrect SPA ID is Displayed on CHIP SPA Page
        And clear SPA ID Input box
        And type in invalid SPA ID
        And verify that error message for incorrect SPA ID is Displayed
        And Return to dashboard Page