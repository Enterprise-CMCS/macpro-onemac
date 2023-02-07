Feature: OY2_10093_Helpdesk_User
    Scenario: Verify that there are Dashboard and User Management tabs
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms Help Desk User
        Then i am on Dashboard Page
        And verify the SPAs tab is selected
        And verify Export to Excel CSV is Displayed
        And verify IDNumber is Displayed
        And verify Type is Displayed
        And verify state is Displaed
        And verify Submitted By is Displayed
        And Click on User Management Tab
        Then i am on User Management Page
        And verify User Management is Displayed
        And verify Export to Excel CSV is Displayed
        And verify Name is Displayed
        And verify State is Displayed
        And verify Status is Displayed
        And verify Role is Displayed
        And verify Last Modified is Displayed
        And verify Modified By is Displayed