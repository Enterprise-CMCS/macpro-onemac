const SpaIDInput = "#transmittalNumber";
const additionalInformationCommentBox = "#field_2";
const submitBTN = "#form-submission-button";
const SPAIDErrorMessage = "#transmittalNumberStatusMsg";

//Element is Xpath use cy.xpath instead of cy.get
const CMSForm179AddFileBTN =
  "div.header-and-content:nth-child(1) div.form-container div.upload-card:nth-child(4) div.uploader table:nth-child(1) tbody:nth-child(1) tr:nth-child(1) td.uploader-input-cell:nth-child(2) > label.uploader-input-label-active";
const CMSForm179AddFileUpload = "#uploader-input-0";
//Element is Xpath use cy.xpath instead of cy.get
const SPAPagesAddFileBTN =
  "div.header-and-content:nth-child(1) div.form-container div.upload-card:nth-child(4) div.uploader table:nth-child(1) tbody:nth-child(1) tr:nth-child(2) td.uploader-input-cell:nth-child(2) > label.uploader-input-label-active";
const SPAPAgesAddFileUpload = "#uploader-input-1";
const dashboardTabBTN = "#dashboardLink";
export class oneMacSubmitNewMedicaidSPAPage {
  inputSpaID(s) {
    cy.get(SpaIDInput).type(s);
  }

  uploadCMSForm179AddFile() {
    cy.get(CMSForm179AddFileBTN).click();
    const filePath = "/files/15MB.pdf";
    cy.get(CMSForm179AddFileUpload).attachFile(filePath);
  }

  uploadSPAPagesAddFile() {
    cy.get(SPAPagesAddFileBTN).click();
    const filePath = "/files/adobe.pdf";
    cy.get(SPAPAgesAddFileUpload).attachFile(filePath);
  }

  AdditionalInformationTypeComment(s) {
    cy.get(additionalInformationCommentBox).type(s);
  }

  clicksubmitBTN() {
    cy.get(submitBTN).click();
    cy.wait(5000);
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
}
export default oneMacSubmitNewMedicaidSPAPage;
