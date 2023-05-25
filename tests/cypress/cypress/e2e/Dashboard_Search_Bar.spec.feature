Feature: OY2-11149 Submission Dashboard - Search bar

    Scenario: Search for non existing user and verify error message
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then type in search bar not existing ID in search bar
        Then verify Error message displayed should be No Results Found
        Then verify Error message details is displayed

    Scenario: Search for non existing criteria and verify error message
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then type in search bar expiration status “pending”
        Then verify Error message displayed should be No Results Found
        Then verify Error message details is displayed

    Scenario: Search for medicaid SPA
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then Click on Filter Button
        Then click on Type
        Then click CHIP SPA check box
        Then Click on Filter Button
        Then copy the ID from the link in the first row
        Then search for the ID copied from the link in the first row
        Then verify the ID searched for is the ID in the first result
        Then clear search bar


    Scenario: Create Initial Waiver and search it
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        Then Click on Waiver Action
        Then click on 1915b Waiver Actions
        Then click on 1915b 4 FFS Selective Contracting waivers
        Then click on 1915b 4 FFS Selective Contracting New Initial Waiver
        Then verify 1915 b 4 FFS Selective Contracting waivers is displayed under Waiver Authority
        Then Type Initial Waiver Number 2 in format SS-#####.R00.00
        Then select proposed effective date 3 months from today
        Then Add file for 1915b 4 FFS Selective Contracting waiver application pre-print
        Then Type Additonal Info Comments in new form
        Then Click on Submit Button
        Then verify submission successful message in the alert bar
        Then search for Initial Waiver Number 2 with 12 Characters
        Then clear search bar
        Then type in submitters name
        Then verify user exists with id number searched

    Scenario: Search existing user with Upper case
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then search existing user with all upper case
        Then verify user exists with id number searched


    Scenario: Search existing user with special characters
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then search existing user with dash
        Then verify user exists with id number searched
@focus 
    Scenario: Search CPOC
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then search for CPOC named Chester Tester
        Then verify the CPOC searched for is Chester Tester in the first result

    Scenario: Log in with help desk user
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms Help Desk User
        Then verify search bar exists
        Then verify Search by Package ID, CPOC Name, or Submitter Name is displayed on top of search bar

    Scenario: Log in with system admin user
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms System Admin
        Then verify search bar exists
        Then verify Search by Package ID, CPOC Name, or Submitter Name is displayed on top of search bar

    Scenario: Screen Enhancement
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then verify search bar exists
        Then verify Search by Package ID, CPOC Name, or Submitter Name is displayed on top of search bar
        Then search existing user with all upper case
        Then verify x in search bar exists to clear search and click it
