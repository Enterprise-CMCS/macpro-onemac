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
const searchbarHeader =
  "//label[text()='Search by Package ID or Submitter Name']";
//Element is Xpath use cy.xpath instead of cy.get
const searchBarXBTN = "//button[@aria-label='Clear Search']";
//Element is Xpath use cy.xpath instead of cy.get
const noResultsFound = "//div[contains(text(),'No Results Found')]";
//Element is Xpath use cy.xpath instead of cy.get
const errorMessageForNoResultsFound =
  "//p[contains(text(),'Adjust your search and filter to find what you are')]";
const stateColumnHeader = "#territoryColHeader";
//Element is Xpath use cy.xpath instead of cy.get
const arrowOnStateColumnHeader =
  "//th[@id='territoryColHeader']//span[@class='sort-icons-table']";
//Element is Xpath use cy.xpath instead of cy.get
const filterButton = "//button[contains(text(),'Filter')]";
//Element is Xpath use cy.xpath instead of cy.get
const filterByText = "//header//h4";
//Element is Xpath use cy.xpath instead of cy.get
const closeButton = "//header/button[1]";
//Element is Xpath use cy.xpath instead of cy.get
const typeDropDownFilter = "//button[text()='Type']";
const typeDropDown = "#componentType-button";
const statusDropDown = "#packageStatus-button";
const statusFilterCheckboxes = "#packageStatus label";
//Element is Xpath use cy.xpath instead of cy.get
const ninetiethDayFilterDropdown = "//button[text()='90th Day']";
//Element is Xpath use cy.xpath instead of cy.get
const ninetiethDayNACheckbox =
  "//label[contains(@for,'checkbox_ninetiethDay-N/A_')]";
//Element is Xpath use cy.xpath instead of cy.get
const ninetiethDayPendingCheckbox =
  "//label[contains(@for,'checkbox_ninetiethDay-Pending_')]";
const ninetiethDayClockStoppedCheckbox =
  "//label[contains(@for,'checkbox_ninetiethDay-Clock Stopped')]";
const ninetiethDayDatePickerFilter =
  '*[role=combobox][aria-owns^="ninetiethDay-date-filter"]';
//Element is Xpath use cy.xpath instead of cy.get
const expirationDateFilterDropdown = "//button[text()='Expiration Date']";
const expirationDateDatePickerFilter =
  '*[role=combobox][aria-owns^="expirationTimestamp-date-filter"]';
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
const initialWaiver1915bCheckBox =
  "//label[contains(@for,'checkbox_componentType-1915(b) Initial Waiver')]";
const waiverRenewal1915bCheckBox =
  "//label[contains(@for,'checkbox_componentType-1915(b) Waiver Renewal')]";
//Element is Xpath use cy.xpath instead of cy.get
const CHIPSPACheckBox =
  "//label[contains(@for,'checkbox_componentType-CHIP SPA')]";
//Element is Xpath use cy.xpath instead of cy.get
const MedicaidSPACheckBox =
  "//label[contains(@for,'checkbox_componentType-Medicaid SPA')]";
//Element is Xpath use cy.xpath instead of cy.get
const approveCheckBox = "//span[contains(text(),'Approved')]";
//Element is Xpath use cy.xpath instead of cy.get
const inReviewCheckBox = "//span[contains(text(),'In Review')]";
const terminatedCheckBox = "//span[contains(text(),'Terminated')]";
//Element is Xpath use cy.xpath instead of cy.get
const withdrawnCheckBox = "//span[contains(text(),'Withdrawn')]";
//Element is Xpath use cy.xpath instead of cy.get
const sparaiSubmitted = "//span[contains(text(),'sparai Submitted')]";
//Element is Xpath use cy.xpath instead of cy.get
const raiResponseSubmitted = "//span[contains(text(),'RAIResponse Submitted')]";
//Element is Xpath use cy.xpath instead of cy.get
const seaToolStatus1 = "//span[contains(text(),'SEATool Status: 1')]";
//Element is Xpath use cy.xpath instead of cy.get
const medicaidSPAInList = "//tbody/tr[1]/td[3]/span[1]";
//Element is Xpath use cy.xpath instead of cy.get
const ShowHideColumnsBTN = "//button[contains(text(),'Show/Hide Columns')]";
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
const Approved =
  "//a[contains(text(),'MD-12-8214')]/../following-sibling::td[7]/button";
//Element is Xpath use cy.xpath instead of cy.get
const Disapproved =
  "//a[contains(text(),'MD-45-5913')]/../following-sibling::td[7]/button";
//Element is Xpath use cy.xpath instead of cy.get
const PackageWithdrawn =
  "//a[contains(text(),'MD-13-8218')]/../following-sibling::td[7]/button";
//Element is Xpath use cy.xpath instead of cy.get
const waiverTerminated =
  "//a[text()='MD.10330']/../following-sibling::td[contains(@id,'packageActions')]/button";
//Element is Xpath use cy.xpath instead of cy.get
const Unsubmitted =
  "//a[contains(text(),'MD.83420')]/../following-sibling::td[contains(@id,'packageActions')]/button";
const stateDropdownFilter = "#territory-button";
const stateFilterSelect = "#territory-filter-select";
const statesSelected = "#territory";
//Element is Xpath use cy.xpath instead of cy.get
const removeBtn = (state) => `//*[@aria-label='Remove ${state}']`;
const waiversTab = "#show-waivers-button";
const spasTab = "#show-spas-button";
const waiverFamilyNumColumn = "#familyNumberColHeader";
//Element is Xpath use cy.xpath instead of cy.get
const waiverFamilyCheckbox =
  "//label[contains(@for,'checkbox_columnPicker-Waiver Family')]";
const waiverFamilyRowOne = "#familyNumber-0";
//Element is Xpath use cy.xpath instead of cy.get
const raiIssuedCheckbox = "//span[contains(text(),'RAI Issued')]";
//Element is Xpath use cy.xpath instead of cy.get
const approvedCheckbox =
  "//label[contains(@for,'checkbox_packageStatus-Approved')]";
//Element is Xpath use cy.xpath instead of cy.get
const disapprovedCheckbox =
  "//label[contains(@for,'checkbox_packageStatus-Disapproved')]";
//Element is Xpath use cy.xpath instead of cy.get
const submittedCheckbox =
  "//label[contains(@for,'checkbox_packageStatus-Submitted')]";
//Element is Xpath use cy.xpath instead of cy.get
const unsubmittedCheckbox =
  "//label[contains(@for,'checkbox_packageStatus-Unsubmitted')]";
const packageRowOneID = "#componentId-0";
const packageRowTwoID = "#componentId-1";
const packageRowTwoDateSubmitted = "#submissionTimestamp-1";
const packageRowTwo90thDay = "#ninetiethDay-1";
const packageRowTwoType = "#componentType-1";
const packageRowTwoState = "#territory-1";
const packageRowTwoStatus = "#packageStatus-1";
//Element is Xpath use cy.xpath instead of cy.get
const parentRowExpander = "//tr[1]//button[@aria-label='Expand row']";
const rowTwo = "tbody > tr:nth-child(2)";
const packageRowTwoSubmittedBy = "#submitter-1";
const packageRowTwoActions = "#packageActions-1";
//Element is Xpath use cy.xpath instead of cy.get
const allPackageRowActions = "//td[contains(@id,'packageActions')]";
const packageRowTwoExpirationDate = "#expirationTimestamp-1";
//Element is Xpath use cy.xpath instead of cy.get
const childRows = "//tr[@class = 'child-row-expanded']";
const withdrawPackageBtn = "//li[text()='Withdraw'][@aria-disabled='false']";
const withdrawPackageConfirmBtn = "//button[contains(text(),'Yes, withdraw')]";
const successMessage = "#alert-bar";
//Element is Xpath use cy.xpath instead of cy.get
const packageRowOneIDLink = "//td[@id='componentId-0']//a";
const packageRowOneActionsBtn = "//td[@id='packageActions-0']//button";
const respondToRAIBtn =
  "//*[@data-testid='action-popup']//a[text()= 'Respond to RAI']";
const RequestTempExtensionBtn = "//a[text()='Request Temporary Extension']";
const waiverNumLink = (n) => `//a[text()="${n}"]`;

export class oneMacPackagePage {
  verify90thDayColumn() {
    cy.xpath(nintieththDayColumn).should("be.visible");
  }

  verifyValue() {
    cy.get(nintiethDayColumnFirstValue).contains(
      /N\/A|Pending|Clock Stopped|((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2})\s+(\d{4}))/
    );
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
    cy.xpath(ninetiethDayFilterDropdown).wait(1000);
    cy.xpath(ninetiethDayFilterDropdown).click();
  }
  verifyExpirationDateFilterDropDownExists() {
    cy.xpath(expirationDateFilterDropdown).should("be.visible");
  }
  clickOnExpirationDateFilterDropDown() {
    cy.xpath(expirationDateFilterDropdown).wait(1000);
    cy.xpath(expirationDateFilterDropdown).click();
  }
  verifyDateSubmittedFilterDropDownExists() {
    cy.xpath(dateSubmittedFilterDropdown).should("be.visible");
  }
  clickOnDateSubmittedFilterDropDown() {
    cy.xpath(dateSubmittedFilterDropdown).wait(1000);
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
  verifyNinetiethDayClockStoppedCheckboxExists() {
    cy.xpath(ninetiethDayClockStoppedCheckbox).should("exist");
  }
  clickOnNinetiethDayClockStoppedCheckbox() {
    cy.xpath(ninetiethDayClockStoppedCheckbox).click();
  }
  verifyNinetiethDayDatePickerFilterExists() {
    cy.get(ninetiethDayDatePickerFilter).should("exist");
  }
  clickOnNinetiethDayDatePickerFilter() {
    cy.get(ninetiethDayDatePickerFilter).wait(1000);
    cy.get(ninetiethDayDatePickerFilter).click();
  }
  verifyExpirationDateDatePickerFilterExists() {
    cy.get(expirationDateDatePickerFilter).should("exist");
  }
  clickOnExpirationDateDatePickerFilter() {
    cy.get(expirationDateDatePickerFilter).wait(1000);
    cy.get(expirationDateDatePickerFilter).click();
  }
  verifyDateSubmittedDatePickerFilterExists() {
    cy.xpath(dateSubmittedDatePickerFilter).last().should("exist");
  }
  clickOnDateSubmittedDatePickerFilter() {
    cy.xpath(dateSubmittedDatePickerFilter).wait(1000);
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
    cy.xpath(resetButton).wait(1000);
    cy.xpath(resetButton).click();
  }
  clickTypeDropDown() {
    cy.get(typeDropDown).wait(1000);
    cy.get(typeDropDown).click();
  }
  verifyWaiverRenewal1915bCheckBoxExists() {
    cy.xpath(waiverRenewal1915bCheckBox).should("be.visible");
  }
  verifyInitialWaiver1915bCheckBoxExists() {
    cy.xpath(initialWaiver1915bCheckBox).should("be.visible");
  }
  verifyCHIPSPACheckBoxExists() {
    cy.xpath(CHIPSPACheckBox).should("be.visible");
  }
  verifyMedicaidSPACheckBoxExists() {
    cy.xpath(MedicaidSPACheckBox).should("be.visible");
  }
  clickstatusDropDown() {
    cy.get(statusDropDown).wait(1000);
    cy.get(statusDropDown).click();
  }
  verifyApproveCheckBoxExists() {
    cy.xpath(approveCheckBox).should("be.visible");
  }
  verifyInReviewCheckBoxExists() {
    cy.xpath(inReviewCheckBox).should("be.visible");
  }
  clickInReviewCheckBox() {
    cy.xpath(inReviewCheckBox).click();
  }
  clickTerminatedCheckBox() {
    cy.xpath(terminatedCheckBox).click();
  }
  verifyWithdrawnCheckBoxExists() {
    cy.xpath(withdrawnCheckBox).should("be.visible");
  }
  clickWithdrawnCheckBoxExists() {
    cy.xpath(withdrawnCheckBox).first().click();
  }
  verifysparaiSubmittedExists() {
    cy.xpath(sparaiSubmitted).should("be.visible");
  }
  clickInitialWaiver1915bCheckBox() {
    cy.xpath(initialWaiver1915bCheckBox).click();
  }
  clickWaiverRenewal1915bCheckBox() {
    cy.xpath(waiverRenewal1915bCheckBox).click();
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
    cy.get(actionsColumn).scrollIntoView();
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
    cy.get(searchbar).type("MD-13");
  }
  checkforApprovedIsNotClickable() {
    cy.xpath(Approved).should("be.disabled");
  }
  checkforDisapprovedIsNotClickable() {
    cy.xpath(Disapproved).should("be.disabled");
  }
  checkforWithdrawnIsNotClickable() {
    cy.xpath(PackageWithdrawn).should("be.disabled");
  }
  checkforTerminatedIsNotClickable() {
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
  verifyStateDropdownFilterExists() {
    cy.get(stateDropdownFilter).should("be.visible");
  }
  clickStateDropdownFilter() {
    cy.get(stateDropdownFilter).wait(1000);
    cy.get(stateDropdownFilter).click();
  }
  verifyStateFilterSelectExists() {
    cy.get(stateFilterSelect).should("be.visible");
  }
  clickStateFilterSelect() {
    cy.get(stateFilterSelect).click();
  }
  verifyStatesSelectedExists() {
    cy.get(statesSelected).should("be.visible");
  }
  verifyStatesSelectedIncludes(state) {
    cy.get(statesSelected).contains(state);
  }
  verifyStateFilterSelectIsEmpty() {
    cy.get(stateFilterSelect).should(
      "have.attr",
      "aria-describedby",
      "react-select-3-placeholder"
    );
  }
  typeStateToSelect(state) {
    cy.get(stateFilterSelect).focus().type(state);
  }
  verifypackageRowOneValueIs(state) {
    cy.get(packageRowOneState).contains(state);
  }
  verifyremoveBtnExistsFor(state) {
    cy.xpath(removeBtn(state)).should("be.visible");
  }
  clickRemoveBtnFor(state) {
    cy.xpath(removeBtn(state)).click();
  }
  verifyWaiversTabExists() {
    cy.get(waiversTab).should("be.visible");
  }
  clickOnWaiversTab() {
    cy.get(waiversTab).click();
  }
  verifySPAsTabExists() {
    cy.get(spasTab).should("be.visible");
  }
  clickOnSPAsTab() {
    cy.get(spasTab).click();
  }
  verifySPAIDColumnExists() {
    cy.get(IDNumberColumn).should("be.visible").and("have.text", "SPA ID");
  }
  verifyWaiverNumberColumnExists() {
    cy.get(IDNumberColumn)
      .should("be.visible")
      .and("have.text", "Waiver Number");
  }
  verifySPAsTabIsDisabled() {
    cy.get(spasTab).should("be.disabled");
  }
  verifySPAsTabIsClickable() {
    cy.get(spasTab).should("not.be.disabled");
  }
  verifyWaiversTabIsDisabled() {
    cy.get(waiversTab).should("be.disabled");
  }
  verifyWaiversTabIsClickable() {
    cy.get(waiversTab).should("not.be.disabled");
  }
  verifyWaiverFamilyNumColumnExists() {
    cy.get(waiverFamilyNumColumn).should("be.visible");
  }
  verifyWaiverFamilyNumColumnDoesNotExists() {
    cy.get(waiverFamilyNumColumn).should("not.exist");
  }
  verifyWaiverFamilyNumColumnIsSortable() {
    cy.get(waiverFamilyNumColumn).should("have.attr", "title", "Toggle SortBy");
  }
  verifyWaiverFamilyCheckboxExists() {
    cy.xpath(waiverFamilyCheckbox).should("be.visible");
  }
  verifyWaiverFamilyCheckboxDoesNotExists() {
    cy.xpath(waiverFamilyCheckbox).should("not.exist");
  }
  clickOnWaiverFamilyCheckbox() {
    cy.xpath(waiverFamilyCheckbox).click();
  }
  verifyWaiverFamilyRowOneFormat() {
    cy.get(waiverFamilyRowOne).contains(/[A-Z]{2}\.\d{4}||[A-Z]{2}\.\d{5}/);
  }
  verifyRaiIssuedCheckboxExists() {
    cy.xpath(raiIssuedCheckbox).should("be.visible");
  }
  clickRaiIssuedCheckbox() {
    cy.xpath(raiIssuedCheckbox).click();
  }
  verifyApprovedCheckboxExists() {
    cy.xpath(approvedCheckbox).should("be.visible");
  }
  clickApprovedCheckbox() {
    cy.xpath(approvedCheckbox).click();
  }
  verifyDisapprovedCheckboxExists() {
    cy.xpath(disapprovedCheckbox).should("be.visible");
  }
  clickDisapprovedCheckbox() {
    cy.xpath(disapprovedCheckbox).click();
  }
  verifySubmittedCheckboxExists() {
    cy.xpath(submittedCheckbox).should("be.visible");
  }
  clickSubmittedCheckbox() {
    cy.xpath(submittedCheckbox).click();
  }
  verifyUnsubmittedCheckboxExists() {
    cy.xpath(unsubmittedCheckbox).should("be.visible");
  }
  clickUnsubmittedCheckbox() {
    cy.xpath(unsubmittedCheckbox).click();
  }
  clickAllStatusFilterCheckboxes() {
    cy.get(statusFilterCheckboxes).each(($el) => {
      cy.wrap($el).click();
    });
  }
  verify90thDayRowOneIsPending() {
    cy.get(packageRowOne90thDay).should("have.text", "Pending");
  }
  verify90thDayRowOneIsNA() {
    cy.get(packageRowOne90thDay).should("have.text", "N/A");
  }
  verify90thDayRowOneIsClockStopped() {
    cy.get(packageRowOne90thDay).should("have.text", "Clock Stopped");
  }
  verifypackageRowOneIDInitialWaiverFormat() {
    cy.get(packageRowOneID).contains(/[A-Z]{2}\.\d{4}||[A-Z]{2}\.\d{5}/);
  }
  verifypackageRowOneIDWaiverRenewalFormat() {
    cy.get(packageRowOneID).contains(
      /[A-Z]{2}\.\d{5}\.[A-Z]{1}\d{2}||[A-Z]{2}\.\d{4}\.[A-Z]{1}\d{2}/
    );
  }
  verifypackageRowOneTypeContains1915bWaiver() {
    cy.get(packageRowOneType)
      .should("contain.text", "1915(b)")
      .and("contain.text", "Waiver");
  }
  verifypackageRowOneTypeHasTextInitialWaiver() {
    cy.get(packageRowOneType).should("contain.text", "Initial Waiver");
  }
  verifypackageRowOneTypeHasTextWaiverRenewal() {
    cy.get(packageRowOneType).should("contain.text", "Waiver Renewal");
  }
  searchFor(part) {
    cy.get(searchbar).type(part);
  }
  verifyFirstParentRowExpanderExists() {
    cy.xpath(parentRowExpander).should("be.visible");
  }
  verifyTheNextRowIsNotAChild() {
    cy.get(rowTwo).should("not.have.class", "child-row-expanded");
  }
  clickFirstParentRowExpander() {
    cy.xpath(parentRowExpander).not(":disabled").click();
  }
  verifyTheNextRowIsAChild() {
    cy.get(rowTwo).should("have.class", "child-row-expanded");
  }
  verifyAllChildrenStartWith(part) {
    cy.xpath(childRows).each(($el) => {
      cy.wrap($el).find("td:nth-of-type(2)").should("contain.text", part);
    });
  }
  verifyWaiverNumberColumnExistsForChild() {
    cy.get(packageRowTwoID).should("be.visible");
  }
  verifytypeColumnExistsForChild() {
    cy.get(packageRowTwoType).should("be.visible");
  }
  verifystateColumnExistsForChild() {
    cy.get(packageRowTwoState).should("be.visible");
  }
  verify90thDayColumnExistsForChild() {
    cy.get(packageRowTwo90thDay).should("be.visible");
  }
  verifystatusColumnExistsForChild() {
    cy.get(packageRowOneType).should("be.visible");
  }
  verifyDateSubmittedColumnExistsForChild() {
    cy.get(packageRowTwoDateSubmitted).should("be.visible");
  }
  verifysubmittedByColumnExistsForChild() {
    cy.get(packageRowTwoSubmittedBy).should("be.visible");
  }
  verifyactionsColumnExistsForChild() {
    cy.get(packageRowTwoActions).should("be.visible");
  }
  clickActionsColumnForChild() {
    cy.get(packageRowTwoActions).scrollIntoView().click();
  }
  verifyChildActionsBtnIsDisabled() {
    cy.get(packageRowTwoActions)
      .scrollIntoView()
      .children("button")
      .first()
      .should("be.disabled");
  }
  clickActionsBtnForTempExtensionChild() {
    cy.xpath(childRows)
      .filter(":contains('Temporary Extension')")
      .then(($el) => {
        cy.wrap($el).find("button").first().scrollIntoView().click();
      });
  }
  verifyexpirationDateColumnExistsForChild() {
    cy.get(packageRowTwoExpirationDate).should("be.visible");
  }
  verifyFirstParentRowExpanderIsDisabled() {
    cy.xpath(parentRowExpander).should("be.disabled");
  }
  verifyFirstParentRowExpanderIsNotDisabled() {
    cy.xpath(parentRowExpander).should("not.be.disabled");
  }
  clickWithdrawPackageBtn() {
    cy.xpath(withdrawPackageBtn)
      .filter(":visible")
      .each(($clickable) => {
        if ($clickable) {
          cy.wrap($clickable).click();
          return false; //quit after finding the right element
        }
      });
  }
  clickConfirmWithdrawPackageBtn() {
    cy.xpath(withdrawPackageConfirmBtn).click();
  }
  verifyChildRowStatusIs(status) {
    cy.get(packageRowTwoStatus).should("contain.text", status);
  }
  verifyPackageWithdrawalMessageIsDisplayed() {
    cy.get(successMessage).contains(
      "Your submission package has successfully been withdrawn."
    );
  }
  clickSPAIDLinkInFirstRow() {
    cy.xpath(packageRowOneIDLink).click();
  }
  clickPackageRowOneActionsBtn() {
    cy.xpath(packageRowOneActionsBtn).click();
  }
  clickRespondToRAIBtn() {
    cy.xpath(respondToRAIBtn).click({ force: true });
  }
  verifyRespondToRAIBtnExists() {
    cy.xpath(respondToRAIBtn).should("exist").and("not.be.disabled");
  }
  clickRequestTempExtensionBtn() {
    cy.xpath(RequestTempExtensionBtn).click();
  }
  verifyRequestTempExtensionBtnExists() {
    cy.xpath(RequestTempExtensionBtn).should("be.visible");
  }
  clickWaiverNumberLinkInFirstRow() {
    cy.xpath(packageRowOneIDLink).click();
  }
  clickLinkForWaiver(n) {
    cy.xpath(waiverNumLink(n)).first().click();
  }
  verifyIDNumberInFirstRowIs(id) {
    cy.xpath(packageRowOneIDLink).contains(id);
  }
  verifyIDNumberInSecondRowIs(id) {
    cy.get(packageRowTwoID).contains(id);
  }
  compareSearchIDToFirstLinkID(searchedID) {
    cy.xpath(packageRowOneIDLink).should("have.text", searchedID);
  }
  copyTheIDFromLinkInFirstRow() {
    cy.xpath(packageRowOneIDLink)
      .invoke("text")
      .then((text) => {
        var f = "./fixtures/savedID.json";
        cy.writeFile(f, { savedID: text });
      });
  }
  verifyActionsColumnDoesNotExist() {
    cy.get(actionsColumn).should("not.exist");
  }
}
export default oneMacPackagePage;
