Feature: OY2-14464 Package Dashboard - Separate Tab for Waivers and SPAs
    Scenario: SPAs Tab - Screen enhancement
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And verify the SPAs tab exists
        And verify the SPAs tab is selected
        And verify SPA ID column exists


    Scenario: Waivers Tab - Screen enhancement
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And verify search bar exists
        And verify the Waivers tab exists
        And verify the Waivers tab is clickable
        And click on the Waivers tab
        And verify the Waivers tab is selected
        And verify Waiver Number column exists

    Scenario: Verify the SPAs tab is the default
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And refresh the page
        And verify the SPAs tab is selected