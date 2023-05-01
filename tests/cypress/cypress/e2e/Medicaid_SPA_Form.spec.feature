Feature: Package Dashboard: Medicaid SPA Form
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user

    Scenario: Screen Enhance - Medicaid SPA
        Then click on New Submission
        Then Click on State Plan Amendment SPA
        Then verify Medicaid SPA is a clickable option
        Then click on Medicaid SPA
        Then verify user is on new Medicaid SPA page

    Scenario: Create Medicaid SPA from package dashboard and search it
        Then click on New Submission
        Then Click on State Plan Amendment SPA
        Then click on Medicaid SPA
        Then type in Medicaid SPA ID
        Then select proposed effective date 3 months from today
        Then Add file for CMS Form 179
        Then Add file for SPA Pages
        Then Type Additonal Info Comments in new form
        Then Click on Submit Button
        Then verify submission successful message in the alert bar
        Then verify the SPAs tab is selected
        Then search for Medicaid SPA ID
        Then verify id number in the first row matches Medicaid SPA ID