Feature: Package Dashboard - Waiver Tab Column Picker
    
        Scenario: Waivers Tab - Screen enhancement
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on the Waivers tab
        And verify show hide columns button exists
        And verify IDNumber column exists
        And verify type column exists
        And verify state column exists
        And verify Waiver Number column exists
        And verify status column exists
        And verify Initial Submission Date column exists
        And verify submitted by column exists
        And verify actions column exists
        And verify Formal RAI Received column does not exist
        And click show hide columns button
        And verify state exists
        And verify status exists
        And verify Initial Submission Date exists
        And verify submitted by exists
        And verify type exists
        And verify Formal RAI Received checkbox does not exist
        And click show hide columns button
        Then Click on My Account
        And click the logout button

    Scenario: Waivers Tab - Uncheck all and verify Waiver Number and actions exists
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on the Waivers tab
        And click show hide columns button
        And click Initial Submission Date checkbox
        And click state checkbox
        And click status checkbox
        And click submitted by checkbox
        And click type checkbox
        And click show hide columns button
        And verify Waiver Number column exists
        And verify actions column exists
        And verify type column does not exist
        And verify state column does not exist
        And verify status column does not exist
        And verify Initial Submission Date column does not exist
        And verify submitted by column does not exist
        Then Click on My Account
        And click the logout button

    Scenario: Waivers Tab - verify tabs reset after login
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on the Waivers tab
        And verify show hide columns button exists
        And verify IDNumber column exists
        And verify type column exists
        And verify state column exists
        And verify Waiver Number column exists
        And verify status column exists
        And verify Initial Submission Date column exists
        And verify submitted by column exists
        And verify actions column exists