const submitBTN = "#form-submission-button";
const cancelBTN = "#form-cancel-button";
const packageFormPt2ErrorMsg = "#componentIdStatusMsg1";
const modalCancelBTN =
  "//*[@id='react-aria-modal-dialog']//button[text()='Cancel']";
const attachmentInfoDescription =
  "//h3[text()='Attachments']/following-sibling::p[1]";
const enterMmdlBtn = "//button[contains(text(),'Enter the MMDL system')]";

const IDInputBox = "#componentId";
const errorMessageID = "#componentIdStatusMsg0";
const errorMessageLine2ID = "#componentIdStatusMsg1";
const amendmentTitleField = "#title";
const tempExtensionTypeHeader =
  "//h3[contains(text(),'Temporary Extension Type')]";
const tempExtensionTypeBtn = "#temp-ext-type";

export class oneMacFormPage {
  verifyPageHeader(inPageHeader) {
    cy.get("h1").contains(inPageHeader);
  }
  inputAmendmentTitle(s) {
    cy.get(amendmentTitleField).type(s);
  }
  inputID(anId) {
    cy.get(IDInputBox).type(anId);
  }
  clearIDInputBox() {
    cy.get(IDInputBox).clear();
  }
  verifyIDErrorMessageIsNotDisplayed() {
    cy.get(errorMessageID).should("not.exist");
  }
  verifyIDErrorMessageContains(errorMessage) {
    cy.get(errorMessageID).should("be.visible");
    cy.get(errorMessageID).contains(errorMessage);
  }
  verifyIDErrorMessage2Contains(errorMessage) {
    cy.get(errorMessageLine2ID).should("be.visible");
    cy.get(errorMessageLine2ID).contains(errorMessage);
  }
  verifyTempExtensionType(whatType) {
    cy.xpath(tempExtensionTypeHeader).next("div").contains(whatType);
  }
  selectTempExtensionType(whatType) {
    cy.get(tempExtensionTypeBtn).select(whatType);
  }
  uploadAttachment(fileName, attachmentIndex) {
    const addFileBTN = `//tbody/tr[${attachmentIndex}]/td[2]/label[1]`;
    const innerBTN = `#uploader-input-${attachmentIndex - 1}`;
    const filePath = `/files/${fileName}`;

    cy.xpath(addFileBTN).click();
    cy.get(innerBTN).attachFile(filePath);
  }
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

  verifyMmdlSystenBtn() {
    cy.xpath(enterMmdlBtn).should("be.visible");
    cy.xpath(enterMmdlBtn)
      .parent("a")
      .should(
        "have.attr",
        "href",
        "https://wms-mmdl.cms.gov/MMDL/faces/portal.jsp"
      );
  }
}
export default oneMacFormPage;
