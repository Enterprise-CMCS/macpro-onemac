Feature: State should not be able to withdraw RAI Responses in OneMAC
    Scenario: Can not withdraw Waiver RAI Response
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on Waiver Action
        And Click on Waiver Action under Waiver Type
        And Click on New Waiver under Action type
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And Type Unique Valid Waiver Number With 5 Characters
        And Upload 1915 b 4 file
        And Click on Submit Button
        And verify submission Successful message
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
        Then click on New Submission
        And Click on State Plan Amendment SPA
        And click on Medicaid SPA
        And type in SPA ID
        And Add file for CMS Form 179
        And Add file for SPA Pages
        And Type Additonal Information Comments
        And Click on Submit Button
        And verify submission Successful message
        And verify SPA ID EXISTS
        And verify submission date
        And Verify submission type
        And click on spa Respond to RAI
        And Add file for RAI Response
        And Add Additional Comments
        And Click on Submit Button
        And verify submission Successful message after RAI
        And Verify submission typeRAI
        And verify the actions button is unavailable