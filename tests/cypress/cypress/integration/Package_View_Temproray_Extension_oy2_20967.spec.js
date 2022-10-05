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
    cy.get("#new-submission-button").click();
    cy.get(":nth-child(2) > a > :nth-child(1) > p").click();
    cy.get(":nth-child(5) > a > :nth-child(1) > .choice-title").click();
    cy.get("h1").should(
      "have.text",
      "Request 1915(b) or 1915(c) Temporary Extension"
    );
    cy.get("#temp-ext-type").select("1915(b)");
    cy.get("#temp-ext-type").should("be.visible");
    cy.get("#temp-ext-type").select("1915(c)");
    cy.get("#temp-ext-type").should("be.visible");
    cy.get(":nth-child(7) > :nth-child(1) > .required").should(
      "have.text",
      "Temporary Extension Request Number"
    );
    cy.get(".MuiTypography-root").should(
      "have.text",
      "What is my Temporary Extension Request Number?"
    );
  });
});
