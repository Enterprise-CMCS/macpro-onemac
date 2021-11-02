Feature: OY2_13234_Waiver_RAI
  Scenario: Submission List Verification > Submit new Waiver and Respond to Waiver RAI
    Given I am on Login Page
    When Clicking on Development Login
    When Login with state submitter user
    Then click on New Submission
    And Click on Waiver Action
    And click on Waiver Action on Waiver Action Type page
    And select Action Type New Waiver
    And select 1915b 4 FFS Selective Contracting waivers
    And Type Valid Waiver Number With 5 Characters
    And Add file for 1915b 4 FFS Selective Contracting waiver application pre-print
    And Type Additonal Information Comments
    And Click on Submit Button
    And verify submission Successful message
    And verify Waiver Number EXISTS
    And verify submission date
    And Verify submission Waiver type
    And click on Waiver Respond to RAI
    And Add file for Waiver RAI Response
    And Add Additional Comments
    And Click on Submit Button
    And verify submission Successful message after RAI
    And Verify submission type Waiver RAI
    And Verify Waiver RAI ID number matches Waiver number
    And verify submission date

