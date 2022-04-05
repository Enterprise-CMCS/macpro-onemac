Feature: Clicking withdraw package on a waiver component doesn't withdraw the component
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on Waiver Action
        And Click on Waiver Action under Waiver Type
        And Click on New Waiver under Action type
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And Type Unique Valid Waiver Number With 5 Characters
        And Upload 1915 b 4 file
        And Type "This is just a test" in Summary Box
        And Click on Submit Button
        And click on New Submission
        And Click on Waiver Action

    Scenario: Verify user can withdraw amendment component
        And Click on Waiver Action under Waiver Type
        And Click on Waiver Amendment under Action type
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And Type Unique Valid Waiver Amendment Number With 5 Characters
        And Upload 1915 b 4 file
        And Type "This is just another test" in Summary Box
        And Click on Submit Button
        And click on Packages
        And click on the Waivers tab
        And search for Unique Valid Waiver Number with 5 Characters
        And wait for parent row expander to be enabled
        And click parent row expander
        And click actions button on the child row
        And click withdraw package button
        And click yes, withdraw package button
        And verify success message for Package Withdrawal
        And search for Unique Valid Waiver Number with 5 Characters
        And wait for parent row expander to be enabled
        And click parent row expander
        And verify child row has status "Withdrawn"

    Scenario: Verify user can withdraw temporary extension component
        And Click on Request Temporary Extension
        And Type existing Unique Valid Waiver Number With 5 Characters
        And Upload 1915 b 4 file
        And Type "This is a temporary extension test" in Summary Box
        And Click on Submit Button
        And click on Packages
        And click on the Waivers tab
        And search for Unique Valid Waiver Number with 5 Characters
        And wait for parent row expander to be enabled
        And click parent row expander
        And click actions button for Temporary Extension in Child Row
        And click withdraw package button
        And click yes, withdraw package button
        And verify success message for Package Withdrawal
        And search for Unique Valid Waiver Number with 5 Characters
        And wait for parent row expander to be enabled
        And click parent row expander
        And verify child row has status "Withdrawn"





