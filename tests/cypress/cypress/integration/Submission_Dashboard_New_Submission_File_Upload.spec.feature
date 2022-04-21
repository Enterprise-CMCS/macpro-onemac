Feature: OY2_5869_FileUpload_Attachment_Types
        Background: Reoccuring Steps
                Given I am on Login Page
                When Clicking on Development Login
                When Login with state submitter user
                Then click on New Submission

        Scenario: Verify If PDF Can Be Uploaded
                And Click on State Plan Amendment SPA
                And click on Medicaid SPA
                And type in SPA ID
                And Add "15MB.pdf" file to form 179
                And Verify "15MB.pdf" is added to form 179
                And Delete file from form 179

        Scenario: Verify If Excel Can Be Uploaded
                And Click on State Plan Amendment SPA
                And click on Medicaid SPA
                And type in SPA ID
                And Add "excel.xlsx" file to form 179
                And Verify "excel.xlsx" is added to form 179
                And Delete file from form 179

        Scenario: Verify If DOCX Can Be Uploaded
                And Click on State Plan Amendment SPA
                And click on Medicaid SPA
                And type in SPA ID
                And Add "test3.docx" file to form 179
                And Verify "test3.docx" is added to form 179
                And Delete file from form 179

        Scenario: Verify If JPEG Can Be Uploaded
                And Click on State Plan Amendment SPA
                And click on Medicaid SPA
                And type in SPA ID
                And Add "picture.jpg" file to form 179
                And Verify "picture.jpg" is added to form 179
                And Delete file from form 179

        Scenario: Verify If TEXT Can Be Uploaded
                And Click on State Plan Amendment SPA
                And click on Medicaid SPA
                And type in SPA ID
                And Add "textnotes.txt" file to form 179
                And Verify "textnotes.txt" is added to form 179
                And Delete file from form 179

        Scenario: Verify If Multiple Files Can Be Uploaded
                And Click on State Plan Amendment SPA
                And click on Medicaid SPA
                And type in SPA ID
                And Add file "15MB.pdf" for SPA Pages
                And Add file "textnotes.txt" for SPA Pages
                And Add file "picture.jpg" for SPA Pages
                And Add file "test3.docx" for SPA Pages
                And Verify file "textnotes.txt" exists in Spa Pages
                And Verify file "picture.jpg" exists in Spa Pages
                And Verify file "test3.docx" exists in Spa Pages
                And Verify file "15MB.pdf" exists in Spa Pages

        Scenario:  Verify uploaded files exists in Submission
                And Click on State Plan Amendment SPA
                And click on Medicaid SPA
                And type in SPA ID
                And Add "textnotes.txt" file to form 179
                And Verify "textnotes.txt" is added to form 179
                And Add file "15MB.pdf" for SPA Pages
                And Add file "textnotes.txt" for SPA Pages
                And Add file "picture.jpg" for SPA Pages
                And Add file "test3.docx" for SPA Pages
                And Type Additonal Information Comments
                And Click on Submit Button
                And verify submission Successful message
                And verify SPA ID EXISTS
                And verify submission date
                And Verify submission type
                And verify Submission List is Displayed
                And Click on the SPA ID Link
                And Verify "15MB.pdf" exists in the attachments
                And Verify "textnotes.txt" exists in the attachments
                And Verify "picture.jpg" exists in the attachments
                And Verify "test3.docx" exists in the attachments