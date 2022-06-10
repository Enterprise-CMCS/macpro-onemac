Feature: Update Waiver Form: Base Waiver

    Scenario: Screen Enhance - Base Waiver
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        Then click on New Submission
        And Click on Waiver Action
        And verify Base Waiver is a clickable option
        And click on Base Waiver
        And verify user is on new base waiver page

    Scenario: create base waiver from package dashboard and search it
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        Then click on New Submission
        And Click on Waiver Action
        And click on Base Waiver
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And Type Base Waiver Number in format SS.#####.R00.00
        And select proposed effective date 3 months from today
        And Upload 1915 b 4 file
        And Type "This is just a test" in Summary Box
        And Click on Submit Button
        And verify submission Successful message
        And verify the Waivers tab is selected
        And search for Base Waiver Number 1 with 12 Characters
        And verify id number in the first row matches Base Waiver Number 1