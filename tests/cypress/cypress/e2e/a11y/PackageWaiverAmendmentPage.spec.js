describe("1915b Waiver Amendment Page 508 test", () => {
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

  it("Check a11y on FFS Selective Waiver Amendment Page", () => {
    cy.xpath(
      "//div[contains(text(), '1915(b)(4) FFS Selective Contracting waivers')]"
    ).click();
    cy.xpath("//div[contains(text(), '1915(b)(4) Amendment')]").click();
    cy.checkA11yOfPage();
  });

  it("Check a11y on All Other Authority Waiver Amendment Page", function () {
    cy.xpath(
      "//div[contains(text(), 'All Other 1915(b) Waiver Authority')]"
    ).click();
    cy.xpath("//div[contains(text(), '1915(b) Amendment')]").click();
    cy.checkA11yOfPage();
  });
});
