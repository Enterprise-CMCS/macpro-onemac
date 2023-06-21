Feature: Create a waiver Amendment

    Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user

    Scenario: Screen Enhance - Amendment
        Then click on New Submission
        Then Click on Waiver Action
        Then click on 1915b Waiver Actions
        Then click on 1915b Comprehensive Capitated Waiver Authority
        Then verify 1915b Comprehensive Capitated Waiver Amendment is a clickable option
        Then click on 1915b Comprehensive Capitated Waiver Amendment
        Then verify user is on new waiver amendment page
        Then verify the attachment info descriptiion
        Then verify the attachment info link is for "1915b Waiver"

    Scenario: Existing Waiver Number to Amend Input Field format
        Then click on New Submission
        Then Click on Waiver Action
        Then click on 1915b Waiver Actions
        Then click on 1915b Comprehensive Capitated Waiver Authority
        Then click on 1915b Comprehensive Capitated Waiver Amendment
        Then verify All other 1915 b Waivers is displayed under Waiver Authority
        Then type bad format into Existing Waiver Number to Amend field
        Then type new waiver amendment number 2 in 1915b Waiver Amendment Number field
        Then select proposed effective date 3 months from today
        Then Add file for 1915b Comprehensive Capitated Waiver Application Pre-print
        Then Add file for 1915b Comprehensive Capitated Waiver Cost Effectiveness Spreadsheets
        Then verify parent error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled
        Then clear Existing Waiver Number to Amend field
        Then type approved Initial Waiver number into Existing Waiver Number to Amend field
        Then verify parent error message is not present on New Waiver Page
        Then verify the submit button is not disabled
        Then clear Existing Waiver Number to Amend field
        Then type bad format into Existing Waiver Number to Amend field
        Then verify parent error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled
        Then clear Existing Waiver Number to Amend field

    Scenario: 1915b Waiver Amendment Number Input Field format
        Then click on New Submission
        Then Click on Waiver Action
        Then click on 1915b Waiver Actions
        Then click on 1915b Comprehensive Capitated Waiver Authority
        Then click on 1915b Comprehensive Capitated Waiver Amendment
        Then verify All other 1915 b Waivers is displayed under Waiver Authority
        Then type approved Initial Waiver number into Existing Waiver Number to Amend field
        Then type bad format into 1915b Waiver Amendment Number field
        Then select proposed effective date 3 months from today
        Then Add file for 1915b Comprehensive Capitated Waiver Application Pre-print
        Then Add file for 1915b Comprehensive Capitated Waiver Cost Effectiveness Spreadsheets
        Then verify error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled
        Then clear 1915b Waiver Amendment Number field
        Then type new waiver amendment number 2 in 1915b Waiver Amendment Number field
        Then verify error message is not present on New Waiver Page
        Then verify the submit button is not disabled
        Then clear 1915b Waiver Amendment Number field
        Then type bad format into 1915b Waiver Amendment Number field
        Then verify error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled
        Then clear 1915b Waiver Amendment Number field

    Scenario: Verify pre-print and spreadsheet are both required
        Then click on New Submission
        Then Click on Waiver Action
        Then click on 1915b Waiver Actions
        Then click on 1915b Comprehensive Capitated Waiver Authority
        Then click on 1915b Comprehensive Capitated Waiver Amendment
        Then verify All other 1915 b Waivers is displayed under Waiver Authority
        Then type approved Initial Waiver number into Existing Waiver Number to Amend field
        Then type new waiver amendment number 2 in 1915b Waiver Amendment Number field
        Then select proposed effective date 3 months from today
        Then Add file for 1915b Comprehensive Capitated Waiver Cost Effectiveness Spreadsheets
        Then verify the submit button is disabled
        Then Remove file for 1915b Comprehensive Capitated Waiver Cost Effectiveness Spreadsheets
        Then Add file for 1915b Comprehensive Capitated Waiver Application Pre-print
        Then verify the submit button is disabled
        Then Add file for 1915b Comprehensive Capitated Waiver Cost Effectiveness Spreadsheets
        Then verify the submit button is not disabled

    Scenario: create waiver amendment from package dashboard and search it
        Then click on New Submission
        Then Click on Waiver Action
        Then click on 1915b Waiver Actions
        Then click on 1915b Comprehensive Capitated Waiver Authority
        Then click on 1915b Comprehensive Capitated Waiver Amendment
        Then verify All other 1915 b Waivers is displayed under Waiver Authority
        Then type approved Initial Waiver number into Existing Waiver Number to Amend field
        Then type new waiver amendment number 1 in 1915b Waiver Amendment Number field
        Then select proposed effective date 3 months from today
        Then Add file for 1915b Comprehensive Capitated Waiver Application Pre-print
        Then Add file for 1915b Comprehensive Capitated Waiver Cost Effectiveness Spreadsheets
        Then Type Additonal Info Comments in new form
        Then Click on Submit Button
        Then verify submission successful message in the alert bar
        Then verify the Waivers tab is selected
        Then search for "MD-5533.R00.01"
        Then verify id number in the first row matches new waiver amendment number 1

    #need more time to consider hwo to test with different authority parent
    # Scenario: Verify user can create an amendment from the package details Mini-Dashboard
    #     Then click on the Waivers tab
    #     Then search for approved Initial Waiver Number 1
    #     Then click the Waiver Number link in the first row
    #     Then verify Add Amendment package action exists
    #     Then click Add Amendment package action
    #     Then verify All other 1915 b Waivers is displayed under Waiver Authority
    #     Then type new waiver amendment number 5 in 1915b Waiver Amendment Number field
    #     Then select proposed effective date 3 months from today
    #     Then Add file for 1915b Comprehensive Capitated Waiver Application Pre-print
    #     Then Add file for 1915b Comprehensive Capitated Waiver Cost Effectiveness Spreadsheets
    #     Then Type Additonal Info Comments in new form
    #     Then Click on Submit Button
    #     Then verify submission successful message in the alert bar

    # Scenario: Verify user can create an amendment from the package dashboard waiver tab
    #     Then click on the Waivers tab
    #     Then search for approved Initial Waiver Number 1
    #     Then click the actions button in row one
    #     Then verify the Add Amendment button is displayed
    #     Then click the Add Amendment button
    #     Then verify All other 1915 b Waivers is displayed under Waiver Authority
    #     Then type new waiver amendment number 6 in 1915b Waiver Amendment Number field
    #     Then select proposed effective date 3 months from today
    #     Then Add file for 1915b Comprehensive Capitated Waiver Application Pre-print
    #     Then Add file for 1915b Comprehensive Capitated Waiver Cost Effectiveness Spreadsheets
    #     Then Type Additonal Info Comments in new form
    #     Then Click on Submit Button
    #     Then verify submission successful message in the alert bar