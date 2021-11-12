Feature: OY2-12297 Home Page Update - Include guidance for CMS User
    Scenario: verify key words exist properly on home page
        Given I am on Login Page
        And Home tab exists
        And FAQ tab exists
        And Register exists
        And Login Exists
        And welcome message exists
        And state users section exists
        And cms users section exists
        And do you have questions or need support exists
        And View FAQ exists

    Scenario: verify state users section information
        Given I am on Login Page
        And state users section exists
        And How to create a submission exists
        And Login with IDM Exists
        And Login with IDM Info Exists
        And Attach your documents Exists
        And Attach your documents info Exists
        And Receive an email confirmation Exists
        And Receive an email confirmation details Exists
        And Submission Types include Exists
        And Amendments to your Medicaid and CHIP State Plans not submitted through MACPro MMDL or WMS Exists
        And Official state responses to formal requests for additional information RAIs for SPAs not submitted through MACPro Exists
        And Section 1915b waiver submissions those not submitted through WMS Exists
        And Section 1915c Appendix K amendments which cannot be submitted through WMS Exists
        And Official state responses to formal requests for additional information RAIs for Section 1915b waiver actions in addition to submitting waiver changes in WMS if applicable Exists

    Scenario: verify CMS Users section information
        Given I am on Login Page
        And cms users section exists
        And How to review a submission exists
        And Receive an email for submission notification exists
        And Receive an email for submission notification information exists
        And Login with EUA exists
        And Login with EUA information exists
        And Review your assigned submission exists
        And Review your assigned submission information exists
        And Submission Types include exists
        And Amendments to your Medicaid and CHIP State Plans exists
        And Official state responses to formal requests for additional information RAIs for SPAs exists
        And Section 1915b waiver submissions exists
        And Section 1915c Appendix K amendments exists
        And Official state responses to formal requests for additional information RAIs for Section 1915b waiver actions exists
        And State requests for Temporary Extensions for section 1915b and 1915c waivers exists