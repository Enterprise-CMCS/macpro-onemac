describe("Waiver Details Page 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
    cy.get("#show-waivers-button").click();
    cy.get("#componentId-0 > a").click();
  });

  it("Validate A11y", function () {
    cy.checkA11yOfPage();
  });
});
