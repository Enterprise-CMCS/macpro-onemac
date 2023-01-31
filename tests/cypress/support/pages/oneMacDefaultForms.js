const submitBTN = "#form-submission-button";
const cancelBTN = "#form-cancel-button";
const submissionFormErrorMsg = "#transmittal-number-status-msg";
const packageFormErrorMsg = "#componentIdStatusMsg";
const modalCancelBTN =
  "//*[@id='react-aria-modal-dialog']//button[text()='Cancel']";

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
  clickModalCancelBtn() {
    cy.xpath(modalCancelBTN).click();
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
  verifyErrorMsgContainsInSubmissionView(s) {
    cy.get(submissionFormErrorMsg).contains(s);
  }
}
export default oneMacDefaultForms;
