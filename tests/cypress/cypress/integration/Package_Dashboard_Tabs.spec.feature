Feature: OY2-14464 Package Dashboard - Separate Tab for Waivers and SPAs
    Scenario: SPAs Tab - Screen enhancement
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And verify the SPAs tab exists
        And verify the SPAs tab is selected
        And verify SPA ID column exists

    Scenario: Waivers Tab - Screen enhancement
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And verify search bar exists
        And verify the Waivers tab exists
        And verify the Waivers tab is clickable
        And click on the Waivers tab
        And verify the Waivers tab is selected
        And verify Waiver Number column exists

    Scenario: Verify the SPAs tab is the default
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And refresh the page
        And verify the SPAs tab is selected

#Feature: OY2-11676 Package Dashboard: New Waiver tab layout 
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
        And verify the waiver number format in row one is SS.#####.S## or SS.####.S##

    Scenario: verify clicking the caret controls when the child row is displayed for a parent row
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And search for "MD.10330"
        And wait for parent row expander to be enabled
        And verify parent row expander exists
        #And verify the next row is not a child
        And click parent row expander
        And verify the next row is a child
        And verify all children start with "MD.10330"

    Scenario: verify all waiver columns are displayed for a child row
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And search for "MD.10330"
        And wait for parent row expander to be enabled
        And click parent row expander
        And verify Waiver Number column exists for the child
        And verify type column exists for the child
        And verify state column exists for the child
        And verify 90th day column exists for the child
        And verify status column exists for the child
        And verify date submitted column exists for the child
        And verify submitted by column exists for the child
        And verify actions column exists for the child
        And click show hide columns button
        And click expiration date checkbox
        And click show hide columns button
        And verify expiration date column exists for the child

    Scenario: verify the caret is disabled for a row without children
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And search for "MD.1117"
        And verify parent row expander is disabled