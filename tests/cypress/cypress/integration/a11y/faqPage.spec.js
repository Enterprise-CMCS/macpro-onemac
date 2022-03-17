describe("FAQ Page 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.xpath(
      "//body/reference[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/a[1]"
    ).click();
  });

  it("Check a11y on FAQ Page", () => {
    cy.checkA11yOfPage();
  });
});
