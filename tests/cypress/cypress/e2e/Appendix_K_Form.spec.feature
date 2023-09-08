Feature: Appendix K Waiver Type Selection
    Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        Then Click on Waiver Action

    Scenario: Screen Enhance - Appendix K
        Then verify Appendix K is a clickable option
        Then Click on Appendix K Amendment
        Then verify user is on new Appendix K page
        Then verify the attachment info descriptiion
        Then verify the attachment info link is for "Appendix K"
    
    Scenario: Verify the Waiver Number format on Appendix K Form
        Then Click on Appendix K Amendment
        Then type Appendix K Submission 1 into Amendment Title field
        Then type in unused Waiver Number with 5 characters on Appendix K Amendment Page
        Then Add file for 1915c Appendix K Amendment Waiver Template
        Then select proposed effective date 3 months from today
        Then verify error message is not present on Appendix K Amendment Page
        Then verify the submit button is not disabled
        Then clear Waiver Number Input box on Appendix K Amendment Page
        Then type in invalid Waiver Number on Appendix K Amendment Page
        Then verify that error message for incorrect Waiver Number is Displayed on Appendix K Amendment Page
        Then verify error message contains 'For amendments, the last two digits start with'
        Then verify the submit button is disabled
        Then clear Waiver Number Input box on Appendix K Amendment Page
        Then type in unused Waiver Number with 5 characters on Appendix K Amendment Page
        Then verify error message is not present on Appendix K Amendment Page
        Then verify the submit button is not disabled

    Scenario: create Appendix K from package dashboard and search it
        Then Click on Appendix K Amendment
        Then type Appendix K Submission 1 into Amendment Title field
        Then type in Waiver Number with 5 characters on Appendix K Amendment Page
        Then select proposed effective date 3 months from today
        Then Add file for 1915c Appendix K Amendment Waiver Template
        Then Type Additonal Info Comments in new form
        Then Click on Submit Button
        Then verify submission successful message in the alert bar
        Then verify the Waivers tab is selected
        Then search for "MD-22106.R01.02"
        Then verify id number in the first row matches "MD-22106.R01.02"
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Submitted"
        Then verify package actions header is visible
        Then verify there are no package actions available
        Then verify the details section exists
        Then verify there is a Latest Package Activity header in the details section
        Then verify a full date and time entry exists for the Latest Package Activity
        Then verify the waiver authority header exists
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Amendment Title header in the details section
        Then verify the Amendment Title is "Appendix K Submission 1"
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section