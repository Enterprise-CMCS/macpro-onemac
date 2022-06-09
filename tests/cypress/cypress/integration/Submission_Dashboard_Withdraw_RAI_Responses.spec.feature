Feature: State should not be able to withdraw RAI Responses in OneMAC
@focus     
    Scenario: Can not withdraw Waiver RAI Response
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on Waiver Action
        And Click on Waiver Action under Waiver Type
        And Click on New Waiver under Action type
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And Type new Waiver Number for RAI in format SS.#####
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
        And type in SPA ID for RAI 2
        And Add file for CMS Form 179
        And Add file for SPA Pages
        And Type Additonal Information Comments
        And Click on Submit Button
        And verify submission Successful message
        And verify SPA ID for RAI 2 EXISTS
        And verify submission date
        And Verify submission type of SPA ID for RAI 2
        And click on spa Respond to RAI
        And Add file for RAI Response
        And Add Additional Comments
        And Click on Submit Button
        And verify submission Successful message after RAI
        And Verify submission type SPA RAI
        And verify the actions button is unavailable