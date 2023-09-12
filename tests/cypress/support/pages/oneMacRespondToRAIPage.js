const pageHeader =
  "//h1[contains(text(),'Formal Request for Additional Information Response')]";
const backArrow = "#back-button";
//Element is Xpath use cy.xpath instead of cy.get
const leaveAnywaysBtn = "//button[text()='Leave Anyway']";
const yesSubmitBtn = "//button[text()='Yes, Submit']";
const prepopulatedWaiverNumber =
  "//h3[text()='Waiver Number']/following-sibling::div";
const prepopulatedWaiverAmendmentNumber =
  "//h3[text()='Waiver Amendment Number']/following-sibling::div";
const modalContainer = "#react-aria-modal-dialog";
const modalTitle = "#dialog-title";
const modalText = "#dialog-content";
const waiverIDLabel = "//h3[text()='Waiver Number']";
const waiverAmendmentIDLabel = "//h3[text()='Waiver Amendment Number']";
const attachmentTypes = (attachmentTitle) =>
  `//*[@class='upload-card']//tr//*[contains(text(), '${attachmentTitle}')]`;

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

  clickBackArrow() {
    cy.get(backArrow).click();
  }

  clickLeaveAnyway() {
    cy.xpath(leaveAnywaysBtn).click();
  }

  clickYesSubmitBTN() {
    cy.xpath(yesSubmitBtn).click();
    cy.wait(8000);
  }
  verifyWaiverNumberMatchesID(s) {
    cy.xpath(prepopulatedWaiverNumber).should("have.text", s);
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
  verifyAttachmentsTypesFor(packageType) {
    var attachments = [];
    switch (packageType) {
      case "Medicaid SPA":
        attachments = [
          "RAI Response",
          "CMS Form 179",
          "SPA Pages",
          "Cover Letter",
          "Document Demonstrating Good-Faith Tribal Engagement",
          "Existing State Plan Page(s)",
          "Public Notice",
          "Standard Funding Questions (SFQs)",
          "Tribal Consultation",
          "Other",
        ];
        break;
      case "CHIP SPA":
        attachments = [
          "Revised Amended State Plan Language",
          "Official RAI Response",
          "Budget Documents",
          "Public Notice",
          "Tribal Consultation",
          "Other",
        ];
        break;
      case "1915b Initial Waiver":
      case "1915b Renewal Waiver":
      case "1915b Waiver Amendment":
        attachments = [
          "Waiver RAI Response",
          "1915(b) Comprehensive (Capitated) Waiver Application Pre-print",
          "1915(b) Comprehensive (Capitated) Waiver Cost Effectiveness Spreadsheets",
          "Tribal Consultation",
          "Other",
        ];
        break;
      case "1915b4 Initial Waiver":
      case "1915b4 Renewal Waiver":
      case "1915b4 Waiver Amendment":
        attachments = [
          "Waiver RAI Response",
          "1915(b)(4) FFS Selective Contracting (Streamlined) Waiver Application Pre-print",
          "Tribal Consultation",
          "Other",
        ];
        break;
      default:
        attachments = ["RAI Response", "Tribal Consultation", "Other"];
    }
    for (let attachment in attachments) {
      cy.xpath(attachmentTypes(attachments[attachment])).should("be.visible");
    }
  }
}
export default oneMacRespondToRAIPage;
