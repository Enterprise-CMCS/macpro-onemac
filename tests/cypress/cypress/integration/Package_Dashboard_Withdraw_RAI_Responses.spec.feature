# There's a known issue with this one so commented out.
# Feature: State should not be able to withdraw RAI Responses in OneMAC
#     Scenario: Can not withdraw Waiver RAI Response
#         Given I am on Login Page
#         When Clicking on Development Login
#         When Login with state submitter user
#         Then click on New Submission
#         And Click on Waiver Action
#         And Click on Waiver Action under Waiver Type
#         And Click on New Waiver under Action type
#         And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
#         And Type Unique Valid Waiver Number With 5 Characters
#         And Upload 1915 b 4 file
#         And Click on Submit Button
#         And verify submission Successful message
#         And click on Waiver Respond to RAI
#         And Add file for Waiver RAI Response
#         And Click on Submit Button
#         And verify submission Successful message after RAI
#         And click on Packages
#         And click on the Waivers tab
#         And search for Unique Valid Waiver Number with 5 Characters
#         And wait for parent row expander to be enabled
#         And click parent row expander
#         And verify actions button on the child row is disabled

       # Scenario: Can not withdraw SPA RAI Response
        # this is not possible in package dashboard since RAI responses
        # don't appear on the SPA tab.