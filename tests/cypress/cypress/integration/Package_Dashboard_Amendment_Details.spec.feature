# Feature: OY2-15971 Updated Waiver read-only form: Amendment details
#     Background: Reoccuring Steps
#         Given I am on Login Page
#         When Clicking on Development Login
#         When Login with state submitter user
#         And click on Packages
#         Then click on New Submission
#         And Click on Waiver Action
#         And click on Base Waiver
#         And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
#         And Type Unique Valid Base Waiver Number With SS-#####.R00.00 format
#         And select proposed effective date 3 months from today
#         And Upload 1915 b 4 file
#         And Type "This is just a test" in Summary Box
#         And Click on Submit Button
#         And verify submission Successful message
#         And Return to dashboard Page 
#         # do previous step until new Waiver Amendment form is done
#         And click on New Submission
#         And Click on Waiver Action

#     Scenario: Verify Amendment Details page - submitted
#         And Click on Waiver Action under Waiver Type
#         And Click on Waiver Amendment under Action type
#         And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
#         And Type Unique Valid Waiver Amendment Number With 5 Characters
#         And Upload 1915 b 4 file
#         And Type "This is just another test" in Summary Box
#         And Click on Submit Button
#         And verify submission Successful message
#         And click on Packages
#         And click on the Waivers tab
#         And search for Base Waiver Number 1 with 12 Characters
#         And wait for parent row expander to be enabled
#         And click parent row expander
#         And click the Waiver Number link for the Amendment
#         And verify the package details page is visible
#         And verify action card exists
#         And verify the status on the card is "Submitted"
#         And verify package actions header is visible
#         And verify withdraw package action exists
#         And verify 90th day header exists
#         And verify 90th day header is NA
#         And verify the amendment details section exists
#         And verify the Amendment Number header exists
#         And verify the amendment number matches
#         And verify the amendment title header exists
#         And verify the amendment title is NA
#         And verify the waiver authority header exists
#         And verify the supporting documentation section exists
#         And verify the download all button exists
#         And verify the additional information section exists

#     Scenario: Verify Amendment Details page - withdrawn
#         And Click on Waiver Action under Waiver Type
#         And Click on Waiver Amendment under Action type
#         And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
#         And Type Unique Valid Waiver Amendment Number With 5 Characters
#         And Upload 1915 b 4 file
#         And Type "This is just another test" in Summary Box
#         And Click on Submit Button
#         And verify submission Successful message
#         And click on Packages
#         And click on the Waivers tab
#         And search for Base Waiver Number 1 with 12 Characters
#         And wait for parent row expander to be enabled
#         And click parent row expander
#         And click the Waiver Number link for the Amendment
#         And verify the package details page is visible
#         And click withdraw button
#         And click withdraw confirmation
#         And verify submission message for withdrawn amendment
#         And verify the status on the card is "Withdrawn"
#         And verify package actions header is visible
#         And verify there are no package actions available
#         And verify 90th day header exists
#         And verify 90th day header is NA
#         And verify the amendment details section exists
#         And verify the Amendment Number header exists
#         And verify the amendment number matches
#         And verify the amendment title header exists
#         And verify the amendment title is NA
#         And verify the waiver authority header exists
#         And verify the supporting documentation section exists
#         And verify the download all button exists
#         And verify the additional information section exists


# OLD way
# Feature: OY2-15971 Updated Waiver read-only form: Amendment details
#     Background: Reoccuring Steps
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
#         And Type "This is just a test" in Summary Box
#         And Click on Submit Button
#         And Return to dashboard Page
#         #And click on Packages (until new Waiver Amendment form is done)
#         And click on New Submission
#         And Click on Waiver Action


#     Scenario: Verify Amendment Details page - submitted
#         And Click on Waiver Action under Waiver Type
#         And Click on Waiver Amendment under Action type
#         And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
#         And Type Unique Valid Waiver Amendment Number With 5 Characters
#         And Upload 1915 b 4 file
#         And Type "This is just another test" in Summary Box
#         And Click on Submit Button
#         And verify submission Successful message
#         And click on Packages
#         And click on the Waivers tab
#         And search for Unique Valid Waiver Number with 5 Characters
#         And wait for parent row expander to be enabled
#         And click parent row expander
#         And click the Waiver Number link for the Amendment
#         And verify the package details page is visible
#         And verify action card exists
#         And verify the status on the card is "Submitted"
#         And verify package actions header is visible
#         And verify withdraw package action exists
#         And verify 90th day header exists
#         And verify 90th day header is NA
#         And verify the amendment details section exists
#         And verify the Amendment Number header exists
#         And verify the amendment number matches
#         And verify the amendment title header exists
#         And verify the amendment title is NA
#         And verify the waiver authority header exists
#         And verify the supporting documentation section exists
#         And verify the download all button exists
#         And verify the additional information section exists

#     Scenario: Verify Amendment Details page - withdrawn
#         And Click on Waiver Action under Waiver Type
#         And Click on Waiver Amendment under Action type
#         And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
#         And Type Unique Valid Waiver Amendment Number With 5 Characters
#         And Upload 1915 b 4 file
#         And Type "This is just another test" in Summary Box
#         And Click on Submit Button
#         And verify submission Successful message
#         And click on Packages
#         And click on the Waivers tab
#         And search for Unique Valid Waiver Number with 5 Characters
#         And wait for parent row expander to be enabled
#         And click parent row expander
#         And click the Waiver Number link for the Amendment
#         And verify the package details page is visible
#         And click withdraw button
#         And click withdraw confirmation
#         And verify submission message for withdrawn amendment
#         And verify the status on the card is "Withdrawn"
#         And verify package actions header is visible
#         And verify there are no package actions available
#         And verify 90th day header exists
#         And verify 90th day header is NA
#         And verify the amendment details section exists
#         And verify the Amendment Number header exists
#         And verify the amendment number matches
#         And verify the amendment title header exists
#         And verify the amendment title is NA
#         And verify the waiver authority header exists
#         And verify the supporting documentation section exists
#         And verify the download all button exists
#         And verify the additional information section exists