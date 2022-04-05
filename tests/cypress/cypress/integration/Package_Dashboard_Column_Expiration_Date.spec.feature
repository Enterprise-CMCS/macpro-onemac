
Feature: OY2-11581 Add an Expiration Date Column to the Package Dashboard part 3


    Scenario: Respond to SPARAI and verify expiration date column does not exist
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on State Plan Amendment SPA
        And click on CHIP SPA
        And type in SPA ID in CHIP SPA page
        And Add file for Current State Plan
        And Add file for Amended State Plan Language
        And Add file for Cover Letter
        And Type Additonal Information Comments
        And Click on Submit Button
        And click on spa Respond to RAI
        And Add file for Revised Amended State Plan Language
        And Add file for Official RAI Response
        And Add Additional Comments
        And Click on Submit Button
        And verify submission Successful message after RAI
        And click on Packages
        And verify expiration date column does not exist

    Scenario: Expiration Date column should Show Pending for waiver packages
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
        And Type "This is just a test" in Summary Box
        And Click on Submit Button
        And verify submission Successful message
        And click on Packages
        And click on the Waivers tab
        And click show hide columns button
        And click expiration date checkbox
        And click show hide columns button
        And verify expiration date column exists

    Scenario: Expiration Date column should not exist for CHIP SPA
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on State Plan Amendment SPA
        And click on CHIP SPA
        And type in SPA ID in CHIP SPA page
        And Add file for Current State Plan
        And Add file for Amended State Plan Language
        And Add file for Cover Letter
        And Type Additonal Information Comments
        And Click on Submit Button
        And verify submission Successful message
        And click on Packages
        And verify expiration date column does not exist

    Scenario: Verify that package dashboard waiver tab includes an Expiration Date column, which would be sortable and to the immediate left of the status column dashboard.
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And click show hide columns button
        And click expiration date checkbox
        And click show hide columns button
        And verify Expiration Date column is available to the immediate left to the status column

    # TODO: figure out how to seed a Waiver with an expiration date
    # Scenario: Display expiration date is visible on MD.32560
    #     Given I am on Login Page
    #     When Clicking on Development Login
    #     When Login with state submitter user
    #     And click on Packages
    #     And expiration date on MD.32560 is Oct 14, 2026

    Scenario: Expiration Date column should not be visible for Medicaid SPA
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
        And click on Packages
        And verify expiration date column does not exist
