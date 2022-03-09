describe("Updated SPA Package Details View - Additional Information Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
  });

  it("Check if addition info exists for Waivers and SPA's", () => {
    cy.get("#packageListLink").click();
    cy.get("#componentId-0 > a").click();
    cy.get(":nth-child(2) > .ds-c-vertical-nav__label").click();
    cy.get(".ds-c-review__body").should("be.visible");
    cy.get("#packageListLink").click();
    cy.get("#show-waivers-button").click();
    cy.get("#componentId-0 > a").click();
    cy.get(":nth-child(2) > .ds-c-vertical-nav__label").click();
    cy.get(".ds-c-review__body").should("be.visible");
  });
});
