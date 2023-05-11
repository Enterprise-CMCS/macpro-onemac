Feature: Update Waiver Form: Initial Waiver

    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        Then Click on Waiver Action

    Scenario: Screen Enhance - Initial Waiver
        Then verify Initial Waiver is a clickable option
        Then click on Initial Waiver
        Then verify user is on new initial waiver page

    Scenario: Initial Waiver number format
        Then click on Initial Waiver
        Then Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        Then type initial waiver number in old format SS.####.R00.00
        Then select proposed effective date 3 months from today
        Then Upload 1915 b 4 file
        Then verify error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled
        Then clear Waiver Number Input box in new form
        Then Type Initial Waiver Number in format SS-#####.R00.00
        Then verify error message is not present on New Waiver Page
        Then verify the submit button is not disabled
        Then clear Waiver Number Input box in new form
        Then type initial waiver number in old format SS.#####.R00.00
        Then verify error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled
        Then clear Waiver Number Input box in new form

    Scenario: create initial waiver from package dashboard and search it
        Then click on Initial Waiver
        Then Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        Then Type Initial Waiver Number in format SS-#####.R00.00
        Then select proposed effective date 3 months from today
        Then Upload 1915 b 4 file
        Then Type Additonal Info Comments in new form
        Then Click on Submit Button
        Then verify submission successful message in the alert bar
        Then verify the Waivers tab is selected
        Then search for Initial Waiver Number 1 with 12 Characters
        Then verify id number in the first row matches Initial Waiver Number 1
