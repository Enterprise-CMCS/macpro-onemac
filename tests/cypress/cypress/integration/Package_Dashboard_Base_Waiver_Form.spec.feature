Feature: Update Waiver Form: Base Waiver

    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        Then click on New Submission
        And Click on Waiver Action

    Scenario: Screen Enhance - Base Waiver
        And verify Base Waiver is a clickable option
        And click on Base Waiver
        And verify user is on new base waiver page

    Scenario: Base Waiver number format
        And click on Base Waiver
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type base waiver number in old format SS.####.R00.00
        And select proposed effective date 3 months from today
        And Upload 1915 b 4 file
        And verify that error message for incorrect Waiver Number is Displayed
        And verify the submit button is disabled
        And clear Waiver Number Input box in new form
        And Type Base Waiver Number in format SS-#####.R00.00
        And verify error message is not present on New Waiver Page
        And verify the submit button is not disabled
        And clear Waiver Number Input box in new form
        And type base waiver number in old format SS.#####.R00.00
        And verify that error message for incorrect Waiver Number is Displayed
        And verify the submit button is disabled
        And clear Waiver Number Input box in new form

    Scenario: create base waiver from package dashboard and search it
        And click on Base Waiver
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And Type Base Waiver Number in format SS-#####.R00.00
        And select proposed effective date 3 months from today
        And Upload 1915 b 4 file
        And Type Additonal Info Comments in new form
        And Click on Submit Button
        And verify submission successful message in the alert bar
        And verify the Waivers tab is selected
        And search for Base Waiver Number 1 with 12 Characters
        And verify id number in the first row matches Base Waiver Number 1