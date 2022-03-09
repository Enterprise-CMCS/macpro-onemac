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
      "//body[1]/reference[1]/div[1]/div[1]/div[4]/ul[1]/li[3]/a[1]/div[1]/h4[1]"
    ).click();
  });

  it("Check a11y on Respond to Chip SPA Page", () => {
    cy.checkA11yOfPage();
  });
});
