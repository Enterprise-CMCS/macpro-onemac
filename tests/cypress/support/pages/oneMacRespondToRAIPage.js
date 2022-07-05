const pageHeader =
  "//h1[contains(text(),'Respond to Formal Medicaid SPA RAI')]";
const backArrow = "#back-button";
//Element is Xpath use cy.xpath instead of cy.get
const leaveAnywaysBtn = "//button[text()='Leave Anyway']";
const yesSubmitBtn = "//button[text()='Yes, Submit']";

export class oneMacRespondToRAIPage {
  verifyPageLoads() {
    cy.xpath(pageHeader).should("be.visible");
  }

  clickBackArrow() {
    cy.get(backArrow).click();
  }

  clickLeaveAnyway() {
    cy.xpath(leaveAnywaysBtn).click();
  }
  clickYesSubmitBTN() {
    cy.xpath(yesSubmitBtn).click();
    cy.wait(8000);
  }
}
export default oneMacRespondToRAIPage;
