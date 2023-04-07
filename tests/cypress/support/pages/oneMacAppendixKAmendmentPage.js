const waiverNumberInputBox = "#componentId";
const errorMessageForWaiverNumber = "#componentIdStatusMsg0";
const firstUploadFileBtn = "#uploader-input-0";
const amendmentTitleField = "#title";

export class oneMacAppendixKAmendmentPage {
  inputWaiverNumber(s) {
    cy.get(waiverNumberInputBox).type(s);
  }
  uploadAppKAmendmentWaiverTemplate() {
    const filePath = "/files/adobe.pdf";
    cy.get(firstUploadFileBtn).attachFile(filePath);
  }
  verifyErrorMessageIsNotDisplayed() {
    cy.get(errorMessageForWaiverNumber).should("not.exist");
  }
  clearWaiverNumberInputBox() {
    cy.get(waiverNumberInputBox).clear();
  }
  verifyErrorMessageIsDisplayed() {
    cy.get(errorMessageForWaiverNumber).should("be.visible");
  }
  inputAmendmentTitle(s) {
    cy.get(amendmentTitleField).type(s);
  }
}
export default oneMacAppendixKAmendmentPage;
