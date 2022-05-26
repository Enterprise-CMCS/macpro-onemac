Feature: OY2-15647 State User can Respond to RAI
    Scenario: Verify state user can access Respond to Medicaid SPA RAI for seatool
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on State Plan Amendment SPA
        And click on Respond to Medicaid SPA RAI
        And verify ID field is empty and not disabled

    Scenario: Verify state user can access Respond to CHIP SPA RAI for seatool
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on State Plan Amendment SPA
        And click on Respond to CHIP SPA RAI
        And verify ID field is empty and not disabled

    Scenario: Verify state user can access Respond to Waiver RAI for seatool
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on Waiver Action
        And click on Respond to Waiver RAI
        And verify ID field is empty and not disabled

#Feature: OY2_5868_Submission_List_Verification
    Scenario: Submission List Verification > Submit new SPA and Respond to SPA RAI
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on State Plan Amendment SPA
        And click on Medicaid SPA
        And type in SPA ID for RAI 1
        And Add file for CMS Form 179
        And Add file for SPA Pages
        And Type Additonal Information Comments
        And Click on Submit Button
        And verify submission Successful message
        And verify SPA ID for RAI 1 EXISTS
        And verify submission date
        And Verify submission type
        And click on spa Respond to RAI
        And Add file for RAI Response
        And Add Additional Comments
        And Click on Submit Button
        And verify submission Successful message after RAI