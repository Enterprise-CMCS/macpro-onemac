const withdrawPageHeader = "//form//h2";
const formDetails = "#form-intro";
const spaIDHeader = "//h3[text()='SPA ID']";
const waiverIDHeader = "//h3[contains(text(),'Waiver')]";
const typeHeader = "//h3[text()='Type']";
const uploadSupportingDocumentationHeader =
  "//h3[text()='Upload Supporting Documentation']";
const addFileBtn = "#uploader-input-0";
const additionalInfoHeader = "#additional-information-label";
const additionalInfoTextArea = "#additional-information";

export class withdrawPackagePage {
  verifyWithdrawPageHeader(s) {
    cy.xpath(withdrawPageHeader).contains(s);
  }
  verifyFormIntroIsVisible() {
    cy.get(formDetails)
      .should("be.visible")
      .contains(
        "Complete this form to withdraw a package. Once complete, you will not be able to resubmit this package. CMS will be notified and will use this content to review your request, and you will not be able to edit this form. If CMS needs any additional information, they will follow up by email."
      );
  }
  verifySPAIDHeaderExists() {
    cy.xpath(spaIDHeader).should("be.visible");
  }
  verifySPAIDExists() {
    cy.xpath(spaIDHeader).next().should("be.visible");
  }
  verifyWaiverIDHeaderExists() {
    cy.xpath(waiverIDHeader).should("be.visible");
  }
  verifyWaiverIDExists() {
    cy.xpath(waiverIDHeader).next().should("be.visible");
  }
  verifyTypeHeaderExists() {
    cy.xpath(typeHeader).should("be.visible");
  }
  verifyTypeIs(s) {
    cy.xpath(typeHeader).next().contains(s);
  }
  verifyUploadSupportingDocumentationHeaderExists() {
    cy.xpath(uploadSupportingDocumentationHeader).should("be.visible");
  }
  uploadWithdrawalLetterAddFile() {
    const filePath = "/files/adobe.pdf";
    cy.get(addFileBtn).attachFile(filePath);
  }
  verifyAdditionalInfoHeaderExists() {
    cy.get(additionalInfoHeader).should("be.visible");
  }
  addWithdrawalComment() {
    cy.get(additionalInfoTextArea).type("Withdrawal test.");
  }
  clearWithdrawalComment() {
    cy.get(additionalInfoTextArea).clear();
  }
}
export default withdrawPackagePage;
