const SPAIDInputBox = "#transmittalNumber";
const errorMessageSPAID = "#transmittalNumberStatusMsg";

export class oneMacCHIPSPAPage {
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
}
export default oneMacCHIPSPAPage;
