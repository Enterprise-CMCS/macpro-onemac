Feature: OY2-15426 Package Dashboard: Waiver Family Column for the Waivers tab
    Scenario: Screen enhancement
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And verify the Waiver Family # column does not exist
        And click show hide columns button
        And verify the Waiver Family checkbox does not exist
        And click on the Waivers tab
        And verify the Waiver Family # column does not exist
        And click show hide columns button
        And verify the Waivers Family checkbox exists
    
    Scenario: Verify unchecking Waiver Family checkbox adds the column
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And click show hide columns button
        And click the Waivers Family checkbox
        And click show hide columns button
        And verify the Waivers Family # column exists
        And verify the Waivers Family # column exists
        And verify Waiver Family # column is sortable
        And verify the Waiver family format in row one is SS.#### or SS.#####