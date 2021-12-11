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
import oneMacFAQPage from "../../../support/pages/oneMacFAQPage";

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
const OneMacFAQPage = new oneMacFAQPage();

Given("I am on Login Page", () => {
  OneMacHomePage.launch();
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
//OY2-5869
And("Add {string} file to form 179", (fileName) => {
  OneMacSubmitNewMedicaidSpaPage.addFileForForm179(fileName);
});

And("Verify {string} is added to form 179", (fileName) => {
  OneMacSubmitNewMedicaidSpaPage.verifyFileAddedForForm179(fileName);
});

And("Verify {string} is not added to form 179", (fileName) => {
  OneMacSubmitNewMedicaidSpaPage.verifyFileNotAddedForForm179(fileName);
});

And("Delete file from form 179", () => {
  OneMacSubmitNewMedicaidSpaPage.deleteFileFromForm179();
});

//End OY2-5869
And("Add file for SPA Pages", () => {
  OneMacSubmitNewMedicaidSpaPage.uploadSPAPagesAddFile();
});

And("Add file {string} for SPA Pages", (fileName) => {
  OneMacSubmitNewMedicaidSpaPage.addFilesToSpaPages(fileName);
});

And("Add no files to SPA Pages", () => {
  oneMacSubmitNewMedicaidSpaPage.addNoFilesToSpaPages();
});

And("Verify no files added to SPA Pages", () => {
  oneMacSubmitNewMedicaidSpaPage.verifyNoFilesAttachedToSpaPages();
});

And("Verify {string} is added to SPA Pages", (fileName) => {
  OneMacSubmitNewMedicaidSpaPage.verifyFileAddedForSpaPages(fileName);
});

And("Verify file {string} exists in Spa Pages", (fileName) => {
  OneMacSubmitNewMedicaidSpaPage.verifyFileNameExistsInSpaPages(fileName);
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

And("verify CHIP ID EXISTS", () => {
  OneMacDashboardPage.verifyIDNumber(SPAID);
});

And("type in CHIP ID", () => {
  OneMacSubmitNewMedicaidSpaPage.inputSpaID(SPAID);
});

And("click on CHIP Respond to RAI", () => {
  OneMacDashboardPage.clickOnrespondToRAI();
});

And("Verify CHIP RAI ID number matches CHIP SPA ID number", () => {
  OneMacDashboardPage.verifySPARAIIDNumberMatchesCHIPSPAIDNumber(SPAID);
});

And("verify submission date", () => {
  OneMacDashboardPage.verifyDate();
});
And("Verify submission type", () => {
  OneMacDashboardPage.verifyType("Medicaid SPA");
});

And("Verify submission Waiver type", () => {
  OneMacDashboardPage.verifyType("Waiver");
});

And("Verify submission CHIP type", () => {
  OneMacDashboardPage.verifyType("CHIP SPA");
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

And("Verify submission type Waiver RAI", () => {
  OneMacDashboardPage.verifyType("Waiver RAI");
});

And("Verify submission typeCHIP SPA RAI", () => {
  OneMacDashboardPage.verifyType("CHIP SPA RAI");
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
And("Click on the SPA ID Link", () => {
  OneMacDashboardPage.clickOnSpaID();
});
And("Verify {string} exists in the attachments", (fileName) => {
  OneMacDashboardPage.verifyAttachmentExists(fileName);
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

And("click on Waiver Action on Waiver Action Type page", () => {
  OneMacSubmissionTypePage.clickWaiverActionUnderWaiverAction();
});

And("select Action Type New Waiver", () => {
  OneMacSubmitNewWaiverActionPage.selectNewWaiverUnderActionType();
});

And("select 1915b 4 FFS Selective Contracting waivers", () => {
  OneMacSubmitNewWaiverActionPage.select1915b4FFSSelectiveContractingwaiversUnderWaiverAuthority();
});

And(
  "Add file for 1915b 4 FFS Selective Contracting waiver application pre-print",
  () => {
    OneMacSubmitNewWaiverActionPage.upload1915B4File();
  }
);

And("verify Waiver Number EXISTS", () => {
  OneMacDashboardPage.verifyIDNumber(
    OneMacSubmitNewWaiverActionPage.getSharedWaiverNumber()
  );
});

And("click on Waiver Respond to RAI", () => {
  OneMacDashboardPage.clickOnrespondToRAI();
});

And("Add file for Waiver RAI Response", () => {
  medicaidSPARAIResponsePage.uploadRAIResponseAddFile();
});

And("Verify Waiver RAI ID number matches Waiver number", () => {
  OneMacDashboardPage.verifySPARAIIDNumberMatchesMedicalSPAIDNumber(
    OneMacSubmitNewWaiverActionPage.getSharedWaiverNumber()
  );
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
    OneMacAppendixKAmendmentPage.inputWaiverNumber(
      `${OneMacSubmitNewWaiverActionPage.getSharedWaiverNumber()}.R00.12`
    );
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

And("Type Unique Valid Waiver Number With 5 Characters", () => {
  OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
    Utilities.generateWaiverNumberWith5Characters("MD")
  );
});

And("Type Valid Waiver Number With 5 Characters", () => {
  let num = OneMacSubmitNewWaiverActionPage.getSharedWaiverNumber();
  if (!num) {
    num = Utilities.generateWaiverNumberWith5Characters("MD");
    OneMacSubmitNewWaiverActionPage.setSharedWaiverNumber(num);
  }

  OneMacSubmitNewWaiverActionPage.inputWaiverNumber(num);
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
  () => {
    OneMacPackagePage.findIdNumberMD32560(
      OneMacSubmitNewWaiverActionPage.getSharedWaiverNumber()
    );
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

And("Verify General Section Exists", () => {
  OneMacFAQPage.verifyGeneralSectionExists();
});

And(
  "Verify What browsers can I use to access the system link is displayed and click it",
  () => {
    OneMacFAQPage.verifyVerifyWhatbrowserscanIusetoaccessthesystemlinkisdisplayedandclickit();
  }
);

And(
  "Verify text contains The submission portal works best on Google Chrome",
  () => {
    OneMacFAQPage.verifytextcontainsThesubmissionportalworksbestonGoogleChrome();
  }
);

And(
  "Verify What should we do if we don’t receive a confirmation email is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhatshouldwedoifwedontreceiveaconfirmationemailisdisplayedandclickit();
  }
);

And(
  "Verify text contains Refresh your inbox, check your SPAM filters, then contact the OneMAC Help Desk",
  () => {
    OneMacFAQPage.VerifytextcontainsRefreshyourinboxcheckyourSPAMfiltersthencontacttheOneMACHelpDesk();
  }
);

And(
  "Verify Is this considered the official state submission is displayed and click it",
  () => {
    OneMacFAQPage.VerifyIsthisconsideredtheofficialstatesubmissionisdisplayedandclickit();
  }
);
And(
  "Verify text contains Yes as long as you have the electronic receipt confirmation email Your submission is considered your official state submission",
  () => {
    OneMacFAQPage.VerifytextcontainsYesaslongasuouhavetheelectronicreceipt();
  }
);
And("Verify What are the OneMAC user roles is displayed and click it", () => {
  OneMacFAQPage.VerifyWhataretheOneMACuserrolesisdisplayedandclickit();
});
And("Verify text contains State Submitter", () => {
  OneMacFAQPage.VerifytextcontainsStateSubmitter();
});
And("Verify text contains State System Administrator", () => {
  OneMacFAQPage.VerifytextcontainsStateSystemAdministrator();
});
And("Verify text contains CMS Role Approver", () => {
  OneMacFAQPage.VerifytextcontainsCMSRoleApprover();
});
And("Verify State Plan Amendments SPAs Section Exists", () => {
  OneMacFAQPage.verifySPASectionExists();
});
And(
  "Verify What What format is used to enter a SPA ID is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhatWhatformatisusedtoenteraSPAIDisdisplayedandclickit();
  }
);
And(
  "Verify text contains Enter the State Plan Amendment transmittal number Assign consecutive numbers on a calendar year basis",
  () => {
    OneMacFAQPage.VerifytextcontainsEntertheStatePlanAmendmenttransmittalnumberAssignconsecutivenumbersonacalendaryearbasis();
  }
);
And(
  "Verify What are the attachments for a Medicaid SPA is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhataretheattachmentsforaMedicaidSPAisdisplayedandclickit();
  }
);
And(
  "Verify text contains SPA submission requirements can be found in regulation",
  () => {
    OneMacFAQPage.VerifytextcontainsSPAsubmissionrequirementscanbefoundinregulation();
  }
);
And(
  "Verify What are the attachments for a Medicaid response to Request for Additional Information RAI is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhataretheattachmentsforaMedicaidresponsetoRequestforAdditionalInformationRAIisdisplayedandclickit();
  }
);
And('Verify text contains "indicates a required attachment"', () => {
  OneMacFAQPage.VerifyWhatWhatformatisusedtoenteraSPAIDisdisplayedandclickit();
});
And(
  "Verify What are the attachments for a CHIP SPA is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhataretheattachmentsforaCHIPSPAisdisplayedandclickit();
  }
);
And(
  "Verify What are the attachments for a CHIP SPA response to Request for Additional Information RAI is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhataretheattachmentsforaCHIPSPAresponsetoRequestforAdditionalInformationRAIisdisplayedandclickit();
  }
);
And(
  "Verify Can I submit SPAs relating to the Public Health Emergency PHE in OneMAC is displayed and click it",
  () => {
    OneMacFAQPage.VerifyCanIsubmitSPAsrelatingtothePublicHealthEmergencyPHEinOneMACisdisplayedandclickit();
  }
);

And(
  'Verify text contains "Yes, all PHE-related SPAs should be submitted through OneMAC"',
  () => {
    OneMacFAQPage.VerifytextcontainsYesallPHErelatedSPAsshouldbesubmittedthroughOneMAC();
  }
);
And("Verify Waivers Section Exists", () => {
  OneMacFAQPage.verifyWaiversExists();
});

And(
  "Verify What format is used to enter a 1915b waiver number is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhatformatisusedtoentera1915bwaivernumberisdisplayedandclickit();
  }
);

And('Verify text contains "Waiver number must follow the format"', () => {
  OneMacFAQPage.VerifytextcontainsWaivernumbermustfollowtheformat();
});

And(
  "Verify Who can I contact to help me figure out the correct 1915b Waiver Number is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhocanIcontacttohelpmefigureoutthecorrect1915bWaiverNumberisdisplayedandclickit();
  }
);
And(
  'Verify text contains "Email MCOGDMCOActions@cms.hhs.gov to get support with determining the correct 1915b Waiver Number"',
  () => {
    OneMacFAQPage.VerifytextcontainsEmailMCOGDMCOActionscmshhsgovtogetsupportwithdeterminingthecorrect1915bWaiverNumber();
  }
);
And(
  "Verify What format is used to enter a 1915c waiver number is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhatformatisusedtoentera1915cwaivernumberisdisplayedandclickit();
  }
);
And(
  'Verify text contains "Waiver number must follow the format SS.####.R##.## or SS.#####.R##.## to include"',
  () => {
    OneMacFAQPage.VerifytextcontainsWaivernumbermustfollowtheformatSStoinclude();
  }
);
And(
  "Verify What attachments are needed to submit a 1915b waiver action is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhatattachmentsareneededtosubmita1915bwaiveractionisdisplayedandclickit();
  }
);
And(
  'Verify text contains "The regulations at 42 C.F.R. §430.25, 431.55 and 42 C.F.R. §441.301"',
  () => {
    OneMacFAQPage.VerifytextcontainsTheregulationsat42CFR4302543155and42CFR441301();
  }
);
And(
  "Verify What are the attachments for a 1915b Waiver response to Request for Additional Information RAI is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhataretheattachmentsfora1915bWaiverresponsetoRequestforAdditionalInformationRAIisdisplayedandclickit();
  }
);
And(
  "Verify What are the attachments for a 1915b Waiver Request for Temporary Extension is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhataretheattachmentsfora1915bWaiverRequestforTemporaryExtensionisdisplayedandclickit();
  }
);
And(
  "Verify Can I submit Appendix K amendments in OneMAC is displayed and click it",
  () => {
    OneMacFAQPage.VerifyCanIsubmitAppendixKamendmentsinOneMACisdisplayedandclickit();
  }
);
And('Verify text contains "Yes, you can submit Appendix K amendments"', () => {
  OneMacFAQPage.VerifytextcontainsYesyoucansubmitAppendixKamendments();
});
And(
  "Verify What are the attachments for a 1915c Appendix K Waiver is displayed and click it",
  () => {
    OneMacFAQPage.VerifyWhataretheattachmentsfora1915cAppendixKWaiverisdisplayedandclickit();
  }
);
And(
  'Verify text contains "The regulations at 42 C.F.R. §430.25, 431.55 and 42 C.F.R. §441.301 describe the"',
  () => {
    OneMacFAQPage.VerifytextcontainsTheregulationsat42CFR4302543155and42CFR441301describethe();
  }
);
And("Verify OneMAC Help Desk Contact Info Section Exists", () => {
  OneMacFAQPage.verifyOneMacHelpDeskInfoExists();
});
And("Verify Phone Number Exists", () => {
  OneMacFAQPage.verifyOneMacHelpDeskInfoExists();
});
And("Verify actual Phone Number Exists", () => {
  OneMacFAQPage.verifyActualphoneNumberExists();
});
And("Verify Email Exists", () => {
  OneMacFAQPage.verifyemailExists();
});
And("Verify actual Email Exists", () => {
  OneMacFAQPage.verifyActualemailExists();
});
And("Verify page title is FAQ", () => {
  OneMacFAQPage.VerifypagetitleisFAQ();
});
And("Verify Frequently Asked Questions Exists", () => {
  OneMacFAQPage.VerifyFrequentlyAskedQuestionsExists();
});
And("Click on What is my SPA ID link", () => {
  OneMacSubmitNewMedicaidSpaPage.clickWhatIsMySPAIDLink();
});
And("Click on What is my Waiver ID Link", () => {
  OneMacSubmitNewWaiverActionPage.clickWhatIsMyWaiverIdLink();
});

And("Home tab exists", () => {
  OneMacHomePage.verifyHomePageLinkExists();
});

And("FAQ tab exists", () => {
  OneMacHomePage.verifyFAQLinkExists();
});

And("Register exists", () => {
  OneMacHomePage.verifyRegisterLinkExists();
});

And("Login Exists", () => {
  OneMacHomePage.verifyloginBTNExists();
});

And("welcome message exists", () => {
  OneMacHomePage.verifywelcomeMSGExists();
});

And("state users section exists", () => {
  OneMacHomePage.verifystateUsersSectionExists();
});

And("cms users section exists", () => {
  OneMacHomePage.verifycmsUsersSectionExists();
});

And("do you have questions or need support exists", () => {
  OneMacHomePage.verifydoYouHaveQuestionsOrNeedSupportExists();
});

And("View FAQ exists", () => {
  OneMacHomePage.verifyviewFAQExists();
});

And("How to create a submission exists", () => {
  OneMacHomePage.verifyhowToCreateASubmissionExists();
});

And("Login with IDM Exists", () => {
  OneMacHomePage.verifyloginWithIDMExists();
});

And("Login with IDM Info Exists", () => {
  OneMacHomePage.verifyloginWithIDMInfoExists();
});

And("Attach your documents Exists", () => {
  OneMacHomePage.verifyAttachYourDocumentsExists();
});

And("Attach your documents info Exists", () => {
  OneMacHomePage.verifyAttachYourDocumentsInfoExists();
});

And("Receive an email confirmation Exists", () => {
  OneMacHomePage.verifyreceiveAnEmailConformationExists();
});

And("Receive an email confirmation details Exists", () => {
  OneMacHomePage.verifyreceiveAnEmailConformationInfoExists();
});

And("Submission Types include Exists", () => {
  OneMacHomePage.verifysubmissionTypesIncludeExists();
});

And(
  "Amendments to your Medicaid and CHIP State Plans not submitted through MACPro MMDL or WMS Exists",
  () => {
    OneMacHomePage.verifyfirstBulletExists();
  }
);

And(
  "Official state responses to formal requests for additional information RAIs for SPAs not submitted through MACPro Exists",
  () => {
    OneMacHomePage.verifySecondBulletExists();
  }
);

And(
  "Section 1915b waiver submissions those not submitted through WMS Exists",
  () => {
    OneMacHomePage.verifyThirdBulletExists();
  }
);

And(
  "Section 1915c Appendix K amendments which cannot be submitted through WMS Exists",
  () => {
    OneMacHomePage.verifyForthBulletExists();
  }
);

And(
  "Official state responses to formal requests for additional information RAIs for Section 1915b waiver actions in addition to submitting waiver changes in WMS if applicable Exists",
  () => {
    OneMacHomePage.verifyFifthBulletExists();
  }
);

And("How to review a submission exists", () => {
  OneMacHomePage.verifyhowToReviewASubmissionExists();
});

And("Receive an email for submission notification exists", () => {
  OneMacHomePage.verifyReceiveAnEmailForSubmissionNotificationExists();
});
And("Receive an email for submission notification information exists", () => {
  OneMacHomePage.verifyReceiveAnEmailForSubmissionNotificationInfoExists();
});
And("Login with EUA exists", () => {
  OneMacHomePage.verifyloginWithEUAExists();
});
And("Login with EUA information exists", () => {
  OneMacHomePage.verifyloginWithEUAInfoExists();
});
And("Review your assigned submission exists", () => {
  OneMacHomePage.verifyReviewYourAssignedSubmissionExists();
});
And("Review your assigned submission information exists", () => {
  OneMacHomePage.verifyReviewYourAssignedSubmissionInfoExists();
});
And("Submission Types include exists", () => {
  OneMacHomePage.verifyCMSUSERSsubmissionTypesIncludeExists();
});
And("Amendments to your Medicaid and CHIP State Plans exists", () => {
  OneMacHomePage.verifyCMSBullet1Exists();
});
And(
  "Official state responses to formal requests for additional information RAIs for SPAs exists",
  () => {
    OneMacHomePage.verifyCMSBullet2Exists();
  }
);
And("Section 1915b waiver submissions exists", () => {
  OneMacHomePage.verifyCMSBullet3Exists();
});
And("Section 1915c Appendix K amendments exists", () => {
  OneMacHomePage.verifyCMSBullet4Exists();
});
And(
  "Official state responses to formal requests for additional information RAIs for Section 1915b waiver actions exists",
  () => {
    OneMacHomePage.verifyCMSBullet5Exists();
  }
);
And(
  "State requests for Temporary Extensions for section 1915b and 1915c waivers exists",
  () => {
    OneMacHomePage.verifyCMSBullet6Exists();
  }
);

And("type in search bar expiration status “pending”", () => {
  OneMacPackagePage.typePendingInSearchBar();
});
And("verify Error message displayed should be No Results Found", () => {
  OneMacPackagePage.noResultsFoundErrorMessage();
});
And("type in search bar ID Number created", () => {
  OneMacPackagePage.typeCreatedIDNumber(SPAID);
});
And("verify user exists with id number searched", () => {
  OneMacPackagePage.verifyIDNumberExists(SPAID);
});
And("clear search bar", () => {
  OneMacPackagePage.clearSearchBar();
});
And("type in submitters name", () => {
  OneMacPackagePage.typeSubmittersName();
});
And("verify user exists with waiver number searched", () => {
  OneMacPackagePage.verifyIDNumberExists(
    OneMacSubmitNewWaiverActionPage.getSharedWaiverNumber()
  );
});
And("search existing user with all upper case", () => {
  OneMacPackagePage.typeSubmittersNameAllUpperCase();
});
And("search existing user with dash", () => {
  OneMacPackagePage.typedashInSearchBar();
});
And("verify search bar exists", () => {
  OneMacPackagePage.verifySearchBarExists();
});
And("verify search is displayed ontop of search bar", () => {
  OneMacPackagePage.verifySearchisDisplayed();
});
And("verify x in search bar exists to clear search and click it", () => {
  OneMacPackagePage.verifyxexistsandClickIt();
});
And("verify Error message details is displayed", () => {
  OneMacPackagePage.verifyErrorMessageDetails();
});
And("type in search bar not existing ID in search bar", () => {
  OneMacPackagePage.typeNinExistingID();
});
And("Verify State Column Exists", () => {
  OneMacPackagePage.verifyStateColumnExists();
});
And("Verify State Column is sortable", () => {
  OneMacPackagePage.verifyStateColumnIsSortable();
});
And("Verify Filter button exists", () => {
  OneMacPackagePage.verifyfilterButtonExists();
});
And("Click on Filter Button", () => {
  OneMacPackagePage.clickOnfilterButton();
});
And("verify Filter By Exists", () => {
  OneMacPackagePage.verifyfilterByExists();
});
And("verify Close Exists", () => {
  OneMacPackagePage.verifycloseButtonExists();
});
And("verify Type Exists", () => {
  OneMacPackagePage.verifytypeDropDownExists();
});
And("verify Status Exists", () => {
  OneMacPackagePage.verifystatusDropDownExists();
});
And("verify reset Exists", () => {
  OneMacPackagePage.verifyresetButtonExists();
});
And("click on Type", () => {
  OneMacPackagePage.clickTypeDropDown();
});
And("verify 1915b waiver exists", () => {
  OneMacPackagePage.verifywaiver1915bCheckBoxExists();
});
And("verify CHIP SPA Exists", () => {
  OneMacPackagePage.verifyCHIPSPACheckBoxExists();
});
And("verify Medicaid SPA Exists", () => {
  OneMacPackagePage.verifyMedicaidSPACheckBoxExists();
});
And("click on Status", () => {
  OneMacPackagePage.clickstatusDropDown();
});
And("verify rai response submitted exists", () => {
  OneMacPackagePage.verifyraiResponseSubmittedCheckBoxExists();
});
And("verify package in review exists", () => {
  OneMacPackagePage.verifypackageInReviewcheckBoxExists();
});
And("verify seatool status 1 exists", () => {
  OneMacPackagePage.verifyseaToolStatus1CheckBoxExists();
});
And("verify sparai submitted exists", () => {
  OneMacPackagePage.verifysparaiSubmittedExists();
});
And("click 1915b waiver check box", () => {
  OneMacPackagePage.clickwaiver1915bCheckBox();
});
And("click CHIP SPA check box", () => {
  OneMacPackagePage.clickCHIPSPACheckBox();
});
And("click Medicaid SPA check box", () => {
  OneMacPackagePage.clickMedicaidSPACheckBox();
});
And("verify Medicaid SPA Exists in list", () => {
  OneMacPackagePage.verifyMedicaidSPAInListExists();
});
