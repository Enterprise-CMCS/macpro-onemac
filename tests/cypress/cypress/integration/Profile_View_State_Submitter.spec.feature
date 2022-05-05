Feature: OY2_9990_State_Submitter_Profile_Screen_Enhancements
    Scenario: State Submitter User Profile Screen Enhancements
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then i am on Dashboard Page
        And verify Submission List is Displayed
        And verify New Submission BTN is Displayed
        And verify IDNumber is Displayed
        And verify Type is Displayed
        And verify state is Displaed
        And verify Date Submitted is Displayed
        And verify Submitted By is Displayed
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
        And Status text is Displayed
        And Actual Status is Displayed with Access Granted