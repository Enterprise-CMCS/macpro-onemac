#This entire test needs to be rewritten. Removing from deploy until I can think of a way to update this.
Feature: Verify user can package actions in Withdraw Formal RAI Response in the package dashboard 
    Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on Packages

    Scenario: Demonstrate withdraw package and Withdraw Formal RAI Response are available for CHIP SPA in RAI Response Withdraw Enabled Status
        Then Click on Filter Button
        Then click on Status
        Then uncheck all of the status checkboxes
        Then click the RAI Response Withdraw Enabled checkbox
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click CHIP SPA check box
        Then click the actions button in row one
        Then verify withdraw package button is visible for package in package dashboard
        Then verify Withdraw Formal RAI Response package action exists

    Scenario: Demonstrate withdraw package and Withdraw Formal RAI Response are available for Medicaid SPA in RAI Response Withdraw Enabled Status
        Then Click on Filter Button
        Then click on Status
        Then uncheck all of the status checkboxes
        Then click the RAI Response Withdraw Enabled checkbox
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click Medicaid SPA check box
        Then click the actions button in row one
        Then verify withdraw package button is visible for package in package dashboard
        Then verify Withdraw Formal RAI Response package action exists

    Scenario: Demonstrate withdraw package and Withdraw Formal RAI Response are available for Initial Waiver in RAI Response Withdraw Enabled Status
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Status
        Then uncheck all of the status checkboxes
        Then click the RAI Response Withdraw Enabled checkbox
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click 1915b Initial Waiver check box
        Then click the actions button in row one
        Then verify withdraw package button is visible for package in package dashboard
        Then verify Withdraw Formal RAI Response package action exists

    Scenario: Demonstrate withdraw package and Withdraw Formal RAI Response are available for Waiver Renewals in RAI Response Withdraw Enabled Status
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Status
        Then uncheck all of the status checkboxes
        Then click the RAI Response Withdraw Enabled checkbox
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click 1915b Waiver Renewal check box
        Then click the actions button in row one
        Then verify withdraw package button is visible for package in package dashboard
        Then verify Withdraw Formal RAI Response package action exists

    Scenario: Demonstrate withdraw package and Withdraw Formal RAI Response are available for Waiver Amendments in RAI Response Withdraw Enabled Status
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Status
        Then uncheck all of the status checkboxes
        Then click the RAI Response Withdraw Enabled checkbox
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click 1915b Waiver Amendment check box
        Then click the actions button in row one
        Then verify withdraw package button is visible for package in package dashboard
        Then verify Withdraw Formal RAI Response package action exists

    Scenario: Demonstrate withdraw package and Withdraw Formal RAI Response are available for Appendix K Amendments in RAI Response Withdraw Enabled Status
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Status
        Then uncheck all of the status checkboxes
        Then click the RAI Response Withdraw Enabled checkbox
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click 1915c Appendix K Amendment check box
        Then click the actions button in row one
        Then verify withdraw package button is visible for package in package dashboard
        Then verify Withdraw Formal RAI Response package action exists