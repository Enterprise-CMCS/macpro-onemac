Feature: Left Hand Navigation for Package Details View

    Scenario: Screen Enhancement - Medicaid SPA
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on Type
        And click CHIP SPA check box
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify Package Overview navigation button exists
        And verify Package Overview navigation button is enabled
        And verify Package Overview navigation button is expanded
        And verify Package Details is listed under Package Overview


    Scenario: Screen Enhancement - CHIP SPA
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on Type
        And click Medicaid SPA check box
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify Package Overview navigation button exists
        And verify Package Overview navigation button is enabled
        And verify Package Overview navigation button is expanded
        And verify Package Details is listed under Package Overview


    Scenario: Screen Enhancement - Initial Waiver
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And Click on Filter Button
        And click on Type
        And click 1915b Waiver Renewal check box
        And click 1915c Appendix K Amendment check box
        And Click on Filter Button
        And click the Waiver Number link in the first row
        And verify Package Overview navigation button exists
        And verify Package Overview navigation button is enabled
        And verify Package Overview navigation button is expanded
        And verify Package Details is listed under Package Overview
