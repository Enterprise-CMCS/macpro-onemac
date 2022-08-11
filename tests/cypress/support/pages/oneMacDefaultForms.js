const submitBTN = "#form-submission-button";
const cancelBTN = "#form-cancel-button";
const submissionFormErrorMsg = "#transmittalNumberStatusMsg";
const packageFormErrorMsg = "#componentIdStatusMsg";

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
  verifyBlueErrorSaysUserCanSubmitInSubmissionView() {
    cy.get(submissionFormErrorMsg).contains(
      "You will still be able to submit but your submission ID does not appear to match our records."
    );
  }
  verifyBlueErrorSaysUserCanSubmitInPkgView() {
    cy.get(packageFormErrorMsg).contains(
      "You will still be able to submit but your submission ID does not appear to match our records."
    );
  }
}
export default oneMacDefaultForms;
