Feature: OY2-11581 Add an Expiration Date Column to the Package Dashboard part 2

    Scenario: Expiration Date column should Show N/A for CHIP SPA
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on State Plan Amendment SPA
        And click on CHIP SPA
        And type in SPA ID in CHIP SPA page
        And Add file for Current State Plan
        And Add file for Amended State Plan Language
        And Add file for Cover Letter
        And Type Additonal Information Comments
        And Click on Submit Button
        And verify submission Successful message
        And click on Packages
        And Expiration Date value for generated Record is "N/A"
