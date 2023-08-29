Feature: Package Dashboard - SPA Tab Column Picker
        Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user

    Scenario: SPAs Tab - Screen enhancement
        Then verify show hide columns button exists
        Then verify SPA ID column exists
        Then verify type column exists
        Then verify state column does not exist
        Then verify status column exists
        Then verify Initial Submission Date column exists
        Then verify Latest Package Activity column exists
        Then verify submitted by column exists
        Then verify CPOC Name column does not exist
        Then verify actions column exists
        Then verify Formal RAI Received column exists
        Then click show hide columns button
        Then verify Formal RAI Received checkbox exists
        Then verify Latest Package Activity checkbox exists
        Then verify Initial Submission Date exists
        Then verify state exists
        Then verify status exists
        Then verify submitted by exists
        Then verify type exists
        Then verify Formal RAI Received checkbox exists
        Then verify CPOC Name exists
        Then click show hide columns button

    Scenario: SPAs Tab - Uncheck all and verify SPA ID and actions exists
        Then click show hide columns button
        Then click Formal RAI Received checkbox
        Then click Initial Submission Date checkbox
        Then click Latest Package Activity checkbox
        Then click status checkbox
        Then click submitted by checkbox
        Then click type checkbox
        Then click CPOC Name checkbox
        Then click show hide columns button
        Then verify SPA ID column exists
        Then verify actions column exists
        Then verify type column does not exist
        Then verify state column does not exist
        Then verify status column does not exist
        Then verify Initial Submission Date column does not exist
        Then verify Latest Package Activity column does not exist
        Then verify submitted by column does not exist
        Then verify Formal RAI Received column does not exist
        Then verify CPOC Name column exists
        Then Click on My Account
        Then click the logout button

    Scenario: Verify state doesn't exists, but is selectable
        Then verify state column does not exist
        Then click show hide columns button
        Then click state checkbox
        Then click show hide columns button
        Then verify state column exists
        Then click show hide columns button
        Then click state checkbox
        Then click show hide columns button
        Then verify state column does not exist
        Then Click on My Account
        Then click the logout button
    
     Scenario: Verify type exists, click type from drop down, verify it no longer exists, click it again, verify it exists again.
        Then verify type column exists
        Then click show hide columns button
        Then click type checkbox
        Then click show hide columns button
        Then verify type column does not exist
        Then click show hide columns button
        Then click type checkbox
        Then click show hide columns button
        Then verify type column exists
        Then Click on My Account
        Then click the logout button

        Scenario: Filter for medicaid spa only, remove all check from drop down and keep TYPE, verify type state medicaid spa
        Then Click on Filter Button
        Then click on Type
        Then click CHIP SPA check box
        Then Click on Filter Button
        Then click show hide columns button
        Then click Formal RAI Received checkbox
        Then click Initial Submission Date checkbox
        Then click state checkbox
        Then click status checkbox
        Then click submitted by checkbox
        Then click show hide columns button
        Then verify the type on row one exists
        Then verify the type on row one is Medicaid SPA
        Then Click on My Account
        Then click the logout button

    Scenario: Search with no results and verify error message is correct, verify columns are existing per selection on filter
        Then type in search bar expiration status “pending”
        Then verify Error message displayed should be No Results Found
        Then verify IDNumber column exists
        Then verify type column exists
        Then verify state column does not exist
        Then verify Formal RAI Received column exists
        Then verify status column exists
        Then verify Initial Submission Date column exists
        Then verify submitted by column exists
        Then verify actions column exists
        Then Click on My Account
        Then click the logout button

    Scenario: Uncheck all but type and state, then remove State and verify that the type column still exists and search criteria is still valid
        Then click show hide columns button
        Then click Initial Submission Date checkbox
        Then click status checkbox
        Then click Formal RAI Received checkbox
        Then click submitted by checkbox
        Then click state checkbox
        Then click show hide columns button
        Then verify type column exists
        Then verify state column exists
        Then verify the type on row one exists
        Then verify the state on row one exists
        Then click show hide columns button
        Then click state checkbox
        Then click show hide columns button
        Then verify state column does not exist
        Then verify type column exists
        Then verify the type on row one exists
        Then Click on My Account
        Then click the logout button
  