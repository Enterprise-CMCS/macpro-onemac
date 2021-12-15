Feature: OY2_3900_SPA_Waivers_FormatTest
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission

    Scenario: Verify the SPA ID format check on Submit New SPA
        And Click on State Plan Amendment SPA
        And click on Medicaid SPA
        And type in SPA ID
        And verify error message is not present
        And clear SPA ID Input box
        And type in SPA ID
        And verify error message is not present
        And clear SPA ID Input box
        And Return to dashboard Page
        Then click on New Submission
        And Click on State Plan Amendment SPA
        And click on Medicaid SPA
        And type in invalid SPA ID
        And verify that error message for incorrect SPA ID is Displayed
        And Return to dashboard Page

    Scenario: Verify the SPA ID format check on Respond to SPA RAI
        And Click on State Plan Amendment SPA
        And click on CHIP SPA
        And type in SPA ID in CHIP SPA page
        And verify error message is not present on Submit New CHIP SPA Page
        And clear SPA ID Input box CHIP SPA page
        And type in SPA ID in CHIP SPA page
        And verify error message is not present
        And clear SPA ID Input box
        And type in invalid SPA ID on CHIP SPA page
        And verify that error message for incorrect SPA ID is Displayed on CHIP SPA Page
        And Return to dashboard Page

    Scenario: Verify the Waiver Number format on Submit New Waiver Action
        And Click on Waiver Action
        And Click on Waiver Action under Waiver Type
        And Click on New Waiver under Action type
        And type in a correct Waiver Number with 4 characters
        And verify error message is not present on New Waiver Page
        And clear Waiver Number Input box
        And type in a correct Waiver Number with 5 characters
        And verify error message is not present on New Waiver Page
        And clear Waiver Number Input box
        And type in invalid Waiver Number
        And verify error message is present on New Waiver Page
        And Return to dashboard Page

    Scenario: Verify the Waiver Number format on Temporary Extension Form
        And Click on Waiver Action
        And Click on Request Temporary Extension
        And Type waiver number with 4 characters on Request Waiver Temporary Extenstion Page
        And verify error message is not present on Request Waiver Temporary Extenstion Page
        And clear Waiver Number Input box on Request Waiver Temporary Extenstion Page
        And Type Valid Waiver Number With 5 Characters
        And verify error message is not present on Request Waiver Temporary Extenstion Page
        And clear Waiver Number Input box on Request Waiver Temporary Extenstion Page
        And type in invalid Waiver Number on Request Waiver Temporary Extenstion Page
        And verify that error message for incorrect Waiver Number is Displayed
        And Return to dashboard Page

    Scenario: Verify the Waiver Number format on Appendix K Form
        And Click on Waiver Action
        And Click on Appendix K Amendment
        And type in Waiver Number with 4 characters On Appendix K Amendment Page
        And verify error message is not present On Appendix K Amendment Page
        And clear Waiver Number Input box On Appendix K Amendment Page
        And type in Waiver Number with 5 characters On Appendix K Amendment Page
        And verify error message is not present On Appendix K Amendment Page
        And clear Waiver Number Input box On Appendix K Amendment Page
        And type in invalid Waiver Number On Appendix K Amendment Page
        And verify that error message for incorrect Waiver Number is Displayed On Appendix K Amendment Page
        And Return to dashboard Page










