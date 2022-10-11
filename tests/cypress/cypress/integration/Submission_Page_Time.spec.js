describe("Date Submitted to the Seconds - Additional Information Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
  });

  it("Check if Additional Information Page Displays time properly", () => {
    cy.get("#packageListLink").click();
    cy.get("#componentId-0 > a").click();
    cy.get(":nth-child(4) > .ds-u-margin-right--2 > .ds-c-review__body").should(
      "be.visible"
    );
  });
});
