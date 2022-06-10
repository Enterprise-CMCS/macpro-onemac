describe("Respond To CHIP SPA Page 508 test", () => {
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
      "//div[contains(text(),'Respond to Formal CHIP SPA RAI')]"
    ).click();
  });

  it("Check a11y on Respond to CHIP SPA Page", () => {
    cy.checkA11yOfPage();
  });
});
