Feature: Package Dashboard Temporary Extension
    Background: reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user

    Scenario: Verify user can create a temporary extension from new submission button
        Then click on New Submission
        Then Click on Waiver Action
        Then Click on Request Temporary Extension in Package dashboard
        Then select the 1915b Temporary Extension Type button
        Then type approved Initial Waiver number into Existing Waiver Number to Renew field
        Then Type Temporary Extension Number "1"
        Then upload Waiver Extension Request
        Then type "This is just a test" in additional info textarea
        Then Click on Submit Button
        Then verify submission successful message in the alert bar
        Then search for "MD-5533.R00.TE00"
        Then click the Waiver Number link in the first row
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify the type is 1915b Temporary Extension
        Then verify there is a Approved Initial or Renewal Number header in the details section
        Then verify the Approved Initial or Renewal Number ID is the approved intial waiver number 1
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date

    Scenario: Verify user can create a temporary extension from the initial waiver package details 
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click 1915b Initial Waiver check box
        Then click on Type
        Then click on Status
        Then uncheck all of the status checkboxes
        Then click Approved checkbox
        Then click the Waiver Number link in the first row
        Then verify Request a Temporary Extension package action exists
        Then click Request a Temporary Extension package action
        Then select the 1915b Temporary Extension Type button
        Then verify the initial waiver parent ID is prefilled in the form
        Then Type Temporary Extension Number "4"
        Then upload Waiver Extension Request
        Then Type Additonal Info Comments in new form
        Then Click on Submit Button
        Then verify submission successful message in the alert bar

    Scenario: Verify user can create a temporary extension from the waiver renewal package details 
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click 1915b Waiver Renewal check box
        Then click on Type
        Then click on Status
        Then uncheck all of the status checkboxes
        Then click Approved checkbox
        Then click the Waiver Number link in the first row
        Then verify Request a Temporary Extension package action exists
        Then click Request a Temporary Extension package action
        Then select the 1915b Temporary Extension Type button
        Then verify the renewal waiver parent ID is prefilled in the form
        Then Type Temporary Extension Number "5"
        Then upload Waiver Extension Request
        Then Type Additonal Info Comments in new form
        Then Click on Submit Button
        Then verify submission successful message in the alert bar

    Scenario: Verify user can create a temporary extension from the package dashboard waiver tab - initial
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click 1915b Initial Waiver check box
        Then click on Type
        Then click on Status
        Then uncheck all of the status checkboxes
        Then click Approved checkbox
        Then click the actions button in row one
        Then verify the Request Temporary Extension button is displayed
        Then click the Request Temporary Extension button
        Then select the 1915b Temporary Extension Type button
        Then verify the initial waiver parent ID is prefilled in the form
        Then Type Temporary Extension Number "6"
        Then upload Waiver Extension Request
        Then Type Additonal Info Comments in new form
        Then Click on Submit Button
        Then verify submission successful message in the alert bar

    Scenario: Verify user can create a temporary extension from the package dashboard waiver tab - renewal
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click 1915b Waiver Renewal check box
        Then click on Type
        Then click on Status
        Then uncheck all of the status checkboxes
        Then click Approved checkbox
        Then click the actions button in row one
        Then verify the Request Temporary Extension button is displayed
        Then click the Request Temporary Extension button
        Then select the 1915b Temporary Extension Type button
        Then verify the renewal waiver parent ID is prefilled in the form
        Then Type Temporary Extension Number "7"
        Then upload Waiver Extension Request
        Then Type Additonal Info Comments in new form
        Then Click on Submit Button
        Then verify submission successful message in the alert bar