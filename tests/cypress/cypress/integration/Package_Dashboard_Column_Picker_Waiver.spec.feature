Feature: OY2-13095 Package Dashboard - Column Picker
    
        Scenario: Waivers Tab - Screen enhancement
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And verify show hide columns button exists
        And verify IDNumber column exists
        And verify the Waiver Family # column does not exist
        And verify type column exists
        And verify state column exists
        And verify 90th day column exists
        And verify Waiver Number column exists
        And verify status column exists
        And verify date submitted column exists
        And verify submitted by column exists
        And verify expiration date column does not exist
        And verify actions column exists
        And click show hide columns button
        And verify the Waivers Family checkbox exists
        And verify 90th day exists
        And verify date submitted exists
        And verify expiration date exists 
        And verify state exists
        And verify status exists
        And verify submitted by exists
        And verify type exists
        And click show hide columns button

    Scenario: Waivers Tab - Uncheck all and verify Waiver Number and actions exists
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And click show hide columns button
        And click 90th day checkbox
        And click date submitted checkbox
        And click state checkbox
        And click status checkbox
        And click submitted by checkbox
        And click type checkbox
        And click the Waivers Family checkbox
        And click show hide columns button
        And verify Waiver Number column exists
        And verify actions column exists
        And verify type column does not exist
        And verify state column does not exist
        And verify 90th day column does not exist
        And verify expiration date column does not exist
        And verify status column does not exist
        And verify date submitted column does not exist
        And verify submitted by column does not exist
        And verify the Waivers Family # column exists
        And verify the Waivers Family # column exists
        And verify Waiver Family # column is sortable
        And verify the Waiver family format in row one is SS.#### or SS.#####