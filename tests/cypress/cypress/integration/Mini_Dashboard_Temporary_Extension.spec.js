describe("Waiver Mini-Dashboard: Temporary Extension", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
  });

  it("Screen Enhancement", () => {
    cy.get("#packageListLink").click();
    cy.get("#show-waivers-button").click();
    cy.get("#search-bar-input").clear();
    cy.get("#search-bar-input").type("MD-39253.R00.00");
    cy.wait(1000);
    cy.get("#componentId-0 > a").scrollIntoView().click({ force: true });
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
  });
});
