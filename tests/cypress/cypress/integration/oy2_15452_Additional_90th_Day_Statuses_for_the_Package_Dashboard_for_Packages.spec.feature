Feature: Additional "90th Day" statuses for the Package Dashboard for Packages

    Scenario: SPA tab - Pending when package status is In Review
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on 90th day filter dropdown
        And click on Status
        And click all of the status checkboxes
        And click Package In Review checkbox
        And verify that the value of the column for the 90th day is Pending
    
    Scenario: Waivers tab - Pending when package status is In Review
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And Click on Filter Button
        And click on 90th day filter dropdown
        And click on Status
        And click all of the status checkboxes
        And click Package In Review checkbox
        And verify that the value of the column for the 90th day is Pending