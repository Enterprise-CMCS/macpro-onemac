Feature: OY2_9990_State_System_Admin_Profile_Screen_Enhancements
    Scenario: State System Admin User Profile Screen Enhancements
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms System Admin
        And Click on User Management Tab
        Then i am on User Management Page
        And verify User Management is Displayed
        And verify Export to Excel CSV is Displayed
        And verify Name is Displayed
        And verify Status is Displayed
        And verify Role is Displayed
        And verify Last Modified is Displayed
        And verify Modified By is Displayed
        And verify Actions is Displayed
        And verify Home tab is Displayed
        And dashboard tab is Displayed
        And FAQ tab is Displayed
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

