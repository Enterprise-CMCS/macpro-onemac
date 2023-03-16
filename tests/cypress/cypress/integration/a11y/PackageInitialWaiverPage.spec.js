describe("Request Temporary Extension Page 508 test", () => {
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
    cy.xpath(
      "//p[contains(text(),'Create a new 1915(b) initial waiver')]"
    ).click();
  });

  it("Check a11y on Initial Waiver Page", () => {
    cy.checkA11yOfPage();
  });
});
