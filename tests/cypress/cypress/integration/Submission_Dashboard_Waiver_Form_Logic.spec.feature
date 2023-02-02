Feature: OY2_4807_Validate_Waiver_Form_Logic
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on Waiver Action

    Scenario: Validate Waiver Form Logic for New Waiver and All other
        And Click on Waiver Action under Waiver Type
        And Click on New Waiver under Action type
        And Click on All other 1915 b Waivers under Waiver Authority
        And type in invalid Waiver Number on old form
        And Type "This is just a comment" in Summary Box
        And verify error message is present on submission dashboard New Waiver Page
        And verify the submit button is disabled

    Scenario: Validate Waiver Form Logic for Waiver Amendment and 1915(b)
        And Click on Waiver Action under Waiver Type
        And Click on Waiver Amendment under Action type
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type in invalid Waiver Number on old form
        And verify error message is present on submission dashboard New Waiver Page
        And verify error message in old form contains 'For amendments, the last two digits start with “01” and ascends'
        And Upload 1915 b 4 file
        And verify the submit button is disabled
        And clear Waiver Number Input box in old form
        And type in Existing Waiver Number in old form
        And verify error message is present on submission dashboard New Waiver Page
        And verify the submit button is disabled
        And clear Waiver Number Input box in old form
        And type in valid waiver amendment number in old forms 
        And verify error message is not present on New Waiver Page
        And verify the submit button is not disabled 


    Scenario: Validate Waiver Form Logic for Waiver Renewal and All other
        And Click on Waiver Action under Waiver Type
        And Click on Request for waiver renewal from Action Type
        And Click on All other 1915 b Waivers under Waiver Authority
        And type in Existing Waiver Number in old form
        And Upload 1915 b 4 file
        And verify error message is present on submission dashboard New Waiver Page
        And verify the submit button is disabled

    Scenario: Verify the Waiver Number format on Submit New Waiver Action
        And Click on Waiver Action under Waiver Type
        And Click on New Waiver under Action type
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type in a correct Waiver Number with 4 characters
        And Upload 1915 b 4 file
        And verify error message is not present on New Waiver Page
        And verify the submit button is not disabled
        And clear Waiver Number Input box in old form
        And verify the submit button is disabled
        And type in a correct Waiver Number with 5 characters
        And verify error message is not present on New Waiver Page
        And verify the submit button is not disabled
        And clear Waiver Number Input box in old form
        And verify the submit button is disabled
        And type in invalid Waiver Number on old form
        And verify error message is present on submission dashboard New Waiver Page
        And verify the submit button is disabled
        And clear Waiver Number Input box in old form
        And verify the submit button is disabled
        And type in a correct Waiver Number with 5 characters
        And verify error message is not present on New Waiver Page
        And verify the submit button is not disabled

    Scenario: Verify the Waiver Number format on Appendix K Form
        And Click on Appendix K Amendment
        And type in Waiver Number with 5 characters On Appendix K Amendment Page
        And Add file for 1915c Appendix K Amendment Waiver Template
        And verify error message is not present on old Appendix K Amendment Page
        And verify the submit button is not disabled
        And clear Waiver Number Input box on old Appendix K Amendment Page
        And type in invalid Waiver Number On Appendix K Amendment Page
        And verify that error message for incorrect Waiver Number is Displayed On Appendix K Amendment Page
        And verify error message in old form contains 'For amendments, the last two digits start with “01” and ascends'
        And verify the submit button is disabled
        And clear Waiver Number Input box on old Appendix K Amendment Page
        And type in Waiver Number with 5 characters On Appendix K Amendment Page
        And verify error message is not present on old Appendix K Amendment Page
        And verify the submit button is not disabled