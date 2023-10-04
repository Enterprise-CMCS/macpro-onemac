const waiverNumberInputBox = "#transmittal-number";
const errorMessageForWaiverNumber = "#transmittal-number-status-msg";
const waiverExtensionRequest =
  "//td[div[contains(text(),'Waiver Extension Request')]]";
const firstFileUploadBtn = "#uploader-input-0";
const tempExtensionTypeBtn = "#temp-ext-type";
const tempExtensionTypeHeader =
  "//h3[contains(text(),'Temporary Extension Type')]";

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
  selectOption1915bInTempExtensionType() {
    cy.get(tempExtensionTypeBtn).select("1915(b)");
  }
  selectOption1915cInTempExtensionType() {
    cy.get(tempExtensionTypeBtn).select("1915(c)");
  }
  option1915bIsPrefilled() {
    cy.xpath(tempExtensionTypeHeader).next("div").contains("1915(b)");
  }
}
export default oneMacRequestWaiverTemporaryExtension;
