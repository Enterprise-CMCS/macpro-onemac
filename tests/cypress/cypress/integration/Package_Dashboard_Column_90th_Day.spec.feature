Feature: OY2-11116 Package Dashboard Updates - 90th Day Data from SEATool
    Scenario: Verify 90th day fields with State Submitter
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And verify 90th day column is available to the immediate left to the status column
        And verify that value of the column for the ID is NA Pending or a date

    Scenario: Verify 90th day fields with CMS Reviewer
        Given I am on Login Page
        When Clicking on Development Login
        When Login with CMS Reviewer User
        And click on Packages
        And verify 90th day column is available to the immediate left to the status column
        And verify that value of the column for the ID is NA Pending or a date

    Scenario: Verify 90th day fields with Help Desk User
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms Help Desk User
        And click on Packages
        And verify 90th day column is available to the immediate left to the status column
        And verify that value of the column for the ID is NA Pending or a date



#Feature: OY2-15452 Additional "90th Day" statuses for the Package Dashboard for Packages

    Scenario: SPA tab - Pending when package status is In Review
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on 90th day filter dropdown
        And click on Status
        And click all of the status checkboxes
        And click In Review checkbox
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
        And click In Review checkbox
        And verify that the value of the column for the 90th day is Pending

#Feature: OY2-12735 Additional 90th Day statuses for the Package Dashboard

    Scenario: SPA tab - Verify clock stopped 90 day status exists
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on 90th day filter dropdown
        And verify that Clock Stopped checkbox exists

    
    Scenario: SPA tab - Clock Stopped when package status is RAI Issued
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on Status
        And click all of the status checkboxes
        And click RAI Issued checkbox
        And verify that the value of the column for the 90th day is Clock Stopped

    Scenario: SPA tab - N/A when package status is Approved
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on Status
        And click all of the status checkboxes
        And click Approved checkbox
        And verify that the value of the column for the 90th day is NA

    Scenario: SPA tab - N/A when package status is Disapproved
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on 90th day filter dropdown
        And click on Status
        And click all of the status checkboxes
        And click Disapproved checkbox
        And verify that the value of the column for the 90th day is NA

    Scenario: SPA tab - Pending when package status is Submitted
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on 90th day filter dropdown
        And click on Status
        And click all of the status checkboxes
        And click Submitted checkbox
        And verify that the value of the column for the 90th day is Pending


    Scenario: SPA tab - Pending when package status is Unsubmitted
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on 90th day filter dropdown
        And click on Status
        And click all of the status checkboxes
        And click Unsubmitted checkbox
        And verify that the value of the column for the 90th day is Pending

    Scenario: Waivers tab - Pending when package status is Submitted
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And Click on Filter Button
        And click on 90th day filter dropdown
        And click on Status
        And click all of the status checkboxes
        And click Submitted checkbox
        And verify that the value of the column for the 90th day is Pending

    Scenario: Waivers tab - Pending when package status is Unsubmitted
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And Click on Filter Button
        And click on 90th day filter dropdown
        And click on Status
        And click all of the status checkboxes
        And click Unsubmitted checkbox
        And verify that the value of the column for the 90th day is Pending