Feature: Package Dashboard: Medicaid SPA Form

    Scenario: Screen Enhance - Medicaid SPA
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        Then click on New Submission
        And Click on State Plan Amendment SPA
        And verify Medicaid SPA is a clickable option
        And click on Medicaid SPA
        And verify user is on new Medicaid SPA page

    Scenario: Create Medicaid SPA from package dashboard and search it
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        Then click on New Submission
        And Click on State Plan Amendment SPA
        And click on Medicaid SPA
        And type in Medicaid SPA ID
        And select proposed effective date 3 months from today
        And Add file for CMS Form 179
        And Add file for SPA Pages
        And Type Additonal Info Comments in new form
        And Click on Submit Button
        And verify submission successful message in the alert bar
        And verify the SPAs tab is selected
        And search for Medicaid SPA ID
        And verify id number in the first row matches Medicaid SPA ID