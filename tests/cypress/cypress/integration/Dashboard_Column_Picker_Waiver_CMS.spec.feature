Feature: Package Dashboard - Waiver Tab Column Picker for CMS User
    Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms System Admin
    
    Scenario: Waivers Tab - Screen enhancement
        And click on the Waivers tab
        And verify show hide columns button exists
        And verify IDNumber column exists
        And verify type column exists
        And verify state column exists
        And verify Waiver Number column exists
        And verify status column exists
        And verify Initial Submission Date column exists
        And verify Formal RAI Received column exists
        And verify submitted by column does not exist
        And click show hide columns button
        And verify Formal RAI Received checkbox exists
        And verify state exists
        And verify status exists
        And verify Initial Submission Date exists
        And verify submitted by exists
        And verify type exists
        And click show hide columns button
        Then Click on My Account
        And click the logout button

    Scenario: Waivers Tab - Uncheck all and verify Waiver Number exists
        And click on the Waivers tab
        And click show hide columns button
        And click Formal RAI Received checkbox
        And click Initial Submission Date checkbox
        And click state checkbox
        And click status checkbox
        And click type checkbox
        And click show hide columns button
        And verify Waiver Number column exists
        And verify type column does not exist
        And verify state column does not exist
        And verify status column does not exist
        And verify Initial Submission Date column does not exist
        And verify submitted by column does not exist
        And verify Formal RAI Received column does not exist
        Then Click on My Account
        And click the logout button

    Scenario: Waivers Tab - verify tabs reset after login
        And click on the Waivers tab
        And verify show hide columns button exists
        And verify IDNumber column exists
        And verify type column exists
        And verify submitted by column does not exist
        And verify Waiver Number column exists
        And verify status column exists
        And verify Initial Submission Date column exists
        And verify Formal RAI Received column exists
        Then Click on My Account
        And click the logout button

    Scenario: Verify submitted by doesn't exists, but is selectable
        And verify submitted by column does not exist
        And click show hide columns button
        And click submitted by checkbox
        And click show hide columns button
        And verify submitted by column exists
        And click show hide columns button
        And click submitted by checkbox
        And click show hide columns button
        And verify submitted by column does not exist
        Then Click on My Account
        And click the logout button