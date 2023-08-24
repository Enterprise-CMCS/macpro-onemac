const submitBTN = "#form-submission-button";
const cancelBTN = "#form-cancel-button";
const packageFormPt2ErrorMsg = "#componentIdStatusMsg1";
const modalCancelBTN =
  "//*[@id='react-aria-modal-dialog']//button[text()='Cancel']";
const attachmentInfoDescription =
  "//h3[text()='Attachments']/following-sibling::p[1]";
const formHeader1 = "#title_bar";
const formHeader2 = "h2";
const idLabel = "//h3[contains(text(), 'ID')]";
const waiverNumberLabel = "//h3[contains(text(), 'Number')]";
const subsequentDocumentsHeader = (type) =>
  `//h3[contains(text(),'Subsequent ${type} Documents')]`;
const coverLetterAttachment = "//div[contains(text(),'Cover Letter')]";
const additionalInfoHeader = "#additional-information-label";
const formModal = "#dialog-content";
const yesSubmitBtn = "//button[text()='Yes, Submit']";
const firstUploadFileSpot = "#uploader-input-0";

export class oneMacDefaultForms {
  clicksubmitBTN() {
    cy.get(submitBTN).click();
    cy.wait(8000);
  }
  clicksubmitBTNWithoutWait() {
    cy.get(submitBTN).click();
  }
  verifySubmitBtnExists() {
    cy.get(submitBTN).scrollIntoView().should("be.visible");
  }
  verifySubmitBtnIsNotDisabled() {
    cy.get(submitBTN).should("not.be.disabled");
  }
  verifySubmitBtnIsDisabled() {
    cy.get(submitBTN).should("be.disabled");
  }
  verifyCancelBtnExists() {
    cy.get(cancelBTN).scrollIntoView().should("be.visible");
  }
  clickCancelBtn() {
    cy.get(cancelBTN).scrollIntoView().click();
  }
  clickModalCancelBtn() {
    cy.xpath(modalCancelBTN).click();
  }
  verifyErrorMsgContains(s) {
    cy.get(packageFormPt2ErrorMsg).contains(s);
  }
  verifyAttachmentInfoDecription() {
    cy.xpath(attachmentInfoDescription)
      .contains("Maximum file size of")
      .contains("You can add multiple files per attachment type");
  }
  verifyAttachmentInfoLinkFor(packageType) {
    switch (packageType) {
      case "Medicaid SPA":
        cy.xpath(attachmentInfoDescription)
          .find("a")
          .should("have.attr", "href", "/FAQ#medicaid-spa-attachments");
        break;
      case "Medicaid RAI":
        cy.xpath(attachmentInfoDescription)
          .find("a")
          .should("have.attr", "href", "/FAQ#medicaid-spa-rai-attachments");
        break;
      case "CHIP SPA":
        cy.xpath(attachmentInfoDescription)
          .find("a")
          .should("have.attr", "href", "/FAQ#chip-spa-attachments");
        break;
      case "CHIP RAI":
        cy.xpath(attachmentInfoDescription)
          .find("a")
          .should("have.attr", "href", "/FAQ#chip-spa-rai-attachments");
        break;
      case "1915b Waiver":
        cy.xpath(attachmentInfoDescription)
          .find("a")
          .should("have.attr", "href", "/FAQ#waiverb-attachments");
        break;
      case "Temp Extension":
        cy.xpath(attachmentInfoDescription)
          .find("a")
          .should("have.attr", "href", "/FAQ#waiverb-extension-attachments");
        break;
      case "Appendix K":
        cy.xpath(attachmentInfoDescription)
          .find("a")
          .should("have.attr", "href", "/FAQ#appk-attachments");
        break;
      case "Waiver RAI":
        cy.xpath(attachmentInfoDescription)
          .find("a")
          .should("have.attr", "href", "/FAQ#waiverb-rai-attachments");
        break;
    }
  }
  verifyFormHeader1Is(s) {
    cy.get(formHeader1).contains(s);
  }
  verifyFormHeader2Is(s) {
    cy.get(formHeader2).contains(s);
  }
  verifyIDIsPrefilled() {
    cy.xpath(idLabel)
      .next("div")
      .contains(/[A-Z]{2}\-/);
  }
  verifyWaiverNumberIsPrefilled() {
    cy.xpath(waiverNumberLabel)
      .next("div")
      .contains(/[A-Z]{2}\-/);
  }
  verifySubsequentDocumentsSectionExistsWith(type) {
    cy.xpath(subsequentDocumentsHeader(type)).should("be.visible");
  }
  verifyCoverLetterDoesNotExist() {
    cy.xpath(coverLetterAttachment).should("not.exist");
  }
  verifyAdditionalInfoHeaderExists() {
    cy.get(additionalInfoHeader).should("be.visible");
  }
  verifyModalTextIs(s) {
    cy.get(formModal).contains(s);
  }
  clickYesSubmitBTN() {
    cy.xpath(yesSubmitBtn).click();
    cy.wait(8000);
  }
  uploadFirstAddFile() {
    const filePath = "/files/adobe.pdf";
    cy.get(firstUploadFileSpot).attachFile(filePath);
  }
}
export default oneMacDefaultForms;
