Feature: Submission Form: Submit button updates and Warning Text 
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission

    Scenario: Medicaid SPA
        And Click on State Plan Amendment SPA
        And click on Medicaid SPA
        And verify submission warning text is visible
        And verify submission warning text
        And verify the form Submit Button exists
        And verify form cancel button exists
        And click form cancel button
        And click Stay on Page
        And click form cancel button
        And click Leave Anyway form button
        And verify user is on new spa page
    
    Scenario: Respond to Medicaid SPA RAI
        And Click on State Plan Amendment SPA
        And click on Respond to Medicaid SPA RAI
        And verify submission warning text is visible
        And verify submission warning text
        And verify the form Submit Button exists
        And verify form cancel button exists
        And click form cancel button
        And click Stay on Page
        And click form cancel button
        And click Leave Anyway form button
        And verify user is on new spa page
    
    Scenario: CHIP SPA
        And Click on State Plan Amendment SPA
        And click on CHIP SPA
        And verify submission warning text is visible
        And verify submission warning text
        And verify the form Submit Button exists
        And verify form cancel button exists
        And click form cancel button
        And click Stay on Page
        And click form cancel button
        And click Leave Anyway form button
        And verify user is on new spa page

    Scenario: Respond to CHIP SPA RAI
        And Click on State Plan Amendment SPA
        And click on Respond to CHIP SPA RAI
        And verify submission warning text is visible
        And verify submission warning text
        And verify the form Submit Button exists
        And verify form cancel button exists
        And click form cancel button
        And click Stay on Page
        And click form cancel button
        And click Leave Anyway form button
        And verify user is on new spa page

        
    Scenario: New Waiver Action
        And Click on Waiver Action
        And click on Waiver Action on Waiver Action Type page
        And verify submission warning text is visible
        And verify submission warning text
        And verify the form Submit Button exists
        And verify form cancel button exists
        And click form cancel button
        And click Stay on Page
        And click form cancel button
        And click Leave Anyway form button
        And verify user is on new waiver page

    Scenario: Request Temporary Extension
        And Click on Waiver Action
        And Click on Request Temporary Extension
        And verify submission warning text is visible
        And verify submission warning text
        And verify the form Submit Button exists
        And verify form cancel button exists
        And click form cancel button
        And click Stay on Page
        And click form cancel button
        And click Leave Anyway form button
        And verify user is on new waiver page

    Scenario: click on Respond to 1915(b) Waiver RAI
        And Click on Waiver Action
        And Click on Appendix K Amendment
        And verify submission warning text is visible
        And verify submission warning text
        And verify the form Submit Button exists
        And verify form cancel button exists
        And click form cancel button
        And click Stay on Page
        And click form cancel button
        And click Leave Anyway form button
        And verify user is on new waiver page

    Scenario: Apendix K Amendment
        And Click on Waiver Action
        And Click on Appendix K Amendment
        And verify submission warning text is visible
        And verify submission warning text
        And verify the form Submit Button exists
        And verify form cancel button exists
        And click form cancel button
        And click Stay on Page
        And click form cancel button
        And click Leave Anyway form button
        And verify user is on new waiver page
