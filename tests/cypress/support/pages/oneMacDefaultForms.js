const submitBTN = "#form-submission-button";
const cancelBTN = "#form-cancel-button";
const submissionFormErrorMsg = "#transmittal-number-status-msg";
const packageFormPt2ErrorMsg = "#componentIdStatusMsg1";
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
  verifyBlueErrorSaysUserCanSubmit() {
    cy.get(packageFormErrorMsg).contains(
      "You will still be able to submit but your submission ID does not appear to match our records."
    );
  }
  verifyErrorMsgContains(s) {
    cy.get(packageFormPt2ErrorMsg).contains(s);
  }
}
export default oneMacDefaultForms;
