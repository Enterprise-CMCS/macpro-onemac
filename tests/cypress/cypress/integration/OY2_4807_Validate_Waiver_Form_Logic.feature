Feature: OY2_4807_Validate_Waiver_Form_Logic
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission

    Scenario: Verify that submitter user can submit a New Waiver
        And Click on Waiver Action
        And Click on Waiver Action under Waiver Type
        And Click on New Waiver under Action type
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And Type Unique Valid Waiver Number With 5 Characters
        And Upload 1915 b 4 file
        And Type "This is just a test" in Summary Box
        And Click on Submit Button
        And verify submission Successful message
        And verify ID Number Exists
        And Return to dashboard Page

    Scenario: Validate Waiver Form Logic for New Waiver and 1915(c)
        And Click on Waiver Action
        And Click on Waiver Action under Waiver Type
        And Click on New Waiver under Action type
        And Click on All other 1915 b Waivers under Waiver Authority
        And type in invalid Waiver Number
        And verify error message is present on New Waiver Page
        And Return to dashboard Page

    Scenario: Validate Waiver Form Logic for New Waiver and All other
        And Click on Waiver Action
        And Click on Waiver Action under Waiver Type
        And Click on New Waiver under Action type
        And Click on All other 1915 b Waivers under Waiver Authority
        And type in invalid Waiver Number
        And Type "This is just a comment" in Summary Box
        And verify error message is present on New Waiver Page
        And Return to dashboard Page

    Scenario: Validate Waiver Form Logic for Waiver Amendment and 1915(b)
        And Click on Waiver Action
        And Click on Waiver Action under Waiver Type
        And Click on Waiver Amendment under Action type
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type in invalid Waiver Number
        And verify error message is present on New Waiver Page
        And Return to dashboard Page

    Scenario: Validate Waiver Form Logic for Waiver Amendment and All other
        And Click on Waiver Action
        And Click on Waiver Action under Waiver Type
        And Click on Waiver Amendment under Action type
        And Click on All other 1915 b Waivers under Waiver Authority
        And type in invalid Waiver Number
        And verify error message is present on New Waiver Page
        And Return to dashboard Page

    Scenario: Validate Waiver Form Logic for Waiver Renewal and 1915(b)
        And Click on Waiver Action
        And Click on Waiver Action under Waiver Type
        And Click on Request for waiver renewal from Action Type
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type in Existing Waiver Number
        And verify error message is present on New Waiver Page
        And Return to dashboard Page

    Scenario: Validate Waiver Form Logic for Waiver Renewal and All other
        And Click on Waiver Action
        And Click on Waiver Action under Waiver Type
        And Click on Request for waiver renewal from Action Type
        And Click on All other 1915 b Waivers under Waiver Authority
        And type in Existing Waiver Number
        And verify error message is present on New Waiver Page
        And Return to dashboard Page

