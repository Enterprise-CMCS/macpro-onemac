//css, use cy.get
const devLoginBtn = "#devloginBtn";
const loginBtn = "#loginBtn";
const oneMacLogo = "#oneMacLogo";
const homePageMainContent = "#main";
//xpath, use cy.xpath
const FAQPage = "//a[text()='FAQ']";
const HomePageLink = "//a[contains(text(),'Home')]";
const RegisterLink = "//a[contains(text(),'Register')]";

export class oneMacHomePage {
  launch() {
    cy.visit("/");
  }
  pageHasLoaded() {
    cy.get(oneMacLogo).should("be.visible");
    cy.get(homePageMainContent).should("be.visible");
  }
  verifyUserIsNotLoggedInOnHomePage() {
    cy.xpath(HomePageLink).should("be.visible").and("have.class", "activeLink");
  }

  clickDevelopmentLogin() {
    cy.get(devLoginBtn).click();
  }

  clickFAQPage() {
    cy.xpath(FAQPage)
      .invoke("attr", "href")
      .then((href) => {
        cy.visit(href);
      });
  }

  verifyHomePageLinkExists() {
    cy.xpath(HomePageLink).should("be.visible");
  }

  verifyFAQLinkExists() {
    cy.xpath(FAQPage).should("be.visible");
  }

  verifyRegisterLinkExists() {
    cy.xpath(RegisterLink).should("be.visible");
  }

  verifyloginBTNExists() {
    cy.get(loginBtn).should("be.visible");
  }
}
export default oneMacHomePage;
