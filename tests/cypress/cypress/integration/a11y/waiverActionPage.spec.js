describe("Waiver Action Page 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
    cy.xpath("//a[@id='new-submission-button']").click();
    cy.xpath("//h4[contains(text(),'Waiver Action')]").click();
    cy.xpath(
      "//p[contains(text(),'Submit waivers, amendments, and renewals')]"
    ).click();
  });

  it("Check a11y on Waiver Action Page", () => {
    cy.checkA11yOfPage();
  });
});
