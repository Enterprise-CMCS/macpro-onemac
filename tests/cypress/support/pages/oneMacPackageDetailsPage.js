//Elements are Xpath use cy.xpath instead of cy.xpath
const detailsPage = "//div[@class='form-container']";
const actionCard = "//div[@class='detail-card']";
const statusHeader = "//div[@class='detail-card']//section[1]//h2";
const date90thDay = "//h3[contains(text(),'90th Day')]";
const packageActionsHeader =
  "//div[@class='detail-card']//section[@class='package-actions']//h2";
const packageActionsList = "//ul[@class='action-list']";
const respondToRAIAction = "//button[text()='Respond to RAI']";
const withdrawPackageAction = "//button[text()='Withdraw Package']";
const detailSection = "//h2[text()='Package Details']";
const CHIPSPAIDHeader = "//h3[contains(text(),'SPA ID')]";
const typeHeader = "//h3[contains(text(),'Type')]";
const stateHeader = "//h3[text()='State']";
const dateSubmittedHeader = "//h3[text()='Date Submitted']";
const packageOverviewNavBtn = "//button[text()='Package Overview']";
const packageDetailsNavBtn =
  "//li[contains(@class, 'nav')]//div[text()='Package Details']";

export class oneMacPackageDetailsPage {
  verifyPackageDetailsPageIsVisible() {
    cy.xpath(detailsPage).should("be.visible");
  }
  verifyActionCardExists() {
    cy.xpath(actionCard).should("be.visible");
  }
  verifyStatusIs(status) {
    cy.xpath(statusHeader).contains(status);
  }
  verify90thDayDateDoesntExist() {
    cy.xpath(date90thDay).should("not.exist");
  }
  verifyPackageActionsHeaderIsVisible() {
    cy.xpath(packageActionsHeader).should("be.visible");
  }
  verifyNoPackageActionsAvailable() {
    cy.xpath(packageActionsList).should("be.visible");
  }
  verifyRespondtoRAIActionExists() {
    cy.xpath(respondToRAIAction).should("be.visible");
  }
  verifyWithdrawPackageActionExists() {
    cy.xpath(withdrawPackageAction).should("be.visible");
  }
  clickRespondToRAIAction() {
    cy.xpath(respondToRAIAction).click();
  }
  verifyDetailSectionExists() {
    cy.xpath(detailSection).should("be.visible");
  }
  verifyCHIPSPAIDHeaderExists() {
    cy.xpath(CHIPSPAIDHeader).should("be.visible");
  }
  verifyIDExists() {
    cy.xpath(CHIPSPAIDHeader).next().should("be.visible");
  }
  verifyTypeHeaderExists() {
    cy.xpath(typeHeader).should("be.visible");
  }
  verifyTypeContainsSPA() {
    cy.xpath(typeHeader).next().contains("SPA");
  }
  verifyStateHeaderExists() {
    cy.xpath(stateHeader).should("be.visible");
  }
  verifyStateExists() {
    cy.xpath(stateHeader).next().should("be.visible");
  }
  verifyDateSubmittedHeaderExists() {
    cy.xpath(dateSubmittedHeader).should("be.visible");
  }
  verifyDateExists() {
    cy.xpath(dateSubmittedHeader).next().should("be.visible");
  }
  verifyPackageOverviewNavBtnExists() {
    cy.xpath(packageOverviewNavBtn).should("be.visible");
  }
  verifyPackageOverviewNavBtnIsEnabled() {
    cy.xpath(packageOverviewNavBtn).should("be.enabled");
  }
  verifyPackageOverviewNavBtnIsExpanded() {
    cy.xpath(packageOverviewNavBtn).should(
      "have.attr",
      "aria-expanded",
      "true"
    );
  }
  verifyPackageDetailsNavBtnExists() {
    cy.xpath(packageDetailsNavBtn).should("be.visible");
  }
}
export default oneMacPackageDetailsPage;
