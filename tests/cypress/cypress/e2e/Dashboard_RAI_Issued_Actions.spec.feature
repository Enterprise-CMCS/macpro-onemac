Feature: Verify package actions in RAI Issued Status in the package dashboard 
    Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages

    # Need seed data / reset data update
    # Scenario: Demonstrate withdraw package and respond to rai are available for CHIP SPA in RAI Issued Status
    #     And Click on Filter Button
    #     And click on Status
    #     And uncheck all of the status checkboxes
    #     And click RAI Issued checkbox
    #     And click on Type
    #     And uncheck all of the type checkboxes
    #     And click CHIP SPA check box
    #     And click the actions button in row one
    #     And verify withdraw package button is visible for package in package dashboard
    #     And verify the Respond to RAI button is displayed

    Scenario: Demonstrate withdraw package and respond to rai are available for Medicaid SPA in RAI Issued Status
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click RAI Issued checkbox
        And click on Type
        And uncheck all of the type checkboxes
        And click Medicaid SPA check box
        And click the actions button in row one
        And verify withdraw package button is visible for package in package dashboard
        And verify the Respond to RAI button is displayed

    Scenario: Demonstrate withdraw package and respond to rai are available for Initial Waiver in RAI Issued Status
        And click on the Waivers tab
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click RAI Issued checkbox
        And click on Type
        And uncheck all of the type checkboxes
        And click 1915b Initial Waiver check box
        And click the actions button in row one
        And verify withdraw package button is visible for package in package dashboard
        And verify the Respond to RAI button is displayed

    Scenario: Demonstrate withdraw package and respond to rai are available for Waiver Renewals in RAI Issued Status
        And click on the Waivers tab
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click RAI Issued checkbox
        And click on Type
        And uncheck all of the type checkboxes
        And click 1915b Waiver Renewal check box
        And click the actions button in row one
        And verify withdraw package button is visible for package in package dashboard
        And verify the Respond to RAI button is displayed

    Scenario: Demonstrate withdraw package and respond to rai are available for Waiver Amendments in RAI Issued Status
        And click on the Waivers tab
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click RAI Issued checkbox
        And click on Type
        And uncheck all of the type checkboxes
        And click 1915b Waiver Amendment check box
        And click the actions button in row one
        And verify withdraw package button is visible for package in package dashboard
        And verify the Respond to RAI button is displayed

    Scenario: Demonstrate withdraw package and respond to rai are available for Appendix K Amendments in RAI Issued Status
        And click on the Waivers tab
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click RAI Issued checkbox
        And click on Type
        And uncheck all of the type checkboxes
        And click 1915c Appendix K Amendment check box
        And click the actions button in row one
        And verify withdraw package button is visible for package in package dashboard
        And verify the Respond to RAI button is displayed