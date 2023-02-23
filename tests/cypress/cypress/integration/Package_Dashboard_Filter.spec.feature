Feature: Package Dashboard - Filter

    Scenario: SPAs Tab - Screen enhancement
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Verify Filter button exists
        And Click on Filter Button
        And verify Filter By Exists
        And verify Close Exists
        And verify reset Exists
        And verify state dropdown filter exists
        And verify Type Exists
        And verify status DropDown Filter exists
        And verify Initial Submission Date filter dropdown exists

    Scenario: Waivers Tab - Screen enhancement
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And Verify Filter button exists
        And Click on Filter Button
        And verify Filter By Exists
        And verify Close Exists
        And verify reset Exists
        And verify state dropdown filter exists
        And verify Type Exists
        And verify status DropDown Filter exists
        And verify Initial Submission Date filter dropdown exists

    Scenario: SPAs tab - verify all types and statuses are available
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on Type
        And verify CHIP SPA Exists
        And verify Medicaid SPA Exists
        And click on Status
        And verify Submitted status checkbox exists
        And verify Package Withdrawn status checkbox exists
        #And verify RAI Issued status checkbox exists     # Need seed data / reset data update
        And verify Under Review checkbox exists
        And verify Approved checkbox exists
        And verify Disapproved checkbox exists

    Scenario: Waivers tab - verify all types and statuses are available
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And Click on Filter Button
        And click on Type
        And verify 1915b Initial Waiver exists
        And verify 1915b Waiver Renewal exists
        And click on Status
        And verify Submitted status checkbox exists
        And verify Package Withdrawn status checkbox exists
        And verify RAI Issued status checkbox exists
        And verify Under Review checkbox exists
        And verify Approved checkbox exists
        And verify Disapproved checkbox exists

    Scenario: SPAs tab - deselect all and verify error message, then select one and verify it exists
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on Type
        And uncheck all of the type checkboxes
        And verify Error message displayed should be No Results Found
        And verify Error message details is displayed
        And click Medicaid SPA check box
        And verify Medicaid SPA Exists in list

    Scenario: Waivers tab - deselect all and verify error message, then select one and verify it exists
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And Click on Filter Button
        And click on Type
        And uncheck all of the type checkboxes
        And verify Error message displayed should be No Results Found
        And verify Error message details is displayed
        And click 1915b Initial Waiver check box
        And click 1915b Waiver Renewal check box
        And click 1915c Appendix K Amendment check box


    Scenario: SPAs tab - verify one exists, deselct selection then verify error message
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on Type
        And click CHIP SPA check box
        And click Medicaid SPA check box
        And verify Error message displayed should be No Results Found
        And verify Error message details is displayed
        And click Medicaid SPA check box
        And verify Medicaid SPA Exists in list
        And click Medicaid SPA check box
        And verify Error message displayed should be No Results Found
        And verify Error message details is displayed
