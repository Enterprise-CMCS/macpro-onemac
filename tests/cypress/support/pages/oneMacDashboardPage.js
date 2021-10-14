import { assert } from "console";

const newSubmissionBTN = "#new-submission-button";
const successMessage = "#alert_3";
//Element is Xpath use cy.xpath instead of cy.get
const successMessageAfterRAIResponse =
  '//*[contains(text(),"Thanks for your submission. We truly value your feedback. Please consider taking our ")]';

//Element is Xpath use cy.xpath instead of cy.get
const IDNUMBER = "//tbody/tr[1]/td[1]/a[1]";
//Element is Xpath use cy.xpath instead of cy.get
const SecondIDNUMBER = "//tbody/tr[2]/td[1]/a[1]";
//Element is Xpath use cy.xpath instead of cy.get
const Type = "//tbody/tr[1]/td[2]/span[1]";
const date = "#submittedAt-0";
//Element is Xpath use cy.xpath instead of cy.get
const respondToRAIBTN = "//tbody/tr[1]/td[6]/button[1]";
//Element is Xpath use cy.xpath instead of cy.get
const respondToRAI = '//body/div[@id="simple-menu"]/div[3]/ul[1]/div[1]/li[1]';
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

export class oneMacDashboardPage {
  clickNewSubmission() {
    cy.get(newSubmissionBTN).click();
  }

  verifySuccessMessageIsDisplayed() {
    cy.get(successMessage).contains("Submission Completed");
  }

  verifySuccessMessageIsDisplayedAfterRAIResponse() {
    cy.xpath(successMessageAfterRAIResponse).contains(
      "Thanks for your submission"
    );
  }

  verifyIDNumber(s) {
    cy.xpath(IDNUMBER).contains(s);
  }

  verifyType(s) {
    cy.xpath(Type).contains(s);
  }

  verifyDate() {
    cy.get(date).should("be.visible");
  }

  clickOnrespondToRAI() {
    cy.xpath(respondToRAIBTN).click();
    cy.xpath(respondToRAI).click();
  }

  verifySPARAIIDNumberMatchesMedicalSPAIDNumber(s) {
    cy.xpath(IDNUMBER).contains(s);
    cy.xpath(SecondIDNUMBER).contains(s);
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

  verifyIDNumberIsDisplayed() {
    cy.xpath(IDNUMBER).should("be.visible");
  }
  clickPackageTab() {
    cy.xpath(packageTab).click();
  }
  navigatetoURL(s) {
    cy.visit(s);
  }
}
export default oneMacDashboardPage;
