Feature: Waiver Renewal in Package Dashboard
    Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        Then click on New Submission
        And Click on Waiver Action

    Scenario: Screen Enhance - Waiver Renewal
        And verify Waiver Renewal is a clickable option
        And click on Waiver Renewal
        And verify user is on new waiver renewal page
@focus 
    Scenario: Existing Waiver Number Input Field format
        And click on Waiver Renewal
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type bad format into Existing Waiver Number to Renew field
        And type new waiver renewal number 2 in 1915b Waiver Renewal Number field
        And select proposed effective date 3 months from today
        And Upload 1915 b 4 file
        And verify parent error message is present on package dashboard New Waiver Page
        And verify the submit button is disabled
        And clear Existing Waiver Number to Renew field
        And type approved Initial Waiver number into Existing Waiver Number to Renew field
        And verify parent error message is not present on New Waiver Page
        And verify the submit button is not disabled
        And clear Existing Waiver Number to Renew field
        And type bad format into Existing Waiver Number to Renew field
        And verify parent error message is present on package dashboard New Waiver Page
        And verify the submit button is disabled
        And clear Existing Waiver Number to Renew field

    Scenario: 1915b Waiver Renewal Number Input Field format
        And click on Waiver Renewal
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type approved Initial Waiver number into Existing Waiver Number to Renew field
        And type bad format into 1915b Waiver Renewal Number field
        And select proposed effective date 3 months from today
        And Upload 1915 b 4 file
        And verify error message is present on package dashboard New Waiver Page
        And verify the submit button is disabled
        And clear 1915b Waiver Renewal Number field
        And type new waiver renewal number 2 in 1915b Waiver Renewal Number field
        And verify error message is not present on New Waiver Page
        And verify the submit button is not disabled
        And clear 1915b Waiver Renewal Number field
        And type bad format into 1915b Waiver Renewal Number field
        And verify error message is present on package dashboard New Waiver Page
        And verify the submit button is disabled
        And clear 1915b Waiver Renewal Number field

    Scenario: create waiver renewal from package dashboard and search it
        And click on Waiver Renewal
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type approved Initial Waiver number into Existing Waiver Number to Renew field
        And type new waiver renewal number 1 in 1915b Waiver Renewal Number field
        And select proposed effective date 3 months from today
        And Upload 1915 b 4 file
        And Type Additonal Info Comments in new form
        And Click on Submit Button
        And verify submission successful message in the alert bar
        And verify the Waivers tab is selected
        And search for new waiver renewal number 1
        And verify id number in the first row matches new waiver renewal number 1