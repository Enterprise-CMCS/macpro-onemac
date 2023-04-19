Feature: Waiver Renewal in Package Dashboard
    Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        Then Click on Waiver Action

    Scenario: Screen Enhance - Waiver Renewal
        Then verify Waiver Renewal is a clickable option
        Then click on Waiver Renewal
        Then verify user is on new waiver renewal page

    Scenario: Existing Waiver Number Input Field format
        Then click on Waiver Renewal
        Then Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        Then verify help text under Existing Waiver Number to Renew field
        Then type bad format into Existing Waiver Number to Renew field
        Then type new waiver renewal number 2 in 1915b Waiver Renewal Number field
        Then select proposed effective date 3 months from today
        Then Upload 1915 b 4 file
        Then verify parent error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled
        Then clear Existing Waiver Number to Renew field
        Then type approved Initial Waiver number into Existing Waiver Number to Renew field
        Then verify parent error message is not present on New Waiver Page
        Then verify the submit button is not disabled
        Then clear Existing Waiver Number to Renew field
        Then type bad format into Existing Waiver Number to Renew field
        Then verify parent error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled
        Then clear Existing Waiver Number to Renew field

    Scenario: 1915b Waiver Renewal Number Input Field format
        Then click on Waiver Renewal
        Then Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        Then type approved Initial Waiver number into Existing Waiver Number to Renew field
        Then type bad format into 1915b Waiver Renewal Number field
        Then select proposed effective date 3 months from today
        Then Upload 1915 b 4 file
        Then verify error message is present on package dashboard New Waiver Page
        Then verify the error message for renewals includes For renewals, the “R##” starts with ‘01’ and ascends.
        Then verify the submit button is disabled
        Then clear 1915b Waiver Renewal Number field
        Then type new waiver renewal number 2 in 1915b Waiver Renewal Number field
        Then verify error message is not present on New Waiver Page
        Then verify the submit button is not disabled
        Then clear 1915b Waiver Renewal Number field
        Then type bad format into 1915b Waiver Renewal Number field
        Then verify error message is present on package dashboard New Waiver Page
        Then verify the error message for renewals includes For renewals, the “R##” starts with ‘01’ and ascends.
        Then verify the submit button is disabled
        Then clear 1915b Waiver Renewal Number field

    Scenario: create waiver renewal from package dashboard and search it
        Then click on Waiver Renewal
        Then Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        Then type approved Initial Waiver number into Existing Waiver Number to Renew field
        Then type new waiver renewal number 1 in 1915b Waiver Renewal Number field
        Then select proposed effective date 3 months from today
        Then Upload 1915 b 4 file
        Then Type Additonal Info Comments in new form
        Then Click on Submit Button
        Then verify submission successful message in the alert bar
        Then verify the Waivers tab is selected
        Then search for new waiver renewal number 1
        Then verify id number in the first row matches new waiver renewal number 1