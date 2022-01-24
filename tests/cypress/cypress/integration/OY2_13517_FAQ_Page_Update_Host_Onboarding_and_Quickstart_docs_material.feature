Feature: OY2-13517 FAQ Page Update: Host Onboarding and Quickstart docs material
    Scenario: Screen enhancement
        Given I am on Login Page
        When Clicking on FAQ Tab
        And verify Onboarding Materials exists
        And click on Onboarding Materials
        And verify Welcome to OneMac link exists
        And verify Welcome to OneMac link is valid
        And verify IDM Instructions for OneMAC Users link exists
        And verify IDM Instructions for OneMAC Users is valid
        And verify OneMAC IDM Guide link exists
        And verify OneMAC IDM Guide is valid
        And verify OneMAC State Submitter Guide link exists
        And verify OneMAC State Submitter Guide is valid
        And verify OneMAC State Administrator Guide link exists
        And verify OneMAC State Administrator Guide is valid
        And verify OneMAC CMS User Guide link exists
        And verify OneMAC CMS User Guide is valid
        And verify OneMAC CMS Role Approver Guide link exists
        And verify OneMAC CMS Role Approver Guide is valid