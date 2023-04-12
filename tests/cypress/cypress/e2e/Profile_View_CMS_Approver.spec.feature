Feature: OY2_8618_CMS_Approver
    Scenario: CMS Role Approver user can see the text, profile information and status card
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms role approver
        Then i am on User Management Page
        Then Click on My Account
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
        And Status text is Displayed
        And Actual Status is Displayed with Access Granted