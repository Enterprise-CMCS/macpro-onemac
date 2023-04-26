describe("Request Role Change Page 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
    cy.xpath("//button[@id='myAccountLink']").click();
    cy.xpath("//a[@id='requestRoleLink']").click();
  });

  it("Check a11y on Request Role Change Page", () => {
    cy.checkA11yOfPage();
  });
});
