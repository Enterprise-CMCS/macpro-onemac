import { assert } from "console";

const newSubmissionBTN = "#new-submission-button";
const successMessage = "#alert_3";
const successMessage1 = "#alert-bar";
//Element is Xpath use cy.xpath instead of cy.get
const successMessageAfterRAIResponse =
  '//*[contains(text(),"Thanks for your submission. We truly value your feedback. Please consider taking our ")]';

//Element is Xpath use cy.xpath instead of cy.get
const IDNUMBER = (id) => `//a[text()="${id}"]`;
//Element is Xpath use cy.xpath instead of cy.get
const SecondIDNUMBER = "//tbody/tr[2]/td[1]/a[1]";
//Element is Xpath use cy.xpath instead of cy.get
const Type = "//td[@id='type-0']";
const date = "#submittedAt-0";
//Element is Xpath use cy.xpath instead of cy.get
const respondToRAIBTN = "//tbody/tr[1]/td[6]/button[1]";
//Element is Xpath use cy.xpath instead of cy.get
//const respondToRAI = '//body/div[@id="simple-menu"]/div[3]/ul[1]/div[1]/li[1]';
const respondToRAI = '//*[@id="simple-menu-0"]/div[3]/ul/div/li';
const userManagementTab = "#userManagementLink";
//Element is Xpath use cy.xpath instead of cy.get
const submissionList = '//h1[contains(text(),"Submission List")]';
const exportToEXcelCSVBTN = "#new-submission-button";
const idNumberHeader = "#transmittalNumberColHeader";
const typeHeader = "#typeColHeader";
const stateHeader = "#territoryColHeader";
const dateSubmittedHeader = "#submittedAtColHeader";
const submittedByHeader = "#submitterColHeader";
//Element is Xpath use cy.xpath instead of cy.get
const packageTab = '//a[@id="packageListLink"]';

const spaIDLink =
  "div.header-and-content:nth-child(1) div.dashboard-white div.dashboard-container table.submissions-table.submissions-table-actions-column tbody:nth-child(2) tr:nth-child(1) td:nth-child(1) > a:nth-child(1)";
const uploadedAttachments =
  "div.header-and-content:nth-child(1) article.form-container div.read-only-submission section.choice-container.file-list-container:nth-child(3)";
const logoutBtn = "//a[@id='logoutLink']";
const rcSuccessMessage = "#alert-bar";
const actionsRowOne = "#packageActions-0";

export class oneMacDashboardPage {
  clickNewSubmission() {
    cy.get(newSubmissionBTN).click();
  }

  verifySuccessMessageIsDisplayed() {
    cy.get(successMessage).contains("Submission Completed");
  }
  verifySuccessMessage1IsDisplayed() {
    cy.get(successMessage1).contains("Submission Completed");
  }

  verifySuccessMessageIsDisplayedAfterRAIResponse() {
    cy.xpath(successMessageAfterRAIResponse).contains(
      "Thanks for your submission"
    );
  }

  verifyIDNumber(s) {
    cy.xpath(IDNUMBER(s)).should("be.visible");
  }
  clickIDNumberLink(s) {
    cy.xpath(IDNUMBER(s)).click();
  }

  verifyType(s) {
    cy.xpath(Type).contains(s);
  }
  verifyTypeForID(s, e) {
    cy.xpath(IDNUMBER(s)).parent("td").next("td").contains(e);
  }
  verifyDate() {
    cy.get(date).should("be.visible");
  }

  clickOnrespondToRAI(s) {
    cy.xpath(IDNUMBER(s)).parent("td").siblings().find("button").click();
    cy.xpath(respondToRAI).click();
  }

  verifySPARAIIDNumberMatchesMedicalSPAIDNumber(s) {
    cy.xpath(IDNUMBER(s)).should("be.visible").and("have.length", 2);
  }

  verifySPARAIIDNumberMatchesCHIPSPAIDNumber(s) {
    cy.xpath(IDNUMBER(s)).should("be.visible").and("have.length", 2);
  }

  clickUserManagementTab() {
    cy.get(userManagementTab).click();
  }

  verifyWeAreOnDashboardPage() {
    cy.url().should("include", "/dashboard");
  }
  verifySubmissionListIsDisplayed() {
    cy.xpath(submissionList).should("be.visible");
  }
  verifyexportToEXcelCSVBTNIsDisplayed() {
    cy.get(exportToEXcelCSVBTN).should("be.visible");
  }

  verifyidNumberHeaderIsDisplayed() {
    cy.get(idNumberHeader).should("be.visible");
  }
  verifytypeHeaderIsDisplayed() {
    cy.get(typeHeader).should("be.visible");
  }
  verifyStateHeaderIsDisplayed() {
    cy.get(stateHeader).should("be.visible");
  }
  verifyDateSubmittedHeaderIsDisplayed() {
    cy.get(dateSubmittedHeader).should("be.visible");
  }
  verifySubmittedByHeadersDisplayed() {
    cy.get(submittedByHeader).should("be.visible");
  }
  verifyNewSubmissionBTNIsDisplayed() {
    cy.get(newSubmissionBTN).should("be.visible");
  }

  verifyIDNumberIsDisplayed(s) {
    cy.xpath(IDNUMBER(s)).should("be.visible");
  }
  clickPackageTab() {
    cy.xpath(packageTab).click();
  }
  navigatetoURL(s) {
    cy.visit(s);
  }

  clickOnSpaID() {
    cy.get(spaIDLink).click();
    cy.wait(5000);
  }

  verifyAttachmentExists(s) {
    cy.get(uploadedAttachments).contains(s);
  }
  clickLogoutBtn() {
    cy.xpath(logoutBtn).click();
  }
  verifySuccessMessageIsDisplayedForRoleChange() {
    cy.get(rcSuccessMessage).contains("Status Change");
  }
  verifyActionsBtnUnvailableOnFirstRow() {
    cy.get(actionsRowOne).not("button");
  }
}
export default oneMacDashboardPage;
