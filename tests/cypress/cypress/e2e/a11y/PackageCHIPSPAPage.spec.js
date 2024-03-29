describe("Package Dashboard Chip SPA Page 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
    cy.xpath("//a[@id='new-submission-button']").click();
    cy.xpath("//div[text()='State Plan Amendment (SPA)']").click();
    cy.xpath("//div[text()='CHIP SPA']").click();
  });

  it("Check a11y on Package Dashboard Respond to Chip SPA Page", () => {
    cy.checkA11yOfPage();
  });
});
