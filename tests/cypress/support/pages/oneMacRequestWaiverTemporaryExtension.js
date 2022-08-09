const waiverNumberInputBox = "#transmittal-number";
const errorMessageForWaiverNumber = "#transmittal-number-status-msg";
const waiverExtensionRequest =
  "//td[div[contains(text(),'Waiver Extension Request')]]";
const firstFileUploadBtn = "#uploader-input-0";

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
}
export default oneMacRequestWaiverTemporaryExtension;
