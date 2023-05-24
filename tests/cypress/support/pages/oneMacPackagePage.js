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
const cPOCNameDropDown = "#cpocName-button";
const statusFilterCheckboxes = "#packageStatus input";
const typeFilterCheckboxes = "#componentType input";
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
const formalRAIReceivedCheckbox =
  "//label[contains(@for,'checkbox_columnPicker-Formal RAI')]";
const ninetiethDayDatePickerFilter =
  '*[role=combobox][aria-owns^="ninetiethDay-date-filter"]';
//Element is Xpath use cy.xpath instead of cy.get
const expirationDateFilterDropdown = "//button[text()='Expiration Date']";
const expirationDateDatePickerFilter =
  '*[role=combobox][aria-owns^="expirationTimestamp-date-filter"]';
//Element is Xpath use cy.xpath instead of cy.get
const initialSubmissionDateFilterDropdown =
  "//button[text()='Initial Submission']";

const initialSubmissionDateDatePickerFilter =
  "#submissionTimestamp-date-filter";
const formalRAIReceivedDateFilterDropdown =
  "#latestRaiResponseTimestamp-button";
const formalRAIReceivedDatePickerFilter =
  "#latestRaiResponseTimestamp-date-filter";
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
const packageRowOneInitialSubmissionDate = "#submissionTimestamp-0";
const packageRowOneFormalRAIReceived = "#latestRaiResponseTimestamp-0";
//Element is Xpath use cy.xpath instead of cy.get
const resetButton = "//button[contains(text(),'Reset')]";
//Element is Xpath use cy.xpath instead of cy.get
const initialWaiver1915bCheckBox =
  "//label[contains(@for,'checkbox_componentType-1915(b) Initial Waiver')]";
const waiverRenewal1915bCheckBox =
  "//label[contains(@for,'checkbox_componentType-1915(b) Waiver Renewal')]";
const appendixKAmendmentCheckBox =
  "//label[contains(@for,'checkbox_componentType-1915(c) Appendix K Amendment')]";
const waiverAmendment1915bCheckbox =
  "//label[contains(@for,'checkbox_componentType-1915(b) Waiver Amendment')]";
const temporaryExtensionCheckBox =
  "//label[contains(@for,'checkbox_componentType-Temporary Extension')]";
//Element is Xpath use cy.xpath instead of cy.get
const CHIPSPACheckBox =
  "//label[contains(@for,'checkbox_componentType-CHIP SPA')]";
//Element is Xpath use cy.xpath instead of cy.get
const MedicaidSPACheckBox =
  "//label[contains(@for,'checkbox_componentType-Medicaid SPA')]";
//Element is Xpath use cy.xpath instead of cy.get
const approveCheckBox = "//span[contains(text(),'Approved')]";
//Element is Xpath use cy.xpath instead of cy.get
const underReviewCheckBox = "//span[contains(text(),'Under Review')]";
//Element is Xpath use cy.xpath instead of cy.get
const withdrawalRequestedCheckBox =
  "//span[contains(text(),'Withdrawal Requested')]";
//Element is Xpath use cy.xpath instead of cy.get
const terminatedCheckBox = "//span[contains(text(),'Terminated')]";
//Element is Xpath use cy.xpath instead of cy.get
const withdrawnCheckBox = "//span[contains(text(),'Package Withdrawn')]";
//Element is Xpath use cy.xpath instead of cy.get
const sparaiSubmitted = "//span[contains(text(),'sparai Submitted')]";
//Element is Xpath use cy.xpath instead of cy.get
const raiResponseSubmitted = "//span[contains(text(),'RAIResponse Submitted')]";
//Element is Xpath use cy.xpath instead of cy.get
const seaToolStatus1 = "//span[contains(text(),'SEATool Status: 1')]";
//Element is Xpath use cy.xpath instead of cy.get
const ShowHideColumnsBTN = "//button[contains(text(),'Show/Hide Columns')]";
//Element is Xpath use cy.xpath instead of cy.get
const checkBox90thDay = "//span[contains(text(),'90th Day')]";
//Element is Xpath use cy.xpath instead of cy.get
const checkBoxInitialSubmissionDate =
  "//span[contains(text(),'Initial Submission')]";
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
const checkboxCPOCName = "//span[contains(text(),'CPOC Name')]";
const IDNumberColumn = "#componentIdColHeader";
const typeColumn = "#componentTypeColHeader";
const stateColumn = "#territoryColHeader";
const expirationDateColumn = "#expirationTimestampColHeader";
const statusColumn = "#packageStatusColHeader";
const initialSubmissionDateColumn = "#submissionTimestampColHeader";
const submittedByColumn = "#submitterColHeader";
const actionsColumn = "#packageActionsColHeader";
const formalRAIReceivedColumn = "#latestRaiResponseTimestampColHeader";
const cPOCNameColumn = "#cpocNameColHeader";
const packageRowOneType = "#componentType-0";
const packageRowOneState = "#territory-0";
//first obj is a header and second obj is row if there are results
const packageRows = "tr";
const packageRowOne = "tbody > tr:nth-child(1)";
//Element is Xpath use cy.xpath instead of cy.get
const Approved =
  "//a[contains(text(),'MD-12-8214')]/../following-sibling::td[7]/div";
//Element is Xpath use cy.xpath instead of cy.get
const Disapproved =
  "//a[contains(text(),'MD-45-5913')]/../following-sibling::td[7]/button";
//Element is Xpath use cy.xpath instead of cy.get
const PackageWithdrawn =
  "//a[contains(text(),'MD-13-8218')]/../following-sibling::td[7]/div";
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
//Element is Xpath use cy.xpath instead of cy.get
const raiIssuedCheckbox = "//span[contains(text(),'RAI Issued')]";
const pendingRaiCheckbox = "//span[contains(text(),'Pending - RAI')]";
const pendingConcurrenceCheckbox =
  "//span[contains(text(),'Pending - Concurrence')]";
const pendingApprovalCheckbox = "//span[contains(text(),'Pending - Approval')]";
const packageApprovedCheckbox = "//span[contains(text(),'Package Approved')]";
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
const submittedIntakeNeededCheckbox =
  "//label[contains(@for,'checkbox_packageStatus-Submitted - Intake Needed')]";
const doubleDashCheckbox =
  "//label[contains(@for,'checkbox_packageStatus-Requested')]";
const pendingCheckbox =
  "//label[contains(@for,'checkbox_packageStatus-Pending')]/span[text()='Pending']";
const unsubmittedCheckbox =
  "//label[contains(@for,'checkbox_packageStatus-Unsubmitted')]";
const packageRowOneID = "#componentId-0";
const packageRowTwoID = "#componentId-1";
const packageRowTwoInitialSubmissionDate = "#submissionTimestamp-1";
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
const withdrawPackageBtn = "//a[text()='Withdraw Package']";
const withdrawPackageConfirmBtn =
  "//button[contains(text(),'Yes, withdraw package')]";
const successMessage = "#alert-bar";
//Element is Xpath use cy.xpath instead of cy.get
const packageRowOneIDLink = "//td[@id='componentId-0']//a";
const packageRowOneActionsBtn = "//td[@id='packageActions-0']//button";
const respondToRAIBtn =
  "//*[@data-testid='action-popup']//a[text()= 'Respond to RAI']";
const RequestTempExtensionBtn = "//a[text()='Request Temporary Extension']";
const addAmendmentBtn = "//a[text()='Add Amendment']";
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
  verifyInitialSubmissionDateFilterDropDownExists() {
    cy.xpath(initialSubmissionDateFilterDropdown).should("be.visible");
  }
  clickOnInitialSubmissionDateFilterDropDown() {
    cy.xpath(initialSubmissionDateFilterDropdown).wait(1000);
    cy.xpath(initialSubmissionDateFilterDropdown).click();
  }
  verifyFormalRAIReceivedDateFilterDropdownExists() {
    cy.get(formalRAIReceivedDateFilterDropdown).should("be.visible");
  }
  clickOnFormalRAIReceivedDateFilterDropdownDropDown() {
    cy.get(formalRAIReceivedDateFilterDropdown).wait(1000);
    cy.get(formalRAIReceivedDateFilterDropdown).click();
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
  verifyFormalRAIReceivedCheckboxExists() {
    cy.xpath(formalRAIReceivedCheckbox).should("exist");
  }
  verifyFormalRAIReceivedCheckboxDoesNotExist() {
    cy.xpath(formalRAIReceivedCheckbox).should("not.exist");
  }
  clickFormalRAIReceivedCheckbox() {
    cy.xpath(formalRAIReceivedCheckbox).click();
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
  verifyInitialSubmissionDateDatePickerFilterExists() {
    cy.get(initialSubmissionDateDatePickerFilter).last().should("exist");
  }
  clickOnInitialSubmissionDateDatePickerFilter() {
    cy.get(initialSubmissionDateDatePickerFilter).wait(1000);
    cy.get(initialSubmissionDateDatePickerFilter).last().click();
  }
  verifyFormalRAIReceivedDatePickerFilterExists() {
    cy.get(formalRAIReceivedDatePickerFilter).last().should("exist");
  }
  verifyFormalRAIReceivedDatePickerFilterDoesNotExist() {
    cy.get(formalRAIReceivedDatePickerFilter).should("not.exist");
  }
  clickOnFormalRAIReceivedDatePickerFilter() {
    cy.get(formalRAIReceivedDatePickerFilter).wait(1000);
    cy.get(formalRAIReceivedDatePickerFilter).last().click();
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
  verifypackageRowOneInitialSubmissionDateIsThisQuarter() {
    cy.get(packageRowOneInitialSubmissionDate, { timeout: 15000 })
      .invoke("text")
      .then((dateText) => {
        const date = new Date(packageRowOneInitialSubmissionDate);
        const today = new Date();
        let dateQuarter = Math.floor((date.getMonth() + 3) / 3);
        let todaysQuarter = Math.floor((today.getMonth() + 3) / 3);
        expect(dateQuarter).to.eq(todaysQuarter);
      });
  }
  verifypackageRowOneFormalRAIReceivedIsThisQuarter() {
    cy.get(packageRowOneFormalRAIReceived, { timeout: 15000 })
      .invoke("text")
      .then((dateText) => {
        const date = new Date(packageRowOneFormalRAIReceived);
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
  verifyCPOCNameDropDownExists() {
    cy.get(cPOCNameDropDown).should("be.visible");
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
  verifyUnderReviewCheckBoxExists() {
    cy.xpath(underReviewCheckBox).should("be.visible");
  }
  clickUnderReviewCheckBox() {
    cy.xpath(underReviewCheckBox).click();
  }
  verifyTerminatedCheckBox() {
    cy.xpath(terminatedCheckBox).should("be.visible");
  }
  clickTerminatedCheckBox() {
    cy.xpath(terminatedCheckBox).click();
  }
  verifyWithdrawalRequestedCheckBoxCheckBox() {
    cy.xpath(withdrawalRequestedCheckBox).should("be.visible");
  }
  clickWithdrawalRequestedCheckBox() {
    cy.xpath(withdrawalRequestedCheckBox).click();
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
  verify1915cAppendixKAmendmentCheckBox() {
    cy.xpath(appendixKAmendmentCheckBox).should("be.visible");
  }
  click1915cAppendixKAmendmentCheckBox() {
    cy.xpath(appendixKAmendmentCheckBox).click();
  }
  verify1915bWaiverAmendmentCheckBox() {
    cy.xpath(waiverAmendment1915bCheckbox).should("be.visible");
  }
  click1915bWaiverAmendmentCheckBox() {
    cy.xpath(waiverAmendment1915bCheckbox).click();
  }
  verifyTemporaryExtensionCheckBoxExists() {
    cy.xpath(temporaryExtensionCheckBox).should("be.visible");
  }
  clickTemporaryExtensionCheckBox() {
    cy.xpath(temporaryExtensionCheckBox).click();
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
    cy.get(packageRowOneType).contains("Medicaid");
  }
  verifyInitialWaiverInListExists() {
    cy.get(packageRowOneType).contains("Initial Waiver");
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
  verifycheckBoxInitialSubmissionDateExists() {
    cy.xpath(checkBoxInitialSubmissionDate).should("be.visible");
  }
  clickCheckBoxInitialSubmissionDate() {
    cy.xpath(checkBoxInitialSubmissionDate).click();
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
  verifycheckBoxCPOCNameExists() {
    cy.xpath(checkboxCPOCName).should("be.visible");
  }
  clickCPOCNameCheckBox() {
    cy.xpath(checkboxCPOCName).click();
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
  verifyinitialSubmissionDateColumnExists() {
    cy.get(initialSubmissionDateColumn).should("be.visible");
  }
  verifysubmittedByColumnExists() {
    cy.get(submittedByColumn).should("be.visible");
  }
  verifyactionsColumnExists() {
    cy.get(actionsColumn).scrollIntoView();
    cy.get(actionsColumn).should("be.visible");
  }
  verifyFormalRAIReceivedColumnExists() {
    cy.get(formalRAIReceivedColumn).scrollIntoView();
    cy.get(formalRAIReceivedColumn).should("be.visible");
  }
  verifyFormalRAIReceivedColumnDoesNotExist() {
    cy.get(formalRAIReceivedColumn).should("not.exist");
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
  verifyinitialSubmissionDateColumnDoesNotExist() {
    cy.get(initialSubmissionDateColumn).should("not.exist");
  }
  verifysubmittedByColumnDoesNotExist() {
    cy.get(submittedByColumn).should("not.exist");
  }
  verifyCPOCNameColumnExists() {
    cy.get(cPOCNameColumn).should("be.visible");
  }
  verifyCPOCNameColumnDoesNotExist() {
    cy.get(cPOCNameColumn).should("not.exist");
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
    cy.xpath(Approved).children("button").should("be.disabled");
  }
  checkforDisapprovedIsNotClickable() {
    cy.xpath(Disapproved).should("be.disabled");
  }
  checkforWithdrawnIsNotClickable() {
    cy.xpath(PackageWithdrawn).children("button").should("be.disabled");
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
  verifyRaiIssuedCheckboxExists() {
    cy.xpath(raiIssuedCheckbox).should("be.visible");
  }
  clickRaiIssuedCheckbox() {
    cy.xpath(raiIssuedCheckbox).click();
  }
  clickPendingRaiCheckbox() {
    cy.xpath(pendingRaiCheckbox).click();
  }
  verifyPendingRaiCheckboxExists() {
    cy.xpath(pendingRaiCheckbox).should("be.visible");
  }
  clickPendingConcurrenceCheckbox() {
    cy.xpath(pendingConcurrenceCheckbox).click();
  }
  verifyPendingConcurrenceCheckboxExists() {
    cy.xpath(pendingConcurrenceCheckbox).should("be.visible");
  }
  clickPendingApprovalCheckbox() {
    cy.xpath(pendingApprovalCheckbox).click();
  }
  verifyPendingApprovalCheckboxExists() {
    cy.xpath(pendingApprovalCheckbox).should("be.visible");
  }
  clickPackageApprovedCheckbox() {
    cy.xpath(packageApprovedCheckbox).click();
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
  clickSubmittedIntakeNeededCheckbox() {
    cy.xpath(submittedIntakeNeededCheckbox).click();
  }
  verifySubmittedIntakeNeededCheckboxExists() {
    cy.xpath(submittedIntakeNeededCheckbox).should("be.visible");
  }
  clickDoubleDashCheckbox() {
    cy.xpath(doubleDashCheckbox).click();
  }
  clickPendingCheckbox() {
    cy.xpath(pendingCheckbox).click();
  }
  verifyUnsubmittedCheckboxExists() {
    cy.xpath(unsubmittedCheckbox).should("be.visible");
  }
  clickUnsubmittedCheckbox() {
    cy.xpath(unsubmittedCheckbox).click();
  }
  checkAllStatusFilterCheckboxes() {
    cy.get(statusFilterCheckboxes).each(($el) => {
      cy.wrap($el).check({ force: true });
    });
  }
  uncheckAllStatusFilterCheckboxes() {
    cy.get(statusFilterCheckboxes).each(($el) => {
      cy.wrap($el).uncheck({ force: true });
    });
  }
  checkAllTypeFilterCheckboxes() {
    cy.get(typeFilterCheckboxes).each(($el) => {
      cy.wrap($el).check({ force: true });
    });
  }
  uncheckAllTypeFilterCheckboxes() {
    cy.get(typeFilterCheckboxes).each(($el) => {
      cy.wrap($el).uncheck({ force: true });
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
  verifypackageRowOneTypeContains1915Waiver() {
    cy.get(packageRowOneType).should("contain.text", "1915");
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
  verifyInitialSubmissionDateColumnExistsForChild() {
    cy.get(packageRowTwoInitialSubmissionDate).should("be.visible");
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
  verifyWithdrawPackageBtnExists() {
    cy.xpath(withdrawPackageBtn).filter(":visible").first().should("exist");
  }
  verifyWithdrawPackageBtnDoesNotExist() {
    cy.xpath(withdrawPackageBtn).should("not.exist");
  }
  clickConfirmWithdrawPackageBtn() {
    cy.xpath(withdrawPackageConfirmBtn).click();
  }
  verifyConfirmWithdrawPackageBtnExists() {
    cy.xpath(withdrawPackageConfirmBtn).should("be.visible");
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
    cy.xpath(respondToRAIBtn)
      .scrollIntoView()
      .should("exist")
      .and("not.be.disabled");
  }
  clickRequestTempExtensionBtn() {
    cy.xpath(RequestTempExtensionBtn).click();
  }
  verifyRequestTempExtensionBtnExists() {
    cy.xpath(RequestTempExtensionBtn).should("be.visible");
  }
  clickAddAmendmentBtn() {
    cy.xpath(addAmendmentBtn).scrollIntoView().click();
  }
  verifyAddAmendmentBtnExists() {
    cy.xpath(addAmendmentBtn).scrollIntoView().should("be.visible");
  }
  clickWaiverNumberLinkInFirstRow() {
    cy.xpath(packageRowOneIDLink).click({ force: true });
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
