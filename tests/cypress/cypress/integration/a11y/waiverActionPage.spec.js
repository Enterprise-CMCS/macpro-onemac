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
      "//body[1]/reference[1]/div[1]/div[1]/div[4]/ul[1]/li[1]/a[1]/div[1]"
    ).click();
  });

  it("Check a11y on Waiver Action Page", () => {
    cy.checkA11yOfPage();
  });
});
