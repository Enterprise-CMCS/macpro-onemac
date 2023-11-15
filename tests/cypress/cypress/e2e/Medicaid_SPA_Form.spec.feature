Feature: Package Dashboard: Medicaid SPA Form
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with "an Active" "State Submitter" user
        Then click on New Submission
        Then Click on State Plan Amendment SPA

    Scenario: Screen Enhance - Medicaid Eligibility, Enrollment, Administration, and Health Homes
        Then verify Medicaid SPA is a clickable option
        Then click on Medicaid SPA
        Then verify Medicaid Eligibility, Enrollment, Administration, and Health Homes is a clickable option
        Then click Medicaid Eligibility, Enrollment, Administration, and Health Homes
        Then verify user is on Medicaid Eligibility, Enrollment, Administration, and Health Homes page
        Then verify the page header is "Medicaid Eligibility, Enrollment, Administration, and Health Homes"
        Then verify Enter the MACPro system button is visible and clickable

    Scenario: Screen Enhance - Medicaid Alternative Benefits Plans (ABP), and Medicaid Premiums and Cost Sharing
        Then verify Medicaid SPA is a clickable option
        Then click on Medicaid SPA
        Then verify Medicaid Alternative Benefits Plans ABP, and Medicaid Premiums and Cost Sharing is a clickable option
        Then click Medicaid Alternative Benefits Plans ABP, and Medicaid Premiums and Cost Sharing
        Then verify user is on Medicaid Alternative Benefits Plans ABP, and Medicaid Premiums and Cost Sharing page
        Then verify the page header is "Medicaid Alternative Benefits Plans (ABP), and Medicaid Premiums and Cost Sharing"
        Then verify Enter the MMDL System button is visible and clickable

    Scenario: Screen Enhance - All Other Medicaid SPA
        Then verify Medicaid SPA is a clickable option
        Then click on Medicaid SPA
        Then verify All Other Medicaid SPA Submissions is a clickable option
        Then click All Other Medicaid SPA Submissions
        Then verify user is on new Medicaid SPA page
        Then verify the attachment info descriptiion
        Then verify the attachment info link is for "Medicaid SPA"

    Scenario: Create All Other Medicaid SPA Submission from package dashboard and search it
        Then click on Medicaid SPA
        Then click All Other Medicaid SPA Submissions
        Then type in Medicaid SPA ID
        Then select proposed effective date 3 months from today
        Then Add file for CMS Form 179
        Then Add file for SPA Pages
        Then Type Additonal Info Comments in new form
        Then Click on Submit Button
        Then verify submission successful message in the alert bar
        Then verify the SPAs tab is selected
        Then search for Medicaid SPA ID
        Then verify id number in the first row matches Medicaid SPA ID