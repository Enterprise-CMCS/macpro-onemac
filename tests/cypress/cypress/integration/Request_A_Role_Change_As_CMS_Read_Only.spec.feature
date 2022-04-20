Feature: OY2-16707 CMS Users Denied a CRA Role loses Read Only Access to OneMAC
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms System Admin
        And Click on User Management Tab
        And reset EUA CMS Read Only User state if needed
        Then Click on My Account
        And click the logout button

    Scenario: Denied EUA CMS user requests and denied but still see same info
        Given I am on Login Page
        When Clicking on Development Login
        When Login as EUA CMS Read Only User
        Then Click on My Account
        And click on Request a Role Change button
        And click on the CMS Role Approver role
        Then Click on My Account
        And verify that Request a Role Change button does not exist
        Then Click on Manage Profile
        When I am on My Profile Page
        And verify Profile Information is Displayed
        And Full Name text is Displayed
        And Actual Full Name is Displayed
        And Role text is Displayed
        And Actual Role is Displayed
        And Email text is Displayed
        And Actual Email is Displayed
        And Phone Number text is Displayed
        And Phone Number Add Button is Displayed
        And Status text is not displayed
        Then Click on My Account
        And click the logout button
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms System Admin
        And Click on User Management Tab
        And click the pending user action button
        And click the deny access button
        And click confirm in the modal
        And verify success message for denied role
        Then Click on My Account
        And click the logout button
        Given I am on Login Page
        When Clicking on Development Login
        When Login as EUA CMS Read Only User
        Then Click on My Account
        And verify that Request a Role Change button exists
        Then Click on Manage Profile
        When I am on My Profile Page
        And verify Profile Information is Displayed
        And Full Name text is Displayed
        And Actual Full Name is Displayed
        And Role text is Displayed
        And Actual Role is Displayed
        And Email text is Displayed
        And Actual Email is Displayed
        And Phone Number text is Displayed
        And Phone Number Add Button is Displayed
        And Status text is not displayed