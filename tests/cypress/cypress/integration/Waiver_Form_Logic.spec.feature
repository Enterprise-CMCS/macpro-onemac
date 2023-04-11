Feature: Validate Waiver Form is checking ID format without period
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        Then click on New Submission
        And Click on Waiver Action

    Scenario: Verify Initial Waiver number errors when dash is used
        And click on Initial Waiver
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type initial waiver number in old format SS.####.R00.00
        And select proposed effective date 3 months from today
        And Upload 1915 b 4 file
        And verify error message is present on package dashboard New Waiver Page
        And verify the submit button is disabled
        And clear Waiver Number Input box in new form
        And Type a valid and unused Initial Waiver Number in format SS-#####.R00.00
        And verify error message is not present on New Waiver Page
        And verify the submit button is not disabled
        And clear Waiver Number Input box in new form
        And type initial waiver number in old format SS.#####.R00.00
        And verify error message is present on package dashboard New Waiver Page
        And verify the submit button is disabled
        And clear Waiver Number Input box in new form

    Scenario: Validate Waiver Form Logic for Waiver Amendment
        And click on Waiver Amendment
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type approved Initial Waiver number into Existing Waiver Number to Amend field
        And type in invalid Waiver Number
        And select proposed effective date 3 months from today
        And verify error message is present on package dashboard New Waiver Page
        And verify error message contains "For amendments, the last two digits start with"
        And Upload 1915 b 4 file
        And verify the submit button is disabled
        And clear Waiver Number Input box in new form
        And type in Existing Waiver Number in new form
        And verify error message is present on package dashboard New Waiver Page
        And verify the submit button is disabled
        And clear Waiver Number Input box in new form
        And type in valid waiver amendment number
        And verify error message is not present on New Waiver Page
        And verify the submit button is not disabled 


    Scenario: Validate Waiver Form Logic for Waiver Renewal and All other
        And click on Waiver Renewal
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type in Existing Waiver Number in new form
        And Upload 1915 b 4 file
        And verify error message is present on package dashboard New Waiver Page
        And verify the submit button is disabled

@focus 
    Scenario: Verify the Waiver Number format on Appendix K Form
        And Click on Appendix K Amendment
        And type Appendix K Submission 1 into Amendment Title field
        And type in unused Waiver Number with 5 characters on Appendix K Amendment Page
        And Add file for 1915c Appendix K Amendment Waiver Template
        And select proposed effective date 3 months from today
        And verify error message is not present on Appendix K Amendment Page
        And verify the submit button is not disabled
        And clear Waiver Number Input box on Appendix K Amendment Page
        And type in invalid Waiver Number on Appendix K Amendment Page
        And verify that error message for incorrect Waiver Number is Displayed on Appendix K Amendment Page
        And verify error message contains 'For amendments, the last two digits start with'
        And verify the submit button is disabled
        And clear Waiver Number Input box on Appendix K Amendment Page
        And type in unused Waiver Number with 5 characters on Appendix K Amendment Page
        And verify error message is not present on Appendix K Amendment Page
        And verify the submit button is not disabled