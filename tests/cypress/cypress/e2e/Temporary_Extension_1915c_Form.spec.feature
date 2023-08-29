Feature: Package Dashboard Temporary Extension
    Background: reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user

    Scenario: Verify user can create a temporary extension from new submission button
        Then click on New Submission
        Then Click on Waiver Action
        Then Click on Request Temporary Extension in Package dashboard
        Then select the 1915c Temporary Extension Type button
        Then type approved Initial Waiver number into Existing Waiver Number to Renew field
        Then Type Temporary Extension Number "2"
        Then upload Waiver Extension Request
        Then type "This is just a test" in additional info textarea
        Then Click on Submit Button
        Then verify submission successful message in the alert bar
        Then search for "MD-5533.R00.TE01"
        Then click the Waiver Number link in the first row
        Then verify the details section exists
        Then verify there is a Latest Package Activity header in the details section
        Then verify a full date and time entry exists for the Latest Package Activity
        Then verify there is a Type header in the details section
        Then verify the type is 1915c Temporary Extension
        Then verify there is a Approved Initial or Renewal Number header in the details section
        Then verify the Approved Initial or Renewal Number ID is the approved intial waiver number 1
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date