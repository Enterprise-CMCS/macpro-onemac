const pageHeader =
  "//h1[contains(text(),'Formal Request for Additional Information Response')]";
//Element is Xpath use cy.xpath instead of cy.get
const yesSubmitBtn = "//button[text()='Yes, Submit']";
const prepopulatedWaiverAmendmentNumber =
  "//h3[text()='Waiver Amendment Number']/following-sibling::div";
const modalContainer = "#react-aria-modal-dialog";
const modalTitle = "#dialog-title";
const modalText = "#dialog-content";
const waiverIDLabel = "//h3[text()='Waiver Number']";
const waiverAmendmentIDLabel = "//h3[text()='Waiver Amendment Number']";

export class oneMacRespondToRAIPage {
  verifyPageHeader() {
    cy.xpath(pageHeader).should("be.visible");
  }
  verifyModalContainerExists() {
    cy.get(modalContainer).should("be.visible");
  }
  verifyModalContainerDoesNotExists() {
    cy.get(modalContainer).should("not.exist");
  }
  verifyModalTitleIs(s) {
    cy.get(modalTitle).contains(s);
  }
  verifyModalTextIs(s) {
    cy.get(modalText).contains(s);
  }
  clickYesSubmitBTN() {
    cy.xpath(yesSubmitBtn).click();
    cy.wait(8000);
  }
  verifyAppKMatchesID(s) {
    cy.xpath(prepopulatedWaiverAmendmentNumber).should("have.text", s);
  }
  verifyIDIsPrefilled() {
    cy.xpath(waiverIDLabel)
      .next("div")
      .contains(
        /[A-Z]{2}\-\d{5}\.[A-Z]{1}\d{2}.||[A-Z]{2}\-\d{4}\.[A-Z]{1}\d{2}./
      );
  }
  verifyAmendmentIDIsPrefilled() {
    cy.xpath(waiverAmendmentIDLabel)
      .next("div")
      .contains(
        /[A-Z]{2}\-\d{5}\.[A-Z]{1}\d{2}.||[A-Z]{2}\-\d{4}\.[A-Z]{1}\d{2}./
      );
  }
}
export default oneMacRespondToRAIPage;
