describe("SPA Type Page 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
    cy.get("#new-submission-button").click();
    cy.xpath("//div[contains(text(),'State Plan Amendment (SPA)')]").click();
  });

  it("Check a11y on SPA Type Page", () => {
    cy.checkA11yOfPage();
  });
});
