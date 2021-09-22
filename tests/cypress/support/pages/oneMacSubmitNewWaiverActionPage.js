const waiverNumberInputBox = "#transmittalNumber";
const actionTypeDropDown = "#action-type";
const errorMessageForWaiverNumber = "#transmittalNumberStatusMsg";
const waiverAuthority = "#waiver-authority";
//this is xpath, use cy.xpath();
const addFile1915b4 = "//tbody/tr[1]/td[2]/label[1]";
const fileUpload1915b4 = "#uploader-input-0";
const commentsInputBox = "#field_2";

const existingWaiverNumber = "MD.11223";

export class oneMacSubmitNewWaiverActionPage {
  inputWaiverNumber(s) {
    cy.get(waiverNumberInputBox).type(s);
  }

  inputExistingWaiverNumber() {
    cy.get(waiverNumberInputBox).type(existingWaiverNumber);
  }

  selectNewWaiverUnderActionType() {
    cy.get(actionTypeDropDown).select("new");
  }

  selectWaiverAmendmentUnderActionType() {
    cy.get(actionTypeDropDown).select("amendment");
  }

  selectRequestForWaiverRenewalUnderActionType() {
    cy.get(actionTypeDropDown).select("renewal");
  }

  select1915b4FFSSelectiveContractingwaiversUnderWaiverAuthority() {
    cy.get(waiverAuthority).select("1915(b)(4)");
  }

  selectAllOther1915bWaiversUnderWaiverAuthority() {
    cy.get(waiverAuthority).select("1915(b)");
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

  upload1915B4File() {
    cy.xpath(addFile1915b4).click();
    const filePath = "/files/15MB.pdf";
    cy.get(fileUpload1915b4).attachFile(filePath);
  }

  inputComments(s) {
    cy.get(commentsInputBox).type(s);
  }
}
export default oneMacSubmitNewWaiverActionPage;
