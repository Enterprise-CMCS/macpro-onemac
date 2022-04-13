Feature: OY2-16333 Update Waiver Form: Temporary Extension
    Background: reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        Then click on New Submission
        And Click on Waiver Action
        And click on Base Waiver
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And Type Unique Valid Base Waiver Number With SS.#####.R00.00 format
        And select proposed effective date 3 months from today
        And upload Waiver Extension Request
        And Type "This is just a test" in Summary Box
        And Click on Submit Button
        And verify submission Successful message
        And verify the Waivers tab is selected

    Scenario: Verify user can create a temporary extension and that it is in the temporary extensions list
        Then click on New Submission
        And Click on Waiver Action
        And Click on Request Temporary Extension
        And Type Unique Valid Temporary Extension Number With 5 Characters
        And upload Waiver Extension Request
        And Type "This is just a test" in Summary Box
        And Click on Submit Button
        And click on Packages
        And click on the Waivers tab
        And search for Unique Valid Base Waiver Number with 12 Characters
        And click the Waiver Number link in the first row
        And click on the Temporary Extension nav button
        And verify the temporary extension exists

    Scenario: Verify user can withdraw temporary extension from mini-dashboard page
        Then click on New Submission
        And Click on Waiver Action
        And Click on Request Temporary Extension
        And Type Unique Valid Temporary Extension Number With 5 Characters
        And upload Waiver Extension Request
        And Type "This is just a test" in Summary Box
        And Click on Submit Button
        And click on Packages
        And click on the Waivers tab
        And search for Unique Valid Base Waiver Number with 12 Characters
        And click the Waiver Number link in the first row
        And click on the Temporary Extension nav button
        And click the action button for the temporary extension
        And click withdraw button on the temp extension page
        And click yes, withdraw package button
        And verify success message for Package Withdrawal