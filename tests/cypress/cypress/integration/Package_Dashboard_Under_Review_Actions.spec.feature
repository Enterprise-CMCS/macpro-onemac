Feature: Verify user can use withdraw package action in Under Review Status in the package dashboard 
    Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages

    Scenario: Demonstrate withdraw package is available for CHIP SPA in Under Review Status
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click Under Review checkbox
        And click on Type
        And uncheck all of the type checkboxes
        And click CHIP SPA check box
        And click the actions button in row one
        And verify withdraw package button is visible for package in package dashboard

    Scenario: Demonstrate withdraw package is available for Medicaid SPA in Under Review Status
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click Under Review checkbox
        And click on Type
        And uncheck all of the type checkboxes
        And click Medicaid SPA check box
        And click the actions button in row one
        And verify withdraw package button is visible for package in package dashboard

    Scenario: Demonstrate withdraw package is available for Initial Waiver in Under Review Status
        And click on the Waivers tab
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click Under Review checkbox
        And click on Type
        And uncheck all of the type checkboxes
        And click 1915b Initial Waiver check box
        And click the actions button in row one
        And verify withdraw package button is visible for package in package dashboard

    Scenario: Demonstrate withdraw package is available for Waiver Renewals in Under Review Status
        And click on the Waivers tab
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click Under Review checkbox
        And click on Type
        And uncheck all of the type checkboxes
        And click 1915b Waiver Renewal check box
        And click the actions button in row one
        And verify withdraw package button is visible for package in package dashboard

    Scenario: Demonstrate withdraw package is available for Waiver Amendments in Under Review Status
        And click on the Waivers tab
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click Under Review checkbox
        And click on Type
        And uncheck all of the type checkboxes
        And click 1915b Waiver Amendment check box
        And click the actions button in row one
        And verify withdraw package button is visible for package in package dashboard

    Scenario: Demonstrate withdraw package is available for Appendix K Amendments in Under Review Status
        And click on the Waivers tab
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click Under Review checkbox
        And click on Type
        And uncheck all of the type checkboxes
        And click 1915c Appendix K Amendment check box
        And click the actions button in row one
        And verify withdraw package button is visible for package in package dashboard