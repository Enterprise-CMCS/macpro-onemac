const newWaiverNumberInputBox = "#componentId";
const oldWaiverNumberInputBox = "#transmittal-number";
const actionTypeDropDown = "#action-type";
const oldErrMsgForWaiverNumber = "#transmittal-number-status-msg";
const newErrMsgForWaiverNumber = "#componentIdStatusMsg0";
const waiverAuthority = "#waiver-authority";
//this is xpath, use cy.xpath();
const addFile1915b4 =
  "//td[div[contains(text(),'1915(b)(4) FFS Selective Contracting (Streamlined) waiver application')]]";
const fileUpload1915b4 = "#uploader-input-0";
const commentsInputBox = "#field_2";
const additionalInfoTextarea = "#additional-information";
const existingWaiverNumber = "MD-10330.R01.00";
const whatIsMyWaiverIDLink = "//a[@href='/FAQ#waiver-id-format']";
const proposedEffectiveDate = "#proposed-effective-date";
const parentIDInputBox = "#parent-componentId";
const parentErrMsgForWaiverNumber = "#parent-componentIdStatusMsg0";
const parentIDLabel =
  "//h3[text()='Approved Initial or Renewal Waiver Number']";

export class oneMacSubmitNewWaiverActionPage {
  inputWaiverNumberNewForms(s) {
    cy.get(newWaiverNumberInputBox).type(s);
  }
  inputWaiverNumberOldForms(s) {
    cy.get(oldWaiverNumberInputBox).type(s);
  }

  inputExistingWaiverNumberNewForms() {
    cy.get(newWaiverNumberInputBox).type(existingWaiverNumber);
  }
  inputExistingWaiverNumberOldForms() {
    cy.get(oldWaiverNumberInputBox).type(existingWaiverNumber);
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
    cy.get(newErrMsgForWaiverNumber).should("not.exist");
  }
  verifyParentErrorMessageIsNotDisplayed() {
    cy.get(parentErrMsgForWaiverNumber).should("not.exist");
  }

  clearWaiverNumberInputBoxNewForms() {
    cy.get(newWaiverNumberInputBox).clear();
  }
  clearWaiverNumberInputBoxOldForms() {
    cy.get(oldWaiverNumberInputBox).clear();
  }

  verifyErrorMessageIsDisplayed() {
    cy.get(newErrMsgForWaiverNumber).should("be.visible");
  }
  verifyParentErrorMessageIsDisplayed() {
    cy.get(parentErrMsgForWaiverNumber).should("be.visible");
  }
  verifyOldErrorMessageIsDisplayed() {
    cy.get(oldErrMsgForWaiverNumber).should("be.visible");
  }

  upload1915B4File() {
    cy.xpath(addFile1915b4).next("td").click();
    const filePath = "/files/15MB.pdf";
    cy.get(fileUpload1915b4).attachFile(filePath);
  }
  verifyParentIDIsPrefilled(s) {
    cy.xpath(parentIDLabel).next("div").contains(s);
  }

  inputComments(s) {
    cy.get(commentsInputBox).type(s);
  }

  inputAdditionalInfoText(s) {
    cy.get(additionalInfoTextarea).type(s);
  }

  clickWhatIsMyWaiverIdLink() {
    cy.xpath(whatIsMyWaiverIDLink)
      .invoke("attr", "href")
      .then((href) => {
        cy.visit(href);
      });
  }
  errorMsgExists() {
    cy.wrap(newErrMsgForWaiverNumber).then(($el) => {
      if ($el.length > 0) {
        return true;
      } else {
        return false;
      }
    });
  }
  setProposedEffectiveDateThreeMonthsAway() {
    var t = new Date();
    var m = ("0" + (t.getMonth() + 1)).slice(-2);
    var d = ("0" + t.getDate()).slice(-2);
    var y = t.getFullYear();
    var dt = y + "-" + m + "-" + d;

    cy.get(proposedEffectiveDate).type(dt);
  }

  inputWaiverParentNumber(s) {
    cy.get(parentIDInputBox).type(s);
  }
  clearWaiverParentNumber() {
    cy.get(parentIDInputBox).clear();
  }
}
export default oneMacSubmitNewWaiverActionPage;
