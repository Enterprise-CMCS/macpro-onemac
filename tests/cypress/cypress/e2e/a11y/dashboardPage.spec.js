describe("Dashboard Page 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
  });

  it("Check a11y on Dashboard Page", () => {
    cy.checkA11yOfPage();
  });
});
