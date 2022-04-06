Feature: OY2-13093 Submission Dashboard - Filter options that include Dates
    Scenario: SPAs tab - Screen enhancement
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And verify 90th day filter dropdown exists
        And click on 90th day filter dropdown
        And verify 90th day na checkbox exists
        And verify 90th day pending checkbox exists
        And verify 90th day date picker exists
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
        And verify 90th day filter dropdown exists
        And click on 90th day filter dropdown
        And verify 90th day na checkbox exists
        And verify 90th day pending checkbox exists
        And verify 90th day date picker exists
        And verify expiration date filter dropdown exists
        And click on expiration date filter dropdown
        And verify expiration date date picker exists
        And verify date submitted filter dropdown exists
        And click on date submitted filter dropdown
        And verify date submitted date picker filter exists

    Scenario: Change 90 day filter, date submitted, and expiration date. Verify no results. Then reset filter
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And Click on Filter Button
        And click on 90th day filter dropdown
        And click on 90th day pending checkbox
        And click on 90th day filter dropdown
        And click on expiration date filter dropdown
        And click on expiration date date picker filter
        And click on this quarter date picker button
        And click on OK date picker button
        And click on expiration date filter dropdown
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
        
    Scenario: Filter by 90 day - N/A and date
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on 90th day filter dropdown
        And click on 90th day pending checkbox
        And Click on Filter Button
        And verify 90th day column one is not Pending
        
    Scenario: Filter by 90 day - Pending and date
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on 90th day filter dropdown
        And click on 90th day na checkbox
        And Click on Filter Button
        And verify 90th day column one is not na

    Scenario: Filter by 90 day - Date picker
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on 90th day filter dropdown
        And click on 90th day na checkbox
        And click on 90th day pending checkbox
        And click on 90th day date picker filter
        And click on this quarter date picker button
        And click on OK date picker button
        And Click on Filter Button
        And verify 90th day column one is not na
        And verify 90th day column one is not Pending

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