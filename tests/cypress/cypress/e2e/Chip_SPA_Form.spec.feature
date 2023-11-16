Feature: Package Dashboard: CHIP SPA Forms
    Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with "an Active" "State Submitter" user
        Then click on New Submission
        Then click on "State Plan Amendment SPA" choice
        Then verify "CHIP SPA" choice goes to "/chip-spa"
        Then click on "CHIP SPA" choice

    Scenario: Screen Enhance - All Other CHIP SPA
        Then verify All Other CHIP SPA Submissions is a clickable option
        Then click All Other CHIP SPA Submissions
        Then verify user is on new CHIP SPA page
        Then verify the attachment info descriptiion
        Then verify the attachment info link is for "CHIP SPA"

    Scenario: Screen Enhance - CHIP Eligibility
        Then verify CHIP Eligibility is a clickable option
        Then click CHIP Eligibility
        Then verify user is on CHIP Eligibility page
        Then verify the page header is "CHIP Eligibility SPAs"
        Then verify Enter the MMDL System button is visible and clickable

    Scenario: Create All Other CHIP SPA Submission from package dashboard and search it
        Then click All Other CHIP SPA Submissions
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