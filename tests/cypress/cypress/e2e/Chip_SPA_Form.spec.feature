Feature: Package Dashboard: CHIP SPA Form

    Scenario: Screen Enhance - CHIP SPA
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        Then Click on State Plan Amendment SPA
        Then verify CHIP SPA is a clickable option
        Then click on CHIP SPA
        Then verify user is on new CHIP SPA page
        Then verify the attachment info descriptiion
        Then verify the attachment info link is for "CHIP SPA"

    Scenario: Create CHIP SPA from package dashboard and search it
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        Then Click on State Plan Amendment SPA
        Then click on CHIP SPA
        Then type in Chip SPA ID
        Then select proposed effective date 3 months from today
        Then Add file for Current State Plan
        Then Add file for Amended State Plan Language
        Then Add file for Cover Letter
        Then Type Additonal Info Comments in new form
        Then Click on Submit Button
        Then verify submission successful message in the alert bar
        Then verify the SPAs tab is selected
        Then search for CHIP SPA ID
        Then verify id number in the first row matches CHIP SPA ID