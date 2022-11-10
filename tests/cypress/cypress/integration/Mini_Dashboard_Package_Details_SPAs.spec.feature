Feature: OY2-15620 Updated SPA Details View - Card View with Actions 
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes

    Scenario: Screen Enhance - Approved SPA
        And click Approved checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Approved"
        And verify there is not a 90th day date on the card
        And verify package actions header is visible
        And verify there are no package actions available
        And verify the details section exists
        #And verify there is a CHIP SPA ID header in the details section
        #And verify an ID exists for the CHIP SPA ID
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section

    Scenario: Screen Enhance - Withdrawn SPA
        And click the Withdrawn checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Withdrawn"
        And verify package actions header is visible
        And verify there are no package actions available
        And verify the details section exists
        #And verify there is a CHIP SPA ID header in the details section
        #And verify an ID exists for the CHIP SPA ID
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section

    Scenario: Screen Enhance - Disapproved SPA
        And click Disapproved checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Disapproved"
        And verify package actions header is visible
        And verify there are no package actions available
        And verify the details section exists
        #And verify there is a CHIP SPA ID header in the details section
        #And verify an ID exists for the CHIP SPA ID
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section


    Scenario: Screen Enhance - In Review SPA
        And click In Review checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "In Review"
        And verify package actions header is visible
        And verify withdraw package action exists
        And verify the details section exists
        #And verify there is a CHIP SPA ID header in the details section
        #And verify an ID exists for the CHIP SPA ID
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section

    Scenario: Screen Enhance - Submitted SPA
        And click Submitted checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Submitted"
        And verify package actions header is visible
        And verify withdraw package action exists
        And verify the details section exists
        #And verify there is a CHIP SPA ID header in the details section
        #And verify an ID exists for the CHIP SPA ID
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section

    Scenario: Screen Enhance - Unsubmitted SPA
        And click Unsubmitted checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "Unsubmitted"
        And verify package actions header is visible
        And verify there are no package actions available
        And verify the details section exists
        #And verify there is a CHIP SPA ID header in the details section
        #And verify an ID exists for the CHIP SPA ID
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section

    Scenario: Screen Enhance - RAI Issued SPA
        And click RAI Issued checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify action card exists
        And verify the status on the card is "RAI Issued"
        And verify package actions header is visible
        And verify withdraw package action exists
        And verify Respond to RAI action exists
        And verify the package details page is visible
        And verify the details section exists
        #And verify there is a CHIP SPA ID header in the details section
        #And verify an ID exists for the CHIP SPA ID
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section