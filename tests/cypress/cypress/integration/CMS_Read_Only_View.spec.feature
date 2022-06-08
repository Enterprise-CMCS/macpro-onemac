Feature: Package Dashboard Read Only View
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login as EUA CMS Read Only User

    Scenario: CMS Read Only user actions column unavailable in Package Dashboard
        And click on Packages
        And verify actions column is unavailable
        And click on the Waivers tab
        And verify actions column is unavailable

    Scenario: CMS Read Only user actions column unavailable in Package Mini-Dashboard
        And click on Packages
        And click on the Waivers tab
        And click the Waiver Number link in the first row
        And verify the package actions section is unavailable