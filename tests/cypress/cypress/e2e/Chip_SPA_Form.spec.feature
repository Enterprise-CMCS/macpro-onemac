Feature: Package Dashboard: CHIP SPA Initial Submission
    Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with "an Active" "State Submitter" user
        Then click on New Submission
        Then click on "State Plan Amendment (SPA)" choice
        Then verify "CHIP SPA" choice goes to "/choices/spa/chip"
        Then click on "CHIP SPA" choice

    Scenario: Screen Enhance - CHIP Eligibility is Outside of OneMAC
        Then verify "CHIP Eligibility" choice goes to "/chip-eligibility"
        Then click on "CHIP Eligibility" choice
        Then verify page url contains "/chip-eligibility"
        Then verify the page header is "CHIP Eligibility SPAs"
        Then verify Enter the MMDL System button is visible and clickable

    Scenario: Create Medicaid SPA Initial Submission in OneMAC using the All Other CHIP SPA Submissions choice
        Then verify "All Other CHIP SPA Submissions" choice goes to "/chip-spa"
        Then click on "All Other CHIP SPA Submissions" choice
        Then verify page url contains "/chip-spa"
        Then verify the page header is "Submit New CHIP SPA"
        Then type "MD-22-0283-9434" into the ID Input box
        Then select proposed effective date 3 months from today
        Then verify the attachment info descriptiion
        Then verify the attachment info link is for "CHIP SPA"
        Then Attach "picture.jpg" file to attachment 1
        Then Attach "adobe.pdf" file to attachment 2
        Then Attach "adobe.pdf" file to attachment 3
        Then Type Additonal Info Comments in new form
        Then Click on Submit Button
        Then verify submission successful message in the alert bar
        Then verify the SPAs tab is selected
        Then search for CHIP SPA ID
        Then verify id number in the first row matches CHIP SPA ID