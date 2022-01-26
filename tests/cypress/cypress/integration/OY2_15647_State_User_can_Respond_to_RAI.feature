Feature: OY2-15647 State User can Respond to RAI
    Scenario: Verify state user can access Respond to Medicaid SPA RAI for seatool
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on State Plan Amendment SPA
        And click on Respond to Medicaid SPA RAI
        And verify ID field is empty and not disabled

    Scenario: Verify state user can access Respond to CHIP SPA RAI for seatool
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on State Plan Amendment SPA
        And click on Respond to CHIP SPA RAI
        And verify ID field is empty and not disabled

    Scenario: Verify state user can access Respond to Waiver RAI for seatool
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on Waiver Action
        And click on Respond to Waiver RAI
        And verify ID field is empty and not disabled