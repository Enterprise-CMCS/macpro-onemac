Feature: OY2-14464 Package Dashboard - Separate Tab for Waivers and SPAs
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user

    Scenario: SPAs Tab - Screen enhancement
        And verify the SPAs tab exists
        And verify the SPAs tab is selected
        And verify SPA ID column exists

    Scenario: Waivers Tab - Screen enhancement
        And verify search bar exists
        And verify the Waivers tab exists
        And verify the Waivers tab is clickable
        And click on the Waivers tab
        And verify the Waivers tab is selected
        And verify Waiver Number column exists

    Scenario: Verify the SPAs tab is the default
        And click on the Waivers tab
        And refresh the page
        And verify the SPAs tab is selected

    Scenario: screen enhancement
        And click on the Waivers tab
        And verify the Waivers tab is selected

    Scenario: verify initial waiver waiver number pattern
        And click on the Waivers tab
        And Click on Filter Button
        And click on Type
        And uncheck all of the type checkboxes
        And click 1915b Initial Waiver check box
        And Click on Filter Button
        And verify the type in row one is Initial Waiver
        And verify the waiver number format in row one is SS.#### or SS.#####

    Scenario: verify waiver renewal waiver number pattern
        And click on the Waivers tab
        And Click on Filter Button
        And click on Type
        And uncheck all of the type checkboxes
        And click 1915b Waiver Renewal check box
        And Click on Filter Button
        And verify the type in row one is Waiver Renewal
        And verify the waiver number format in row one is SS.#####.S## or SS.####.S##