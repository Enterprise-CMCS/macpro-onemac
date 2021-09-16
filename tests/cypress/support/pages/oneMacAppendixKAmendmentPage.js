const waiverNumberInputBox = "#transmittalNumber";
const errorMessageForWaiverNumber = "#transmittalNumberStatusMsg";

export class oneMacAppendixKAmendmentPage {
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
}
export default oneMacAppendixKAmendmentPage;
