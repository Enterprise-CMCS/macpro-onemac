Feature: OY2-11159 Case sensitive emails causing login error
    Scenario: Verify user is able to login with all lowercase and manipulate url for email to mixedcase and all uppercase characters
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then i am on Dashboard Page
        And navigate to "/profile/statesubmitter@nightwatch.test"
        And Actual Full Name is Displayed
        And navigate to "/profile/STATESUBMITTER@NIGHTWATCH.TEST"
        And Actual Full Name is Displayed
        And navigate to "/profile/staTEsubmiTTeR@nightwatch.test"
        And Actual Full Name is Displayed