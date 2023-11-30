Feature: Create a waiver Amendment
    Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with "an Active" "State Submitter" user

    Scenario: Screen Enhance - Amendment
        Then click on New Submission
        Then Click on Waiver Action
        Then click on 1915b Waiver Actions
        Then click on 1915b 4 FFS Selective Contracting waivers
        Then verify 1915b 4 FFS Selective Contracting Waiver Amendment is a clickable option
        Then click on 1915b 4 FFS Selective Contracting Waiver Amendment
        Then verify user is on new waiver amendment page
        Then verify the attachment info descriptiion
        Then verify the attachment info link is for "1915b Waiver"

    Scenario: Existing Waiver Number to Amend Input Field format
        Then click on New Submission
        Then Click on Waiver Action
        Then click on 1915b Waiver Actions
        Then click on 1915b 4 FFS Selective Contracting waivers
        Then click on 1915b 4 FFS Selective Contracting Waiver Amendment
        Then verify Waiver Authority contains "1915 b 4 FFS Selective Contracting waivers"
        Then type bad format into Existing Waiver Number to Amend field
        Then type new waiver amendment number "2" in 1915b Waiver Amendment Number field
        Then select proposed effective date 3 months from today
        Then Attach "picture.jpg" file to attachment 1
        Then verify parent error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled
        Then clear Existing Waiver Number to Amend field
        Then type approved Initial Waiver number into Existing Waiver Number to Amend field
        Then verify Parent ID error message is not present
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
        Then click on 1915b 4 FFS Selective Contracting waivers
        Then click on 1915b 4 FFS Selective Contracting Waiver Amendment
        Then verify Waiver Authority contains "1915 b 4 FFS Selective Contracting waivers"
        Then type approved Initial Waiver number into Existing Waiver Number to Amend field
        Then type bad format into 1915b Waiver Amendment Number field
        Then select proposed effective date 3 months from today
        Then Attach "picture.jpg" file to attachment 1
        Then verify error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled
        Then clear 1915b Waiver Amendment Number field
        Then type new waiver amendment number "2" in 1915b Waiver Amendment Number field
        Then verify ID error message is not present
        Then verify the submit button is not disabled
        Then clear 1915b Waiver Amendment Number field
        Then type bad format into 1915b Waiver Amendment Number field
        Then verify error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled
        Then clear 1915b Waiver Amendment Number field

    Scenario: create waiver amendment from package dashboard and search it
        Then click on New Submission
        Then Click on Waiver Action
        Then click on 1915b Waiver Actions
        Then click on 1915b 4 FFS Selective Contracting waivers
        Then click on 1915b 4 FFS Selective Contracting Waiver Amendment
        Then verify Waiver Authority contains "1915 b 4 FFS Selective Contracting waivers"
        Then type approved Initial Waiver number into Existing Waiver Number to Amend field
        Then type new waiver amendment number "3" in 1915b Waiver Amendment Number field
        Then select proposed effective date 3 months from today
        Then Attach "picture.jpg" file to attachment 1
        Then Type Additonal Info Comments in new form
        Then Click on Submit Button
        Then verify submission successful message in the alert bar
        Then verify the Waivers tab is selected
        Then search for "MD-5533.R00.03"
        Then verify id number in the first row matches new waiver amendment number "3"
