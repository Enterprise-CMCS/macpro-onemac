Feature: OY2-12679 Users can request a role change in OneMAC
    Scenario: Screen enhance - State Submitter role change
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then i am on Dashboard Page
        Then Click on My Account
        And verify that Request a Role Change button exists
        And click on Request a Role Change button
        And verify Select the role for which you are registering is visible
        And verify SSA is the role available
        And click on the SSA role
        And verify the user role is "State System Admin"
        And verify the error message says "Please select a state."
        And verify the submit button is disabled
        And select "Alabama" for state access
        And verify the submit button is enabled
        And verify there is no error message
        And select "Alaska" for state access
        And verify the submit button is enabled
        And verify there is no error message

    Scenario: Screen enhance - SSA role change
        Given I am on Login Page
        When Clicking on Development Login
        When Login as a State System Admin
        Then i am on Dashboard Page
        Then Click on My Account
        And verify that Request a Role Change button exists
        And click on Request a Role Change button
        And verify Select the role for which you are registering is visible
        And verify State Submitter is the role available
        And click on the State Submitter role
        And verify the user role is "State Submitter"
        And verify the error message says "Please select at least one state."
        And verify the submit button is disabled
        And select "Alabama" for state access
        And verify the submit button is enabled
        And verify there is no error message
        And select "Alaska" for state access
        And verify the submit button is enabled
        And verify there is no error message
        And verify the cancel button is clickable

    Scenario: Screen enhance - cms role approver role change
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms role approver
        Then i am on User Management Page
        Then Click on My Account
        And verify that Request a Role Change button exists
        And click on Request a Role Change button
        And verify Select the role for which you are registering is visible
        And verify the CMS Reviewer role is available
        And click on the CMS Reviewer role
        And verify the group dropdown exists
        And verify the submit button is disabled via class
        And click on cancel
        And click stay on page in the modal
        And verify the cancel button is clickable

    Scenario: Screen enhance - CMS Reviewer role change
        Given I am on Login Page
        When Clicking on Development Login
        When Login with CMS Reviewer User
        Then i am on Dashboard Page
        Then Click on My Account
        And verify that Request a Role Change button exists
        And click on Request a Role Change button
        And verify Select the role for which you are registering is visible
        And verify the CMS Role Approver role is available

    Scenario: Screen enhance - cms system admin role change
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms System Admin
        Then i am on Dashboard Page
        Then Click on My Account
        And verify that Request a Role Change button does not exist

    Scenario: Screen enhance - Help Desk User role change
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms Help Desk User
        Then i am on Dashboard Page
        Then Click on My Account
        And verify that Request a Role Change button does not exist

    Scenario: Screen Enhance - Denied CMS user can request CMS Role Approver
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms role approver Denied
        Then i am on Dashboard Page
        Then Click on My Account
        And verify that Request a Role Change button exists
        And click on Request a Role Change button
        And verify Select the role for which you are registering is visible
        And verify the CMS Role Approver role is available

    Scenario: Screen Enhance - Revoked CMS user can request CMS Role Approver
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms role approver Revoked
        Then i am on Dashboard Page
        Then Click on My Account
        And verify that Request a Role Change button exists
        And click on Request a Role Change button
        And verify Select the role for which you are registering is visible
        And verify the CMS Role Approver role is available
