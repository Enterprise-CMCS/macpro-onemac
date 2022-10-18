describe("& replaced with or - Submission Type Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
  });

  it("Check if or exists", () => {
    cy.get("#packageListLink").click();
    cy.get("#new-submission-button").click();
    cy.get(":nth-child(1) > a > :nth-child(1) > p").should(
      "have.text",
      "Submit a new Medicaid or CHIP State Plan Amendment"
    );
  });
});
