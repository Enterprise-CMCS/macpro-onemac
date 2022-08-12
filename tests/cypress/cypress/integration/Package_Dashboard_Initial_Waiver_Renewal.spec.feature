Feature: Initial Waiver Renewal Type Selection

    Scenario: Screen Enhance - Initial Waiver Renewal
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        Then click on New Submission
        And Click on Waiver Action
        And verify Initial Waiver Renewal is a clickable option
