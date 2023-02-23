Feature: Appendix K Waiver Type Selection
    Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        Then click on New Submission
        And Click on Waiver Action

    Scenario: Screen Enhance - Appendix K
        And verify Appendix K is a clickable option
        And Click on Appendix K Amendment
        And verify user is on new Appendix K page

    Scenario: create Appendix K from package dashboard and search it
        And Click on Appendix K Amendment
        And type Appendix K Submission 1 into Amendment Title field
        And type in Waiver Number with 5 characters on Appendix K Amendment Page
        And select proposed effective date 3 months from today
        And Add file for 1915c Appendix K Amendment Waiver Template
        And Type Additonal Info Comments in new form
        And Click on Submit Button
        And verify submission successful message in the alert bar
        And verify the Waivers tab is selected
        And search for "MD-22106.R01.02"
        And verify id number in the first row matches "MD-22106.R01.02"
        And click the Waiver Number link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Submitted"
        And verify package actions header is visible
        And verify there are no package actions available
        And verify the details section exists
        And verify the waiver authority header exists
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Amendment Title in the details section
        And verify the Amendment Title is "Appendix K Submission 1"
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section