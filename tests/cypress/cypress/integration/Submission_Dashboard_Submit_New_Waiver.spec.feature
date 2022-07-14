Feature: Submit a New Waiver in Submission Dashboard
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on Waiver Action

    Scenario: Verify that submitter user can submit a New Waiver
        And Click on Waiver Action under Waiver Type
        And Click on New Waiver under Action type
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And Type new Waiver Number 1 in format SS-#####.R00.00
        And Upload 1915 b 4 file
        And Type "This is just a test" in Summary Box
        And Click on Submit Button
        And verify submission Successful message
        And verify ID Number Exists
        And Return to dashboard Page