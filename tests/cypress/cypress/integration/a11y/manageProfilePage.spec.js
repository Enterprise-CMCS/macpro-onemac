describe("Manage Profile Page 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
    cy.xpath("//button[@id='myAccountLink']").click();
    cy.xpath("//a[@id='manageAccountLink']").click();
  });

  it("Check a11y on Manage Profile Page", () => {
    cy.checkA11yOfPage();
  });
});
