const DevelopmentLogin = "#devloginBtn";

export class oneMacHomePage {
  launch() {
    cy.visit("https://d2dr7dgo9g0124.cloudfront.net/");
  }

  clickDevelopmentLogin() {
    cy.get(DevelopmentLogin).click();
  }
}
export default oneMacHomePage;
