Feature: Validate Waiver Form is checking ID format without period
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on Packages
        Then click on New Submission
        Then Click on Waiver Action

    Scenario: Verify Initial Waiver number errors when dash is used
        Then click on Initial Waiver
        Then Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        Then type initial waiver number in old format SS.####.R00.00
        Then select proposed effective date 3 months from today
        Then Upload 1915 b 4 file
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

    Scenario: Validate Waiver Form Logic for Waiver Amendment
        Then click on Waiver Amendment
        Then Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        Then type approved Initial Waiver number into Existing Waiver Number to Amend field
        Then type in invalid Waiver Number
        Then select proposed effective date 3 months from today
        Then verify error message is present on package dashboard New Waiver Page
        Then verify error message contains "For amendments, the last two digits start with"
        Then Upload 1915 b 4 file
        Then verify the submit button is disabled
        Then clear Waiver Number Input box in new form
        Then type in Existing Waiver Number in new form
        Then verify error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled
        Then clear Waiver Number Input box in new form
        Then type in valid waiver amendment number
        Then verify error message is not present on New Waiver Page
        Then verify the submit button is not disabled 


    Scenario: Validate Waiver Form Logic for Waiver Renewal and All other
        Then click on Waiver Renewal
        Then Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        Then type in Existing Waiver Number in new form
        Then Upload 1915 b 4 file
        Then verify error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled

@focus 
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