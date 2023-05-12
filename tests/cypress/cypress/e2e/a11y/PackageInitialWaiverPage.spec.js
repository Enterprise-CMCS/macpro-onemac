describe("New Initial Waiver Page 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
    cy.xpath("//a[@id='new-submission-button']").click();
    cy.xpath(
      "//p[contains(text(),'Submit Waivers, Amendments, Renewals, or Temp. Extension')]"
    ).click();
    cy.xpath("//div[contains(text(), '1915(b) Waiver Actions')]").click();
  });

  it("Check a11y on FFS Selective Initial Waiver Page", () => {
    cy.xpath(
      "//div[contains(text(), '1915(b)(4) FFS Selective Contracting Waivers')]"
    ).click();
    cy.xpath(
      "//div[contains(text(), '1915(b)(4) FFS Selective Contracting New Initial Waiver')]"
    ).click();
    cy.checkA11yOfPage();
  });
  it("Check a11y on all other 1915b Initial Waiver Page", () => {
    cy.xpath(
      "//div[contains(text(), '1915(b) Comprehensive (Capitated) Waiver Authority')]"
    ).click();
    cy.xpath(
      "//div[contains(text(), '1915(b) Comprehensive (Capitated) New Initial Waiver')]"
    ).click();
    cy.checkA11yOfPage();
  });
});
