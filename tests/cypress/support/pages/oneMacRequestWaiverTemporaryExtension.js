const waiverNumberInputBox = "#transmittal-number";
const errorMessageForWaiverNumber = "#transmittal-number-status-msg";
const waiverExtensionRequest =
  "//td[div[contains(text(),'Waiver Extension Request')]]";
const firstFileUploadBtn = "#uploader-input-0";
const parentWaiverNumberInputBox = "#parent-number";
const errorMsgForParentWaiverNumber = "#parent-number-status-msg";

export class oneMacRequestWaiverTemporaryExtension {
  inputWaiverNumber(s) {
    cy.get(waiverNumberInputBox).type(s);
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
  uploadWaiverExtensionRequest() {
    cy.xpath(waiverExtensionRequest).click();
    const filePath = "/files/15MB.pdf";
    cy.get(firstFileUploadBtn).attachFile(filePath);
  }
  inputApprovedBaseOrRenewalWaiverNumber(s) {
    cy.get(parentWaiverNumberInputBox).type(s, { delay: 500 });
  }
  verifyParentErrorMessageIsDisplayed() {
    cy.get(errorMsgForParentWaiverNumber).should("be.visible");
  }
  verifyParentErrorMessageText() {
    cy.get(errorMsgForParentWaiverNumber).contains(
      "The waiver number entered does not appear to match our records. Please enter an approved initial or renewal waiver number, using a dash after the two character state abbreviation."
    );
  }
  verifyParentErrorMessageIsNotDisplayed() {
    cy.get(errorMsgForParentWaiverNumber).should("not.exist");
  }
  clearApprovedBaseOrRenewalWaiverNumberInputBox() {
    cy.get(parentWaiverNumberInputBox).clear();
  }
}
export default oneMacRequestWaiverTemporaryExtension;
