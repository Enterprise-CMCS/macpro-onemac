Feature: OY2-11116 Package Dashboard Updates - 90th Day Data from SEATool
    Scenario: Verify 90th day fields with State Submitter
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And verify 90th day column is available to the immediate left to the status column
        And verify that value of the column for the ID is Pending

    Scenario: Verify 90th day fields with CMS Reviewer
        Given I am on Login Page
        When Clicking on Development Login
        When Login with CMS Reviewer User
        And click on Packages
        And verify 90th day column is available to the immediate left to the status column
        And verify that value of the column for the ID is Pending

    Scenario: Verify 90th day fields with Help Desk User
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms Help Desk User
        And click on Packages
        And verify 90th day column is available to the immediate left to the status column
        And verify that value of the column for the ID is Pending

    Scenario: Verify 90th day fields with State Submitter displays date on existing user
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And verify that 90th day value is Jan 5, 2022 for the Id Number MD.32560

    Scenario: Verify 90th day fields with State Submitter displays NA on withdrawn waiver
        Given I am on Login Page
        When Clicking on Development Login
        When Login with CMS Reviewer User
        And click on Packages
        And verify that 90th day value of WI-23-2222-MED1 is NA


