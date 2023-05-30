const SPAIDInputBox = "#componentId";
const errorMessageSPAID = "#componentIdStatusMsg0";
//Element is Xpath use cy.xpath instead of cy.get
const addFileBTNCurrentStatePlan = "//tbody/tr[1]/td[2]/label[1]";
const addFileBTNCurrentStatePlanInnerBTN = "#uploader-input-0";
//Element is Xpath use cy.xpath instead of cy.get
const addFileBTNCoverLetter = "//tbody/tr[3]/td[2]/label[1]";
const addFileBTNCoverLetterInnerBTN = "#uploader-input-2";
//Element is Xpath use cy.xpath instead of cy.get
const addFileBTNAmendedStatePlanLanguage = "//tbody/tr[2]/td[2]/label[1]";
const addFileBTNAmendedStatePlanLanguageInnerBTN = "#uploader-input-1";
const header1 = "h1";
const enterMmdlBtn = "//button[contains(text(),'Enter the MMDL system')]";

export class oneMacCHIPSPAPage {
  verifyNewChipSPAPage() {
    cy.url().should("include", "/chip-spa");
  }
  verifyChipEligibilityPage() {
    cy.url().should("include", "/chip-eligibility");
  }
  inputSpaID(s) {
    cy.get(SPAIDInputBox).type(s);
  }
  verifyErrorMessageIsNotDisplayed() {
    cy.get(errorMessageSPAID).should("not.exist");
  }
  clearSPAIDInputBox() {
    cy.get(SPAIDInputBox).clear();
  }
  inputIncorrectSPAIDFormat() {
    cy.get(SPAIDInputBox).type("MD-DD-DDDD");
  }
  verifyErrorMessageIsDisplayed() {
    cy.get(errorMessageSPAID).should("be.visible");
  }
  uploadCurrentStatePlanFile() {
    cy.xpath(addFileBTNCurrentStatePlan).click();
    const filePath = "/files/picture.jpg";
    cy.get(addFileBTNCurrentStatePlanInnerBTN).attachFile(filePath);
  }

  uploadCoverLetterFile() {
    cy.xpath(addFileBTNCoverLetter).click();
    const filePath = "/files/adobe.pdf";
    cy.get(addFileBTNCoverLetterInnerBTN).attachFile(filePath);
  }

  uploadAmendedStatePlanLanguageFile() {
    cy.xpath(addFileBTNAmendedStatePlanLanguage).click();
    const filePath = "/files/adobe.pdf";
    cy.get(addFileBTNAmendedStatePlanLanguageInnerBTN).attachFile(filePath);
  }
  verifyPageH1Is(s) {
    cy.get(header1).contains(s);
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
export default oneMacCHIPSPAPage;
