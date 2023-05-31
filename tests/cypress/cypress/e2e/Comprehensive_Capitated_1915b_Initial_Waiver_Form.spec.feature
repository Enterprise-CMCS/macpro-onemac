Feature: 1915b Comprehensive Capitated Initial Waiver
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        Then Click on Waiver Action
        Then click on 1915b Waiver Actions
        Then click on 1915b Comprehensive Capitated Waiver Authority

    Scenario: Screen Enhance - Initial Waiver
        Then verify 1915b Comprehensive Capitated New Initial Waiver is a clickable option
        Then click on 1915b Comprehensive Capitated New Initial Waiver
        Then verify user is on new initial waiver page
        Then verify the attachment info descriptiion
        Then verify the attachment info link is for "1915b Waiver"

    Scenario: Initial Waiver number format
        Then click on 1915b Comprehensive Capitated New Initial Waiver
        Then verify All other 1915 b Waivers is displayed under Waiver Authority
        Then type initial waiver number in old format SS.####.R00.00
        Then select proposed effective date 3 months from today
        Then Add file for 1915b Comprehensive Capitated Waiver Application Pre-print
        Then Add file for 1915b Comprehensive Capitated Waiver Cost Effectiveness Spreadsheets
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

    Scenario: Verify pre-print and spreadsheet are both required
        Then click on 1915b Comprehensive Capitated New Initial Waiver
        Then verify All other 1915 b Waivers is displayed under Waiver Authority
        Then Type a valid and unused Initial Waiver Number in format SS-#####.R00.00
        Then select proposed effective date 3 months from today
        Then Add file for 1915b Comprehensive Capitated Waiver Cost Effectiveness Spreadsheets
        Then verify the submit button is disabled
        Then Remove file for 1915b Comprehensive Capitated Waiver Cost Effectiveness Spreadsheets
        Then Add file for 1915b Comprehensive Capitated Waiver Application Pre-print
        Then verify the submit button is disabled
        Then Add file for 1915b Comprehensive Capitated Waiver Cost Effectiveness Spreadsheets
        Then verify the submit button is not disabled

    Scenario: create initial waiver from package dashboard and search it
        Then click on 1915b Comprehensive Capitated New Initial Waiver
        Then verify All other 1915 b Waivers is displayed under Waiver Authority
        Then Type Initial Waiver Number in format SS-#####.R00.00
        Then select proposed effective date 3 months from today
        Then Add file for 1915b Comprehensive Capitated Waiver Application Pre-print
        Then Add file for 1915b Comprehensive Capitated Waiver Cost Effectiveness Spreadsheets
        Then Type Additonal Info Comments in new form
        Then Click on Submit Button
        Then verify submission successful message in the alert bar
        Then verify the Waivers tab is selected
        Then search for Initial Waiver Number 1 with 12 Characters
        Then verify id number in the first row matches Initial Waiver Number 1
