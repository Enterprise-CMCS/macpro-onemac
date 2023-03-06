Feature: Withdraw package action in package dashboard 
    Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user

    Scenario: Demonstrate that withdraw a package is not available on SPA with Submitted status
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click Submitted checkbox
        And verify the actions button is disabled in the package dashboard

    Scenario: Demonstrate that withdraw a package is not available on Waiver with Submitted status
        And click on the Waivers tab
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click Submitted checkbox
        And verify the actions button is disabled in the package dashboard

    Scenario: Demonstrate that withdraw a package is not available on SPA with Package Withdrawn status
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click the Package Withdrawn checkbox
        And verify the actions button is disabled in the package dashboard

    Scenario: Demonstrate that withdraw a package is not available on Waiver with Package Withdrawn status
        And click on the Waivers tab
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click the Package Withdrawn checkbox
        And verify the actions button is disabled in the package dashboard

    Scenario: Demonstrate that withdraw a package is not available on SPA with Approved status
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click Approved checkbox
        And verify the actions button is disabled in the package dashboard

    Scenario: Demonstrate that withdraw a package is not available on Waiver with Approved status
        And click on the Waivers tab
        And Click on Filter Button
        And click on Type
        And click 1915b Initial Waiver check box
        And click 1915b Waiver Renewal check box
        And click on Status
        And uncheck all of the status checkboxes
        And click Approved checkbox
        And verify the actions button is disabled in the package dashboard

    Scenario: Demonstrate that withdraw a package is not available on SPA with Disapproved status
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click Disapproved checkbox
        And verify the actions button is disabled in the package dashboard

    Scenario: Demonstrate that withdraw a package is not available on Waiver with Disapproved status
        And click on the Waivers tab
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click Disapproved checkbox
        And verify the actions button is disabled in the package dashboard