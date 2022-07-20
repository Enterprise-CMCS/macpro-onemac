const SpaIDInput = "#componentId";
const additionalInformationCommentBox = "//textarea[@name='summary']";
const additionalInfoCommentBox = "//textarea[@name='additionalInformation']";
const SPAIDErrorMessage = "#componentIdStatusMsg";
const cancelBTN = "#form-cancel-button";
const warningText = "//p[@class='submission-message']";
//Element is Xpath use cy.xpath instead of cy.get
const stayOnPageBtn = "//button[contains(text(),'Stay on Page')]";
//Element is Xpath use cy.xpath instead of cy.get
const leaveAnywayBtn = "//button[contains(text(),'Leave Anyway')]";
const uploadedFile =
  "div.header-and-content:nth-child(1) div.form-container div.upload-card:nth-child(4) div.uploader tbody:nth-child(1) tr:nth-child(1) td:nth-child(3) div.uploader-file-items > span:nth-child(1)";
const uploadedSpaFile =
  "div.header-and-content:nth-child(1) div.form-container div.upload-card:nth-child(4) div.uploader tbody:nth-child(1) tr:nth-child(2) td:nth-child(3) div.uploader-file-items > span:nth-child(1)";
const SPAPagesMainElement =
  "div.header-and-content:nth-child(1) div.form-container div.upload-card:nth-child(4) div.uploader tbody:nth-child(1) tr:nth-child(2)";

const deleteForm179File = "//tbody/tr[1]/td[3]/div[1]/button[1]/*[1]";
const deleteSpaPagesFile = "//tbody/tr[2]/td[3]/div[1]/button[1]/*[1]";

//Element is Xpath use cy.xpath instead of cy.get
const CMSForm179AddFileBTN =
  "//label[@aria-label='Add file of type CMS Form 179']";
const CMSForm179AddFileUpload = "#uploader-input-0";
//Element is Xpath use cy.xpath instead of cy.get
const SPAPagesAddFileBTN = "//label[@aria-label='Add files of type SPA Pages']";
const SPAPAgesAddFileUpload = "#uploader-input-1";
const dashboardTabBTN = "#dashboardLink";
const whatIsMySPAIDLink = "//a[text()='What is my SPA ID?']";
const page = "//div[@class='dashboard-container']";

export class oneMacSubmitNewMedicaidSPAPage {
  verifyNewMedicaidSPAPage() {
    cy.url().should("include", "/medicaid-spa");
  }
  inputSpaID(s) {
    cy.get(SpaIDInput).type(s);
  }

  uploadCMSForm179AddFile() {
    cy.xpath(CMSForm179AddFileBTN).click();
    const filePath = "/files/15MB.pdf";
    cy.get(CMSForm179AddFileUpload).attachFile(filePath);
  }

  addFileForForm179(fileName) {
    cy.xpath(CMSForm179AddFileBTN).click();
    const filePath = "/files/";
    cy.get(CMSForm179AddFileUpload).attachFile(filePath + fileName);
  }

  verifyFileAddedForForm179(fileName) {
    cy.get(uploadedFile).contains(fileName);
  }

  verifyFileNotAddedForForm179(fileName) {
    cy.get(uploadedFile).should("not.exist");
  }

  deleteFileFromForm179() {
    cy.xpath(deleteForm179File).click();
    cy.get(uploadedFile).should("not.exist");
  }

  uploadSPAPagesAddFile() {
    cy.xpath(SPAPagesAddFileBTN).click();
    const filePath = "/files/adobe.pdf";
    cy.get(SPAPAgesAddFileUpload).attachFile(filePath);
  }

  addFilesToSpaPages(fileName) {
    cy.xpath(SPAPagesAddFileBTN).click();
    const filePath = "/files/";
    cy.get(SPAPAgesAddFileUpload).attachFile(filePath + fileName);
  }

  verifyFileAddedForSpaPages(fileName) {
    cy.get(SPAPAgesAddFileUpload).contains(fileName);
  }

  verifyFileNameExistsInSpaPages(fileName) {
    cy.get(SPAPagesMainElement).contains(fileName);
  }

  addNoFilesToSpaPages() {
    cy.xpath(SPAPagesAddFileBTN).click();
  }

  verifyNoFilesAttachedToSpaPages() {
    cy.get(SPAPagesMainElement).should("not.exist");
  }

  AdditionalInformationTypeComment(s) {
    cy.xpath(additionalInformationCommentBox).type(s);
  }
  additionalInfoTypeComment(s) {
    cy.xpath(additionalInfoCommentBox).type(s);
  }

  verifyCancelBtnExists() {
    cy.get(cancelBTN).scrollIntoView().should("be.visible");
  }
  clickCancelBtn() {
    cy.get(cancelBTN).scrollIntoView().click();
  }
  clickStayOnPageBtn() {
    cy.xpath(stayOnPageBtn).click();
  }
  clickLeaveAnywayBtn() {
    cy.xpath(leaveAnywayBtn).click();
  }
  verifySubmissionWarningTextIsVisible() {
    cy.xpath(warningText).scrollIntoView().should("be.visible");
  }
  verifySubmissionWarningText() {
    cy.xpath(warningText)
      .scrollIntoView()
      .contains("Once you submit this form");
    cy.xpath(warningText)
      .scrollIntoView()
      .contains("you will lose your progress on this form.");
  }
  verifySPAIDErrorMessageIsNotDisplayed() {
    cy.get(SPAIDErrorMessage).should("not.exist");
  }

  clearSPAIDInputBox() {
    cy.get(SpaIDInput).clear();
  }

  clickOnDashboardTab() {
    cy.get(dashboardTabBTN).click();
  }

  typeIncorrectSPAIDAndFormat() {
    cy.get(SpaIDInput).type("MD-DD-DDDD");
  }

  verifySPAIDErrorMessageIsDisplayed() {
    cy.get(SPAIDErrorMessage).should("be.visible");
  }
  clickWhatIsMySPAIDLink() {
    cy.get("a:visible")
      .contains("What is my SPA ID?")
      .invoke("attr", "href")
      .then((href) => {
        cy.visit(href);
      });
  }
}
export default oneMacSubmitNewMedicaidSPAPage;
