const oldSPAIDInputBox = "#transmittal-number";
const SPAIDInputBox = "#componentId";
const errorMessageSPAID = "#componentIdStatusMsg0";
const oldErrorMessageSPAID = "#transmittal-number-status-msg";
//Element is Xpath use cy.xpath instead of cy.get
const addFileBTNCurrentStatePlan = "//tbody/tr[1]/td[2]/label[1]";
const addFileBTNCurrentStatePlanInnerBTN = "#uploader-input-0";
//Element is Xpath use cy.xpath instead of cy.get
const addFileBTNCoverLetter = "//tbody/tr[3]/td[2]/label[1]";
const addFileBTNCoverLetterInnerBTN = "#uploader-input-2";
//Element is Xpath use cy.xpath instead of cy.get
const addFileBTNAmendedStatePlanLanguage = "//tbody/tr[2]/td[2]/label[1]";
const addFileBTNAmendedStatePlanLanguageInnerBTN = "#uploader-input-1";

export class oneMacCHIPSPAPage {
  verifyNewChipSPAPage() {
    cy.url().should("include", "/chip-spa");
  }
  inputOldSpaID(s) {
    cy.get(oldSPAIDInputBox).type(s);
  }
  inputSpaID(s) {
    cy.get(SPAIDInputBox).type(s);
  }

  verifyErrorMessageIsNotDisplayed() {
    cy.get(errorMessageSPAID).should("not.exist");
  }

  verifyOldErrorMessageIsNotDisplayed() {
    cy.get(oldErrorMessageSPAID).should("not.exist");
  }

  clearSPAIDInputBox() {
    cy.get(SPAIDInputBox).clear();
  }

  inputIncorrectSPAIDFormat() {
    cy.get(SPAIDInputBox).type("MD-DD-DDDD");
  }

  clearOldSPAIDInputBox() {
    cy.get(oldSPAIDInputBox).clear();
  }

  inputIncorrectSPAIDFormatInOld() {
    cy.get(oldSPAIDInputBox).type("MD-DD-DDDD");
  }

  verifyErrorMessageIsDisplayed() {
    cy.get(errorMessageSPAID).should("be.visible");
  }
  verifyOldErrorMessageIsDisplayed() {
    cy.get(oldErrorMessageSPAID).should("be.visible");
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
}
export default oneMacCHIPSPAPage;
