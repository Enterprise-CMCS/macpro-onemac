Feature: OY2-11149 Submission Dashboard - Search bar

    Scenario: Search for non existing user and verify error message
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And type in search bar not existing ID in search bar
        And verify Error message displayed should be No Results Found
        And verify Error message details is displayed

    Scenario: Search for non existing criteria and verify error message
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And type in search bar expiration status “pending”
        And verify Error message displayed should be No Results Found
        And verify Error message details is displayed

    Scenario: create medicaid spa and search it
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
        And type in search bar ID Number created
        And verify user exists with id number searched
        And clear search bar
        And type in submitters name
        And verify user exists with id number searched


    Scenario: create waiver and search it
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        Then click on New Submission
        And Click on Waiver Action
        And click on Base Waiver
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And Type Unique Valid Base Waiver Number With SS.#####.R00.00 format
        And select proposed effective date 3 months from today
        And Upload 1915 b 4 file
        And Type "This is just a test" in Summary Box
        And Click on Submit Button
        And verify submission Successful message
        And click on Packages
        And verify user exists with waiver number searched
        And clear search bar
        And type in submitters name
        And verify user exists with id number searched

    Scenario: search existing user with Upper case
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And search existing user with all upper case
        And verify user exists with id number searched


    Scenario: search existing user with special characters
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And search existing user with dash
        And verify user exists with id number searched

    Scenario: log in with help desk user
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms Help Desk User
        And click on Packages
        And verify search bar exists
        And verify search by package id or submitter name is displayed ontop of search bar

    Scenario: log in with system admin user
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms System Admin
        And click on Packages
        And verify search bar exists
        And verify search by package id or submitter name is displayed ontop of search bar

    Scenario: Screen Enhancement
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And verify search bar exists
        And verify search by package id or submitter name is displayed ontop of search bar
        And search existing user with all upper case
        And verify x in search bar exists to clear search and click it
