Feature: Encode profile urls
    Scenario: Verify entering email in profile url shows page not found
        Given I am on Login Page
        When Clicking on Development Login
        When Login with "an Active" "State Submitter" user
        Then i am on Dashboard Page
        Then navigate to "/profile/statesubmitter@nightwatch.test"
        Then verify the dashboard says Sorry, page not found!
        Then verify page url contains 'notfound'
        Then navigate to "/profile/STATESUBMITTER@NIGHTWATCH.TEST"
        Then verify the dashboard says Sorry, page not found!
        Then verify page url contains 'notfound'
        Then navigate to "/profile/staTEsubmiTTeR@nightwatch.test"
        Then verify the dashboard says Sorry, page not found!
        Then verify page url contains 'notfound'