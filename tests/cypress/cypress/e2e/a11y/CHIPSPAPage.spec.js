describe("Chip SPA Page 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
    cy.xpath("//a[@id='new-submission-button']").click();
    cy.xpath(
      "//p[contains(text(),'Submit a new Medicaid & CHIP State Plan Amendments')]"
    ).click();
    cy.xpath(
      "//p[contains(text(), 'Submit new CHIP State Plan Amendment')]"
    ).click();
  });

  it("Check a11y on Respond to Chip SPA Page", () => {
    cy.checkA11yOfPage();
  });
});
