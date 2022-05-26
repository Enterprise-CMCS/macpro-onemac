Feature: State should not be able to withdraw RAI Responses in OneMAC
    Scenario: Can not withdraw Waiver RAI Response
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Waiver Respond to RAI
        And Add file for Waiver RAI Response
        And Click on Submit Button
        And verify submission Successful message after RAI
        And Verify submission type Waiver RAI
        And verify the actions button is unavailable

    Scenario: Can not withdraw SPA RAI Response
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And verify SPA ID 1 EXISTS
        And verify submission date
        And Verify submission type
        And click on spa Respond to RAI
        And Add file for RAI Response
        And Add Additional Comments
        And Click on Submit Button
        And verify submission Successful message after RAI
        And Verify submission typeRAI
        And verify the actions button is unavailable