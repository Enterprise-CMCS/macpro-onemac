Feature: OY2-11950 State should not be able to withdraw a package in OneMAC in Specific statuses


    Scenario: Demonstrate that withdraw a package is not available on Approved status
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And verify that the 3 dots next to Approved status is not clickable

    # Scenario: Demonstrate that withdraw a package is not available on Disapproved status
    #     Given I am on Login Page
    #     When Clicking on Development Login
    #     When Login with state submitter user
    #     And click on Packages
    #     And verify that the 3 dots next to Disapproved status is not clickable

    Scenario: Demonstrate that withdraw a package is not available on Withdrawn status
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on Status
        And click all of the status checkboxes
        And click the Withdrawn checkbox
        And click on Status
        And Click on Filter Button
        And verify that the 3 dots next to Withdrawn status is not clickable

#These two need data in VAL to be able to pass so commented out for now
    # Scenario: Demonstrate that withdraw a package is not available on Terminated status
    #     Given I am on Login Page
    #     When Clicking on Development Login
    #     When Login with state submitter user
    #     And click on Packages
    #     And click on the Waivers tab
    #     And verify that the 3 dots next to Terminated status is not clickable

    # Scenario: Demonstrate that withdraw a package is not available on Unsubmitted status
    #     Given I am on Login Page
    #     When Clicking on Development Login
    #     When Login with state submitter user
    #     And click on Packages
    #     And click on the Waivers tab
    #     And verify that the 3 dots next to Unsubmitted status is not clickable