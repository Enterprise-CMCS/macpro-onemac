Feature: Verify package actions in Approved Status in the package dashboard 
    Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user

    Scenario: Demonstrate add amendment and temp ext are available for Initial Waiver in Approved Status
        And click on the Waivers tab
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click Approved checkbox
        And click on Type
        And uncheck all of the type checkboxes
        And click 1915b Initial Waiver check box
        And click the actions button in row one
        And verify the Add Amendment button is displayed
        And verify the Request Temporary Extension button is displayed

    Scenario: Demonstrate add amendment and temp ext are available for Waiver Renewals in Approved Status
        And click on the Waivers tab
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click Approved checkbox
        And click on Type
        And uncheck all of the type checkboxes
        And click 1915b Waiver Renewal check box
        And click the actions button in row one
        And verify the Add Amendment button is displayed
        And verify the Request Temporary Extension button is displayed