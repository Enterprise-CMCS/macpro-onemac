const newWaiverNumberInputBox = "#componentId";
const actionTypeDropDown = "#action-type";
const newErrMsgForWaiverNumber = "#componentIdStatusMsg0";
const errorMsgPart2 = "#componentIdStatusMsg1";
const waiverAuthority = "//h3[text()='Waiver Authority']";
//this is xpath, use cy.xpath();
const addFFSPrePrintFile =
  "//td[div[contains(text(),'1915(b)(4) FFS Selective Contracting (Streamlined) Waiver Application Pre-print')]]";
const capitatedPreprintFile =
  "//td[div[contains(text(),'1915(b) Comprehensive (Capitated) Waiver Application Pre-print')]]";
const capitatedSpreadsheetFile =
  "//td[div[contains(text(),'1915(b) Comprehensive (Capitated) Waiver Cost Effectiveness Spreadsheets')]]";
const fileUpload1 = "#uploader-input-0";
const fileUpload2 = "#uploader-input-1";
const commentsInputBox = "#field_2";
const additionalInfoTextarea = "#additional-information";
const existingWaiverNumber = "MD-22005.R00.00";
const whatIsMyWaiverIDLink = "//a[@href='/FAQ#waiver-id-format']";
const proposedEffectiveDate = "#proposed-effective-date";
const parentIDInputBox = "#parent-componentId";
const parentErrMsgForWaiverNumber = "#parent-componentIdStatusMsg0";
const parentIDLabel =
  "//h3[text()='Approved Initial or Renewal Waiver Number']";
const parentIDHelpText = "#parent-fieldHint0";

//internal function for proposed effective date
function caculate3MonthsInFuture() {
  var t = new Date();
  t.setMonth(t.getMonth() + 3);
  var y = t.toLocaleString("default", { year: "numeric" });
  var m = t.toLocaleString("default", { month: "2-digit" });
  var d = t.toLocaleString("default", { day: "2-digit" });

  // format date to yyyy-mm-dd so it can be entered in UI.
  var formattedDate = y + "-" + m + "-" + d;
  return formattedDate;
}
export class oneMacSubmitNewWaiverActionPage {
  inputWaiverNumber(s) {
    cy.get(newWaiverNumberInputBox).type(s, { delay: 500 });
  }
  inputExistingWaiverNumberNewForms() {
    cy.get(newWaiverNumberInputBox).type(existingWaiverNumber);
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

  verify1915b4FFSSelectiveContractingwaiversUnderWaiverAuthority() {
    cy.xpath(waiverAuthority)
      .next("div")
      .contains("1915(b)(4) FFS Selective Contracting waivers");
  }

  verifyAllOther1915bWaiversUnderWaiverAuthority() {
    cy.xpath(waiverAuthority).next("div").contains("All other 1915(b) Waivers");
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

  verifyErrorMessageIsDisplayed() {
    cy.get(newErrMsgForWaiverNumber).should("be.visible");
  }
  verifyParentErrorMessageIsDisplayed() {
    cy.get(parentErrMsgForWaiverNumber).should("be.visible");
  }

  upload1915BFFSPrePrintFile() {
    cy.xpath(addFFSPrePrintFile).next("td").click();
    const filePath = "/files/15MB.pdf";
    cy.get(fileUpload1).attachFile(filePath);
  }
  upload1915BComprehensivePrePrintFile() {
    cy.xpath(capitatedPreprintFile).next("td").click();
    const filePath = "/files/15MB.pdf";
    cy.get(fileUpload1).attachFile(filePath);
  }
  upload1915BComprehensiveSpreadsheetFile() {
    cy.xpath(capitatedSpreadsheetFile).next("td").click();
    const filePath = "/files/excel.xlsx";
    cy.get(fileUpload2).attachFile(filePath);
  }
  remove1915BComprehensivePrePrintFile() {
    cy.xpath(capitatedPreprintFile).parent().find("button").click();
  }
  remove1915BComprehensiveSpreadsheetFile() {
    cy.xpath(capitatedSpreadsheetFile).parent().find("button").click();
  }
  verifyParentInitialIDIsPrefilled(s) {
    cy.xpath(parentIDLabel)
      .next("div")
      .contains(
        /[A-Z]{2}\-\d{4}\.[A-Z]{1}0{2}.0{2}|[A-Z]{2}\-\d{5}\.[A-Z]{1}0{2}.0{2}/
      );
  }
  verifyParentRenewalIDIsPrefilled(s) {
    cy.xpath(parentIDLabel)
      .next("div")
      .contains(
        /[A-Z]{2}\-\d{4}\.[A-Z]{1}([0]{1}[1-9]|[1-9][0-9]).0{2}|[A-Z]{2}\-\d{5}\.[A-Z]{1}([0]{1}[1-9]|[1-9][0-9]).0{2}/
      );
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
    var futureDate = caculate3MonthsInFuture();
    cy.get(proposedEffectiveDate).type(futureDate);
  }

  inputWaiverParentNumber(s) {
    cy.get(parentIDInputBox).type(s, { delay: 500 });
  }
  clearWaiverParentNumber() {
    cy.get(parentIDInputBox).clear();
  }

  verifyParentFieldHelpText() {
    cy.get(parentIDHelpText).contains(
      "Enter the existing waiver number in the format it was approved, using a dash after the two character state abbreviation"
    );
  }

  verifyRenewalWaiverErrorMsgPt2() {
    cy.get(errorMsgPart2).contains(
      "For renewals, the “R##” starts with ‘01’ and ascends."
    );
  }
}
export default oneMacSubmitNewWaiverActionPage;
