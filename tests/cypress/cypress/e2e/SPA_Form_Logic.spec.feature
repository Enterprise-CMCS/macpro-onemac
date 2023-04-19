Feature: SPA Form Logic
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on Packages
        Then click on New Submission
        Then Click on State Plan Amendment SPA

    Scenario: Verify the SPA ID format check on Medicaid SPA
        Then click on Medicaid SPA
        Then type in Medicaid SPA ID 2
        Then select proposed effective date 3 months from today
        Then Add "15MB.pdf" file to form 179
        Then verify error message is not present on Medicaid SPA page
        Then Add file for SPA Pages
        Then verify the submit button is not disabled
        Then clear SPA ID in Medicaid SPA Input box
        Then type in invalid SPA ID on Medicaid SPA page
        Then verify that error message for incorrect SPA ID is Displayed
        Then verify the submit button is disabled
        Then clear SPA ID in Medicaid SPA Input box
        Then type in Medicaid SPA ID 2
        Then verify error message is not present on Medicaid SPA page
        Then verify the submit button is not disabled

    Scenario: Verify the SPA ID format check on CHIP SPA
        Then click on CHIP SPA
        Then type in Chip SPA ID 2
        Then select proposed effective date 3 months from today
        Then Add file for Current State Plan
        Then Add file for Amended State Plan Language
        Then Add file for Cover Letter
        Then verify error message is not present on Submit New CHIP SPA Page
        Then verify the submit button is not disabled
        Then clear SPA ID Input box CHIP SPA page
        Then type in invalid SPA ID on CHIP SPA page
        Then verify that error message for incorrect SPA ID is Displayed on CHIP SPA Page
        Then verify the submit button is disabled
        Then clear SPA ID Input box CHIP SPA page
        Then type in Chip SPA ID 2
        Then verify error message is not present on Submit New CHIP SPA Page
        Then verify the submit button is not disabled