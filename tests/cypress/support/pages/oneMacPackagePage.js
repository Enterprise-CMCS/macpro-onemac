//Element is Xpath use cy.xpath instead of cy.get
const nintieththDayColumn = '//th[@id="ninetiethDayColHeader"]';
const nintiethDayColumnFirstValue = "#ninetiethDay-0";
//Element is Xpath use cy.xpath instead of cy.get
const MD32560Value = (waiverNumber) =>
  `//a[contains(text(),"${waiverNumber}")]`;
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
  "//body/reference[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/button[1]";
//Element is Xpath use cy.xpath instead of cy.get
const noResultsFound = "//h4[contains(text(),'No Results Found')]";
//Element is Xpath use cy.xpath instead of cy.get
const errorMessageForNoResultsFound =
  "//p[contains(text(),'Adjust your search and filter to find what you are')]";
const stateColumnHeader = "#territoryColHeader";
//Element is Xpath use cy.xpath instead of cy.get
const arrowOnStateColumnHeader = "//thead/tr[1]/th[3]/span[1]/img[1]";
//Element is Xpath use cy.xpath instead of cy.get
const filterButton = "//button[contains(text(),'Filter')]";
//Element is Xpath use cy.xpath instead of cy.get
const filterByText = "//header//h4";
//Element is Xpath use cy.xpath instead of cy.get
const closeButton = "//header/button[1]";
const typeDropDown = "#accordionItem_2-button";
const statusDropDown = "#accordionItem_6-button";
//Element is Xpath use cy.xpath instead of cy.get
const resetButton = "//button[contains(text(),'Reset')]";
//Element is Xpath use cy.xpath instead of cy.get
const waiver1915bCheckBox =
  "//body/reference[1]/div[1]/div[1]/div[3]/div[2]/div[2]/div[1]/div[1]/div[1]/label[1]/span[1]";
//Element is Xpath use cy.xpath instead of cy.get
const CHIPSPACheckBox =
  "//body/reference[1]/div[1]/div[1]/div[3]/div[2]/div[2]/div[1]/div[1]/div[2]/label[1]/span[1]";
//Element is Xpath use cy.xpath instead of cy.get
const MedicaidSPACheckBox =
  "//body/reference[1]/div[1]/div[1]/div[3]/div[2]/div[2]/div[1]/div[1]/div[3]/label[1]/span[1]";
//Element is Xpath use cy.xpath instead of cy.get
const packageApproveCheckBox = "//span[contains(text(),'Package Approved')]";
//Element is Xpath use cy.xpath instead of cy.get
const packageInReviewcheckBox = "//span[contains(text(),'Package In Review')]";
//Element is Xpath use cy.xpath instead of cy.get
const withdrawnCheckBox = "//span[contains(text(),'Withdrawn')]";
//Element is Xpath use cy.xpath instead of cy.get
const sparaiSubmitted = "//span[contains(text(),'sparai Submitted')]";
//Element is Xpath use cy.xpath instead of cy.get
const raiResponseSubmitted = "//span[contains(text(),'RAIResponse Submitted')]";
//Element is Xpath use cy.xpath instead of cy.get
const seaToolStatus1 = "//span[contains(text(),'SEATool Status: 1')]";
//Element is Xpath use cy.xpath instead of cy.get
const medicaidSPAInList = "//tbody/tr[1]/td[2]/span[1]";

export class oneMacPackagePage {
  verify90thDayColumn() {
    cy.xpath(nintieththDayColumn).should("be.visible");
  }

  verifyValue() {
    cy.get(nintiethDayColumnFirstValue).contains("Pending");
  }

  findIdNumberMD32560(waiverNumber) {
    cy.xpath(MD32560Value(waiverNumber)).contains(waiverNumber);
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
  verifyfilterButtonExists() {
    cy.xpath(filterButton).should("be.visible");
  }
  clickOnfilterButton() {
    cy.xpath(filterButton).click();
  }
  verifyfilterByExists() {
    cy.xpath(filterByText).should("be.visible");
  }
  verifycloseButtonExists() {
    cy.xpath(closeButton).should("be.visible");
  }
  verifytypeDropDownExists() {
    cy.get(typeDropDown).should("be.visible");
  }
  verifystatusDropDownExists() {
    cy.get(statusDropDown).should("be.visible");
  }
  verifyresetButtonExists() {
    cy.xpath(resetButton).should("be.visible");
  }
  clickTypeDropDown() {
    cy.get(typeDropDown).click();
  }
  verifywaiver1915bCheckBoxExists() {
    cy.xpath(waiver1915bCheckBox).should("be.visible");
  }
  verifyCHIPSPACheckBoxExists() {
    cy.xpath(CHIPSPACheckBox).should("be.visible");
  }
  verifyMedicaidSPACheckBoxExists() {
    cy.xpath(MedicaidSPACheckBox).should("be.visible");
  }
  clickstatusDropDown() {
    cy.get(statusDropDown).click();
  }
  verifypackageApproveCheckBoxExists() {
    cy.xpath(packageApproveCheckBox).should("be.visible");
  }
  verifypackageInReviewcheckBoxExists() {
    cy.xpath(packageInReviewcheckBox).should("be.visible");
  }
  verifywithdrawnCheckBoxExists() {
    cy.xpath(withdrawnCheckBox).should("be.visible");
  }
  verifysparaiSubmittedExists() {
    cy.xpath(sparaiSubmitted).should("be.visible");
  }
  clickwaiver1915bCheckBox() {
    cy.xpath(waiver1915bCheckBox).click();
  }
  clickCHIPSPACheckBox() {
    cy.xpath(CHIPSPACheckBox).click();
  }
  clickMedicaidSPACheckBox() {
    cy.xpath(MedicaidSPACheckBox).click();
  }
  verifyraiResponseSubmittedCheckBoxExists() {
    cy.xpath(raiResponseSubmitted).should("be.visible");
  }
  verifyseaToolStatus1CheckBoxExists() {
    cy.xpath(seaToolStatus1).should("be.visible");
  }
  verifyMedicaidSPAInListExists() {
    cy.xpath(medicaidSPAInList).should("be.visible");
  }
}
export default oneMacPackagePage;
