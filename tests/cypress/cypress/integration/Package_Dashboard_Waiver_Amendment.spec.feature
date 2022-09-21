Feature: Create a waiver Amendment

    Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages

    Scenario: Screen Enhance - Amendment
        Then click on New Submission
        And Click on Waiver Action
        And verify Waiver Amendment is a clickable option
        And click on Waiver Amendment
        And verify user is on new waiver amendment page

    Scenario: Existing Waiver Number to Amend Input Field format
        Then click on New Submission
        And Click on Waiver Action
        And click on Waiver Amendment
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type bad format into Existing Waiver Number to Amend field
        And type new waiver amendment number 2 in 1915b Waiver Amendment Number field
        And select proposed effective date 3 months from today
        And Upload 1915 b 4 file
        And verify error message is present on package dashboard New Waiver Page
        And verify the submit button is disabled
        And clear Existing Waiver Number to Amend field
        And type approved Initial Waiver number into Existing Waiver Number to Amend field
        And verify error message is not present on New Waiver Page
        And verify the submit button is not disabled
        And clear Existing Waiver Number to Amend field
        And type bad format into Existing Waiver Number to Amend field
        And verify error message is present on package dashboard New Waiver Page
        And verify the submit button is disabled
        And clear Existing Waiver Number to Amend field

    Scenario: 1915b Waiver Amendment Number Input Field format
        Then click on New Submission
        And Click on Waiver Action
        And click on Waiver Amendment
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type approved Initial Waiver number into Existing Waiver Number to Amend field
        And type bad format into 1915b Waiver Amendment Number field
        And select proposed effective date 3 months from today
        And Upload 1915 b 4 file
        And verify error message is present on package dashboard New Waiver Page
        And verify the submit button is disabled
        And clear 1915b Waiver Amendment Number field
        And type new waiver amendment number 2 in 1915b Waiver Amendment Number field
        And verify error message is not present on New Waiver Page
        And verify the submit button is not disabled
        And clear 1915b Waiver Amendment Number field
        And type bad format into 1915b Waiver Amendment Number field
        And verify error message is present on package dashboard New Waiver Page
        And verify the submit button is disabled
        And clear 1915b Waiver Amendment Number field

    Scenario: create waiver amendment from package dashboard and search it
        Then click on New Submission
        And Click on Waiver Action
        And click on Waiver Amendment
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type approved Initial Waiver number into Existing Waiver Number to Amend field
        And type new waiver amendment number 1 in 1915b Waiver Amendment Number field
        And select proposed effective date 3 months from today
        And Upload 1915 b 4 file
        And Type Additonal Info Comments in new form
        And Click on Submit Button
        And verify submission successful message in the alert bar
        And verify the Waivers tab is selected
        And search for "MD-5533.R00"
        And verify id number in the first row matches approved waiver number
        And click parent row expander
        And verify id number in the child row matches new waiver amendment number 1

    Scenario: Verify user can create an amendment from the package details Mini-Dashboard
        And click on the Waivers tab
        And search for approved Initial Waiver Number 1
        And click the Waiver Number link in the first row
        And verify Add Amendment package action exists
        And click Add Amendment package action
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type new waiver amendment number 3 in 1915b Waiver Amendment Number field
        And select proposed effective date 3 months from today
        And Upload 1915 b 4 file
        And Type Additonal Info Comments in new form
        And Click on Submit Button
        And verify submission successful message in the alert bar

    Scenario: Verify user can create an amendment from the package dashboard waiver tab
        And click on the Waivers tab
        And search for approved Initial Waiver Number 1
        And click the actions button in row one
        And verify the Add Amendment button is displayed
        And click the Add Amendment button
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type new waiver amendment number 4 in 1915b Waiver Amendment Number field
        And select proposed effective date 3 months from today
        And Upload 1915 b 4 file
        And Type Additonal Info Comments in new form
        And Click on Submit Button
        And verify submission successful message in the alert bar