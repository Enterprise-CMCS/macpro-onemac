describe("Package Page Waivers 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
    cy.xpath("//button[@id='show-waivers-button']").click();
  });

  it("Check a11y on Package Page Waivers", () => {
    cy.checkA11yOfPage();
  });
});
