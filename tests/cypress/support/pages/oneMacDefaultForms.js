const submitBTN = "#form-submission-button";

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
}
export default oneMacDefaultForms;
