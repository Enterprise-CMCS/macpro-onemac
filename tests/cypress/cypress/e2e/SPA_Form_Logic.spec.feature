Feature: SPA Form Logic
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with "an Active" "State Submitter" user
        Then click on Packages
        Then click on New Submission
        Then Click on State Plan Amendment SPA

    Scenario: Verify the SPA ID format check on Medicaid SPA
        Then click on Medicaid SPA
        Then click All Other Medicaid SPA Submissions
        Then type in Medicaid SPA ID 2
        Then set "Proposed Effective Date of Medicaid SPA" to 3 months from today
        Then Add "15MB.pdf" file to form 179
        Then verify error message is not present on Medicaid SPA page
        Then Add file for SPA Pages
        Then verify the submit button is not disabled
        Then clear the ID Input box
        Then type in invalid SPA ID on Medicaid SPA page
        Then verify that error message for incorrect SPA ID is Displayed
        Then verify the submit button is disabled
        Then clear the ID Input box
        Then type in Medicaid SPA ID 2
        Then verify error message is not present on Medicaid SPA page
        Then verify the submit button is not disabled

    Scenario: Verify the SPA ID format check on CHIP SPA
        Then click on CHIP SPA
        Then click All Other CHIP SPA Submissions
        Then type in Chip SPA ID 2
        Then set "Proposed Effective Date of CHIP SPA" to 3 months from today
        Then attach "picture.jpg" file to attachment 1
        Then attach "adobe.pdf" file to attachment 2
        Then attach "adobe.pdf" file to attachment 3
        Then verify ID error message is not present
        Then verify the submit button is not disabled
        Then clear the ID Input box
        Then into "SPA ID" type "MD-DD-DDDD"
        Then verify the ID error message is "The SPA ID must be in the format of SS-YY-NNNN-xxxx"
        Then verify the submit button is disabled
        Then clear the ID Input box
        Then type "MD-22-0283-VM" into the ID Input box
        Then verify ID error message is not present
        Then verify the submit button is not disabled