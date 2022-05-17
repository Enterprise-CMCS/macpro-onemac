describe("FAQ Page 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.xpath(
      "/html/body/reference/div/div/nav/div/div/div[1]/div/div[4]/a"
    ).click();
  });

  it("Check a11y on FAQ Page", () => {
    cy.checkA11yOfPage();
  });
});
