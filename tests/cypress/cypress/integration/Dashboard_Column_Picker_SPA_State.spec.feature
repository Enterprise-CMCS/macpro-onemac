Feature: Package Dashboard - SPA Tab Column Picker
        Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user

    Scenario: SPAs Tab - Screen enhancement
        And verify show hide columns button exists
        And verify SPA ID column exists
        And verify type column exists
        And verify state column does not exist
        And verify status column exists
        And verify Initial Submission Date column exists
        And verify submitted by column exists
        And verify actions column exists
        And verify Formal RAI Received column does not exist
        And click show hide columns button
        And verify Initial Submission Date exists
        And verify state exists
        And verify status exists
        And verify submitted by exists
        And verify type exists
        And verify Formal RAI Received checkbox does not exist
        And click show hide columns button

    Scenario: SPAs Tab - Uncheck all and verify SPA ID and actions exists
        And click show hide columns button
        And click Initial Submission Date checkbox
        And click state checkbox
        And click status checkbox
        And click submitted by checkbox
        And click type checkbox
        And click show hide columns button
        And verify SPA ID column exists
        And verify actions column exists
        And verify type column does not exist
        And verify state column does not exist
        And verify status column does not exist
        And verify Initial Submission Date column does not exist
        And verify submitted by column does not exist
        Then Click on My Account
        And click the logout button

    Scenario: Verify state doesn't exists, but is selectable
        And verify state column does not exist
        And click show hide columns button
        And click state checkbox
        And click show hide columns button
        And verify state column exists
        And click show hide columns button
        And click state checkbox
        And click show hide columns button
        And verify state column does not exist
        Then Click on My Account
        And click the logout button
    
     Scenario: Verify type exists, click type from drop down, verify it no longer exists, click it again, verify it exists again.
        And verify type column exists
        And click show hide columns button
        And click type checkbox
        And click show hide columns button
        And verify type column does not exist
        And click show hide columns button
        And click type checkbox
        And click show hide columns button
        And verify type column exists
        Then Click on My Account
        And click the logout button

        Scenario: Filter for medicaid spa only, remove all check from drop down and keep TYPE, verify type state medicaid spa
        And Click on Filter Button
        And click on Type
        And click CHIP SPA check box
        And Click on Filter Button
        And click show hide columns button
#        And click 90th day checkbox
        And click Initial Submission Date checkbox
        And click state checkbox
        And click status checkbox
        And click submitted by checkbox
        And click show hide columns button
        And verify the type on row one exists
        And verify the type on row one is Medicaid SPA
        Then Click on My Account
        And click the logout button

    Scenario: Search with no results and verify error message is correct, verify columns are existing per selection on filter
        And type in search bar expiration status “pending”
        And verify Error message displayed should be No Results Found
        And verify IDNumber column exists
        And verify type column exists
        And verify state column does not exist
#        And verify 90th day column exists
        And verify status column exists
        And verify Initial Submission Date column exists
        And verify submitted by column exists
        And verify actions column exists
        Then Click on My Account
        And click the logout button

    Scenario: Uncheck all but type and state, then remove State and verify that the type column still exists and search criteria is still valid
        And click show hide columns button
        And click Initial Submission Date checkbox
        And click status checkbox
        And click submitted by checkbox
        And click state checkbox
        And click show hide columns button
        And verify type column exists
        And verify state column exists
        And verify the type on row one exists
        And verify the state on row one exists
        And click show hide columns button
        And click state checkbox
        And click show hide columns button
        And verify state column does not exist
        And verify type column exists
        And verify the type on row one exists
        Then Click on My Account
        And click the logout button
  