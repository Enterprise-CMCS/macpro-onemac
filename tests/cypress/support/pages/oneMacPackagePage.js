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
//Element is Xpath use cy.xpath instead of cy.get
const typeDropDownFilter = "//button[text()='Type']";
const typeDropDown = "#accordionItem_2-button";
const statusDropDown = "#accordionItem_6-button";
//Element is Xpath use cy.xpath instead of cy.get
const ninetiethDayFilterDropdown = "//button[text()='90th Day']";
//Element is Xpath use cy.xpath instead of cy.get
const ninetiethDayNACheckbox = "//label[@for='checkbox_ninetiethDay-N/A_7']";
//Element is Xpath use cy.xpath instead of cy.get
const ninetiethDayPendingCheckbox =
  "//label[@for='checkbox_ninetiethDay-Pending_8']";
const ninetiethDayDatePickerFilter =
  "#accordionItem_6 > .rs-picker > .rs-picker-toggle";
//Element is Xpath use cy.xpath instead of cy.get
const expirationDateFilterDropdown = "//button[text()='Expiration Date']";
const expirationDateDatePickerFilter =
  "#accordionItem_9 > .rs-picker > .rs-picker-toggle";
//Element is Xpath use cy.xpath instead of cy.get
const dateSubmittedFilterDropdown = "//button[text()='Date Submitted']";
//Element is Xpath use cy.xpath(***).last() instead of cy.get
const dateSubmittedDatePickerFilter = "//span[text()='Select Date Range']";
//Element is Xpath use cy.xpath instead of cy.get
const thisQuarterDatePickerBtn = "//button[contains(text(),'This Quarter')]";
//Element is Xpath use cy.xpath instead of cy.get
const quarterToDateDatePickerBtn =
  "//button[contains(text(),'Quarter To Date')]";
//Element is Xpath use cy.xpath instead of cy.get
const okDatePickerBtn = "//button[text()='OK']";
//Element is Xpath use cy.xpath instead of cy.get
const todayPickerBtn = "//button[text()='Today']";
//Element is Xpath use cy.xpath instead of cy.get
const statusDropDownFilter = "//button[text()='Status']";
const packageRowOneDateSubmitted = "#submissionTimestamp-0";
const packageRowOne90thDay = "#ninetiethDay-0";
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
//Element is Xpath use cy.xpath instead of cy.get
const ShowHideColumnsBTN =
  "//body/reference[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/button[1]";
//Element is Xpath use cy.xpath instead of cy.get
const checkBox90thDay = "//span[contains(text(),'90th Day')]";
//Element is Xpath use cy.xpath instead of cy.get
const checkBoxDateSubmitted = "//span[contains(text(),'Date Submitted')]";
//Element is Xpath use cy.xpath instead of cy.get
const checkBoxexpirationDate = "//span[contains(text(),'Expiration Date')]";
//Element is Xpath use cy.xpath instead of cy.get
const checkboxState = "//span[text()='State']";
//Element is Xpath use cy.xpath instead of cy.get
const checkBoxStatus = "//span[contains(text(),'Status')]";
//Element is Xpath use cy.xpath instead of cy.get
const checkBoxSubmittedBy = "//span[contains(text(),'Submitted By')]";
//Element is Xpath use cy.xpath instead of cy.get
const checkBoxType = "//span[contains(text(),'Type')]";
const IDNumberColumn = "#componentIdColHeader";
const typeColumn = "#componentTypeColHeader";
const stateColumn = "#territoryColHeader";
const expirationDateColumn = "#expirationTimestampColHeader";
const statusColumn = "#packageStatusColHeader";
const dateSubmittedColumn = "#submissionTimestampColHeader";
const submittedByColumn = "#submitterColHeader";
const actionsColumn = "#packageActionsColHeader";
const packageRowOneType = "#componentType-0";
const packageRowOneState = "#territory-0";
//first obj is a header and second obj is row if there are results
const packageRows = "tr";
const packageRowOne = "tbody > tr:nth-child(1)";
//Element is Xpath use cy.xpath instead of cy.get
const PackageApproved =
  "//a[contains(text(),'MD-12-8214')]/../following-sibling::td[8]/button";
//Element is Xpath use cy.xpath instead of cy.get
const PackageDisapproved =
  "//a[contains(text(),'MD-45-5913')]/../following-sibling::td[8]/button";
//Element is Xpath use cy.xpath instead of cy.get
const PackageWithdrawn =
  "//a[contains(text(),'MD-13-8218')]/../following-sibling::td[8]/button";
//Element is Xpath use cy.xpath instead of cy.get
const waiverTerminated =
  "//a[contains(text(),'MD.10330')]/../following-sibling::td[8]/button";
//Element is Xpath use cy.xpath instead of cy.get
const Unsubmitted =
  "//a[contains(text(),'MD.83420')]/../following-sibling::td[8]/button";

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
  verifytypeDropDownFilterExists() {
    cy.xpath(typeDropDownFilter).should("be.visible");
  }
  verify90thDayFilterDropDownExists() {
    cy.xpath(ninetiethDayFilterDropdown).should("be.visible");
  }
  clickOn90thDayFilterDropDown() {
    cy.xpath(ninetiethDayFilterDropdown).click();
  }
  verifyExpirationDateFilterDropDownExists() {
    cy.xpath(expirationDateFilterDropdown).should("be.visible");
  }
  clickOnExpirationDateFilterDropDown() {
    cy.xpath(expirationDateFilterDropdown).click();
  }
  verifyDateSubmittedFilterDropDownExists() {
    cy.xpath(dateSubmittedFilterDropdown).should("be.visible");
  }
  clickOnDateSubmittedFilterDropDown() {
    cy.xpath(dateSubmittedFilterDropdown).click();
  }
  verifyNinetiethDayNACheckboxExists() {
    cy.xpath(ninetiethDayNACheckbox).should("exist");
  }
  clickOnNinetiethDayNACheckbox() {
    cy.xpath(ninetiethDayNACheckbox).click();
  }
  verifyNinetiethDayPendingCheckboxExists() {
    cy.xpath(ninetiethDayPendingCheckbox).should("exist");
  }
  clickOnNinetiethDayPendingCheckbox() {
    cy.xpath(ninetiethDayPendingCheckbox).click();
  }
  verifyNinetiethDayDatePickerFilterExists() {
    cy.get(ninetiethDayDatePickerFilter).should("exist");
  }
  clickOnNinetiethDayDatePickerFilter() {
    cy.get(ninetiethDayDatePickerFilter).click();
  }
  verifyExpirationDateDatePickerFilterExists() {
    cy.get(expirationDateDatePickerFilter).should("exist");
  }
  clickOnExpirationDateDatePickerFilter() {
    cy.get(expirationDateDatePickerFilter).click();
  }
  verifyDateSubmittedDatePickerFilterExists() {
    cy.xpath(dateSubmittedDatePickerFilter).last().should("exist");
  }
  clickOnDateSubmittedDatePickerFilter() {
    cy.xpath(dateSubmittedDatePickerFilter).last().click();
  }
  clickOnThisQuarterDatePickerBtn() {
    cy.xpath(thisQuarterDatePickerBtn).click();
  }
  clickOnQuarterToDateDatePickerBtn() {
    cy.xpath(quarterToDateDatePickerBtn).click();
  }
  clickOnOkDatePickerBtn() {
    cy.xpath(okDatePickerBtn).click();
  }
  clickOntodayPickerBtn() {
    cy.xpath(todayPickerBtn).click();
  }
  verifyPackageRowOneExists() {
    cy.get(packageRowOne).should("be.visible");
  }
  verify90thDayRowOneIsNotPending() {
    cy.get(packageRowOne90thDay).should("not.have.text", "Pending");
  }
  verify90thDayRowOneIsNotNA() {
    cy.get(packageRowOne90thDay).should("not.have.text", "N/A");
  }
  verifypackageRowOneDateSubmittedIsThisQuarter() {
    cy.get(packageRowOneDateSubmitted, { timeout: 15000 })
      .invoke("text")
      .then((dateText) => {
        const date = new Date(packageRowOneDateSubmitted);
        const today = new Date();
        let dateQuarter = Math.floor((date.getMonth() + 3) / 3);
        let todaysQuarter = Math.floor((today.getMonth() + 3) / 3);
        expect(dateQuarter).to.eq(todaysQuarter);
      });
  }
  verifystatusDropDownFilterExists() {
    cy.xpath(statusDropDownFilter).should("be.visible");
  }
  verifystatusDropDownExists() {
    cy.get(statusDropDown).should("be.visible");
  }
  verifyresetButtonExists() {
    cy.xpath(resetButton).should("be.visible");
  }
  clickOnResetButton() {
    cy.xpath(resetButton).click();
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
  verifyShowHideColumnsBTNExists() {
    cy.xpath(ShowHideColumnsBTN).should("be.visible");
  }
  clickShowHideColumnsBTN() {
    cy.xpath(ShowHideColumnsBTN).click();
  }
  verifycheckBox90thDayExists() {
    cy.xpath(checkBox90thDay).should("be.visible");
  }
  clickCheckBox90thDay() {
    cy.xpath(checkBox90thDay).click();
  }
  verifycheckBoxDateSubmittedExists() {
    cy.xpath(checkBoxDateSubmitted).should("be.visible");
  }
  clickCheckBoxDateSubmitted() {
    cy.xpath(checkBoxDateSubmitted).click();
  }
  verifycheckBoxexpirationDateBTNExists() {
    cy.xpath(checkBoxexpirationDate).should("be.visible");
  }
  clickCheckBoxexpirationDate() {
    cy.xpath(checkBoxexpirationDate).click();
  }
  verifycheckboxStateExists() {
    cy.xpath(checkboxState).should("be.visible");
  }
  clickCheckboxState() {
    cy.xpath(checkboxState).click();
  }
  verifycheckBoxStatusExists() {
    cy.xpath(checkBoxStatus).should("be.visible");
  }
  clickCheckboxStatus() {
    cy.xpath(checkBoxStatus).click();
  }
  verifycheckBoxSubmittedByExists() {
    cy.xpath(checkBoxSubmittedBy).should("be.visible");
  }
  clickCheckBoxSubmittedBy() {
    cy.xpath(checkBoxSubmittedBy).click();
  }
  verifycheckBoxTypeExists() {
    cy.xpath(checkBoxType).should("be.visible");
  }
  clickCheckBoxType() {
    cy.xpath(checkBoxType).click();
  }
  verifyIDNumberColumnExists() {
    cy.get(IDNumberColumn).should("be.visible");
  }
  verifytypeColumnExists() {
    cy.get(typeColumn).should("be.visible");
  }
  verifystateColumnExists() {
    cy.get(stateColumn).should("be.visible");
  }
  verifyexpirationDateColumnExists() {
    cy.get(expirationDateColumn).should("be.visible");
  }
  verifystatusColumnExists() {
    cy.get(statusColumn).should("be.visible");
  }
  verifydateSubmittedColumnExists() {
    cy.get(dateSubmittedColumn).should("be.visible");
  }
  verifysubmittedByColumnExists() {
    cy.get(submittedByColumn).should("be.visible");
  }
  verifyactionsColumnExists() {
    cy.get(actionsColumn).should("be.visible");
  }
  verifyIDNumberColumnDoesNotExist() {
    cy.get(IDNumberColumn).should("not.exist");
  }
  verifytypeColumnDoesNotExist() {
    cy.get(typeColumn).should("not.exist");
  }
  verifystateColumnDoesNotExist() {
    cy.get(stateColumn).should("not.exist");
  }
  verify90thDayColumnDoesNotExist() {
    cy.get(stateColumn).should("not.exist");
  }
  verifyexpirationDateColumnDoesNotExist() {
    cy.get(expirationDateColumn).should("not.exist");
  }
  verifystatusColumnDoesNotExist() {
    cy.get(statusColumn).should("not.exist");
  }
  verifydateSubmittedColumnDoesNotExist() {
    cy.get(dateSubmittedColumn).should("not.exist");
  }
  verifysubmittedByColumnDoesNotExist() {
    cy.get(submittedByColumn).should("not.exist");
  }
  verifyactionsColumnDoesNotExist() {
    cy.get(actionsColumn).should("not.exist");
  }
  verifypackageRowOneTypeExists() {
    cy.get(packageRowOneType).should("be.visible");
  }
  verifypackageRowOneStateExists() {
    cy.get(packageRowOneState).should("be.visible");
  }
  verifypackageRowOneTypeHasTextMedicaidSPA() {
    cy.get(packageRowOneType).should("have.text", "Medicaid SPA");
  }
  typePartialExistingID() {
    cy.get(searchbar).type("MD-10");
  }
  checkforPackageApprovedIsNotClickable() {
    cy.xpath(PackageApproved).should("be.disabled");
  }
  checkforPackageDisapprovedIsNotClickable() {
    cy.xpath(PackageDisapproved).should("be.disabled");
  }
  checkforPackageWithdrawnIsNotClickable() {
    cy.xpath(PackageWithdrawn).should("be.disabled");
  }
  checkforWaiverTerminatedIsNotClickable() {
    cy.xpath(waiverTerminated).should("be.disabled");
  }
  checkforUnsubmittedIsNotClickable() {
    cy.xpath(Unsubmitted).should("be.disabled");
  }
  checkIfPackageListResultsExist() {
    //must check if length is greater than 1 because 1 is the header which is always visible.
    if (cy.get("table").find(packageRows).length > 1) {
      return true;
    } //else
    return false;
  }
}
export default oneMacPackagePage;
