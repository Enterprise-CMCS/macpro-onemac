const waiverNumberInputBox = "#transmittalNumber";
const errorMessageForWaiverNumber = "#transmittalNumberStatusMsg";

export class oneMacAppendixKAmendmentPage {
  inputWaiverNumber(s) {
    cy.get(waiverNumberInputBox).type(s);
  }

  verifyErrorMessageIsNotDisplayed() {
    if (cy.get("body").find(errorMessageForWaiverNumber).length == 0) {
      cy.get(errorMessageForWaiverNumber).should("not.exist");
    } else {
      cy.get(errorMessageForWaiverNumber).should(
        "have.class",
        "ds-u-color--primary"
      );
    }
  }

  clearWaiverNumberInputBox() {
    cy.get(waiverNumberInputBox).clear();
  }

  verifyErrorMessageIsDisplayed() {
    cy.get(errorMessageForWaiverNumber).should("be.visible");
  }
}
export default oneMacAppendixKAmendmentPage;
