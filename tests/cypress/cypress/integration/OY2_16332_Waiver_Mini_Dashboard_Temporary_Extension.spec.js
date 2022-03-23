describe("Waiver Mini-Dashboard: Temporary Extension", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
  });

  it("Screen Enhancement", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#packageListLink").click();
    cy.get("#show-waivers-button").click();
    cy.get("#componentId-0 > a").click();
    cy.get(".component-detail-wrapper").click();
    cy.xpath('//a[text()="Temporary Extension"]').should("be.visible");
    cy.xpath('//a[text()="Temporary Extension"]').click();
    cy.xpath('//h2[text()="Temporary Extensions"]').should("be.visible");
    cy.get("#componentIdColHeader")
      .should("be.visible")
      .and("have.text", "Extension Id");
    cy.get("#currentStatusColHeader")
      .should("be.visible")
      .and("have.text", "Status");
    cy.get("#packageActionsColHeader")
      .should("be.visible")
      .and("have.text", "Actions");
    /* ==== End Cypress Studio ==== */
  });
});
