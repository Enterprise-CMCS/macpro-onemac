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
@focus         
    Scenario: Validate Waiver Form Logic for Waiver Amendment
        And click on Waiver Amendment
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type in invalid Waiver Number
        And verify error message is present on package dashboard New Waiver Page
        And verify error message contains 'For amendments, the last two digits start with “01” and ascends'
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
        And Click on Waiver Action under Waiver Type
        And Click on Request for waiver renewal from Action Type
        And Click on All other 1915 b Waivers under Waiver Authority
        And type in Existing Waiver Number in new form
        And Upload 1915 b 4 file
        And verify error message is present on package dashboard New Waiver Page
        And verify the submit button is disabled

    Scenario: Verify the Waiver Number format on Submit New Waiver Action
        And Click on Waiver Action under Waiver Type
        And Click on New Waiver under Action type
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type in a correct Waiver Number with 4 characters
        And Upload 1915 b 4 file
        And verify error message is not present on New Waiver Page
        And verify the submit button is not disabled
        And clear Waiver Number Input box in new form
        And verify the submit button is disabled
        And type in a correct Waiver Number with 5 characters
        And verify error message is not present on New Waiver Page
        And verify the submit button is not disabled
        And clear Waiver Number Input box in new form
        And verify the submit button is disabled
        And type in invalid Waiver Number
        And verify error message is present on package dashboard New Waiver Page
        And verify the submit button is disabled
        And clear Waiver Number Input box in new form
        And verify the submit button is disabled
        And type in a correct Waiver Number with 5 characters
        And verify error message is not present on New Waiver Page
        And verify the submit button is not disabled

    Scenario: Verify the Waiver Number format on Appendix K Form
        And Click on Appendix K Amendment
        And type in Waiver Number with 5 characters On Appendix K Amendment Page
        And Add file for 1915c Appendix K Amendment Waiver Template
        And verify error message is not present On Appendix K Amendment Page
        And verify the submit button is not disabled
        And clear Waiver Number Input box On Appendix K Amendment Page
        And type in invalid Waiver Number On Appendix K Amendment Page
        And verify that error message for incorrect Waiver Number is Displayed On Appendix K Amendment Page
        And verify error message contains 'For amendments, the last two digits start with “01” and ascends'
        And verify the submit button is disabled
        And clear Waiver Number Input box On Appendix K Amendment Page
        And type in Waiver Number with 5 characters On Appendix K Amendment Page
        And verify error message is not present On Appendix K Amendment Page
        And verify the submit button is not disabled