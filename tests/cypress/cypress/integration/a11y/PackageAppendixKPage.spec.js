describe("Package Dashboard Submit 1915(c) Appendix K Amendment Page 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
    cy.xpath('//a[@id="packageListLink"]').click();
    cy.xpath("//a[@id='new-submission-button']").click();
    cy.xpath(
      "//p[contains(text(),'Submit Waivers, Amendments, Renewals, or Temp. Extension')]"
    ).click();
    cy.xpath(
      "//p[contains(text(),'Create a 1915(c) Appendix K Amendment')]"
    ).click();
  });

  it("Check a11y on Package Dashboard Submit 1915(c) Appendix K Amendment Page", () => {
    cy.checkA11yOfPage();
  });
});
