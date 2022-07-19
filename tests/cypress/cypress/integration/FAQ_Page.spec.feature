Feature: OY2_Update_Text_on_FAQ_Page
    Scenario: Verify General section includes appropriate clickable sections
        Given I am on Login Page
        When Clicking on FAQ Tab
        And Verify General Section Exists
        And Verify What browsers can I use to access the system link is displayed and click it
        And Verify text contains The submission portal works best on Google Chrome
        And Verify What should we do if we don’t receive a confirmation email is displayed and click it
        And Verify text contains Refresh your inbox, check your SPAM filters, then contact the OneMAC Help Desk
        And Verify Is this considered the official state submission is displayed and click it
        And Verify text contains Yes as long as you have the electronic receipt confirmation email Your submission is considered your official state submission
        And Verify What are the OneMAC user roles is displayed and click it
        And Verify text contains State Submitter
        And Verify text contains State System Administrator
        And Verify text contains CMS Role Approver

    Scenario: Verify State Plan Amendments (SPAs) section includes appropriate clickable sections
        Given I am on Login Page
        When Clicking on FAQ Tab
        And Verify State Plan Amendments SPAs Section Exists
        And Verify What What format is used to enter a SPA ID is displayed and click it
        And Verify text contains Enter the State Plan Amendment transmittal number Assign consecutive numbers on a calendar year basis
        And Verify What are the attachments for a Medicaid SPA is displayed and click it
        And Verify text contains SPA submission requirements can be found in regulation
        And Verify What are the attachments for a Medicaid response to Request for Additional Information RAI is displayed and click it
        And Verify text contains "indicates a required attachment"
        And Verify What are the attachments for a CHIP SPA is displayed and click it
        #here ongoing we might have to fix the next step
        And Verify text contains "indicates a required attachment"
        And Verify What are the attachments for a CHIP SPA response to Request for Additional Information RAI is displayed and click it
        And Verify text contains "indicates a required attachment"
        And Verify Can I submit SPAs relating to the Public Health Emergency PHE in OneMAC is displayed and click it
        And Verify text contains "Yes, all PHE-related SPAs should be submitted through OneMAC"

    Scenario: Verify Waivers section includes appropriate clickable sections
        Given I am on Login Page
        When Clicking on FAQ Tab
        And Verify Waivers Section Exists
        And verify What format is used to enter a 1915b Base Waiver number header is visible
        And click What format is used to enter a 1915b Base Waiver number header
        And verify What format is used to enter a 1915b Base Waiver number body is visible
        And verify What format is used to enter a 1915b Waiver Renewal number header is visible
        And click What format is used to enter a 1915b Waiver Renewal number header
        And verify What format is used to enter a 1915b Waiver Renewal number is visible
        And Verify What format is used to enter a 1915b waiver number is displayed and click it
        And Verify text contains "Waiver number must follow the format"
        And Verify Who can I contact to help me figure out the correct 1915b Waiver Number is displayed and click it
        And Verify text contains "Email MCOGDMCOActions@cms.hhs.gov to get support with determining the correct 1915b Waiver Number"
        And Verify What format is used to enter a 1915c waiver number is displayed and click it
        And Verify text contains "Waiver number must follow the format SS.####.R##.## or SS.#####.R##.## to include"
        And Verify What attachments are needed to submit a 1915b waiver action is displayed and click it
        And Verify text contains "The regulations at 42 C.F.R. §430.25, 431.55 and 42 C.F.R. §441.301"
        And Verify What are the attachments for a 1915b Waiver response to Request for Additional Information RAI is displayed and click it
        And Verify text contains "indicates a required attachment"
        And Verify What are the attachments for a 1915b Waiver Request for Temporary Extension is displayed and click it
        And Verify text contains "indicates a required attachment"
        And Verify Can I submit Appendix K amendments in OneMAC is displayed and click it
        And Verify text contains "Yes, you can submit Appendix K amendments"
        And Verify What are the attachments for a 1915c Appendix K Waiver is displayed and click it
        And Verify text contains "The regulations at 42 C.F.R. §430.25, 431.55 and 42 C.F.R. §441.301 describe the"

    Scenario: Verify OneMAC Help Desk Contact Info section includes appropriate clickable sections
        Given I am on Login Page
        When Clicking on FAQ Tab
        And Verify OneMAC Help Desk Contact Info Section Exists
        And Verify Phone Number Exists
        And Verify actual Phone Number Exists
        And Verify Email Exists
        And Verify actual Email Exists

    Scenario: Verify screen enhancements on FAQ page
        Given I am on Login Page
        When Clicking on FAQ Tab
        And Verify page title is FAQ
        And Verify Frequently Asked Questions Exists

    Scenario: Verify redirect link on spa
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on State Plan Amendment SPA
        And click on Medicaid SPA
        And Click on What is my SPA ID link
        And Verify text contains Enter the State Plan Amendment transmittal number Assign consecutive numbers on a calendar year basis

    Scenario: Verify redirect link on waivers
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on Waiver Action
        And Click on Waiver Action under Waiver Type
        And Click on What is my Waiver ID Link
        And Verify text contains "Waiver number must follow the format"

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