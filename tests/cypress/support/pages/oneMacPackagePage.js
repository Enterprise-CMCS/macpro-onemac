//Element is Xpath use cy.xpath instead of cy.get
const nintieththDayColumn = '//th[@id="ninetiethDayColHeader"]';
const nintiethDayColumnFirstValue = "#ninetiethDay-0";
//Element is Xpath use cy.xpath instead of cy.get
const MD32560Value = '//a[contains(text(),"MD.32560")]';
//Element is Xpath use cy.xpath instead of cy.get
const WI232222MED1 = '//a[contains(text(),"WI-23-2222-MED1")]';
//Element is Xpath use cy.xpath instead of cy.get
const expirationDateColumnHeader = '//th[@id="expirationTimestampColHeader"]';
//Element is Xpath use cy.xpath instead of cy.get
const firstExperationDate = '//td[@id="expirationTimestamp-0"]';
//Element is Xpath use cy.xpath instead of cy.get
const MD32560hrefValue =
  '//a[contains(@href,"/detail/waivernew/1633642209858/MD.32560")]';
const searchbar = "#search-bar-input";
//Element is Xpath use cy.xpath instead of cy.get
const searchbarHeader = "//label[contains(text(),'Search')]";
//Element is Xpath use cy.xpath instead of cy.get
const searchBarXBTN =
  "//body/reference[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/button[1]/*[1]";
//Element is Xpath use cy.xpath instead of cy.get
const noResultsFound = "//h4[contains(text(),'No Results Found')]";
//Element is Xpath use cy.xpath instead of cy.get
const errorMessageForNoResultsFound =
  "//p[contains(text(),'Adjust your search and filter to find what you are')]";
const stateColumnHeader = "#territoryColHeader";
//Element is Xpath use cy.xpath instead of cy.get
const arrowOnStateColumnHeader = "//thead/tr[1]/th[3]/span[1]/img[1]";

export class oneMacPackagePage {
  verify90thDayColumn() {
    cy.xpath(nintieththDayColumn).should("be.visible");
  }

  verifyValue() {
    cy.get(nintiethDayColumnFirstValue).contains("Pending");
  }

  findIdNumberMD32560() {
    cy.xpath(MD32560Value).contains("MD.32560");
  }

  findIdNumberWI232222MED1() {
    cy.xpath(WI232222MED1).contains("WI-23-2222-MED1");
  }

  verifyexpirationDateColumnHeaderExists() {
    cy.xpath(expirationDateColumnHeader).should("be.visible");
  }

  verifyMD32560ExpirationDateIsSetTooct142026() {
    cy.xpath(MD32560hrefValue);
  }
  verifyExpirationDateFirstValue(s) {
    cy.xpath(firstExperationDate).contains(s);
  }

  typePendingInSearchBar() {
    cy.get(searchbar).type("pending");
  }

  noResultsFoundErrorMessage() {
    cy.xpath(noResultsFound).contains("No Results Found");
  }

  typeCreatedIDNumber(s) {
    cy.get(searchbar).type(s);
  }
  verifyIDNumberExists(s) {
    cy.xpath("//a[contains(text()," + s + ")]").should("be.visible");
  }
  clearSearchBar() {
    cy.get(searchbar).clear();
  }
  typeSubmittersName() {
    cy.get(searchbar).type("Angie Active");
  }
  typeNinExistingID() {
    cy.get(searchbar).type("MD-91-9191");
  }
  typeSubmittersNameAllUpperCase() {
    cy.get(searchbar).type("ANGIE ACTIVE");
  }
  typedashInSearchBar() {
    cy.get(searchbar).type("-");
  }
  verifySearchBarExists() {
    cy.get(searchbar).should("be.visible");
  }
  verifySearchisDisplayed() {
    cy.xpath(searchbarHeader).should("be.visible");
  }
  verifyxexistsandClickIt() {
    cy.xpath(searchBarXBTN).click();
  }
  verifyErrorMessageDetails() {
    cy.xpath(errorMessageForNoResultsFound).contains(
      "Adjust your search and filter to find what you are looking for."
    );
  }
  verifyStateColumnExists() {
    cy.get(stateColumnHeader).should("be.visible");
  }
  verifyStateColumnIsSortable() {
    cy.get(stateColumnHeader).click();
    cy.xpath(arrowOnStateColumnHeader).should("be.visible");
  }
}
export default oneMacPackagePage;
