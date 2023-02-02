Feature: SPA Form Logic
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        Then click on New Submission
        And Click on State Plan Amendment SPA

    Scenario: Verify the SPA ID format check on Medicaid SPA
        And click on Medicaid SPA
        And type in Medicaid SPA ID 2
        And select proposed effective date 3 months from today
        And Add "15MB.pdf" file to form 179
        And verify error message is not present on Medicaid SPA page
        And Add file for SPA Pages
        And verify the submit button is not disabled
        And clear SPA ID in Medicaid SPA Input box
        And type in invalid SPA ID on Medicaid SPA page
        And verify that error message for incorrect SPA ID is Displayed
        And verify the submit button is disabled
        And clear SPA ID in Medicaid SPA Input box
        And type in Medicaid SPA ID 2
        And verify error message is not present on Medicaid SPA page
        And verify the submit button is not disabled
@focus 
    Scenario: Verify the SPA ID format check on CHIP SPA
        And click on CHIP SPA
        And type in Chip SPA ID 2
        And select proposed effective date 3 months from today
        And Add file for Current State Plan
        And Add file for Amended State Plan Language
        And Add file for Cover Letter
        And verify error message is not present on Submit New CHIP SPA Page
        And verify the submit button is not disabled
        And clear SPA ID Input box CHIP SPA page
        And type in invalid SPA ID on CHIP SPA page
        And verify that error message for incorrect SPA ID is Displayed on CHIP SPA Page
        And verify the submit button is disabled
        And clear SPA ID Input box CHIP SPA page
        And type in Chip SPA ID 2
        And verify error message is not present on Submit New CHIP SPA Page
        And verify the submit button is not disabled