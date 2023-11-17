const newSubmissionBTN = "#new-submission-button";
const successMessage = "#alert_3";
const successMessage1 = "#alert-bar";
//Element is Xpath use cy.xpath instead of cy.get
const successMessageAfterRAIResponse =
  '//*[contains(text(),"Your submission has been received.")]';

//Element is Xpath use cy.xpath instead of cy.get
const IDNUMBER = (id) => `//a[text()="${id}"]`;
//Element is Xpath use cy.xpath instead of cy.get
//Element is Xpath use cy.xpath instead of cy.get
const Type = "//td[@id='type-0']";
const date = "#submittedAt-0";
//Element is Xpath use cy.xpath instead of cy.get
//Element is Xpath use cy.xpath instead of cy.get
//const respondToRAI = '//body/div[@id="simple-menu"]/div[3]/ul[1]/div[1]/li[1]';
const respondToRAI = '//li[(text()="Respond to RAI")]';
const userManagementTab = "#userManagementLink";
//Element is Xpath use cy.xpath instead of cy.get
const submissionList = '//h1[contains(text(),"Submission List")]';
const exportToEXcelCSVBTN = "#new-submission-button";
const idNumberHeader = "#transmittalNumberColHeader";
const typeHeader = "#typeColHeader";
const stateHeader = "#territoryColHeader";
const initialSubmissionDateHeader = "#submissionTimestampColHeader";
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
  verifySuccessMessageIs(s) {
    cy.get(successMessage).contains(s);
  }
  verifySuccessMessage1IsDisplayed() {
    cy.get(successMessage1).contains("Submission Completed");
  }
  verifyIDNumber(s) {
    cy.xpath(IDNUMBER(s)).first().should("exist");
  }
  clickIDNumberLink(s) {
    cy.xpath(IDNUMBER(s)).click({ force: true });
  }
  verifyType(s) {
    cy.xpath(Type).contains(s);
  }
  verifyTypeForID(s, e) {
    cy.xpath(IDNUMBER(s)).parent().next("td").contains(e);
  }
  verifyDate() {
    cy.get(date).should("be.visible");
  }
  clickOnrespondToRAI(s) {
    cy.xpath(IDNUMBER(s)).parent().siblings().find("button").click();
    cy.xpath(respondToRAI).filter(":visible").click();
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

  verifyexportToEXcelCSVBTNIsDisplayed() {
    cy.get(exportToEXcelCSVBTN).should("be.visible");
  }
  verifyStateHeaderIsDisplayed() {
    cy.get(stateHeader).should("be.visible");
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
  verifyLogoutBtnExists() {
    cy.xpath(logoutBtn).should("be.visible");
  }
  clickLogoutBtn() {
    cy.xpath(logoutBtn).click({ force: true });
  }
  verifySuccessMessageIsDisplayedForRoleChange() {
    cy.get(rcSuccessMessage).contains("Status Change");
  }
  verifyActionsBtnDisabledOnFirstRow() {
    cy.get(actionsRowOne).find("button").should("be.disabled");
  }
}
export default oneMacDashboardPage;
