import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import MedicaidSPARAIResponsePage from "../../../support/pages/MedicaidSPARAIResponsePage";
import oneMacDashboardPage from "../../../support/pages/oneMacDashboardPage";
import oneMacDevLoginPage from "../../../support/pages/oneMacDevLoginPage";
import oneMacHomePage from "../../../support/pages/oneMacHomePage";
import oneMacSubmissionTypePage from "../../../support/pages/oneMacSubmissionTypePage";
import oneMacSubmitNewMedicaidSpaPage from "../../../support/pages/oneMacSubmitNewMedicaidSPAPage";
import oneMacUserManagmentPage from "../../../support/pages/oneMacUserManagmentPage";
import oneMacMyProfilePage from "../../../support/pages/oneMacMyProfilePage";
import oneMacCHIPSPAPage from "../../../support/pages/oneMacCHIPSPAPage";
import oneMacSubmitNewWaiverActionPage from "../../../support/pages/oneMacSubmitNewWaiverActionPage";
import oneMacRequestWaiverTemporaryExtension from "../../../support/pages/oneMacRequestWaiverTemporaryExtension";
import oneMacAppendixKAmendmentPage from "../../../support/pages/oneMacAppendixKAmendmentPage";
import oneMacPackagePage from "../../../support/pages/oneMacPackagePage";
import oneMacFAQPage from "../../../support/pages/oneMacFAQPage";
import oneMacRequestARoleChangePage from "../../../support/pages/oneMacRequestARoleChangePage";
import oneMacPackageDetailsPage from "../../../support/pages/oneMacPackageDetailsPage";
import oneMacRespondToRAIPage from "../../../support/pages/oneMacRespondToRAIPage";
import oneMacDefaultForms from "../../../support/pages/oneMacDefaultForms";
import withdrawPackagePage from "../../../support/pages/WithdrawPackagePage";

const medicaidSPARAIResponsePage = new MedicaidSPARAIResponsePage();
const OneMacDashboardPage = new oneMacDashboardPage();
const OneMacDevLoginPage = new oneMacDevLoginPage();
const OneMacHomePage = new oneMacHomePage();
const OneMacSubmissionTypePage = new oneMacSubmissionTypePage();
const OneMacSubmitNewMedicaidSpaPage = new oneMacSubmitNewMedicaidSpaPage();
const OneMacUserManagmentPage = new oneMacUserManagmentPage();
const OneMacMyProfilePage = new oneMacMyProfilePage();
const OneMacCHIPSPAPage = new oneMacCHIPSPAPage();
const OneMacSubmitNewWaiverActionPage = new oneMacSubmitNewWaiverActionPage();
const OneMacRequestWaiverTemporaryExtension =
  new oneMacRequestWaiverTemporaryExtension();
const OneMacPackagePage = new oneMacPackagePage();
const OneMacAppendixKAmendmentPage = new oneMacAppendixKAmendmentPage();
const OneMacFAQPage = new oneMacFAQPage();
const OneMacRequestARoleChangePage = new oneMacRequestARoleChangePage();
const OneMacPackageDetailsPage = new oneMacPackageDetailsPage();
const OneMacRespondToRAIPage = new oneMacRespondToRAIPage();
const OneMacDefaultForms = new oneMacDefaultForms();
const WithdrawPackagePage = new withdrawPackagePage();

Given("I am on Login Page", () => {
  OneMacHomePage.launch();
});
Then("Verify I am on the login page and not logged in", () => {
  OneMacHomePage.verifyUserIsNotLoggedInOnLoginPage();
});

When("Clicking on Development Login", () => {
  OneMacHomePage.clickDevelopmentLogin();
});

When("Clicking on FAQ Tab", () => {
  OneMacHomePage.clickFAQPage();
});

When("Login with state submitter user", () => {
  OneMacDevLoginPage.loginAsStateSubmiiter();
});
Then("click on New Submission", () => {
  OneMacDashboardPage.clickNewSubmission();
});
Then("Click on State Plan Amendment SPA", () => {
  OneMacSubmissionTypePage.clickStatePlanAmendmentSPA();
});
Then("click on Medicaid SPA", () => {
  OneMacSubmissionTypePage.clickMedicaidSPA();
});
Then("type in Medicaid SPA ID", () => {
  cy.fixture("packageDashboardSPAIDs.json").then((d) => {
    OneMacSubmitNewMedicaidSpaPage.inputSpaID(d.newMedicaidSPAID1);
  });
});
Then("type in Medicaid SPA ID 2", () => {
  cy.fixture("packageDashboardSPAIDs.json").then((d) => {
    OneMacSubmitNewMedicaidSpaPage.inputSpaID(d.newMedicaidSPAID2);
  });
});
Then("type in Chip SPA ID", () => {
  cy.fixture("packageDashboardSPAIDs.json").then((d) => {
    OneMacSubmitNewMedicaidSpaPage.inputSpaID(d.newChipSPAID1);
  });
});
Then("type in Chip SPA ID 2", () => {
  cy.fixture("packageDashboardSPAIDs.json").then((d) => {
    OneMacSubmitNewMedicaidSpaPage.inputSpaID(d.newChipSPAID2);
  });
});
Then("Add file for CMS Form 179", () => {
  OneMacSubmitNewMedicaidSpaPage.uploadCMSForm179AddFile();
});
//OY2-5869
Then("Add {string} file to form 179", (fileName) => {
  OneMacSubmitNewMedicaidSpaPage.addFileForForm179(fileName);
});

Then("Verify {string} is added to form 179", (fileName) => {
  OneMacSubmitNewMedicaidSpaPage.verifyFileAddedForForm179(fileName);
});

Then("Verify {string} is not added to form 179", (fileName) => {
  OneMacSubmitNewMedicaidSpaPage.verifyFileNotAddedForForm179(fileName);
});

Then("Delete file from form 179", () => {
  OneMacSubmitNewMedicaidSpaPage.deleteFileFromForm179();
});

//End OY2-5869
Then("Add file for SPA Pages", () => {
  OneMacSubmitNewMedicaidSpaPage.uploadSPAPagesAddFile();
});

Then("Add file {string} for SPA Pages", (fileName) => {
  OneMacSubmitNewMedicaidSpaPage.addFilesToSpaPages(fileName);
});

Then("Add no files to SPA Pages", () => {
  oneMacSubmitNewMedicaidSpaPage.addNoFilesToSpaPages();
});

Then("Verify no files added to SPA Pages", () => {
  oneMacSubmitNewMedicaidSpaPage.verifyNoFilesAttachedToSpaPages();
});

Then("Verify {string} is added to SPA Pages", (fileName) => {
  OneMacSubmitNewMedicaidSpaPage.verifyFileAddedForSpaPages(fileName);
});

Then("Verify file {string} exists in Spa Pages", (fileName) => {
  OneMacSubmitNewMedicaidSpaPage.verifyFileNameExistsInSpaPages(fileName);
});

Then("Type Additonal Information Comments", () => {
  OneMacSubmitNewMedicaidSpaPage.AdditionalInformationTypeComment(
    "This is just a test"
  );
});
Then("Type Additonal Info Comments in new form", () => {
  OneMacSubmitNewMedicaidSpaPage.additionalInfoTypeComment(
    "This is just a test"
  );
});
Then("Click on Submit Button", () => {
  OneMacDefaultForms.clicksubmitBTN();
});
Then("Click the Submit Button without waiting", () => {
  OneMacDefaultForms.clicksubmitBTNWithoutWait();
});
Then("verify the modal pop-up is visible", () => {
  OneMacRespondToRAIPage.verifyModalContainerExists();
});
Then("verify the modal pop-up is not visible", () => {
  OneMacRespondToRAIPage.verifyModalContainerDoesNotExists();
});
Then(
  "verify the title of the modal pop-up is Do you want to submit your official formal RAI response",
  () => {
    OneMacRespondToRAIPage.verifyModalTitleIs(
      "Do you want to submit your official formal RAI response"
    );
  }
);
Then(
  "verify the detailed text in the modal contains you are submitting your official formal RAI Response to restart the SPA review process and a new 90th day will be identified",
  () => {
    OneMacRespondToRAIPage.verifyModalTextIs(
      "you are submitting your official formal RAI Response to restart the SPA review process and a new 90th day will be identified."
    );
  }
);
Then(
  "verify the detailed text in the modal contains you are submitting your official formal RAI Response to start the 90 day clock review process",
  () => {
    OneMacRespondToRAIPage.verifyModalTextIs(
      "you are submitting your official formal RAI Response to start the 90 day clock review process"
    );
  }
);

Then("click yes, submit RAI response button", () => {
  OneMacRespondToRAIPage.clickYesSubmitBTN();
});
Then("verify submission warning text is visible", () => {
  OneMacSubmitNewMedicaidSpaPage.verifySubmissionWarningTextIsVisible();
});
Then("verify submission warning text", () => {
  OneMacSubmitNewMedicaidSpaPage.verifySubmissionWarningText();
});
Then("verify the form Submit Button exists", () => {
  OneMacDefaultForms.verifySubmitBtnExists();
});
Then("verify form cancel button exists", () => {
  OneMacDefaultForms.verifyCancelBtnExists();
});
Then("click form cancel button", () => {
  OneMacDefaultForms.clickCancelBtn();
});
Then("click modal cancel button", () => {
  OneMacDefaultForms.clickModalCancelBtn();
});
Then("click Leave Anyway form button", () => {
  OneMacSubmitNewMedicaidSpaPage.clickLeaveAnywayBtn();
});
Then("click Stay on Page", () => {
  OneMacSubmitNewMedicaidSpaPage.clickStayOnPageBtn();
});
Then("verify the success message is {string}", (s) => {
  OneMacDashboardPage.verifySuccessMessageIs(s);
});
Then("verify submission successful message in the alert bar", () => {
  OneMacDashboardPage.verifySuccessMessage1IsDisplayed();
});
Then("verify submission date", () => {
  OneMacDashboardPage.verifyDate();
});
Then("Verify submission type", () => {
  OneMacDashboardPage.verifyType("Medicaid SPA");
});

Then("Verify submission Waiver type", () => {
  OneMacDashboardPage.verifyType("Waiver");
});
Then("Add file for RAI Response", () => {
  medicaidSPARAIResponsePage.uploadRAIResponseAddFile();
});
Then("Add Additional Comments", () => {
  medicaidSPARAIResponsePage.addCommentsRAIRespone();
});
Then("verify submission Successful message after RAI", () => {
  OneMacDashboardPage.verifySuccessMessageIsDisplayedAfterRAIResponse();
});
//this is for the oy2 8616
When("Login with cms role approver", () => {
  OneMacDevLoginPage.loginAsCMSRoleApprover();
});
When("Login as EUA CMS Read Only User", () => {
  OneMacDevLoginPage.loginAsEUACMSReadOnlyUser();
});
Then("i am on User Management Page", () => {
  OneMacUserManagmentPage.verifyWeAreOnUserManagmentPage();
});
Then("Click on My Account", () => {
  OneMacUserManagmentPage.clickMyAccountDropDown();
});
Then("Click on Manage Profile", () => {
  OneMacUserManagmentPage.clickmanageProfileBTN();
});
When("I am on My Profile Page", () => {
  OneMacMyProfilePage.verifyWeAreOnMyProfilePage();
});
Then("verify Profile Information is Displayed", () => {
  OneMacMyProfilePage.verifyProfileInformationIsDisplayed();
});
Then("Full Name text is Displayed", () => {
  OneMacMyProfilePage.verifyFullNameHeader();
});
Then("Actual Full Name is Displayed", () => {
  OneMacMyProfilePage.verifyFullName();
});
Then("Role text is Displayed", () => {
  OneMacMyProfilePage.verifyRoleHeader();
});
Then("Actual Role is Displayed", () => {
  OneMacMyProfilePage.verifyRole();
});
Then("User Role is Read Only User", () => {
  OneMacMyProfilePage.verifyRole();
});
Then("Email text is Displayed", () => {
  OneMacMyProfilePage.verifyEmailHeader();
});
Then("Actual Email is Displayed", () => {
  OneMacMyProfilePage.verifyEmail();
});
Then("Phone Number text is Displayed", () => {
  OneMacMyProfilePage.verifyPhoneNumberHeader();
});
Then("Phone Number Add Button is Displayed", () => {
  OneMacMyProfilePage.verifyPhoneNumberAddBTN();
});
Then("Status text is Displayed", () => {
  OneMacMyProfilePage.verifyStatusHeader();
});
Then("Status text is not displayed", () => {
  OneMacMyProfilePage.verifyStatusHeaderDoesNotExist();
});
Then("Actual Status is Displayed with Access Granted", () => {
  OneMacMyProfilePage.verifyAccessStatus();
});

// this uis for 8616
When("Login with cms System Admin", () => {
  OneMacDevLoginPage.loginAsCMSSystemAdmin();
});
Then("Click on User Management Tab", () => {
  OneMacDashboardPage.clickUserManagementTab();
});
// this is for oy2_10093
When("Login with cms Help Desk User", () => {
  OneMacDevLoginPage.loginAsHelpDeskUser();
});
When("Login as a State System Admin", () => {
  OneMacDevLoginPage.loginAsStateSystemAdmin();
});
Then("i am on Dashboard Page", () => {
  OneMacDashboardPage.verifyWeAreOnDashboardPage();
});
Then("verify Submission List is Displayed", () => {
  OneMacDashboardPage.verifySubmissionListIsDisplayed();
});
Then("verify Export to Excel CSV is Displayed", () => {
  OneMacDashboardPage.verifyexportToEXcelCSVBTNIsDisplayed();
});
Then("verify IDNumber is Displayed", () => {
  OneMacDashboardPage.verifyidNumberHeaderIsDisplayed();
});
Then("verify Type is Displayed", () => {
  OneMacDashboardPage.verifytypeHeaderIsDisplayed();
});
Then("verify state is Displaed", () => {
  OneMacDashboardPage.verifyStateHeaderIsDisplayed();
});
Then("verify Initial Submission Date is Displayed", () => {
  OneMacDashboardPage.verifyInitialSubmissionDateHeaderIsDisplayed();
});
Then("verify Submitted By is Displayed", () => {
  OneMacDashboardPage.verifySubmittedByHeadersDisplayed();
});
Then("Click on the SPA ID Link", () => {
  OneMacDashboardPage.clickOnSpaID();
});
Then("Verify {string} exists in the attachments", (fileName) => {
  OneMacDashboardPage.verifyAttachmentExists(fileName);
});
Then("verify User Management is Displayed", () => {
  OneMacUserManagmentPage.verifyUserManagmentHeaderIsDisplayed();
});
Then("verify Name is Displayed", () => {
  OneMacUserManagmentPage.verifyNameHeaderIsDisplayed();
});
Then("verify State is Displayed", () => {
  OneMacUserManagmentPage.verifyStateHeaderIsDisplayed();
});
Then("verify Status is Displayed", () => {
  OneMacUserManagmentPage.verifyStatusHeaderIsDisplayed();
});
Then("verify Role is Displayed", () => {
  OneMacUserManagmentPage.verifyRoleHeaderIsDisplayed();
});
Then("verify Last Modified is Displayed", () => {
  OneMacUserManagmentPage.verifyLastModifiedHeaderIsDisplayed();
});
Then("verify Modified By is Displayed", () => {
  OneMacUserManagmentPage.verifyModifiedByHeaderIsDisplayed();
});
//this is for oy2 9990
Then("verify Home tab is Displayed", () => {
  OneMacUserManagmentPage.verifyHomeTabIsDisplayed();
});
Then("dashboard tab is Displayed", () => {
  OneMacUserManagmentPage.verifyDashboardTabIsDisplayed();
});
Then("FAQ tab is Displayed", () => {
  OneMacUserManagmentPage.verifyFAQTabIsDisplayed();
});
Then("verify Actions is Displayed", () => {
  OneMacUserManagmentPage.verifyActionsHeaderIsDisplayed();
});
//this is for oy2_9990 state submitter
Then("verify New Submission BTN is Displayed", () => {
  OneMacDashboardPage.verifyNewSubmissionBTNIsDisplayed();
});

//this is for OY2_3900
Then("verify error message is not present on Medicaid SPA page", () => {
  OneMacSubmitNewMedicaidSpaPage.verifySPAIDErrorMessageIsNotDisplayed();
});

Then("clear SPA ID in Medicaid SPA Input box", () => {
  OneMacSubmitNewMedicaidSpaPage.clearSPAIDInputBox();
});

Then("Return to dashboard Page", () => {
  OneMacSubmitNewMedicaidSpaPage.clickOnDashboardTab();
});

Then("type in invalid SPA ID on Medicaid SPA page", () => {
  OneMacSubmitNewMedicaidSpaPage.typeIncorrectSPAIDAndFormat();
});

Then("verify that error message for incorrect SPA ID is Displayed", () => {
  OneMacSubmitNewMedicaidSpaPage.verifySPAIDErrorMessageIsDisplayed();
});

Then("click on CHIP SPA", () => {
  OneMacSubmissionTypePage.clickChipSPA();
});

Then("verify error message is not present on Submit New CHIP SPA Page", () => {
  OneMacCHIPSPAPage.verifyErrorMessageIsNotDisplayed();
});
Then("clear SPA ID Input box CHIP SPA page", () => {
  OneMacCHIPSPAPage.clearSPAIDInputBox();
});

Then("type in invalid SPA ID on CHIP SPA page", () => {
  OneMacCHIPSPAPage.inputIncorrectSPAIDFormat();
});

Then(
  "verify that error message for incorrect SPA ID is Displayed on CHIP SPA Page",
  () => {
    OneMacCHIPSPAPage.verifyErrorMessageIsDisplayed();
  }
);

Then("Click on Waiver Action", () => {
  OneMacSubmissionTypePage.clickwaiverAction();
});
Then("click on 1915b Waiver Actions", () => {
  OneMacSubmissionTypePage.click1915bWaiverActions();
});
Then("click on 1915b 4 FFS Selective Contracting waivers", () => {
  OneMacSubmissionTypePage.clickFssSelectiveAuthority();
});
Then("click on 1915b Comprehensive Capitated Waiver Authority", () => {
  OneMacSubmissionTypePage.click1915bComprehensiveCapitatedWaiverAuthority();
});

Then("click on Waiver Action on Waiver Action Type page", () => {
  OneMacSubmissionTypePage.clickWaiverActionUnderWaiverAction();
});

Then("click on 1915b 4 FFS Selective Contracting New Initial Waiver", () => {
  OneMacSubmissionTypePage.clickInitialWaiver();
});
Then("click on 1915b Comprehensive Capitated New Initial Waiver", () => {
  OneMacSubmissionTypePage.clickComprehensiveInitialWaiver();
});
Then("1915b 4 FFS Selective Contracting Renewal Waiver", () => {
  OneMacSubmissionTypePage.click1915b4WaiverRenewal();
});
Then("click on 1915b Comprehensive Capitated Renewal Waiver", () => {
  OneMacSubmissionTypePage.clickComprehensiveRenewalWaiver();
});
Then("click on 1915b 4 FFS Selective Contracting Waiver Amendment", () => {
  OneMacSubmissionTypePage.clickWaiverAmendment1915b4();
});
Then("click on 1915b Comprehensive Capitated Waiver Amendment", () => {
  OneMacSubmissionTypePage.clickComprehensiveWaiverAmendmentWaiverAmendment();
});

Then(
  "verify 1915b 4 FFS Selective Contracting New Initial Waiver is a clickable option",
  () => {
    OneMacSubmissionTypePage.verifyFFSNewInitialWaiverIsClickable();
  }
);
Then(
  "verify 1915b Comprehensive Capitated New Initial Waiver is a clickable option",
  () => {
    OneMacSubmissionTypePage.verifyComprehensiveNewInitialWaiverIsClickable();
  }
);
Then("verify Appendix K is a clickable option", () => {
  OneMacSubmissionTypePage.verifyAppendixKIsClickable();
});
Then("verify 1915b 4 Renewal Waiver is a clickable option", () => {
  OneMacSubmissionTypePage.verify1915b4WaiverRenewalIsClickable();
});
Then(
  "verify 1915b Comprehensive Capitated Renewal Waiver is a clickable option",
  () => {
    OneMacSubmissionTypePage.verifyCompreheniveCapitatedRenewalWaiverIsClickable();
  }
);
Then(
  "verify 1915b 4 FFS Selective Contracting Waiver Amendment is a clickable option",
  () => {
    OneMacSubmissionTypePage.verifyFFSWaiverAmendmentIsClickable();
  }
);
Then(
  "verify 1915b Comprehensive Capitated Waiver Amendment is a clickable option",
  () => {
    OneMacSubmissionTypePage.verifyComprehensiveWaiverAmendmentIsClickable();
  }
);
Then("verify CHIP SPA is a clickable option", () => {
  OneMacSubmissionTypePage.verifyChipSPAIsClickable();
});
Then("verify Medicaid SPA is a clickable option", () => {
  OneMacSubmissionTypePage.verifyMedicaidSPAIsClickable();
});
Then(
  "verify Medicaid Eligibility, Enrollment, Administration, and Health Homes is a clickable option",
  () => {
    OneMacSubmissionTypePage.verifyMedicaidEligibilityIsClickable();
  }
);
Then(
  "click Medicaid Eligibility, Enrollment, Administration, and Health Homes",
  () => {
    OneMacSubmissionTypePage.clickMedicaidEligibility();
  }
);
Then(
  "verify Medicaid Alternative Benefits Plans ABP, and Medicaid Premiums and Cost Sharing is a clickable option",
  () => {
    OneMacSubmissionTypePage.verifyMedicaidAlternativeIsClickable();
  }
);
Then(
  "click Medicaid Alternative Benefits Plans ABP, and Medicaid Premiums and Cost Sharing",
  () => {
    OneMacSubmissionTypePage.clickMedicaidAlternative();
  }
);
Then("verify All Other Medicaid SPA Submissions is a clickable option", () => {
  OneMacSubmissionTypePage.verifyAllOtherMedicaidIsClickable();
});
Then("click All Other Medicaid SPA Submissions", () => {
  OneMacSubmissionTypePage.clickAllOtherMedicaid();
});
Then("verify CHIP Eligibility is a clickable option", () => {
  OneMacSubmissionTypePage.verifyChipEligibilityIsClickable();
});
Then("click CHIP Eligibility", () => {
  OneMacSubmissionTypePage.clickChipEligibility();
});
Then("verify All Other CHIP SPA Submissions is a clickable option", () => {
  OneMacSubmissionTypePage.verifyAllOtherChip();
});
Then("click All Other CHIP SPA Submissions", () => {
  OneMacSubmissionTypePage.clickAllOtherChip();
});
Then("select Action Type New Waiver", () => {
  OneMacSubmitNewWaiverActionPage.selectNewWaiverUnderActionType();
});

Then("select 1915b 4 FFS Selective Contracting waivers", () => {
  OneMacSubmitNewWaiverActionPage.select1915b4FFSSelectiveContractingwaiversUnderWaiverAuthority();
});

Then(
  "Add file for 1915b 4 FFS Selective Contracting waiver application pre-print",
  () => {
    OneMacSubmitNewWaiverActionPage.upload1915BFFSPrePrintFile();
  }
);

Then("Add file for Waiver RAI Response", () => {
  medicaidSPARAIResponsePage.uploadRAIResponseAddFile();
});

Then("Click on Waiver Action under Waiver Type", () => {
  OneMacSubmissionTypePage.clickWaiverActionUnderWaiverAction();
});

Then("Click on New Waiver under Action type", () => {
  OneMacSubmitNewWaiverActionPage.selectNewWaiverUnderActionType();
});

Then("verify error message is not present on New Waiver Page", () => {
  OneMacSubmitNewWaiverActionPage.verifyErrorMessageIsNotDisplayed();
});
Then("verify parent error message is not present on New Waiver Page", () => {
  OneMacSubmitNewWaiverActionPage.verifyParentErrorMessageIsNotDisplayed();
});

Then("clear Waiver Number Input box in new form", () => {
  OneMacSubmitNewWaiverActionPage.clearWaiverNumberInputBoxNewForms();
});
Then("type in invalid Waiver Number", () => {
  OneMacSubmitNewWaiverActionPage.inputWaiverNumber("MD.123456");
});

Then("Click the Request Extension button", () => {
  OneMacSubmissionTypePage.clickRequestExtensionBtn();
});
Then("Click on Request Temporary Extension in Package dashboard", () => {
  OneMacSubmissionTypePage.clickRequestTemporaryExtension();
});

Then(
  "type waiver number with state abbreviation different from user on Request Waiver Temporary Extenstion Page",
  () => {
    OneMacRequestWaiverTemporaryExtension.inputWaiverNumber("JK");
  }
);

Then(
  "verify error message is not present on Request Waiver Temporary Extenstion Page",
  () => {
    OneMacRequestWaiverTemporaryExtension.verifyErrorMessageIsNotDisplayed();
  }
);

Then(
  "clear Waiver Number Input box on Request Waiver Temporary Extenstion Page",
  () => {
    OneMacRequestWaiverTemporaryExtension.clearWaiverNumberInputBox();
  }
);

Then(
  "Type waiver number with 5 characters on Request Waiver Temporary Extenstion Page",
  () => {
    OneMacRequestWaiverTemporaryExtension.inputWaiverNumber("MD.12345");
  }
);

Then(
  "type in invalid Waiver Number on Request Waiver Temporary Extenstion Page",
  () => {
    OneMacRequestWaiverTemporaryExtension.inputWaiverNumber("MD.123");
  }
);

Then(
  "verify that error message for incorrect Waiver Number is Displayed",
  () => {
    OneMacRequestWaiverTemporaryExtension.verifyErrorMessageIsDisplayed();
  }
);

Then("Click on Appendix K Amendment", () => {
  OneMacSubmissionTypePage.clickAppendixKAmendment();
});

Then("verify error message is not present on Appendix K Amendment Page", () => {
  OneMacAppendixKAmendmentPage.verifyErrorMessageIsNotDisplayed();
});
Then("clear Waiver Number Input box on Appendix K Amendment Page", () => {
  OneMacAppendixKAmendmentPage.clearWaiverNumberInputBox();
});
Then(
  "type in Waiver Number with 5 characters on Appendix K Amendment Page",
  () => {
    OneMacAppendixKAmendmentPage.inputWaiverNumber(`MD-22106.R01.02`);
  }
);

Then(
  "type in unused Waiver Number with 5 characters on Appendix K Amendment Page",
  () => {
    OneMacAppendixKAmendmentPage.inputWaiverNumber(`MD-22106.R01.03`);
  }
);

Then("type in invalid Waiver Number on Appendix K Amendment Page", () => {
  OneMacAppendixKAmendmentPage.inputWaiverNumber("MD.123");
});

Then(
  "verify that error message for incorrect Waiver Number is Displayed on Appendix K Amendment Page",
  () => {
    OneMacAppendixKAmendmentPage.verifyErrorMessageIsDisplayed();
  }
);

//this is for oy2_4807
Then(
  "verify 1915 b 4 FFS Selective Contracting waivers is displayed under Waiver Authority",
  () => {
    OneMacSubmitNewWaiverActionPage.verify1915b4FFSSelectiveContractingwaiversUnderWaiverAuthority();
  }
);

Then(
  "Add file for 1915b Comprehensive Capitated Waiver Application Pre-print",
  () => {
    OneMacSubmitNewWaiverActionPage.upload1915BComprehensivePrePrintFile();
  }
);
Then(
  "Add file for 1915b Comprehensive Capitated Waiver Cost Effectiveness Spreadsheets",
  () => {
    OneMacSubmitNewWaiverActionPage.upload1915BComprehensiveSpreadsheetFile();
  }
);
Then(
  "Remove file for 1915b Comprehensive Capitated Waiver Application Pre-print",
  () => {
    OneMacSubmitNewWaiverActionPage.remove1915BComprehensivePrePrintFile();
  }
);
Then(
  "Remove file for 1915b Comprehensive Capitated Waiver Cost Effectiveness Spreadsheets",
  () => {
    OneMacSubmitNewWaiverActionPage.remove1915BComprehensiveSpreadsheetFile();
  }
);

Then("upload Waiver Extension Request", () => {
  OneMacRequestWaiverTemporaryExtension.uploadWaiverExtensionRequest();
});

Then("Type {string} in Summary Box", (Comments) => {
  OneMacSubmitNewWaiverActionPage.inputComments(Comments);
});
Then("type {string} in additional info textarea", (Comments) => {
  OneMacSubmitNewWaiverActionPage.inputAdditionalInfoText(Comments);
});

Then(
  "verify All other 1915 b Waivers is displayed under Waiver Authority",
  () => {
    OneMacSubmitNewWaiverActionPage.verifyAllOther1915bWaiversUnderWaiverAuthority();
  }
);

Then("Click on Waiver Amendment under Action type", () => {
  OneMacSubmitNewWaiverActionPage.selectWaiverAmendmentUnderActionType();
});

Then("Click on Request for waiver renewal from Action Type", () => {
  OneMacSubmitNewWaiverActionPage.selectRequestForWaiverRenewalUnderActionType();
});

Then("type in Existing Waiver Number in new form", () => {
  OneMacSubmitNewWaiverActionPage.inputExistingWaiverNumberNewForms();
});
Then("Type Initial Waiver Number in format SS-#####.R00.00", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((d) => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
      d.newInitialWaiverNumber1
    );
  });
});
Then("Type Initial Waiver Number 3 in format SS-#####.R00.00", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((d) => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
      d.newInitialWaiverNumber3
    );
  });
});
Then(
  "Type a valid and unused Initial Waiver Number in format SS-#####.R00.00",
  () => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumber("MD-99331.R00.00");
  }
);
Then("Type Initial Waiver Number 2 in format SS-#####.R00.00", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((d) => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
      d.newInitialWaiverNumber2
    );
  });
});
Then("search for Initial Waiver Number 1 with 12 Characters", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackagePage.searchFor(data.newInitialWaiverNumber1);
  });
  cy.wait(1000);
});
Then("search for Initial Waiver Number 3 with 12 Characters", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackagePage.searchFor(data.newInitialWaiverNumber3);
  });
  cy.wait(1000);
});
Then("search for approved Initial Waiver Number 1", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackagePage.searchFor(data.approvedInitialWaiverNum1);
  });
  cy.wait(1000);
});
Then("search for Initial Waiver Number 2 with 12 Characters", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackagePage.searchFor(data.newInitialWaiverNumber2);
  });
  cy.wait(1000);
});
Then("search for Medicaid SPA ID", () => {
  cy.fixture("packageDashboardSPAIDs.json").then((data) => {
    OneMacPackagePage.searchFor(data.newMedicaidSPAID1);
  });
  cy.wait(1000);
});
Then("search for CHIP SPA ID", () => {
  cy.fixture("packageDashboardSPAIDs.json").then((data) => {
    OneMacPackagePage.searchFor(data.newChipSPAID1);
  });
  cy.wait(1000);
});
Then(
  "verify id number in the first row matches Initial Waiver Number 1",
  () => {
    cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
      OneMacPackagePage.verifyIDNumberInFirstRowIs(
        data.newInitialWaiverNumber1
      );
    });
  }
);
Then(
  "verify id number in the first row matches Initial Waiver Number 3",
  () => {
    cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
      OneMacPackagePage.verifyIDNumberInFirstRowIs(
        data.newInitialWaiverNumber3
      );
    });
  }
);
Then("verify id number in the first row matches Medicaid SPA ID", () => {
  cy.fixture("packageDashboardSPAIDs.json").then((data) => {
    OneMacPackagePage.verifyIDNumberInFirstRowIs(data.newMedicaidSPAID1);
  });
});
Then("verify id number in the first row matches CHIP SPA ID", () => {
  cy.fixture("packageDashboardSPAIDs.json").then((data) => {
    OneMacPackagePage.verifyIDNumberInFirstRowIs(data.newChipSPAID1);
  });
});
Then("verify success message for Withdrawal", () => {
  OneMacPackagePage.verifyPackageWithdrawalMessageIsDisplayed();
});

Then("click on Packages", () => {
  OneMacDashboardPage.clickPackageTab();
});

When("Login with CMS Reviewer User", () => {
  OneMacDevLoginPage.loginAsCMSReviewer();
});

Then(
  "verify that value of the column for the ID is NA Pending or a date",
  () => {
    OneMacPackagePage.verifyValue();
  }
);

Then("navigate to {string}", (s) => {
  OneMacDashboardPage.navigatetoURL(s);
});
Then(
  "verify Expiration Date column is available to the immediate left to the status column",
  () => {
    OneMacPackagePage.verifyexpirationDateColumnHeaderExists();
  }
);
Then("expiration date on MD.32560 is Oct 14, 2026", () => {
  OneMacPackagePage.verifyMD32560ExpirationDateIsSetTooct142026();
});
Then("Expiration Date value for generated Record is {string}", (s) => {
  OneMacPackagePage.verifyExpirationDateFirstValue(s);
});
Then("Add file for Current State Plan", () => {
  OneMacCHIPSPAPage.uploadCurrentStatePlanFile();
});
Then("Add file for Amended State Plan Language", () => {
  OneMacCHIPSPAPage.uploadAmendedStatePlanLanguageFile();
});
Then("Add file for Cover Letter", () => {
  OneMacCHIPSPAPage.uploadCoverLetterFile();
});

Then("Add file for Revised Amended State Plan Language", () => {
  medicaidSPARAIResponsePage.uploadChipSPARAIRESPONSERevisedAmendedStatePlanLanguage();
});

Then("Add file for Official RAI Response", () => {
  medicaidSPARAIResponsePage.uploadOfficialRAIResponse();
});
Then("Add file for 1915c Appendix K Amendment Waiver Template", () => {
  OneMacAppendixKAmendmentPage.uploadAppKAmendmentWaiverTemplate();
});

When("Login with cms role approver Revoked", () => {
  OneMacDevLoginPage.loginAsCMSUserRevoked();
});

When("Login with cms role approver Denied", () => {
  OneMacDevLoginPage.loginAsCMSUserDenied();
});

Then("Actual Status is Displayed with Access Revoked", () => {
  OneMacMyProfilePage.verifyAccessStatusRevoked();
});

Then("Actual Status is Displayed with Access Denied", () => {
  OneMacMyProfilePage.verifyAccessStatusDenied();
});

Then("Verify General Section Exists", () => {
  OneMacFAQPage.verifyGeneralSectionExists();
});

Then(
  "Verify What browsers can I use to access the system link is displayed and click it",
  () => {
    OneMacFAQPage.verifyVerifywhatBrowsersHeaderBtnlinkisdisplayedandclickit();
  }
);

Then(
  "Verify text contains The submission portal works best on Google Chrome",
  () => {
    OneMacFAQPage.verifytextcontainsThesubmissionportalworksbestonGoogleChrome();
  }
);

Then(
  "Verify What should we do if we don’t receive a confirmation email is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhatshouldwedoifwedontreceiveaconfirmationemailisdisplayedandclickit();
  }
);

Then(
  "Verify text contains Refresh your inbox, check your SPAM filters, then contact the OneMAC Help Desk",
  () => {
    OneMacFAQPage.VerifytextcontainsRefreshyourinboxcheckyourSPAMfiltersthencontacttheOneMACHelpDesk();
  }
);

Then(
  "Verify Is this considered the official state submission is displayed and click it",
  () => {
    OneMacFAQPage.VerifyIsthisconsideredtheofficialstatesubmissionisdisplayedandclickit();
  }
);
Then(
  "Verify text contains Yes as long as you have the electronic receipt confirmation email Your submission is considered your official state submission",
  () => {
    OneMacFAQPage.VerifytextcontainsYesaslongasuouhavetheelectronicreceipt();
  }
);
Then("Verify What are the OneMAC user roles is displayed and click it", () => {
  OneMacFAQPage.VerifyWhataretheOneMACuserrolesisdisplayedandclickit();
});
Then("Verify text contains State Submitter", () => {
  OneMacFAQPage.VerifytextcontainsStateSubmitter();
});
Then("Verify text contains State System Administrator", () => {
  OneMacFAQPage.VerifytextcontainsStateSystemAdministrator();
});
Then("Verify text contains CMS Role Approver", () => {
  OneMacFAQPage.VerifytextcontainsCMSRoleApprover();
});
Then("Verify State Plan Amendments SPAs Section Exists", () => {
  OneMacFAQPage.verifySPASectionExists();
});
Then(
  "Verify What What format is used to enter a SPA ID is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhatWhatformatisusedtoenteraSPAIDisdisplayedandclickit();
  }
);
Then(
  "Verify text contains Enter the State Plan Amendment transmittal number Assign consecutive numbers on a calendar year basis",
  () => {
    OneMacFAQPage.VerifytextcontainsEntertheStatePlanAmendmenttransmittalnumberAssignconsecutivenumbersonacalendaryearbasis();
  }
);
Then(
  "Verify What are the attachments for a Medicaid SPA is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhataretheattachmentsforaMedicaidSPAisdisplayedandclickit();
  }
);
Then(
  "Verify text contains SPA submission requirements can be found in regulation",
  () => {
    OneMacFAQPage.VerifytextcontainsSPAsubmissionrequirementscanbefoundinregulation();
  }
);
Then(
  "Verify What are the attachments for a Medicaid response to Request for Additional Information RAI is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhataretheattachmentsforaMedicaidresponsetoRequestforAdditionalInformationRAIisdisplayedandclickit();
  }
);
Then('Verify text contains "indicates a required attachment"', () => {
  OneMacFAQPage.VerifyWhatWhatformatisusedtoenteraSPAIDisdisplayedandclickit();
});
Then(
  "Verify What are the attachments for a CHIP SPA is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhataretheattachmentsforaCHIPSPAisdisplayedandclickit();
  }
);
Then(
  "Verify What are the attachments for a CHIP SPA response to Request for Additional Information RAI is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhataretheattachmentsforaCHIPSPAresponsetoRequestforAdditionalInformationRAIisdisplayedandclickit();
  }
);
Then(
  "Verify Can I submit SPAs relating to the Public Health Emergency PHE in OneMAC is displayed and click it",
  () => {
    OneMacFAQPage.VerifyCanIsubmitSPAsrelatingtothePublicHealthEmergencyPHEinOneMACisdisplayedandclickit();
  }
);

Then(
  'Verify text contains "Yes, all PHE-related SPAs should be submitted through OneMAC"',
  () => {
    OneMacFAQPage.VerifytextcontainsYesallPHErelatedSPAsshouldbesubmittedthroughOneMAC();
  }
);
Then("Verify Waivers Section Exists", () => {
  OneMacFAQPage.verifyWaiversExists();
});

Then(
  "Verify What format is used to enter a 1915b waiver number is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhatformatisusedtoentera1915bwaivernumberisdisplayedandclickit();
  }
);

Then('Verify text contains "Waiver number must follow the format"', () => {
  OneMacFAQPage.VerifytextcontainsWaivernumbermustfollowtheformat();
});

Then(
  "Verify Who can I contact to help me figure out the correct 1915b Waiver Number is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhocanIcontacttohelpmefigureoutthecorrect1915bWaiverNumberisdisplayedandclickit();
  }
);
Then(
  'Verify text contains "Email MCOGDMCOActions@cms.hhs.gov to get support with determining the correct 1915b Waiver Number"',
  () => {
    OneMacFAQPage.VerifytextcontainsEmailMCOGDMCOActionscmshhsgovtogetsupportwithdeterminingthecorrect1915bWaiverNumber();
  }
);
Then(
  "Verify What format is used to enter a 1915c waiver number is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhatformatisusedtoentera1915cwaivernumberisdisplayedandclickit();
  }
);
Then(
  'Verify text contains "Waiver number must follow the format SS.####.R##.## or SS.#####.R##.## to include"',
  () => {
    OneMacFAQPage.VerifytextcontainsWaivernumbermustfollowtheformatSStoinclude();
  }
);
Then(
  "Verify What attachments are needed to submit a 1915b waiver action is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhatattachmentsareneededtosubmita1915bwaiveractionisdisplayedandclickit();
  }
);
Then(
  'Verify text contains "The regulations at 42 C.F.R. §430.25, 431.55 and 42 C.F.R. §441.301"',
  () => {
    OneMacFAQPage.VerifytextcontainsTheregulationsat42CFR4302543155and42CFR441301();
  }
);
Then(
  "Verify What are the attachments for a 1915b Waiver response to Request for Additional Information RAI is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhataretheattachmentsfora1915bWaiverresponsetoRequestforAdditionalInformationRAIisdisplayedandclickit();
  }
);
Then(
  "Verify What are the attachments for a 1915b Waiver Request for Temporary Extension is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhataretheattachmentsfora1915bWaiverRequestforTemporaryExtensionisdisplayedandclickit();
  }
);
Then(
  "Verify Can I submit Appendix K amendments in OneMAC is displayed and click it",
  () => {
    OneMacFAQPage.VerifyCanIsubmitAppendixKamendmentsinOneMACisdisplayedandclickit();
  }
);
Then('Verify text contains "Yes, you can submit Appendix K amendments"', () => {
  OneMacFAQPage.VerifytextcontainsYesyoucansubmitAppendixKamendments();
});
Then(
  "Verify What are the attachments for a 1915c Appendix K Waiver is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhataretheattachmentsfora1915cAppendixKWaiverisdisplayedandclickit();
  }
);
Then(
  'Verify text contains "The regulations at 42 C.F.R. §430.25, 431.55 and 42 C.F.R. §441.301 describe the"',
  () => {
    OneMacFAQPage.VerifytextcontainsTheregulationsat42CFR4302543155and42CFR441301describethe();
  }
);
Then("Verify OneMAC Help Desk Contact Info Section Exists", () => {
  OneMacFAQPage.verifyOneMacHelpDeskInfoExists();
});
Then("Verify Phone Number Exists", () => {
  OneMacFAQPage.verifyPhoneNumberExists();
});
Then("Verify actual Phone Number Exists", () => {
  OneMacFAQPage.verifyActualphoneNumberExists();
});
Then("verify Contact Email label Exists", () => {
  OneMacFAQPage.verifyEmailExists();
});
Then("verify actual Contact Email address Exists", () => {
  OneMacFAQPage.verifyActualEmailExists();
});
Then("Verify page title is {string}", () => {
  OneMacFAQPage.VerifyPageTitleIs(s);
});
Then("Click on What is my SPA ID link", () => {
  OneMacSubmitNewMedicaidSpaPage.clickWhatIsMySPAIDLink();
});
Then("Click on What is my Waiver ID Link", () => {
  OneMacSubmitNewWaiverActionPage.clickWhatIsMyWaiverIdLink();
});

Then("Home tab exists", () => {
  OneMacHomePage.verifyHomePageLinkExists();
});

Then("FAQ tab exists", () => {
  OneMacHomePage.verifyFAQLinkExists();
});

Then("Register exists", () => {
  OneMacHomePage.verifyRegisterLinkExists();
});

Then("Login Exists", () => {
  OneMacHomePage.verifyloginBTNExists();
});

Then("welcome message exists", () => {
  OneMacHomePage.verifywelcomeMSGExists();
});

Then("state users section exists", () => {
  OneMacHomePage.verifystateUsersSectionExists();
});

Then("cms users section exists", () => {
  OneMacHomePage.verifycmsUsersSectionExists();
});

Then("do you have questions or need support exists", () => {
  OneMacHomePage.verifydoYouHaveQuestionsOrNeedSupportExists();
});

Then("View FAQ exists", () => {
  OneMacHomePage.verifyviewFAQExists();
});

Then("How to create a submission exists", () => {
  OneMacHomePage.verifyhowToCreateASubmissionExists();
});

Then("Login with IDM Exists", () => {
  OneMacHomePage.verifyloginWithIDMExists();
});

Then("Login with IDM Info Exists", () => {
  OneMacHomePage.verifyloginWithIDMInfoExists();
});

Then("Attach your documents Exists", () => {
  OneMacHomePage.verifyAttachYourDocumentsExists();
});

Then("Attach your documents info Exists", () => {
  OneMacHomePage.verifyAttachYourDocumentsInfoExists();
});

Then("Receive an email confirmation Exists", () => {
  OneMacHomePage.verifyreceiveAnEmailConformationExists();
});

Then("Receive an email confirmation details Exists", () => {
  OneMacHomePage.verifyreceiveAnEmailConformationInfoExists();
});

Then("Submission Types include Exists", () => {
  OneMacHomePage.verifysubmissionTypesIncludeExists();
});

Then(
  "Amendments to your Medicaid and CHIP State Plans not submitted through MACPro MMDL or WMS Exists",
  () => {
    OneMacHomePage.verifyfirstBulletExists();
  }
);

Then(
  "Official state responses to formal requests for additional information RAIs for SPAs not submitted through MACPro Exists",
  () => {
    OneMacHomePage.verifySecondBulletExists();
  }
);

Then(
  "Section 1915b waiver submissions those not submitted through WMS Exists",
  () => {
    OneMacHomePage.verifyThirdBulletExists();
  }
);

Then(
  "Section 1915c Appendix K amendments which cannot be submitted through WMS Exists",
  () => {
    OneMacHomePage.verifyForthBulletExists();
  }
);

Then(
  "Official state responses to formal requests for additional information RAIs for Section 1915b waiver actions in addition to submitting waiver changes in WMS if applicable Exists",
  () => {
    OneMacHomePage.verifyFifthBulletExists();
  }
);

Then("How to review a submission exists", () => {
  OneMacHomePage.verifyhowToReviewASubmissionExists();
});

Then("Receive an email for submission notification exists", () => {
  OneMacHomePage.verifyReceiveAnEmailForSubmissionNotificationExists();
});
Then("Receive an email for submission notification information exists", () => {
  OneMacHomePage.verifyReceiveAnEmailForSubmissionNotificationInfoExists();
});
Then("Login with EUA exists", () => {
  OneMacHomePage.verifyloginWithEUAExists();
});
Then("Login with EUA information exists", () => {
  OneMacHomePage.verifyloginWithEUAInfoExists();
});
Then("Review your assigned submission exists", () => {
  OneMacHomePage.verifyReviewYourAssignedSubmissionExists();
});
Then("Review your assigned submission information exists", () => {
  OneMacHomePage.verifyReviewYourAssignedSubmissionInfoExists();
});
Then("Amendments to your Medicaid and CHIP State Plans exists", () => {
  OneMacHomePage.verifyCMSBullet1Exists();
});
Then(
  "Official state responses to formal requests for additional information RAIs for SPAs exists",
  () => {
    OneMacHomePage.verifyCMSBullet2Exists();
  }
);
Then("Section 1915b waiver submissions exists", () => {
  OneMacHomePage.verifyCMSBullet3Exists();
});
Then("Section 1915c Appendix K amendments exists", () => {
  OneMacHomePage.verifyCMSBullet4Exists();
});
Then(
  "Official state responses to formal requests for additional information RAIs for Section 1915b waiver actions exists",
  () => {
    OneMacHomePage.verifyCMSBullet5Exists();
  }
);
Then(
  "State requests for Temporary Extensions for section 1915b and 1915c waivers exists",
  () => {
    OneMacHomePage.verifyCMSBullet6Exists();
  }
);

Then("type in search bar expiration status “pending”", () => {
  OneMacPackagePage.typePendingInSearchBar();
});
Then("verify Error message displayed should be No Results Found", () => {
  OneMacPackagePage.noResultsFoundErrorMessage();
});
Then("verify user exists with id number searched", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackagePage.verifyIDNumberExists(data.newInitialWaiverNumber2);
  });
});
Then("clear search bar", () => {
  OneMacPackagePage.clearSearchBar();
});
Then("type in submitters name", () => {
  OneMacPackagePage.typeSubmittersName();
});
Then("search existing user with all upper case", () => {
  OneMacPackagePage.typeSubmittersNameAllUpperCase();
});
Then("search existing user with dash", () => {
  OneMacPackagePage.typedashInSearchBar();
});
Then("verify search bar exists", () => {
  OneMacPackagePage.verifySearchBarExists();
});
Then(
  "verify Search by Package ID, CPOC Name, or Submitter Name is displayed on top of search bar",
  () => {
    OneMacPackagePage.verifySearchisDisplayed();
  }
);
Then("verify x in search bar exists to clear search and click it", () => {
  OneMacPackagePage.verifyxexistsandClickIt();
});
Then("verify Error message details is displayed", () => {
  OneMacPackagePage.verifyErrorMessageDetails();
});
Then("type in search bar not existing ID in search bar", () => {
  OneMacPackagePage.typeNinExistingID();
});
Then("Verify State Column Exists", () => {
  OneMacPackagePage.verifyStateColumnExists();
});
Then("Verify State Column is sortable", () => {
  OneMacPackagePage.verifyStateColumnIsSortable();
});
Then("Verify Filter button exists", () => {
  OneMacPackagePage.verifyfilterButtonExists();
});
Then("Click on Filter Button", () => {
  OneMacPackagePage.clickOnfilterButton();
});
Then("verify Filter By Exists", () => {
  OneMacPackagePage.verifyfilterByExists();
});
Then("verify Close Exists", () => {
  OneMacPackagePage.verifycloseButtonExists();
});
Then("verify Type Exists", () => {
  OneMacPackagePage.verifytypeDropDownExists();
});
Then("verify reset Exists", () => {
  OneMacPackagePage.verifyresetButtonExists();
});
Then("click on Type", () => {
  OneMacPackagePage.clickTypeDropDown();
});
Then("verify 1915b Initial Waiver exists", () => {
  OneMacPackagePage.verifyInitialWaiver1915bCheckBoxExists();
});
Then("verify 1915b Intial Waiver exists in list", () => {
  OneMacPackagePage.verifyInitialWaiverInListExists();
});
Then("verify 1915b Waiver Renewal exists", () => {
  OneMacPackagePage.verifyWaiverRenewal1915bCheckBoxExists();
});
Then("verify 1915b Waiver Amendment check box exists", () => {
  OneMacPackagePage.verify1915bWaiverAmendmentCheckBox();
});
Then("verify 1915c Appendix K Amendment check box exists", () => {
  OneMacPackagePage.verify1915cAppendixKAmendmentCheckBox();
});
Then("verify 1915b Temporary Extension exists", () => {
  OneMacPackagePage.verify1915bTemporaryExtensionCheckBoxExists();
});
Then("verify 1915c Temporary Extension exists", () => {
  OneMacPackagePage.verify1915cTemporaryExtensionCheckBoxExists();
});
Then("verify CHIP SPA Exists", () => {
  OneMacPackagePage.verifyCHIPSPACheckBoxExists();
});
Then("verify Medicaid SPA Exists", () => {
  OneMacPackagePage.verifyMedicaidSPACheckBoxExists();
});
Then("click on Status", () => {
  OneMacPackagePage.clickstatusDropDown();
});
Then("verify Under Review checkbox exists", () => {
  OneMacPackagePage.verifyUnderReviewCheckBoxExists();
});
Then("verify Approved checkbox exists", () => {
  OneMacPackagePage.verifyApprovedCheckboxExists();
});
Then("verify Disapproved checkbox exists", () => {
  OneMacPackagePage.verifyDisapprovedCheckboxExists();
});
Then("verify Submitted status checkbox exists", () => {
  OneMacPackagePage.verifySubmittedCheckboxExists();
});
Then("verify Package Withdrawn status checkbox exists", () => {
  OneMacPackagePage.verifyWithdrawnCheckBoxExists();
});
Then("verify RAI Issued status checkbox exists", () => {
  OneMacPackagePage.verifyRaiIssuedCheckboxExists();
});
Then("click Under Review checkbox", () => {
  OneMacPackagePage.clickUnderReviewCheckBox();
});
Then("click Waiver Terminated checkbox", () => {
  OneMacPackagePage.clickWaiverTerminatedCheckBox();
});
Then("click the Withdrawal Requested checkbox", () => {
  OneMacPackagePage.clickWithdrawalRequestedCheckBox();
});
Then("click the Formal RAI Response - Withdrawal Requested checkbox", () => {
  OneMacPackagePage.clickRaiResponseWithdrawalRequestedCheckBox();
});
Then("click the RAI Response Withdraw Enabled checkbox", () => {
  OneMacPackagePage.clickRaiResponseWithdrawEnabledCheckBox();
});
Then("click 1915b Initial Waiver check box", () => {
  OneMacPackagePage.clickInitialWaiver1915bCheckBox();
});
Then("click 1915b Waiver Renewal check box", () => {
  OneMacPackagePage.clickWaiverRenewal1915bCheckBox();
});
Then("click 1915c Appendix K Amendment check box", () => {
  OneMacPackagePage.click1915cAppendixKAmendmentCheckBox();
});
Then("click 1915b Waiver Amendment check box", () => {
  OneMacPackagePage.click1915bWaiverAmendmentCheckBox();
});
Then("click 1915b Temporary Extension check box", () => {
  OneMacPackagePage.click1915bTemporaryExtensionCheckBox();
});
Then("click 1915c Temporary Extension check box", () => {
  OneMacPackagePage.click1915cTemporaryExtensionCheckBox();
});
Then("click CHIP SPA check box", () => {
  OneMacPackagePage.clickCHIPSPACheckBox();
});
Then("click Medicaid SPA check box", () => {
  OneMacPackagePage.clickMedicaidSPACheckBox();
});
Then("verify Medicaid SPA Exists in list", () => {
  OneMacPackagePage.verifyMedicaidSPAInListExists();
});
Then("verify show hide columns button exists", () => {
  OneMacPackagePage.verifyShowHideColumnsBTNExists();
});
Then("click show hide columns button", () => {
  OneMacPackagePage.clickShowHideColumnsBTN();
});
Then("verify Initial Submission Date exists", () => {
  OneMacPackagePage.verifycheckBoxInitialSubmissionDateExists();
});
Then("verify state exists", () => {
  OneMacPackagePage.verifycheckboxStateExists();
});
Then("verify status exists", () => {
  OneMacPackagePage.verifycheckBoxStatusExists();
});
Then("verify submitted by exists", () => {
  OneMacPackagePage.verifycheckBoxSubmittedByExists();
});
Then("verify type exists", () => {
  OneMacPackagePage.verifycheckBoxTypeExists();
});
Then("verify CPOC Name exists", () => {
  OneMacPackagePage.verifycheckBoxCPOCNameExists();
});
Then("verify Formal RAI Received checkbox exists", () => {
  OneMacPackagePage.verifyFormalRAIReceivedCheckboxExists();
});
Then("verify Initial Submission Date column exists", () => {
  OneMacPackagePage.verifyinitialSubmissionDateColumnExists();
});
Then("verify state column exists", () => {
  OneMacPackagePage.verifystateColumnExists();
});
Then("verify status column exists", () => {
  OneMacPackagePage.verifystatusColumnExists();
});
Then("verify submitted by column exists", () => {
  OneMacPackagePage.verifysubmittedByColumnExists();
});
Then("verify type column exists", () => {
  OneMacPackagePage.verifytypeColumnExists();
});
Then("verify IDNumber column exists", () => {
  OneMacPackagePage.verifyIDNumberColumnExists();
});
Then("verify actions column exists", () => {
  OneMacPackagePage.verifyactionsColumnExists();
});
Then("verify Formal RAI Received column exists", () => {
  OneMacPackagePage.verifyFormalRAIReceivedColumnExists();
});
Then("verify Formal RAI Received column does not exist", () => {
  OneMacPackagePage.verifyFormalRAIReceivedColumnDoesNotExist();
});
Then("verify CPOC Name column exists", () => {
  OneMacPackagePage.verifyCPOCNameColumnExists();
});
Then("verify CPOC Name column does not exist", () => {
  OneMacPackagePage.verifyCPOCNameColumnDoesNotExist();
});
Then("click Initial Submission Date checkbox", () => {
  OneMacPackagePage.clickCheckBoxInitialSubmissionDate();
});
Then("click state checkbox", () => {
  OneMacPackagePage.clickCheckboxState();
});
Then("click status checkbox", () => {
  OneMacPackagePage.clickCheckboxStatus();
});
Then("click submitted by checkbox", () => {
  OneMacPackagePage.clickCheckBoxSubmittedBy();
});
Then("click type checkbox", () => {
  OneMacPackagePage.clickCheckBoxType();
});
Then("click CPOC Name checkbox", () => {
  OneMacPackagePage.clickCPOCNameCheckBox();
});
Then("click Formal RAI Received checkbox", () => {
  OneMacPackagePage.clickFormalRAIReceivedCheckbox();
});
Then("verify type column does not exist", () => {
  OneMacPackagePage.verifytypeColumnDoesNotExist();
});
Then("verify state column does not exist", () => {
  OneMacPackagePage.verifystateColumnDoesNotExist();
});
Then("verify status column does not exist", () => {
  OneMacPackagePage.verifystatusColumnDoesNotExist();
});
Then("verify Initial Submission Date column does not exist", () => {
  OneMacPackagePage.verifyinitialSubmissionDateColumnDoesNotExist();
});
Then("verify submitted by column does not exist", () => {
  OneMacPackagePage.verifysubmittedByColumnDoesNotExist();
});
Then("verify the type on row one exists", () => {
  OneMacPackagePage.verifypackageRowOneTypeExists();
});
Then("verify the type on row one is Medicaid SPA", () => {
  OneMacPackagePage.verifypackageRowOneTypeHasTextMedicaidSPA();
});
Then("type partial existing ID in search bar", () => {
  OneMacPackagePage.typePartialExistingID();
});
Then("verify the state on row one exists", () => {
  OneMacPackagePage.verifypackageRowOneStateExists();
});
Then("verify Initial Submission Date filter dropdown exists", () => {
  OneMacPackagePage.verifyInitialSubmissionDateFilterDropDownExists();
});
Then("click on Initial Submission Date filter dropdown", () => {
  OneMacPackagePage.clickOnInitialSubmissionDateFilterDropDown();
});
Then("verify Initial Submission Date date picker filter exists", () => {
  OneMacPackagePage.verifyInitialSubmissionDateDatePickerFilterExists();
});
Then("click on Initial Submission Date date picker filter", () => {
  OneMacPackagePage.clickOnInitialSubmissionDateDatePickerFilter();
});
Then("click on Formal RAI Received date picker filter", () => {
  OneMacPackagePage.clickOnFormalRAIReceivedDatePickerFilter();
});
Then("click on this quarter date picker button", () => {
  OneMacPackagePage.clickOnThisQuarterDatePickerBtn();
});
Then("click on quarter to date date picker button", () => {
  OneMacPackagePage.clickOnQuarterToDateDatePickerBtn();
});
Then("click on reset button", () => {
  OneMacPackagePage.clickOnResetButton();
});
Then("verify package row one exists", () => {
  OneMacPackagePage.verifyPackageRowOneExists();
});
Then("verify Initial Submission Date column one date is this quarter", () => {
  if (OneMacPackagePage.checkIfPackageListResultsExist()) {
    OneMacPackagePage.verifypackageRowOneInitialSubmissionDateIsThisQuarter();
  }
});
Then("verify states selected includes {string}", (state) => {
  OneMacPackagePage.verifyStatesSelectedIncludes(state);
});
Then("verify state dropdown filter exists", () => {
  OneMacPackagePage.verifyStateDropdownFilterExists();
});
Then("click on state dropdown filter", () => {
  OneMacPackagePage.clickStateDropdownFilter();
});
Then("verify Formal RAI Received dropdown filter exists", () => {
  OneMacPackagePage.verifyFormalRAIReceivedDateFilterDropdownExists();
});
Then("click on Formal RAI Received dropdown filter", () => {
  OneMacPackagePage.clickOnFormalRAIReceivedDateFilterDropdownDropDown();
});
Then("verify state filter select exists", () => {
  OneMacPackagePage.verifyStateFilterSelectExists();
});
Then("set value on state filter select to {string}", (state) => {
  OneMacPackagePage.typeStateToSelect(state + "{enter}");
});
Then("verify {string} is showing in the state column", (state) => {
  OneMacPackagePage.verifypackageRowOneValueIs(state);
});
Then("verify remove {string} button exists", (state) => {
  OneMacPackagePage.verifyremoveBtnExistsFor(state);
});
Then("click remove {string} button", (state) => {
  OneMacPackagePage.clickRemoveBtnFor(state);
});
Then("verify the Waivers tab exists", () => {
  OneMacPackagePage.verifyWaiversTabExists();
});
Then("click on the Waivers tab", () => {
  OneMacPackagePage.clickOnWaiversTab();
});
Then("verify the SPAs tab exists", () => {
  OneMacPackagePage.verifySPAsTabExists();
});
Then("verify SPA ID column exists", () => {
  OneMacPackagePage.verifySPAIDColumnExists();
});
Then("verify Waiver Number column exists", () => {
  OneMacPackagePage.verifyWaiverNumberColumnExists();
});
Then("verify status DropDown Filter exists", () => {
  OneMacPackagePage.verifystatusDropDownFilterExists();
});
Then("verify the SPAs tab is selected", () => {
  //if it's disabled then it is selected.
  OneMacPackagePage.verifySPAsTabIsDisabled();
});
Then("verify the Waivers tab is selected", () => {
  //if it's disabled then it is selected.
  OneMacPackagePage.verifyWaiversTabIsDisabled();
});
Then("verify the Waivers tab is clickable", () => {
  OneMacPackagePage.verifyWaiversTabIsClickable();
});
Then("refresh the page", () => {
  cy.reload();
});
Then("check all of the status checkboxes", () => {
  OneMacPackagePage.checkAllStatusFilterCheckboxes();
});
Then("uncheck all of the status checkboxes", () => {
  OneMacPackagePage.uncheckAllStatusFilterCheckboxes();
});
Then("check all of the type checkboxes", () => {
  OneMacPackagePage.checkAllTypeFilterCheckboxes();
});
Then("uncheck all of the type checkboxes", () => {
  OneMacPackagePage.uncheckAllTypeFilterCheckboxes();
});
Then("click RAI Issued checkbox", () => {
  OneMacPackagePage.clickRaiIssuedCheckbox();
});
Then("click Pending - RAI checkbox", () => {
  OneMacPackagePage.clickPendingRaiCheckbox();
});
Then("verify Pending - RAI status checkbox exists", () => {
  OneMacPackagePage.verifyPendingRaiCheckboxExists();
});
Then("click the Pending - Concurrence checkbox", () => {
  OneMacPackagePage.clickPendingConcurrenceCheckbox();
});
Then("verify the Pending - Concurrence status checkbox exists", () => {
  OneMacPackagePage.verifyPendingConcurrenceCheckboxExists();
});
Then("click the Pending - Approval checkbox", () => {
  OneMacPackagePage.clickPendingApprovalCheckbox();
});
Then("verify the Pending - Approval status checkbox exists", () => {
  OneMacPackagePage.verifyPendingApprovalCheckboxExists();
});
Then("click Approved checkbox", () => {
  OneMacPackagePage.clickApprovedCheckbox();
});
Then("click Disapproved checkbox", () => {
  OneMacPackagePage.clickDisapprovedCheckbox();
});
Then("click the SPA ID link in the first row", () => {
  OneMacPackagePage.clickSPAIDLinkInFirstRow();
});
Then("click the Waiver Number link in the first row", () => {
  OneMacPackagePage.clickWaiverNumberLinkInFirstRow();
});
Then("click the Package Withdrawn checkbox", () => {
  OneMacPackagePage.clickWithdrawnCheckBoxExists();
});
Then("click Unsubmitted checkbox", () => {
  OneMacPackagePage.clickUnsubmittedCheckbox();
});
Then("click Submitted checkbox", () => {
  OneMacPackagePage.clickSubmittedCheckbox();
});
Then("click Submitted - Intake Needed checkbox", () => {
  OneMacPackagePage.clickSubmittedIntakeNeededCheckbox();
});
Then("verify Submitted - Intake Needed status checkbox exists", () => {
  OneMacPackagePage.verifySubmittedIntakeNeededCheckboxExists();
});
Then("click Requested checkbox", () => {
  OneMacPackagePage.clickDoubleDashCheckbox();
});
Then("click the Pending checkbox", () => {
  OneMacPackagePage.clickPendingCheckbox();
});
Then("verify the type in row one is Initial Waiver", () => {
  OneMacPackagePage.verifypackageRowOneTypeHasTextInitialWaiver();
});
Then("verify the type in row one is Waiver Renewal", () => {
  OneMacPackagePage.verifypackageRowOneTypeHasTextWaiverRenewal();
});
Then(
  "verify the waiver number format in row one is SS.#### or SS.#####",
  () => {
    OneMacPackagePage.verifypackageRowOneIDInitialWaiverFormat();
  }
);
Then(
  "verify the waiver number format in row one is SS.#####.S## or SS.####.S##",
  () => {
    OneMacPackagePage.verifypackageRowOneIDWaiverRenewalFormat();
  }
);
Then("verify Onboarding Materials exists", () => {
  OneMacFAQPage.verifyOnboardingMaterialsBtnExists();
});
Then("click on Onboarding Materials", () => {
  OneMacFAQPage.clickOnboardingMaterialsBtn();
});
Then("verify Welcome to OneMac link exists", () => {
  OneMacFAQPage.verifyWelcomeToOneMacLinkExists();
});
Then("verify Welcome to OneMac link is valid", () => {
  OneMacFAQPage.verifyWelcomeToOneMacLinkIsValid();
});
Then("verify IDM Instructions for OneMAC Users link exists", () => {
  OneMacFAQPage.verifyIdmInstructionsLinkExists();
});
Then("verify OneMAC IDM Guide link exists", () => {
  OneMacFAQPage.verifyIdmGuideLinkExists();
});
Then("verify OneMAC State User Guide link exists", () => {
  OneMacFAQPage.verifyStateSubmitterGuideLinkExists();
});
Then("verify OneMAC CMS User Guide link exists", () => {
  OneMacFAQPage.verifyCmsUserGuideLinkExists();
});
Then("verify IDM Instructions for OneMAC Users is valid", () => {
  OneMacFAQPage.verifyIdmInstructionsLinkIsValid();
});
Then("verify OneMAC IDM Guide is valid", () => {
  OneMacFAQPage.verifyIdmGuideLinkIsValid();
});
Then("verify OneMAC State User Guide is valid", () => {
  OneMacFAQPage.verifyStateSubmitterGuideLinkIsValid();
});
Then("verify OneMAC CMS User Guide is valid", () => {
  OneMacFAQPage.verifyCmsUserGuideLinkIsValid();
});
Then("search for {string}", (part) => {
  OneMacPackagePage.searchFor(part);
  cy.wait(1000);
});
Then("search for CPOC named Chester Tester", () => {
  OneMacPackagePage.searchFor("Chester Tester");
  cy.wait(1000);
});
Then("search for Appendix K number", () => {
  OneMacPackagePage.searchFor("MD-10330.R00.12");
  cy.wait(1000);
});
Then("verify that Request a Role Change button exists", () => {
  OneMacUserManagmentPage.verifyRequestARoleChangeBtnExists();
});

Then("click on Request a Role Change button", () => {
  OneMacUserManagmentPage.clickRequestARoleChangeBtn();
});

Then("verify Select the role for which you are registering is visible", () => {
  OneMacRequestARoleChangePage.verifySelectTheRoleTextExists();
});

Then("verify SSA is the role available", () => {
  OneMacRequestARoleChangePage.verifySSARoleBtnExists();
});

Then("click on the SSA role", () => {
  OneMacRequestARoleChangePage.clickSSARoleBtn();
});

Then("verify the user role is {string}", (string) => {
  OneMacRequestARoleChangePage.verifyUserRoleHeaderIs(string);
});

Then("verify the error message says {string}", (string) => {
  OneMacRequestARoleChangePage.verifyErrorMessageTextIs(string);
});

Then("verify the submit button is disabled on request a role page", () => {
  OneMacRequestARoleChangePage.verifySubmitBtnIsDisabled();
});
Then("verify the submit button is disabled via class", () => {
  OneMacRequestARoleChangePage.verifySubmitBtnIsDisabledViaClass();
});
Then("select {string} for state access", (state) => {
  OneMacRequestARoleChangePage.clickStateForStateAccess(state);
});

Then("verify the submit button is enabled", () => {
  OneMacRequestARoleChangePage.verifySubmitBtnIsEnabled();
});

Then("verify there is no error message", () => {
  OneMacRequestARoleChangePage.verifyErrorMsgDoesNotExist();
});
Then("click on cancel", () => {
  OneMacRequestARoleChangePage.clickCancelBtn();
});
Then("verify the cancel button is clickable", () => {
  OneMacRequestARoleChangePage.verifyCancelBtnIsEnabled();
});
Then("click stay on page in the modal", () => {
  OneMacRequestARoleChangePage.clickStayOnPageBtn();
});

Then("click confirm in the modal", () => {
  OneMacRequestARoleChangePage.clickConfirmBtn();
});

Then("verify State Submitter is the role available", () => {
  OneMacRequestARoleChangePage.verifyStateSubmitterRoleBtnExists();
});

Then("click on the State Submitter role", () => {
  OneMacRequestARoleChangePage.clickStateSubmitterRoleBtn();
});

Then("verify the CMS Reviewer role is available", () => {
  OneMacRequestARoleChangePage.verifyCMSReviewerRoleBtnExists();
});

Then("click on the CMS Reviewer role", () => {
  OneMacRequestARoleChangePage.clickCMSReviewerRoleBtn();
});

Then("verify the group dropdown exists", () => {
  OneMacRequestARoleChangePage.verifyGroupDropdownExists();
});

Then("verify the CMS Role Approver role is available", () => {
  OneMacRequestARoleChangePage.verifyCMSRoleApproverBtnExists();
});

Then("click on the CMS Role Approver role", () => {
  OneMacRequestARoleChangePage.clickCMSRoleApproverBtn();
});

Then("verify that Request a Role Change button does not exist", () => {
  OneMacUserManagmentPage.verifyRequestARoleChangeBtnDoesNotExist();
});
Then(
  "verify withdraw package button is visible for package in package dashboard",
  () => {
    OneMacPackagePage.verifyWithdrawPackageBtnExists();
  }
);
Then("click withdraw package button", () => {
  OneMacPackagePage.clickWithdrawPackageBtn();
});
Then("click yes, withdraw package button", () => {
  OneMacPackagePage.clickConfirmWithdrawPackageBtn();
});
Then("verify yes, withdraw package button exists", () => {
  OneMacPackagePage.verifyConfirmWithdrawPackageBtnExists();
});
Then("click Yes, withdraw response button", () => {
  OneMacPackagePage.clickConfirmWithdrawResponseBtn();
});
Then("verify Yes, withdraw response button exists", () => {
  OneMacPackagePage.verifyConfirmWithdrawResponseBtnExists();
});
Then("verify the package details page is visible", () => {
  OneMacPackageDetailsPage.verifyPackageDetailsPageIsVisible();
});
Then("verify 2 action cards exist", () => {
  OneMacPackageDetailsPage.verifyActionCardExists();
});
Then("verify the status on the card is {string}", (status) => {
  OneMacPackageDetailsPage.verifyStatusIs(status);
});
Then("verify 2nd clock is visible under the status", () => {
  OneMacPackageDetailsPage.verify2ndClockIsVisible();
});
Then("verify 2nd clock is not visible under the status", () => {
  OneMacPackageDetailsPage.verify2ndClockIsNotVisible();
});
Then("verify there is not a 90th day date on the card", () => {
  OneMacPackageDetailsPage.verify90thDayDateDoesntExist();
});
Then("verify package actions header is visible", () => {
  OneMacPackageDetailsPage.verifyPackageActionsHeaderIsVisible();
});
Then("verify there are no package actions available", () => {
  OneMacPackageDetailsPage.verifyNoPackageActionsAvailable();
});
Then("verify the package actions section is unavailable", () => {
  OneMacPackageDetailsPage.verifyPackageActionsSectionDoesNotExist();
});
Then("verify Respond to RAI action exists", () => {
  OneMacPackageDetailsPage.verifyRespondtoRAIActionExists();
});
Then("verify withdraw package action exists", () => {
  OneMacPackageDetailsPage.verifyWithdrawPackageActionExists();
});
Then("verify Request a Temporary Extension package action exists", () => {
  OneMacPackageDetailsPage.verifyRequestTempExtensionPackageActionExists();
});
Then("click Request a Temporary Extension package action", () => {
  OneMacPackageDetailsPage.clickRequestTempExtensionPackageAction();
});
Then("verify Add Amendment package action exists", () => {
  OneMacPackageDetailsPage.verifyAddAmendmentActionExists();
});
Then("click Add Amendment package action", () => {
  OneMacPackageDetailsPage.clickAddAmendmentPackageAction();
});
Then("verify Withdraw Formal RAI Response package action exists", () => {
  OneMacPackageDetailsPage.verifyWithdrawFormalRAIResponseActionExists();
});
Then("click Withdraw Formal RAI Response package action", () => {
  OneMacPackageDetailsPage.clickWithdrawFormalRAIResponseAction();
});
Then("verify Enable Formal RAI Response Withdraw package action exists", () => {
  OneMacPackageDetailsPage.verifyEnableRAIResponseWithdrawActionExists();
});
Then("click Enable Formal RAI Response Withdraw package action", () => {
  OneMacPackageDetailsPage.clickEnableRAIResponseWithdrawAction();
});
Then("click on Respond to RAI package action", () => {
  OneMacPackageDetailsPage.clickRespondToRAIAction();
});
Then("verify the details section exists", () => {
  OneMacPackageDetailsPage.verifyDetailSectionExists();
});
Then("verify the package details title contains {string}", (string) => {
  OneMacPackageDetailsPage.verifyTitleContains(string);
});

Then("verify there is a Type header in the details section", () => {
  OneMacPackageDetailsPage.verifyTypeHeaderExists();
});
Then("verify a type containing SPA exists for the Type", () => {
  OneMacPackageDetailsPage.verifyTypeContainsSPA();
});
Then("verify the type is Medicaid SPA", () => {
  OneMacPackageDetailsPage.verifyTypeContainsMedicaidSPA();
});
Then("verify the type is CHIP SPA ", () => {
  OneMacPackageDetailsPage.verifyTypeContainsCHIPSPA();
});
Then("verify the type is Initial Waiver", () => {
  OneMacPackageDetailsPage.verifyTypeContainsInitialWaiver();
});
Then("verify the type is Waiver Renewal", () => {
  OneMacPackageDetailsPage.verifyTypeContainsWaiverRenewal();
});
Then("verify the type is 1915c Temporary Extension", () => {
  OneMacPackageDetailsPage.verifyTypeContains1915cTempExtension();
});
Then("verify the type is 1915b Temporary Extension", () => {
  OneMacPackageDetailsPage.verifyTypeContains1915bTempExtension();
});
Then("verify the type is 1915b Waiver Amendment", () => {
  OneMacPackageDetailsPage.verifyTypeContains1915bWaiverAmendment();
});
Then(
  "verify there is a Approved Initial or Renewal Number header in the details section",
  () => {
    OneMacPackageDetailsPage.verifyParentWaiverNumberHeaderExists();
  }
);
Then(
  "verify the Approved Initial or Renewal Number ID is the approved intial waiver number 1",
  () => {
    cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
      OneMacPackageDetailsPage.verifyParentWaiverNumber(
        data.approvedInitialWaiverNum1
      );
    });
  }
);
Then("verify there is a State header in the details section", () => {
  OneMacPackageDetailsPage.verifyStateHeaderExists();
});
Then("verify a state exists for the State", () => {
  OneMacPackageDetailsPage.verifyStateExists();
});
Then("verify there is an Amendment Title header in the details section", () => {
  OneMacPackageDetailsPage.verifyAmendmentTitleHeaderExists();
});
Then("verify there is an Amendment Title under the header", () => {
  OneMacPackageDetailsPage.verifyAmendmentTitleExists();
});
Then("verify the Amendment Title is {string}", (s) => {
  OneMacPackageDetailsPage.verifyAmendmentTitleIs(s);
});
Then(
  "verify there is an Initial Submission Date header in the details section",
  () => {
    OneMacPackageDetailsPage.verifyInitialSubmittedDateHeaderExists();
  }
);
Then("verify a date exists for the Initial Submission Date", () => {
  OneMacPackageDetailsPage.verifyDateExists();
});
Then(
  "verify the form is titled Formal Request for Additional Information Response",
  () => {
    OneMacRespondToRAIPage.verifyPageHeader();
  }
);
Then("click back arrow", () => {
  OneMacRespondToRAIPage.clickBackArrow();
});
Then("click Leave, anyway", () => {
  OneMacRespondToRAIPage.clickLeaveAnyway();
});
Then("verify user is on new spa page", () => {
  OneMacSubmissionTypePage.verifyNewSPAPage();
});
Then("verify user is on new waiver page", () => {
  OneMacSubmissionTypePage.verifyNewWaiverPage();
});
Then("verify user is on new initial waiver page", () => {
  OneMacSubmissionTypePage.verifyNewInitialWaiverPage();
});
Then("verify user is on new waiver renewal page", () => {
  OneMacSubmissionTypePage.verifyNewWaiverRenewalPage();
});
Then("verify user is on new Appendix K page", () => {
  OneMacSubmissionTypePage.verifyNewAppendixKPage();
});
Then("verify user is on new waiver amendment page", () => {
  OneMacSubmissionTypePage.verifyNewWaiverAmendmentPage();
});
Then("verify user is on new Medicaid SPA page", () => {
  OneMacSubmitNewMedicaidSpaPage.verifyNewMedicaidSPAPage();
});
Then(
  "verify user is on Medicaid Eligibility, Enrollment, Administration, and Health Homes page",
  () => {
    OneMacSubmitNewMedicaidSpaPage.verifyMedicaidEligibilityPage();
  }
);
Then(
  "verify user is on Medicaid Alternative Benefits Plans ABP, and Medicaid Premiums and Cost Sharing page",
  () => {
    OneMacSubmitNewMedicaidSpaPage.verifyMedicaidAlternativePage();
  }
);
Then("verify user is on new CHIP SPA page", () => {
  OneMacCHIPSPAPage.verifyNewChipSPAPage();
});
Then("verify user is on CHIP Eligibility page", () => {
  OneMacCHIPSPAPage.verifyChipEligibilityPage();
});
Then("verify the page header is {string}", (string) => {
  OneMacCHIPSPAPage.verifyPageH1Is(string);
});
Then("verify Enter the MMDL System button is visible and clickable", () => {
  OneMacCHIPSPAPage.verifyMmdlSystenBtn();
});
Then("verify Enter the MACPro system button is visible and clickable", () => {
  OneMacSubmitNewMedicaidSpaPage.verifyMacProSystenBtn();
});
Then("verify RAI Responses header exists", () => {
  OneMacPackageDetailsPage.verifyRaiResponseHeaderExists();
});
Then("verify RAI Responses header does not exist", () => {
  OneMacPackageDetailsPage.verifyRaiResponseHeaderDoesNotExist();
});
Then(
  "verify the Medicaid RAI Responses caret at the top of the list exists and is enabled",
  () => {
    OneMacPackageDetailsPage.verifyMedicaidTopRaiRespCaretExistsThenEnabled();
  }
);
Then(
  "verify the CHIP RAI Responses caret at the top of the list exists and is enabled",
  () => {
    OneMacPackageDetailsPage.verifyCHIPTopRaiRespCaretExistsThenEnabled();
  }
);
Then(
  "verify the Appendix K RAI Responses caret at the top of the list exists and is enabled",
  () => {
    OneMacPackageDetailsPage.verifyAppKTopRaiRespCaretExistsThenEnabled();
  }
);
Then(
  "verify the title of the Medicaid RAI Responses caret at the top of the list is in Submitted on format",
  () => {
    OneMacPackageDetailsPage.verifyMedicaidTopRaiRespCaretTitle();
  }
);
Then(
  "verify the title of the CHIP RAI Responses caret at the top of the list is in Submitted on format",
  () => {
    OneMacPackageDetailsPage.verifyCHIPTopRaiRespCaretTitle();
  }
);
Then(
  "verify the title of the Appendix K RAI Responses caret at the top of the list is in Submitted on format",
  () => {
    OneMacPackageDetailsPage.verifyAppKTopRaiRespCaretTitle();
  }
);
Then(
  "verify the Medicaid RAI response card at the top of the list exists",
  () => {
    OneMacPackageDetailsPage.verifyMedicaidTopRaiRespCardExists();
  }
);
Then("verify the CHIP RAI response card at the top of the list exists", () => {
  OneMacPackageDetailsPage.verifyCHIPTopRaiRespCardExists();
});
Then(
  "verify the Appendix K RAI response card at the top of the list exists",
  () => {
    OneMacPackageDetailsPage.verifyAppKTopRaiRespCardExists();
  }
);
Then(
  "verify the download button for the Medicaid RAI response at the top of the list exists",
  () => {
    OneMacPackageDetailsPage.verifyMedicaidTopRaiRespDownloadBtnExistsThenEnabled();
  }
);
Then(
  "verify the download button for the CHIP RAI response at the top of the list exists",
  () => {
    OneMacPackageDetailsPage.verifyCHIPTopRaiRespDownloadBtnExistsThenEnabled();
  }
);
Then(
  "verify the download button for the Appendix K RAI response at the top of the list exists",
  () => {
    OneMacPackageDetailsPage.verifyAppKTopRaiRespDownloadBtnxistsThenEnabled();
  }
);
Then("verify the first RAI response does not have Additional Info", () => {
  OneMacPackageDetailsPage.verifyTopRaiRespAddInfoDoesNotExist();
});
Then("verify the first RAI response has Additional Info", () => {
  OneMacPackageDetailsPage.verifyTopRaiRespAddInfoExists();
});
Then("click the actions button in row one", () => {
  OneMacPackagePage.clickPackageRowOneActionsBtn();
});
Then("click the Respond to RAI button", () => {
  OneMacPackagePage.clickRespondToRAIBtn();
});
Then("click the Request Temporary Extension button", () => {
  OneMacPackagePage.clickRequestTempExtensionBtn();
});
Then("verify the Request Temporary Extension button is displayed", () => {
  OneMacPackagePage.verifyRequestTempExtensionBtnExists();
});
Then("click the Add Amendment button", () => {
  OneMacPackagePage.clickAddAmendmentBtn();
});
Then("verify the Add Amendment button is displayed", () => {
  OneMacPackagePage.verifyAddAmendmentBtnExists();
});
Then("verify the Respond to RAI button is displayed", () => {
  OneMacPackagePage.verifyRespondToRAIBtnExists();
});
Then("verify Package Overview navigation button exists", () => {
  OneMacPackageDetailsPage.verifyPackageOverviewNavBtnExists();
});
Then("verify Package Overview navigation button is enabled", () => {
  OneMacPackageDetailsPage.verifyPackageOverviewNavBtnIsEnabled();
});
Then("verify Package Overview navigation button is expanded", () => {
  OneMacPackageDetailsPage.verifyPackageOverviewNavBtnIsExpanded();
});
Then("verify Package Details is listed under Package Overview", () => {
  OneMacPackageDetailsPage.verifyPackageDetailsNavBtnExists();
});
Then("click the pending user action button", () => {
  OneMacUserManagmentPage.clickPendingUserActionBtn();
});
Then("click the deny access button", () => {
  OneMacUserManagmentPage.clickDenyAccessBtn();
});
Then("verify the logout button exists", () => {
  OneMacDashboardPage.verifyLogoutBtnExists();
});
Then("click the logout button", () => {
  OneMacDashboardPage.clickLogoutBtn();
});
Then(
  "verify there is a Proposed Effective Date header in the details section",
  () => {
    OneMacPackageDetailsPage.verifyProposedEffectiveDateHeaderExists();
  }
);
Then("verify the Proposed Effective Date is NA", () => {
  OneMacPackageDetailsPage.verifyproposedEffectiveDateHeaderContainsNA();
});
Then("verify the Proposed Effective Date is Pending", () => {
  OneMacPackageDetailsPage.verifyproposedEffectiveDateHeaderContainsPending();
});
Then(
  "verify the Proposed Effective Date is a date formatted like Mon dd yyyy",
  () => {
    OneMacPackageDetailsPage.verifyproposedEffectiveDateHeaderContainsDate();
  }
);
Then(
  "verify there is a Final Disposition Date header in the details section",
  () => {
    OneMacPackageDetailsPage.verifyFinalDispositionDateHeaderExists();
  }
);
Then(
  "verify there not is a Final Disposition Date header in the details section",
  () => {
    OneMacPackageDetailsPage.verifyFinalDispositionDateHeaderDoesNotExists();
  }
);
Then(
  "verify the Final Disposition Date is a date formatted like Mon dd yyyy",
  () => {
    OneMacPackageDetailsPage.verifyFinalDispositionDateHeaderContainsDate();
  }
);
Then(
  "verify there is an Approved Effective Date in the details section",
  () => {
    OneMacPackageDetailsPage.verifyApprovedEffectiveDateHeaderExists();
  }
);
Then(
  "verify there is not an Approved Effective Date header in the details section",
  () => {
    OneMacPackageDetailsPage.verifyApprovedEffectiveDateHeaderDoesNotExists();
  }
);
Then(
  "verify the Approved Effective Date is a date formatted like Mon dd yyyy",
  () => {
    OneMacPackageDetailsPage.verifyApprovedEffectiveDateHeaderContainsDate();
  }
);
Then(
  "verify there is an Actual Effective Date header in the details section",
  () => {
    OneMacPackageDetailsPage.verifyActualEffectiveDateHeaderExists();
  }
);
Then(
  "verify there is not an Actual Effective Date header in the details section",
  () => {
    OneMacPackageDetailsPage.verifyActualEffectiveDateHeaderDoesNotExists();
  }
);
Then(
  "verify the Actual Effective Date is a date formatted like Mon dd yyyy",
  () => {
    OneMacPackageDetailsPage.verifyActualEffectiveDateHeaderContainsDate();
  }
);
Then(
  "verify there is an Formal RAI Received Date header in the details section",
  () => {
    OneMacPackageDetailsPage.verifyFormalRAIReceivedDateHeaderExists();
  }
);
Then(
  "verify there is not an Formal RAI Received Date header in the details section",
  () => {
    OneMacPackageDetailsPage.verifyFormalRAIReceivedDateHeaderDoesNotExists();
  }
);
Then(
  "verify the Formal RAI Received Date is a date formatted like Mon dd yyyy",
  () => {
    OneMacPackageDetailsPage.verifyFormalRAIReceivedDateHeaderContainsDate();
  }
);
Then("verify the Amendment Number header exists", () => {
  OneMacPackageDetailsPage.verifyAmendmentNumberHeaderExists();
});
Then("verify the waiver authority header exists", () => {
  OneMacPackageDetailsPage.verifyWaiverAuthorityHeaderExists();
});
Then("verify the waiver authority is 1915c HCBS", () => {
  OneMacPackageDetailsPage.verifyWaiverAuthorityHeaderis1915cHCBS();
});
Then("verify the attachments section exists", () => {
  OneMacPackageDetailsPage.verifyAttachmentsSectionExists();
});
Then("verify the download all button exists", () => {
  OneMacPackageDetailsPage.verifyDownloadAllBtnExists();
});
Then("verify the additional information section exists", () => {
  OneMacPackageDetailsPage.verifyAdditionalInfoSectionExists();
});
Then("verify the Administrative Package Changes section exists", () => {
  OneMacPackageDetailsPage.verifyAdministrativePackageChangesSectionExists();
});
Then("verify the Formal RAI Responses section exists", () => {
  OneMacPackageDetailsPage.verifyFormalRAIResponsesSectionExists();
});
Then("click withdraw button", () => {
  OneMacPackageDetailsPage.clickWithdrawBtn();
});
Then("click withdraw confirmation", () => {
  OneMacPackageDetailsPage.clickWithdrawConfirmationBtn();
});
Then("verify submission message for withdrawn amendment", () => {
  OneMacPackageDetailsPage.verifySubmissionMsgForWithdrawnAmendment();
});
Then("verify the amendment details section exists", () => {
  OneMacPackageDetailsPage.verifyAmendmentDetailSectionExists();
});
Then("verify success message for denied role", () => {
  OneMacDashboardPage.verifySuccessMessageIsDisplayedForRoleChange();
});
Then("select proposed effective date 3 months from today", () => {
  OneMacSubmitNewWaiverActionPage.setProposedEffectiveDateThreeMonthsAway();
});
Then("Type Temporary Extension Number {string}", (s) => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    switch (parseInt(s)) {
      case 1:
        OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
          data.newTemporaryExtensionNumber1
        );
        break;
      case 2:
        OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
          data.newTemporaryExtensionNumber2
        );
        break;
      case 3:
        OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
          data.newTemporaryExtensionNumber3
        );
        break;
      case 4:
        OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
          data.newTemporaryExtensionNumber4
        );
        break;
      case 5:
        OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
          data.newTemporaryExtensionNumber5
        );
        break;
      case 6:
        OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
          data.newTemporaryExtensionNumber6
        );
        break;
      case 7:
        OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
          data.newTemporaryExtensionNumber7
        );
        break;
      case 8:
        OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
          data.newTemporaryExtensionNumber8
        );
        break;
      case 9:
        OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
          data.newTemporaryExtensionNumber9
        );
        break;
      case 10:
        OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
          data.newTemporaryExtensionNumber10
        );
        break;
    }
  });
});
Then("click on the link for temporary extension number 1", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackageDetailsPage.clickTempExtensionID(
      data.newTemporaryExtensionNumber1
    );
  });
});
Then("verify the initial waiver parent ID is prefilled in the form", () => {
  OneMacSubmitNewWaiverActionPage.verifyParentInitialIDIsPrefilled();
});
Then("verify the renewal waiver parent ID is prefilled in the form", () => {
  OneMacSubmitNewWaiverActionPage.verifyParentRenewalIDIsPrefilled();
});
Then("verify the package ID is prefilled in the form", () => {
  OneMacRespondToRAIPage.verifyIDIsPrefilled();
});

Then("verify the temporary extension exists", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackageDetailsPage.verifyTempExtensionIDExists(
      data.newTemporaryExtensionNumber1
    );
  });
});
Then("click the action button for temporary extension 2", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackageDetailsPage.clickTempExtensionActionBtn(
      data.newTemporaryExtensionNumber2
    );
  });
});
Then("click withdraw button on the temp extension page", () => {
  OneMacPackageDetailsPage.clickWithdrawBtnOnTempExt();
});
Then("click on the Temporary Extension nav button", () => {
  OneMacPackageDetailsPage.clickTempExtensionsNavBtn();
});
Then("copy the ID from the link in the first row", () => {
  OneMacPackagePage.copyTheIDFromLinkInFirstRow();
});
Then("search for the ID copied from the link in the first row", () => {
  cy.fixture("savedID.json").then((data) => {
    OneMacPackagePage.searchFor(data.savedID);
  });
  cy.wait(1000);
});
Then("verify the ID searched for is the ID in the first result", () => {
  cy.fixture("savedID.json").then((data) => {
    OneMacPackagePage.compareSearchIDToFirstLinkID(data.savedID);
  });
  cy.wait(1000);
});
Then(
  "verify the CPOC searched for is Chester Tester in the first result",
  () => {
    OneMacPackagePage.verifyCPOCInFirstRow();
    cy.wait(1000);
  }
);
Then("reset EUA CMS Read Only User state if needed", () => {
  cy.wait(1000)
    .then(() => {
      OneMacUserManagmentPage.isActionBtnPending();
    })
    .then((bool) => {
      if (bool) {
        OneMacUserManagmentPage.clickPendingUserActionBtn();
        OneMacUserManagmentPage.clickDenyAccessBtn();
        OneMacRequestARoleChangePage.clickConfirmBtn();
        OneMacDashboardPage.verifySuccessMessageIsDisplayedForRoleChange();
      } else {
        //no reset is needed so do nothing
      }
    });
});

Then(
  "verify the actions button is unavailable in the submission dashboard",
  () => {
    OneMacDashboardPage.verifyActionsBtnUnvailableOnFirstRow();
  }
);
Then("verify the actions button is disabled in the package dashboard", () => {
  OneMacDashboardPage.verifyActionsBtnDisabledOnFirstRow();
});
Then("verify actions column is unavailable", () => {
  OneMacPackagePage.verifyActionsColumnDoesNotExist();
});
Then("verify the first RAI Response header is titled", () => {
  OneMacPackageDetailsPage.verifyRaiResponseHeaderTitle();
});
Then(
  "verify What format is used to enter a 1915b Initial Waiver number header is visible",
  () => {
    OneMacFAQPage.verifyInitialWaiverFormatHeaderBtnExists();
  }
);
Then(
  "click What format is used to enter a 1915b Initial Waiver number header",
  () => {
    OneMacFAQPage.clickInitialWaiverFormatHeaderBtn();
  }
);
Then(
  "verify What format is used to enter a 1915b Initial Waiver number body is visible",
  () => {
    OneMacFAQPage.verifyInitialWaiverFormatBody();
  }
);
Then(
  "verify What format is used to enter a 1915b Waiver Renewal number header is visible",
  () => {
    OneMacFAQPage.verifyWaiverRenewalFormatHeaderBtnExists();
  }
);
Then(
  "click What format is used to enter a 1915b Waiver Renewal number header",
  () => {
    OneMacFAQPage.clickWaiverRenewalFormatHeaderBtn();
  }
);
Then(
  "verify What format is used to enter a 1915b Waiver Renewal number is visible",
  () => {
    OneMacFAQPage.verifyWaiverRenewalFormatBody();
  }
);
Then("verify the submit button is not disabled", () => {
  OneMacDefaultForms.verifySubmitBtnIsNotDisabled();
});
Then("verify the submit button is disabled", () => {
  OneMacDefaultForms.verifySubmitBtnIsDisabled();
});
Then("type in valid waiver amendment number", () => {
  OneMacSubmitNewWaiverActionPage.inputWaiverNumber("MD-12323.R01.01");
});
Then("type initial waiver number in old format SS.####.R00.00", () => {
  OneMacSubmitNewWaiverActionPage.inputWaiverNumber("MD.1055.R00.00");
});
Then("type initial waiver number in old format SS.#####.R00.00", () => {
  OneMacSubmitNewWaiverActionPage.inputWaiverNumber("MD.10555.R00.00");
});
Then(
  "verify error message is present on package dashboard New Waiver Page",
  () => {
    OneMacSubmitNewWaiverActionPage.verifyErrorMessageIsDisplayed();
  }
);
Then(
  "verify parent error message is present on package dashboard New Waiver Page",
  () => {
    OneMacSubmitNewWaiverActionPage.verifyParentErrorMessageIsDisplayed();
  }
);
Then(
  "verify What format is used to enter a 1915b and 1915c Temporary Extension number header",
  () => {
    OneMacFAQPage.verifyTempExtFormatHeaderBtnExists();
  }
);
Then(
  "click What format is used to enter a 1915b and 1915c Temporary Extension number header",
  () => {
    OneMacFAQPage.clickTempExtFormatHeaderBtn();
  }
);
Then(
  "verify What format is used to enter a 1915b and 1915c Temporary Extension number body is visible",
  () => {
    OneMacFAQPage.verifyTempExtFormatBody();
  }
);
Then(
  "verify What are the attachments for a 1915c Waiver - Request for Temporary Extension header is visible",
  () => {
    OneMacFAQPage.verifyAttachmentsFor1915cRequestTempExtHeaderBtnExists();
  }
);
Then(
  "click What are the attachments for a 1915c Waiver - Request for Temporary Extension header",
  () => {
    OneMacFAQPage.clickAttachmentsFor1915cRequestTempExtHeaderBtn();
  }
);
Then(
  "verify What are the attachments for a 1915c Waiver - Request for Temporary Extension body is visible",
  () => {
    OneMacFAQPage.verifyAttachmentsFor1915cRequestTempExtBody();
  }
);
Then(
  "Type {string} into Approved Initial or Renewal Waiver Number field",
  (n) => {
    OneMacRequestWaiverTemporaryExtension.inputApprovedBaseOrRenewalWaiverNumber(
      n
    );
  }
);
Then(
  "verify Approved Initial or Renewal Waiver Number error message is displayed",
  () => {
    OneMacRequestWaiverTemporaryExtension.verifyParentErrorMessageIsDisplayed();
  }
);
Then(
  "verify Approved Initial or Renewal Waiver Number error message text is correct",
  () => {
    OneMacRequestWaiverTemporaryExtension.verifyParentErrorMessageText();
  }
);
Then(
  "verify Approved Initial or Renewal Waiver Number error message is not displayed",
  () => {
    OneMacRequestWaiverTemporaryExtension.verifyParentErrorMessageIsNotDisplayed();
  }
);
Then("clear Approved Initial or Renewal Waiver Number input box", () => {
  OneMacRequestWaiverTemporaryExtension.clearApprovedBaseOrRenewalWaiverNumberInputBox();
});
Then("wait for {string} miliseconds", (s) => {
  cy.wait(parseInt(s));
});
Then("verify error message contains {string}", (msg) => {
  OneMacDefaultForms.verifyErrorMsgContains(msg);
});
Then("search for Initial Waiver in RAI Issued status", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackagePage.searchFor(data.initialWaiverInRAIStatus);
  });
  cy.wait(1000);
});
Then(
  "verify the Initial Waiver Number in RAI Issued status is pre-populated and uneditable",
  () => {
    cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
      OneMacRespondToRAIPage.verifyWaiverNumberMatchesID(
        data.initialWaiverInRAIStatus
      );
    });
    cy.wait(1000);
  }
);
Then("search for the Appendix K Amendment in RAI Issued status", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackagePage.searchFor(data.appKInRAIStatus);
  });
  cy.wait(1000);
});
Then(
  "verify the Appendix K Amendment in RAI Issued status is pre-populated and uneditable",
  () => {
    OneMacRespondToRAIPage.verifyAmendmentIDIsPrefilled();
  }
);
Then(
  "verify the Waiver Amendment in RAI Issued status is pre-populated and uneditable",
  () => {
    OneMacRespondToRAIPage.verifyAmendmentIDIsPrefilled();
  }
);
Then(
  "type new waiver renewal number {string} in 1915b Waiver Renewal Number field",
  (s) => {
    cy.fixture("packageDashboardWaiverNumbers.json").then((d) => {
      switch (parseInt(s)) {
        case 1:
          OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
            d.newWaiverRenewalNum1
          );
          break;
        case 2:
          OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
            d.newWaiverRenewalNum2
          );
          break;
        case 3:
          OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
            d.newWaiverRenewalNum3
          );
          break;
      }
    });
  }
);
Then(
  "type new waiver amendment number {string} in 1915b Waiver Amendment Number field",
  (s) => {
    cy.fixture("packageDashboardWaiverNumbers.json").then((d) => {
      switch (parseInt(s)) {
        case 1:
          OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
            d.newWaiverAmendmentNum1
          );
          break;
        case 2:
          OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
            d.newWaiverAmendmentNum2
          );
          break;
        case 3:
          OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
            d.newWaiverAmendmentNum3
          );
          break;
        case 4:
          OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
            d.newWaiverAmendmentNum4
          );
          break;
      }
    });
  }
);
Then("search for new waiver renewal number {string}", (s) => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((d) => {
    switch (parseInt(s)) {
      case 1:
        OneMacPackagePage.searchFor(d.newWaiverRenewalNum1);
        break;
      case 3:
        OneMacPackagePage.searchFor(d.newWaiverRenewalNum3);
        break;
    }
  });
  cy.wait(1000);
});

Then("search for new waiver amendment number 1", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((d) => {
    OneMacPackagePage.searchFor(d.newWaiverAmendmentNum1);
  });
  cy.wait(1000);
});
Then(
  "type approved Initial Waiver number into Existing Waiver Number to Renew field",
  () => {
    cy.fixture("packageDashboardWaiverNumbers.json").then((d) => {
      OneMacSubmitNewWaiverActionPage.inputWaiverParentNumber(
        d.approvedInitialWaiverNum1
      );
    });
  }
);
Then(
  "type approved Initial Waiver number into Existing Waiver Number to Amend field",
  () => {
    cy.fixture("packageDashboardWaiverNumbers.json").then((d) => {
      OneMacSubmitNewWaiverActionPage.inputWaiverParentNumber(
        d.approvedInitialWaiverNum1
      );
    });
  }
);
Then("clear Existing Waiver Number to Renew field", () => {
  OneMacSubmitNewWaiverActionPage.clearWaiverParentNumber();
  cy.wait(1500);
});
Then("clear Existing Waiver Number to Amend field", () => {
  OneMacSubmitNewWaiverActionPage.clearWaiverParentNumber();
  cy.wait(1500);
});
Then("clear 1915b Waiver Renewal Number field", () => {
  OneMacSubmitNewWaiverActionPage.clearWaiverNumberInputBoxNewForms();
  cy.wait(1500);
});
Then("clear 1915b Waiver Amendment Number field", () => {
  OneMacSubmitNewWaiverActionPage.clearWaiverNumberInputBoxNewForms();
  cy.wait(1500);
});
Then("type bad format into Existing Waiver Number to Renew field", () => {
  OneMacSubmitNewWaiverActionPage.inputWaiverParentNumber("MD");
});
Then("type bad format into Existing Waiver Number to Amend field", () => {
  OneMacSubmitNewWaiverActionPage.inputWaiverParentNumber("MD");
});
Then("type bad format into 1915b Waiver Renewal Number field", () => {
  OneMacSubmitNewWaiverActionPage.inputWaiverNumber("MD");
});
Then("type bad format into 1915b Waiver Amendment Number field", () => {
  OneMacSubmitNewWaiverActionPage.inputWaiverNumber("MD");
});
Then(
  "verify id number in the first row matches new waiver renewal number {string}",
  (s) => {
    cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
      switch (parseInt(s)) {
        case 1:
          OneMacPackagePage.verifyIDNumberInFirstRowIs(
            data.newWaiverRenewalNum1
          );
          break;
        case 3:
          OneMacPackagePage.verifyIDNumberInFirstRowIs(
            data.newWaiverRenewalNum3
          );
          break;
      }
    });
  }
);
Then(
  "verify id number in the first row matches new waiver amendment number {string}",
  (s) => {
    cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
      switch (parseInt(s)) {
        case 1:
          OneMacPackagePage.verifyIDNumberInFirstRowIs(
            data.newWaiverAmendmentNum1
          );
          break;
        case 3:
          OneMacPackagePage.verifyIDNumberInFirstRowIs(
            data.newWaiverAmendmentNum3
          );
          break;
      }
    });
  }
);
Then("verify id number in the first row matches approved waiver number", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackagePage.verifyIDNumberInFirstRowIs(
      data.approvedInitialWaiverNum1
    );
  });
});
Then("type Appendix K Submission 1 into Amendment Title field", () => {
  OneMacAppendixKAmendmentPage.inputAmendmentTitle("Appendix K Submission 1");
});
Then("verify id number in the first row matches Appendix K number", () => {
  OneMacPackagePage.verifyIDNumberInFirstRowIs("MD-10330.R00.12");
});

Then("verify id number in the first row matches {string}", (s) => {
  OneMacPackagePage.verifyIDNumberInFirstRowIs(s);
});

Then("verify help text under Existing Waiver Number to Renew field", () => {
  OneMacSubmitNewWaiverActionPage.verifyParentFieldHelpText();
});

Then(
  "verify the error message for renewals includes For renewals, the “R##” starts with ‘01’ and ascends.",
  () => {
    OneMacSubmitNewWaiverActionPage.verifyRenewalWaiverErrorMsgPt2();
  }
);
Then("verify the 1915b Temporary Extension is prefilled under type", () => {
  OneMacRequestWaiverTemporaryExtension.option1915bIsPrefilled();
});
Then("select the 1915b Temporary Extension Type button", () => {
  OneMacRequestWaiverTemporaryExtension.selectOption1915bInTempExtensionType();
});
Then("select the 1915c Temporary Extension Type button", () => {
  OneMacRequestWaiverTemporaryExtension.selectOption1915cInTempExtensionType();
});
Then("verify the header is {string} on the withdrawal form", (string) => {
  WithdrawPackagePage.verifyWithdrawPageHeader(string);
});
Then("verify the form intro exists on the withdrawal form", () => {
  WithdrawPackagePage.verifyFormIntroIsVisible();
});
Then("verify the SPA ID header exists on the withdrawal form", () => {
  WithdrawPackagePage.verifySPAIDHeaderExists();
});
Then("verify the SPA ID exists on the withdrawal form", () => {
  WithdrawPackagePage.verifySPAIDExists();
});
Then("verify the Waiver number header exists on the withdrawal form", () => {
  WithdrawPackagePage.verifyWaiverIDHeaderExists();
});
Then("verify the Waiver number exists on the withdrawal form", () => {
  WithdrawPackagePage.verifyWaiverIDExists();
});
Then("verify the Type header exists on the withdrawal form", () => {
  WithdrawPackagePage.verifyTypeHeaderExists();
});
Then("verify the type is {string}", (string) => {
  WithdrawPackagePage.verifyTypeIs(string);
});
Then(
  "verify the Upload Supporting Documentation header exists on the withdrawal form",
  () => {
    WithdrawPackagePage.verifyUploadSupportingDocumentationHeaderExists();
  }
);
Then("upload withdrawal documentation", () => {
  WithdrawPackagePage.uploadWithdrawalLetterAddFile();
});
Then("verify the Additional Info header exists on the withdrawal form", () => {
  WithdrawPackagePage.verifyAdditionalInfoHeaderExists();
});
Then("add additional info comment in the withdrawal form", () => {
  WithdrawPackagePage.addWithdrawalComment();
});
Then("clear additional info comment in the withdrawal form", () => {
  WithdrawPackagePage.clearWithdrawalComment();
});
Then("verify there is a Subject header in the details section", () => {
  OneMacPackageDetailsPage.verifySubjectHeaderExists();
});
Then("verify the subject has a value displayed in the details section", () => {
  OneMacPackageDetailsPage.verifySubjectValueExists();
});
Then("verify subject is not visible in the details section", () => {
  OneMacPackageDetailsPage.verifySubjectDoesNotExists();
});
Then("verify there is a description header in the details section", () => {
  OneMacPackageDetailsPage.verifyDescrptionHeaderExists();
});
Then(
  "verify the description has a value displayed in the details section",
  () => {
    OneMacPackageDetailsPage.verifyDescriptionValueExists();
  }
);
Then("verify description is not visible in the details section", () => {
  OneMacPackageDetailsPage.verifyDescrptionDoesNotExists();
});
Then("verify the attachment info descriptiion", () => {
  OneMacDefaultForms.verifyAttachmentInfoDecription();
});
Then("verify the attachment info link is for {string}", (packageType) => {
  OneMacDefaultForms.verifyAttachmentInfoLinkFor(packageType);
});
Then("verify there is a CPOC header in the details section", () => {
  OneMacPackageDetailsPage.verifyCPOCNameHeaderExists();
});
Then("verify the CPOC has a value displayed in the details section", () => {
  OneMacPackageDetailsPage.verifyCPOCNameValueExists();
});
Then("verify CPOC is not visible in the details section", () => {
  OneMacPackageDetailsPage.verifyCPOCNameDoesNotExist();
});
Then("verify there is a Review Team SRT header in the details section", () => {
  OneMacPackageDetailsPage.verifyReviewTeamSRTHeaderExists();
});
Then(
  "verify the Review Team SRT has a value displayed in the details section",
  () => {
    OneMacPackageDetailsPage.verifyReviewTeamSRTValueExists();
  }
);
Then("verify Review Team SRT is not visible in the details section", () => {
  OneMacPackageDetailsPage.verifyReviewTeamSRTDoesNotExists();
});
Then("verify the Formal RAI Response caret button exists", () => {
  OneMacPackageDetailsPage.verifyFormalRAIResponseCaretBtnExists();
});
Then("expand the Formal RAI Response caret button", () => {
  OneMacPackageDetailsPage.expandFormalRAIResponseCaretBtn();
});
Then("collapse the Formal RAI Response caret button", () => {
  OneMacPackageDetailsPage.collapseFormalRAIResponseCaretBtn();
});
Then("click the Formal RAI Response caret button", () => {
  OneMacPackageDetailsPage.clickFormalRAIResponseCaretBtn();
});
Then("verify the Formal RAI Response download all button exists", () => {
  OneMacPackageDetailsPage.verifyFormalRAIResponseDownloadAllBtnExists();
});
Then("click the Formal RAI Response download all button", () => {
  OneMacPackageDetailsPage.clickFormalRAIResponseDownloadAllBtn();
});
Then("verify the Initial Submission caret button exists", () => {
  OneMacPackageDetailsPage.verifyInitialSubmissionCaretBtnExists();
});
Then("expand the Initial Submission caret", () => {
  OneMacPackageDetailsPage.expandInitialSubmissionCaretBtn();
});
Then("collapse the Initial Submission caret button", () => {
  OneMacPackageDetailsPage.collapseInitialSubmissionCaretBtn();
});
Then("verify the Initial Submission download all button exists", () => {
  OneMacPackageDetailsPage.verifyInitialSubmissionDownloadAllBtnExists();
});
Then("click the Initial Submission download all button", () => {
  OneMacPackageDetailsPage.clickInitialSubmissionDownloadAllBtn();
});
Then("verify the Withdrawal Requested caret button exists", () => {
  OneMacPackageDetailsPage.verifyWithdrawalRequestedCaretBtnExists();
});
Then("expand the Withdrawal Requested caret", () => {
  OneMacPackageDetailsPage.expandWithdrawalRequestedCaretBtn();
});
Then("collapse the Withdrawal Requested caret button", () => {
  OneMacPackageDetailsPage.collapseWithdrawalRequestedCaretBtn();
});
Then("verify the Withdrawal Requested download all button exists", () => {
  OneMacPackageDetailsPage.verifyWithdrawalRequestedDownloadAllBtnExists();
});
Then("click the Withdrawal Requested download all button", () => {
  OneMacPackageDetailsPage.clickWithdrawalRequestedDownloadAllBtn();
});
