describe("FAQ Page 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.xpath('//a[@id="faqLink"]').click();
  });

  it("Check a11y on FAQ Page", () => {
    cy.checkA11yOfPage();
  });
});
