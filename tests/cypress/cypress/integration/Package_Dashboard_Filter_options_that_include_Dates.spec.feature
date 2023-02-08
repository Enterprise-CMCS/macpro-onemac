Feature: OY2-13093 Submission Dashboard - Filter options that include Dates
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user

    Scenario: SPAs tab - Screen enhancement
        And Click on Filter Button
        And verify Initial Submission Date filter dropdown exists
        And click on Initial Submission Date filter dropdown
        And verify Initial Submission Date date picker filter exists

    Scenario: Waivers tab - Screen enhancement
        And click on the Waivers tab
        And Click on Filter Button
        And verify Initial Submission Date filter dropdown exists
        And click on Initial Submission Date filter dropdown
        And verify Initial Submission Date date picker filter exists

    Scenario: Change Initial Submission Date filter. Verify no results. Then reset filter
        And click on the Waivers tab
        And Click on Filter Button
        And click on Initial Submission Date filter dropdown
        And click on Initial Submission Date date picker filter
        And click on quarter to date date picker button
        And click on OK date picker button
        And click on Initial Submission Date filter dropdown
        And click on reset button
        And Click on Filter Button
        And verify package row one exists

    Scenario: Filter by Initial Submission Date - Date picker
        And Click on Filter Button
        And click on Initial Submission Date filter dropdown
        And click on Initial Submission Date date picker filter
        And click on quarter to date date picker button
        And click on OK date picker button
        And Click on Filter Button
        And verify Initial Submission Date column one date is this quarter