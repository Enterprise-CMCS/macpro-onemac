Feature: OY2_13234_CHIP_SPA_RAI
  Scenario: Submission List Verification > Submit new CHIP and Respond to CHIP RAI
    Given I am on Login Page
    When Clicking on Development Login
    When Login with state submitter user
    Then click on New Submission
    And Click on State Plan Amendment SPA
    And click on CHIP SPA
    And type in CHIP ID
    And Add file for Current State Plan
    And Add file for Amended State Plan Language
    And Add file for Cover Letter
    And Type Additonal Information Comments
    And Click on Submit Button
    And verify submission Successful message
    And verify CHIP ID EXISTS
    And verify submission date
    And click on CHIP Respond to RAI
    And Add file for Revised Amended State Plan Language
    And Add file for Official RAI Response
    And Add Additional Comments
    And Click on Submit Button
    And verify submission Successful message after RAI
    And Verify CHIP RAI ID number matches CHIP SPA ID number
    And verify submission date
