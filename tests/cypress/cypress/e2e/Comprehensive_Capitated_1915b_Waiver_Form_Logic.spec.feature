Feature: Validate Waiver Form is checking ID format without period
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with "an Active" "State Submitter" user
        Then click on Packages
        Then click on New Submission
        Then Click on Waiver Action
        Then click on 1915b Waiver Actions
        Then click on 1915b Comprehensive Capitated Waiver Authority

    Scenario: Verify Initial Waiver number errors when dash is used
        Then click on 1915b Comprehensive Capitated New Initial Waiver
        Then verify Waiver Authority contains "All other 1915 b Waivers"
        Then type initial waiver number in old format SS.####.R00.00
        Then select proposed effective date 3 months from today
        Then Attach "excel.xlsx" file to attachment 1
        Then Attach "excel.xlsx" file to attachment 2
        Then verify error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled
        Then clear the ID Input box
        Then type "MD-99331.R00.00" into the ID Input box
        Then verify ID error message is not present
        Then verify the submit button is not disabled
        Then clear the ID Input box
        Then type initial waiver number in old format SS.#####.R00.00
        Then verify error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled
        Then clear the ID Input box

    Scenario: Validate Waiver Form Logic for Waiver Amendment
        Then click on 1915b Comprehensive Capitated Waiver Amendment
        Then verify Waiver Authority contains "All other 1915 b Waivers"
        Then type approved Initial Waiver number into Existing Waiver Number to Amend field
        Then type "MD.123456" into the ID Input box
        Then select proposed effective date 3 months from today
        Then verify error message is present on package dashboard New Waiver Page
        Then verify error message contains "For amendments, the last two digits start with"
        Then Attach "excel.xlsx" file to attachment 1
        Then Attach "excel.xlsx" file to attachment 2
        Then verify the submit button is disabled
        Then clear the ID Input box
        Then type "MD-22005.R00.00" into the ID Input box
        Then verify error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled
        Then clear the ID Input box
        Then type in valid waiver amendment number
        Then verify ID error message is not present
        Then verify the submit button is not disabled 


    Scenario: Validate Waiver Form Logic for Waiver Renewal and All other
        Then click on 1915b Comprehensive Capitated Renewal Waiver
        Then verify Waiver Authority contains "All other 1915 b Waivers"
        Then type "MD-22005.R00.00" into the ID Input box
        Then Attach "excel.xlsx" file to attachment 1
        Then Attach "excel.xlsx" file to attachment 2
        Then verify error message is present on package dashboard New Waiver Page
        Then verify the submit button is disabled