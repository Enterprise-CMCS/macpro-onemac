Feature: Package Dashboard: CHIP SPA Form

    Scenario: Screen Enhance - CHIP SPA
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        Then click on New Submission
        And Click on State Plan Amendment SPA
        And verify CHIP SPA is a clickable option
        And click on CHIP SPA
        And verify user is on new CHIP SPA page

    Scenario: Create CHIP SPA from package dashboard and search it
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        Then click on New Submission
        And Click on State Plan Amendment SPA
        And click on CHIP SPA
        And type in Chip SPA ID
        And select proposed effective date 3 months from today
        And Add file for Current State Plan
        And Add file for Amended State Plan Language
        And Add file for Cover Letter
        And Type Additonal Info Comments in new form
        And Click on Submit Button
        And verify submission successful message in the alert bar
        And verify the SPAs tab is selected
        And search for CHIP SPA ID
        And verify id number in the first row matches CHIP SPA ID