const submitBTN = "#form-submission-button";
const cancelBTN = "#form-cancel-button";
const packageFormPt2ErrorMsg = "#componentIdStatusMsg1";
const modalCancelBTN =
  "//*[@id='react-aria-modal-dialog']//button[text()='Cancel']";
const attachmentInfoDescription =
  "//h3[text()='Attachments']/following-sibling::p[1]";

export class oneMacDefaultForms {
  clicksubmitBTN() {
    cy.get(submitBTN).click();
    cy.wait(8000);
  }
  clicksubmitBTNWithoutWait() {
    cy.get(submitBTN).click();
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
}
export default oneMacDefaultForms;
