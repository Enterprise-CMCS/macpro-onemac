Feature: OY2-11676 Package Dashboard: New Waiver tab layout 

    Scenario: screen enhancement
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And verify the type in row one is some kind of 1915b Waiver

    Scenario: verify base waiver waiver number pattern
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And Click on Filter Button
        And click on Type
        And click 1915b Waiver Renewal check box
        And Click on Filter Button
        And verify the type in row one is Base Waiver
        And verify the waiver number format in row one is SS.#### or SS.#####

    Scenario: verify waiver renewal waiver number pattern
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And Click on Filter Button
        And click on Type
        And click 1915b Base Waiver check box
        And Click on Filter Button
        And verify the type in row one is Waiver Renewal
        And verify the waiver number format in row one is SS.#####.S##