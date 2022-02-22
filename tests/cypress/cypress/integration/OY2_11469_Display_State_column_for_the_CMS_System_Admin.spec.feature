Feature: OY2-11469 Display State column for the CMS System Admin
    Scenario: Verify State Column Exists
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms System Admin
        Then i am on Dashboard Page
        And click on Packages
        And Verify State Column Exists

    Scenario: Verify State Column is sortable
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms System Admin
        Then i am on Dashboard Page
        And click on Packages
        And Verify State Column is sortable

