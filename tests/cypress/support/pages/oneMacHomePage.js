const DevelopmentLogin = "#devloginBtn";

//xpath, use cy.xpath
const FAQPage =
  "//body/reference[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/a[1]";

export class oneMacHomePage {
  launch() {
    cy.visit("https://d2dr7dgo9g0124.cloudfront.net/");
  }

  clickDevelopmentLogin() {
    cy.get(DevelopmentLogin).click();
  }

  clickFAQPage() {
    cy.xpath(FAQPage)
      .invoke("attr", "href")
      .then((href) => {
        cy.visit(href);
      });
  }
}
export default oneMacHomePage;
