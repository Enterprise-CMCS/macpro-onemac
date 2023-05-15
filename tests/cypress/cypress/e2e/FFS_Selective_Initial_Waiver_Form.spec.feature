Feature: FFS Selective Initial Waiver
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        Then Click on Waiver Action
        Then click on 1915b Waiver Actions
        Then click on 1915b 4 FFS Selective Contracting waivers

    Scenario: Screen Enhance - Initial Waiver
        Then verify 1915b 4 FFS Selective Contracting New Initial Waiver is a clickable option
        Then click on 1915b 4 FFS Selective Contracting New Initial Waiver
        Then verify user is on new initial waiver page

    Scenario: Initial Waiver number format
        Then click on 1915b 4 FFS Selective Contracting New Initial Waiver
        Then verify 1915 b 4 FFS Selective Contracting waivers is displayed under Waiver Authority
        Then type initial waiver number in old format SS.####.R00.00
        Then select proposed effective date 3 months from today
        Then Add file for 1915b 4 FFS Selective Contracting waiver application pre-print
        Then verify error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled
        Then clear Waiver Number Input box in new form
        Then Type a valid and unused Initial Waiver Number in format SS-#####.R00.00
        Then verify error message is not present on New Waiver Page
        Then verify the submit button is not disabled
        Then clear Waiver Number Input box in new form
        Then type initial waiver number in old format SS.#####.R00.00
        Then verify error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled
        Then clear Waiver Number Input box in new form

    Scenario: create initial waiver from package dashboard and search it
        Then click on 1915b 4 FFS Selective Contracting New Initial Waiver
        Then verify 1915 b 4 FFS Selective Contracting waivers is displayed under Waiver Authority
        Then Type Initial Waiver Number 3 in format SS-#####.R00.00
        Then select proposed effective date 3 months from today
        Then Add file for 1915b 4 FFS Selective Contracting waiver application pre-print
        Then Type Additonal Info Comments in new form
        Then Click on Submit Button
        Then verify submission successful message in the alert bar
        Then verify the Waivers tab is selected
        Then search for Initial Waiver Number 3 with 12 Characters
        Then verify id number in the first row matches Initial Waiver Number 3
