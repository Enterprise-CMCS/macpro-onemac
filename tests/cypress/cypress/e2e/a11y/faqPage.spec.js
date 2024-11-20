describe("FAQ Page 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.xpath('//a[@id="faqLink"]').invoke("removeAttr", "target").click();
    cy.get(".ds-c-button").click();
  });

  it("Check a11y on FAQ Page", () => {
    cy.checkA11yOfPage();
  });
});
