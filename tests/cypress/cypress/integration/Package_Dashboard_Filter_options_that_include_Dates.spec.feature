Feature: OY2-13093 Submission Dashboard - Filter options that include Dates
    Scenario: SPAs tab - Screen enhancement
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And verify date submitted filter dropdown exists
        And click on date submitted filter dropdown
        And verify date submitted date picker filter exists

    Scenario: Waivers tab - Screen enhancement
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And Click on Filter Button
        And verify date submitted filter dropdown exists
        And click on date submitted filter dropdown
        And verify date submitted date picker filter exists

    Scenario: Change date submitted filter. Verify no results. Then reset filter
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And Click on Filter Button
        And click on date submitted filter dropdown
        And click on date submitted date picker filter
        And click on quarter to date date picker button
        And click on OK date picker button
        And click on date submitted filter dropdown
        And Click on Filter Button
        And verify Error message displayed should be No Results Found
        And Click on Filter Button
        And click on reset button
        And Click on Filter Button
        And verify package row one exists
        
    Scenario: Filter by date submitted - Date picker
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on date submitted filter dropdown
        And click on date submitted date picker filter
        And click on quarter to date date picker button
        And click on OK date picker button
        And Click on Filter Button
        And verify date submitted column one date is this quarter