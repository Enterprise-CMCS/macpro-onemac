const waiverNumberInputBox = "#componentId";
const oldWaiverNumberInputBox = "#transmittal-number";
const errorMessageForWaiverNumber = "#componentIdStatusMsg0";
const oldErrorMessageForWaiverNumber = "#transmittal-number-status-msg";
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

  verifyOldErrorMessageIsNotDisplayed() {
    if (cy.get("body").find(oldErrorMessageForWaiverNumber).length == 0) {
      cy.get(oldErrorMessageForWaiverNumber).should("not.exist");
    } else {
      cy.get(oldErrorMessageForWaiverNumber).should(
        "have.class",
        "ds-u-color--primary"
      );
    }
  }
  verifyErrorMessageIsNotDisplayed() {
    cy.get(errorMessageForWaiverNumber).should("not.exist");
  }

  clearWaiverNumberInputBox() {
    cy.get(waiverNumberInputBox).clear();
  }
  clearOldWaiverNumberInputBox() {
    cy.get(oldWaiverNumberInputBox).clear();
  }
  verifyErrorMessageIsDisplayed() {
    cy.get(errorMessageForWaiverNumber).should("be.visible");
  }
  verifyOldErrorMessageIsDisplayed() {
    cy.get(oldErrorMessageForWaiverNumber).should("be.visible");
  }
  inputAmendmentTitle(s) {
    cy.get(amendmentTitleField).type(s);
  }
  inputWaiverNumberOldForms(s) {
    cy.get(oldWaiverNumberInputBox).type(s);
  }
}
export default oneMacAppendixKAmendmentPage;
