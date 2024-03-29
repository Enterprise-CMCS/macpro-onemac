describe("Respond To Waiver RAI Page 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
    cy.xpath("//a[@id='new-submission-button']").click();
    cy.xpath("//div[contains(text(),'Waiver Action')]").click();
    cy.xpath("//div[contains(text(),'Respond to Waiver RAI')]").click();
  });

  it("Check a11y on Respond To Waiver RAI Page", () => {
    cy.checkA11yOfPage();
  });
});
