Feature: OY2-11581 Add an Expiration Date Column to the Package Dashboard

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
