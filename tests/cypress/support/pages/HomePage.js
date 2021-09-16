const searchBar =
  "body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input";
const searchButton =
  "body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b";
const results = "#result-stats";
const gmailOnHomePage =
  "#gb > div > div:nth-child(1) > div > div:nth-child(1) > a";

export class HomePage {
  launch() {
    cy.visit("https://www.google.com/");
  }

  typeSomethingInSearchBar(s) {
    cy.get(searchBar).type(s);
  }

  clickSearchButton() {
    cy.get(searchButton).click();
  }

  validateResultsShow() {
    cy.get(results).contains("results");
  }

  navigateBack() {
    cy.go("back");
  }

  ClickOnGmail() {
    cy.get(gmailOnHomePage).click();
  }
}
export default HomePage;
