import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import MedicaidSPARAIResponsePage from "../../../support/pages/MedicaidSPARAIResponsePage";
import oneMacDashboardPage from "../../../support/pages/oneMacDashboardPage";
import oneMacDevLoginPage from "../../../support/pages/oneMacDevLoginPage";
import oneMacHomePage from "../../../support/pages/oneMacHomePage";
import oneMacSubmissionTypePage from "../../../support/pages/oneMacSubmissionTypePage";
import oneMacSubmitNewMedicaidSpaPage from "../../../support/pages/oneMacSubmitNewMedicaidSPAPage";
import utilities from "../../../support/utilities/utilities";
import oneMacUserManagmentPage from "../../../support/pages/oneMacUserManagmentPage";
import oneMacMyProfilePage from "../../../support/pages/oneMacMyProfilePage";
import oneMacCHIPSPAPage from "../../../support/pages/oneMacCHIPSPAPage";
import oneMacSubmitNewWaiverActionPage from "../../../support/pages/oneMacSubmitNewWaiverActionPage";
import oneMacRequestWaiverTemporaryExtension from "../../../support/pages/oneMacRequestWaiverTemporaryExtension";
import oneMacAppendixKAmendmentPage from "../../../support/pages/oneMacAppendixKAmendmentPage";
import oneMacPackagePage from "../../../support/pages/oneMacPackagePage";

const medicaidSPARAIResponsePage = new MedicaidSPARAIResponsePage();
const OneMacDashboardPage = new oneMacDashboardPage();
const OneMacDevLoginPage = new oneMacDevLoginPage();
const OneMacHomePage = new oneMacHomePage();
const OneMacSubmissionTypePage = new oneMacSubmissionTypePage();
const OneMacSubmitNewMedicaidSpaPage = new oneMacSubmitNewMedicaidSpaPage();
const Utilities = new utilities();
const OneMacUserManagmentPage = new oneMacUserManagmentPage();
const OneMacMyProfilePage = new oneMacMyProfilePage();
const OneMacCHIPSPAPage = new oneMacCHIPSPAPage();
const OneMacSubmitNewWaiverActionPage = new oneMacSubmitNewWaiverActionPage();
const OneMacRequestWaiverTemporaryExtension =
  new oneMacRequestWaiverTemporaryExtension();
const OneMacPackagePage = new oneMacPackagePage();
const OneMacAppendixKAmendmentPage = new oneMacAppendixKAmendmentPage();
const SPAID = Utilities.SPAID("MD");
const validWaiverNumberWith5Numbers =
  Utilities.generateWaiverNumberWith5Characters("MD");

Given("I am on Login Page", () => {
  OneMacHomePage.launch();
});

When("Clicking on Development Login", () => {
  OneMacHomePage.clickDevelopmentLogin();
});

When("Login with state submitter user", () => {
  OneMacDevLoginPage.loginAsStateSubmiiter();
});
Then("click on New Submission", () => {
  OneMacDashboardPage.clickNewSubmission();
});
And("Click on State Plan Amendment SPA", () => {
  OneMacSubmissionTypePage.clickStatePlanAmendmentSPA();
});
And("click on Medicaid SPA", () => {
  OneMacSubmissionTypePage.clickMedicaidSPA();
});
And("type in SPA ID", () => {
  OneMacSubmitNewMedicaidSpaPage.inputSpaID(SPAID);
});
And("Add file for CMS Form 179", () => {
  OneMacSubmitNewMedicaidSpaPage.uploadCMSForm179AddFile();
});
And("Add file for SPA Pages", () => {
  OneMacSubmitNewMedicaidSpaPage.uploadSPAPagesAddFile();
});
And("Type Additonal Information Comments", () => {
  OneMacSubmitNewMedicaidSpaPage.AdditionalInformationTypeComment(
    "This is just a test"
  );
});
And("Click on Submit Button", () => {
  OneMacSubmitNewMedicaidSpaPage.clicksubmitBTN();
});
And("verify submission Successful message", () => {
  OneMacDashboardPage.verifySuccessMessageIsDisplayed();
});
And("verify SPA ID EXISTS", () => {
  OneMacDashboardPage.verifyIDNumber(SPAID);
});
And("verify submission date", () => {
  OneMacDashboardPage.verifyDate();
});
And("Verify submission type", () => {
  OneMacDashboardPage.verifyType("Medicaid SPA");
});
And("click on spa Respond to RAI", () => {
  OneMacDashboardPage.clickOnrespondToRAI();
});
And("Add file for RAI Response", () => {
  medicaidSPARAIResponsePage.uploadRAIResponseAddFile();
});
And("Add Additional Comments", () => {
  medicaidSPARAIResponsePage.addCommentsRAIRespone();
});
// And('Click on Submit Button', ()=>{
//     medicaidSPARAIResponsePage.clickSubmitBTN();
// })
And("verify submission Successful message after RAI", () => {
  OneMacDashboardPage.verifySuccessMessageIsDisplayedAfterRAIResponse();
});
And("Verify submission typeRAI", () => {
  OneMacDashboardPage.verifyType("SPA RAI");
});
And("Verify SPA RAI ID number matches Medical SPA ID number", () => {
  // //This Needs to change
  // OneMacDashboardPage.verifyType("SPA RAI");
  OneMacDashboardPage.verifySPARAIIDNumberMatchesMedicalSPAIDNumber(SPAID);
});
//this is for the oy2 8616
When("Login with cms role approver", () => {
  OneMacDevLoginPage.loginAsCMSRoleApprover();
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
And("verify Profile Information is Displayed", () => {
  OneMacMyProfilePage.verifyProfileInformationIsDisplayed();
});
And("Full Name text is Displayed", () => {
  OneMacMyProfilePage.verifyFullNameHeader();
});
And("Actual Full Name is Displayed", () => {
  OneMacMyProfilePage.verifyFullName();
});
And("Role text is Displayed", () => {
  OneMacMyProfilePage.verifyRoleHeader();
});
And("Actual Role is Displayed", () => {
  OneMacMyProfilePage.verifyRole();
});
And("Email text is Displayed", () => {
  OneMacMyProfilePage.verifyEmailHeader();
});
And("Actual Email is Displayed", () => {
  OneMacMyProfilePage.verifyEmail();
});
And("Phone Number text is Displayed", () => {
  OneMacMyProfilePage.verifyPhoneNumberHeader();
});
And("Phone Number Add Button is Displayed", () => {
  OneMacMyProfilePage.verifyPhoneNumberAddBTN();
});
And("Status text is Displayed", () => {
  OneMacMyProfilePage.verifyStatusHeader();
});
And("Actual Status is Displayed with Access Granted", () => {
  OneMacMyProfilePage.verifyAccessStatus();
});

// this uis for 8616
When("Login with cms System Admin", () => {
  OneMacDevLoginPage.loginAsCMSSystemAdmin();
});
And("Click on User Management Tab", () => {
  OneMacDashboardPage.clickUserManagementTab();
});
// this is for oy2_10093
When("Login with cms Help Desk User", () => {
  OneMacDevLoginPage.loginAsHelpDeskUser();
});
Then("i am on Dashboard Page", () => {
  OneMacDashboardPage.verifyWeAreOnDashboardPage();
});
And("verify Submission List is Displayed", () => {
  OneMacDashboardPage.verifySubmissionListIsDisplayed();
});
And("verify Export to Excel CSV is Displayed", () => {
  OneMacDashboardPage.verifyexportToEXcelCSVBTNIsDisplayed();
});
And("verify IDNumber is Displayed", () => {
  OneMacDashboardPage.verifyidNumberHeaderIsDisplayed();
});
And("verify Type is Displayed", () => {
  OneMacDashboardPage.verifytypeHeaderIsDisplayed();
});
And("verify state is Displaed", () => {
  OneMacDashboardPage.verifyStateHeaderIsDisplayed();
});
And("verify Date Submitted is Displayed", () => {
  OneMacDashboardPage.verifyDateSubmittedHeaderIsDisplayed();
});
And("verify Submitted By is Displayed", () => {
  OneMacDashboardPage.verifySubmittedByHeadersDisplayed();
});
And("verify User Management is Displayed", () => {
  OneMacUserManagmentPage.verifyUserManagmentHeaderIsDisplayed();
});
And("verify Name is Displayed", () => {
  OneMacUserManagmentPage.verifyNameHeaderIsDisplayed();
});
And("verify State is Displayed", () => {
  OneMacUserManagmentPage.verifyStateHeaderIsDisplayed();
});
And("verify Status is Displayed", () => {
  OneMacUserManagmentPage.verifyStatusHeaderIsDisplayed();
});
And("verify Role is Displayed", () => {
  OneMacUserManagmentPage.verifyRoleHeaderIsDisplayed();
});
And("verify Last Modified is Displayed", () => {
  OneMacUserManagmentPage.verifyLastModifiedHeaderIsDisplayed();
});
And("verify Modified By is Displayed", () => {
  OneMacUserManagmentPage.verifyModifiedByHeaderIsDisplayed();
});
//this is for oy2 9990
And("verify Home tab is Displayed", () => {
  OneMacUserManagmentPage.verifyHomeTabIsDisplayed();
});
And("dashboard tab is Displayed", () => {
  OneMacUserManagmentPage.verifyDashboardTabIsDisplayed();
});
And("FAQ tab is Displayed", () => {
  OneMacUserManagmentPage.verifyFAQTabIsDisplayed();
});
And("verify Actions is Displayed", () => {
  OneMacUserManagmentPage.verifyActionsHeaderIsDisplayed();
});
//this is for oy2_9990 state submitter
And("verify New Submission BTN is Displayed", () => {
  OneMacDashboardPage.verifyNewSubmissionBTNIsDisplayed();
});

//this is for OY2_3900
And("verify error message is not present", () => {
  OneMacSubmitNewMedicaidSpaPage.verifySPAIDErrorMessageIsNotDisplayed();
});

And("clear SPA ID Input box", () => {
  OneMacSubmitNewMedicaidSpaPage.clearSPAIDInputBox();
});

And("Return to dashboard Page", () => {
  OneMacSubmitNewMedicaidSpaPage.clickOnDashboardTab();
});

And("type in invalid SPA ID", () => {
  OneMacSubmitNewMedicaidSpaPage.typeIncorrectSPAIDAndFormat();
});

And("verify that error message for incorrect SPA ID is Displayed", () => {
  OneMacSubmitNewMedicaidSpaPage.verifySPAIDErrorMessageIsDisplayed();
});

And("click on CHIP SPA", () => {
  OneMacSubmissionTypePage.clickChipSPA();
});

And("type in SPA ID in CHIP SPA page", () => {
  OneMacCHIPSPAPage.inputSpaID(SPAID);
});
And("verify error message is not present on Submit New CHIP SPA Page", () => {
  OneMacCHIPSPAPage.verifyErrorMessageIsNotDisplayed();
});
And("clear SPA ID Input box CHIP SPA page", () => {
  OneMacCHIPSPAPage.clearSPAIDInputBox();
});

And("type in invalid SPA ID on CHIP SPA page", () => {
  OneMacCHIPSPAPage.inputIncorrectSPAIDFormat();
});

And(
  "verify that error message for incorrect SPA ID is Displayed on CHIP SPA Page",
  () => {
    OneMacCHIPSPAPage.verifyErrorMessageIsDisplayed();
  }
);

And("Click on Waiver Action", () => {
  OneMacSubmissionTypePage.clickwaiverAction();
});

And("Click on Waiver Action under Waiver Type", () => {
  OneMacSubmissionTypePage.clickWaiverActionUnderWaiverAction();
});

And("Click on New Waiver under Action type", () => {
  OneMacSubmitNewWaiverActionPage.selectNewWaiverUnderActionType();
});

And("type in a correct Waiver Number with 4 characters", () => {
  OneMacSubmitNewWaiverActionPage.inputWaiverNumber("MD.7298");
});

And("verify error message is not present on New Waiver Page", () => {
  OneMacSubmitNewWaiverActionPage.verifyErrorMessageIsNotDisplayed();
});

And("clear Waiver Number Input box", () => {
  OneMacSubmitNewWaiverActionPage.clearWaiverNumberInputBox();
});

And("type in a correct Waiver Number with 5 characters", () => {
  OneMacSubmitNewWaiverActionPage.inputWaiverNumber("MD.72988");
});

And("type in invalid Waiver Number", () => {
  OneMacSubmitNewWaiverActionPage.inputWaiverNumber("MD.123456");
});

And("verify error message is present on New Waiver Page", () => {
  OneMacSubmitNewWaiverActionPage.verifyErrorMessageIsDisplayed();
});

And("Click on Request Temporary Extension", () => {
  OneMacSubmissionTypePage.clickRequestTemporaryExtension();
});

And(
  "Type waiver number with 4 characters on Request Waiver Temporary Extenstion Page",
  () => {
    OneMacRequestWaiverTemporaryExtension.inputWaiverNumber("MD.1234");
  }
);

And(
  "verify error message is not present on Request Waiver Temporary Extenstion Page",
  () => {
    OneMacRequestWaiverTemporaryExtension.verifyErrorMessageIsNotDisplayed();
  }
);

And(
  "clear Waiver Number Input box on Request Waiver Temporary Extenstion Page",
  () => {
    OneMacRequestWaiverTemporaryExtension.clearWaiverNumberInputBox();
  }
);

And(
  "Type waiver number with 5 characters on Request Waiver Temporary Extenstion Page",
  () => {
    OneMacRequestWaiverTemporaryExtension.inputWaiverNumber("MD.12345");
  }
);

And(
  "type in invalid Waiver Number on Request Waiver Temporary Extenstion Page",
  () => {
    OneMacRequestWaiverTemporaryExtension.inputWaiverNumber("MD.123");
  }
);

And(
  "verify that error message for incorrect Waiver Number is Displayed",
  () => {
    OneMacRequestWaiverTemporaryExtension.verifyErrorMessageIsDisplayed();
  }
);

And("Click on Appendix K Amendment", () => {
  OneMacSubmissionTypePage.clickAppendixKAmendment();
});

And(
  "type in Waiver Number with 4 characters On Appendix K Amendment Page",
  () => {
    OneMacAppendixKAmendmentPage.inputWaiverNumber("MD.1234.R12.12");
  }
);

And("verify error message is not present On Appendix K Amendment Page", () => {
  OneMacAppendixKAmendmentPage.verifyErrorMessageIsNotDisplayed();
});

And("clear Waiver Number Input box On Appendix K Amendment Page", () => {
  OneMacAppendixKAmendmentPage.clearWaiverNumberInputBox();
});
//find a waiver number that exits with 5 characters
And(
  "type in Waiver Number with 5 characters On Appendix K Amendment Page",
  () => {
    OneMacAppendixKAmendmentPage.inputWaiverNumber("MD.1234.R12.12");
  }
);

And("type in invalid Waiver Number On Appendix K Amendment Page", () => {
  OneMacAppendixKAmendmentPage.inputWaiverNumber("MD.123");
});

And(
  "verify that error message for incorrect Waiver Number is Displayed On Appendix K Amendment Page",
  () => {
    OneMacAppendixKAmendmentPage.verifyErrorMessageIsDisplayed();
  }
);
//this is for oy2_4807
And(
  "Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority",
  () => {
    OneMacSubmitNewWaiverActionPage.select1915b4FFSSelectiveContractingwaiversUnderWaiverAuthority();
  }
);

And("Upload 1915 b 4 file", () => {
  OneMacSubmitNewWaiverActionPage.upload1915B4File();
});

And("Type {string} in Summary Box", (Comments) => {
  OneMacSubmitNewWaiverActionPage.inputComments(Comments);
});

And("verify ID Number Exists", () => {
  OneMacDashboardPage.verifyIDNumberIsDisplayed();
});

And("Click on All other 1915 b Waivers under Waiver Authority", () => {
  OneMacSubmitNewWaiverActionPage.selectAllOther1915bWaiversUnderWaiverAuthority();
});

And("Click on Waiver Amendment under Action type", () => {
  OneMacSubmitNewWaiverActionPage.selectWaiverAmendmentUnderActionType();
});

And("Click on Request for waiver renewal from Action Type", () => {
  OneMacSubmitNewWaiverActionPage.selectRequestForWaiverRenewalUnderActionType();
});

And("type in Existing Waiver Number", () => {
  OneMacSubmitNewWaiverActionPage.inputExistingWaiverNumber();
});

And("Type Valid Waiver Number With 5 Characters", () => {
  OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
    validWaiverNumberWith5Numbers
  );
});

And("click on Packages", () => {
  OneMacDashboardPage.clickPackageTab();
});

When("Login with CMS Reviewer User", () => {
  OneMacDevLoginPage.loginAsCMSReviewer();
});

And(
  "verify 90th day column is available to the immediate left to the status column",
  () => {
    OneMacPackagePage.verify90thDayColumn();
  }
);

And("verify that value of the column for the ID is Pending", () => {
  OneMacPackagePage.verifyValue();
});

And(
  "verify that 90th day value is Jan 5, 2022 for the Id Number MD.32560",
  (s) => {
    OneMacPackagePage.findIdNumberMD32560();
  }
);

And("verify that 90th day value of WI-23-2222-MED1 is NA", () => {
  OneMacPackagePage.findIdNumberWI232222MED1();
});

And("navigate to {string}", (s) => {
  OneMacDashboardPage.navigatetoURL(s);
});
And(
  "verify Expiration Date column is available to the immediate left to the status column",
  () => {
    OneMacPackagePage.verifyexpirationDateColumnHeaderExists();
  }
);
And("expiration date on MD.32560 is Oct 14, 2026", () => {
  OneMacPackagePage.verifyMD32560ExpirationDateIsSetTooct142026();
});
And("Expiration Date value for generated Record is {string}", (s) => {
  OneMacPackagePage.verifyExpirationDateFirstValue(s);
});
And("Add file for Current State Plan", () => {
  OneMacCHIPSPAPage.uploadCurrentStatePlanFile();
});
And("Add file for Amended State Plan Language", () => {
  OneMacCHIPSPAPage.uploadAmendedStatePlanLanguageFile();
});
And("Add file for Cover Letter", () => {
  OneMacCHIPSPAPage.uploadCoverLetterFile();
});

And("Add file for Revised Amended State Plan Language", () => {
  medicaidSPARAIResponsePage.uploadChipSPARAIRESPONSERevisedAmendedStatePlanLanguage();
});

And("Add file for Official RAI Response", () => {
  medicaidSPARAIResponsePage.uploadOfficialRAIResponse();
});

When("Login with cms role approver Revoked", () => {
  OneMacDevLoginPage.loginAsCMSUserRevoked();
});

When("Login with cms role approver Denied", () => {
  OneMacDevLoginPage.loginAsCMSUserDenied();
});

And("Actual Status is Displayed with Access Revoked", () => {
  OneMacMyProfilePage.verifyAccessStatusRevoked();
});

And("Actual Status is Displayed with Access Denied", () => {
  OneMacMyProfilePage.verifyAccessStatusDenied();
});
