describe("Respond To Appendix K Ammendment Page 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
    cy.xpath("//a[@id='new-submission-button']").click();
    cy.xpath("//p[contains(text(),'Waiver Action')]").click();
    cy.xpath("//p[contains(text(),'Appendix K Amendment')]").click();
  });

  it("Check a11y on Respond To Appendix K Ammendment Page", () => {
    cy.checkA11yOfPage();
  });
});
