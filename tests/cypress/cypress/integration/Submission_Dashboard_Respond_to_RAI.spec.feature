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

#Feature: OY2_13234_Waiver_RAI
#  Scenario: Submission List Verification > Submit new Waiver and Respond to Waiver RAI
#    Given I am on Login Page
# When Clicking on Development Login
# When Login with state submitter user
# Then click on New Submission
# And Click on Waiver Action
# And click on Waiver Action on Waiver Action Type page
# And select Action Type New Waiver
# And select 1915b 4 FFS Selective Contracting waivers
# And Type Valid Waiver Number With 5 Characters for RAI
# And Add file for 1915b 4 FFS Selective Contracting waiver application pre-print
# And Type Additonal Information Comments
# And Click on Submit Button
# And verify submission Successful message
# And verify Waiver Number EXISTS
# And verify submission date
# And Verify submission Waiver type
# And click on Waiver Respond to RAI
# And Add file for Waiver RAI Response
# And Add Additional Comments
# And Click on Submit Button
# And verify submission Successful message after RAI
# And Verify submission type Waiver RAI
# And Verify Waiver RAI ID number matches Waiver number
# And verify submission date

#Feature: OY2_5868_Submission_List_Verification
    Scenario: Submission List Verification > Submit new SPA and Respond to SPA RAI
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
        # And verify SPA ID EXISTS
        # And verify submission date
        # And Verify submission type
        And click on spa Respond to RAI
        And Add file for RAI Response
        And Add Additional Comments
        And Click on Submit Button
        And verify submission Successful message after RAI
# And Verify submission typeRAI
# And Verify SPA RAI ID number matches Medical SPA ID number
# And verify submission date