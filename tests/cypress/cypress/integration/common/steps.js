import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
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
And("type in SPA ID 1", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacCHIPSPAPage.inputSpaID(d.attachmentsSPAID1);
  });
});
And("type in SPA ID 2", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacCHIPSPAPage.inputSpaID(d.attachmentsSPAID2);
  });
});
And("type in SPA ID for RAI 1", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacCHIPSPAPage.inputSpaID(d.SPAIDforRAI1);
  });
});
And("type in SPA ID for RAI 2", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacCHIPSPAPage.inputSpaID(d.SPAIDforRAI2);
  });
});
And("type in Medicaid SPA ID", () => {
  cy.fixture("packageDashboardSPAIDs.json").then((d) => {
    OneMacSubmitNewMedicaidSpaPage.inputSpaID(d.newMedicaidSPAID);
  });
});
And("type in Chip SPA ID", () => {
  cy.fixture("packageDashboardSPAIDs.json").then((d) => {
    OneMacSubmitNewMedicaidSpaPage.inputSpaID(d.newChipSPAID);
  });
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
And("Type Additonal Info Comments in new form", () => {
  OneMacSubmitNewMedicaidSpaPage.additionalInfoTypeComment(
    "This is just a test"
  );
});
And("Click on Submit Button", () => {
  OneMacDefaultForms.clicksubmitBTN();
});
And("Click the Submit Button without waiting", () => {
  OneMacDefaultForms.clicksubmitBTNWithoutWait();
});
And("click yes, submit RAI response button", () => {
  OneMacRespondToRAIPage.clickYesSubmitBTN();
});
And("verify submission warning text is visible", () => {
  OneMacSubmitNewMedicaidSpaPage.verifySubmissionWarningTextIsVisible();
});
And("verify submission warning text", () => {
  OneMacSubmitNewMedicaidSpaPage.verifySubmissionWarningText();
});
And("verify the form Submit Button exists", () => {
  OneMacDefaultForms.verifySubmitBtnExists();
});
And("verify form cancel button exists", () => {
  OneMacDefaultForms.verifyCancelBtnExists();
});
And("click form cancel button", () => {
  OneMacDefaultForms.clickCancelBtn();
});
And("click Leave Anyway form button", () => {
  OneMacSubmitNewMedicaidSpaPage.clickLeaveAnywayBtn();
});
And("click Stay on Page", () => {
  OneMacSubmitNewMedicaidSpaPage.clickStayOnPageBtn();
});
And("verify submission Successful message", () => {
  OneMacDashboardPage.verifySuccessMessageIsDisplayed();
});
And("verify submission successful message in the alert bar", () => {
  OneMacDashboardPage.verifySuccessMessage1IsDisplayed();
});
And("verify SPA ID 1 EXISTS", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacDashboardPage.verifyIDNumber(d.attachmentsSPAID1);
  });
});
And("verify SPA ID 2 EXISTS", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacDashboardPage.verifyIDNumber(d.attachmentsSPAID2);
  });
});
And("Click on the SPA ID 2 Link", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacDashboardPage.clickIDNumberLink(d.attachmentsSPAID2);
  });
});
And("verify SPA ID for RAI 1 EXISTS", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacDashboardPage.verifyIDNumber(d.SPAIDforRAI1);
  });
});
And("verify SPA ID for RAI 2 EXISTS", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacDashboardPage.verifyIDNumber(d.SPAIDforRAI2);
  });
});
And("verify CHIP ID EXISTS", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacDashboardPage.verifyIDNumber(d.spaID1);
  });
});

And("type in CHIP ID", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacCHIPSPAPage.inputSpaID(d.spaID1);
  });
});
And("type in CHIP ID 2", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacCHIPSPAPage.inputSpaID(d.spaID2);
  });
});
And("type in CHIP ID 3", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacCHIPSPAPage.inputSpaID(d.spaID3);
  });
});

And("click on CHIP Respond to RAI", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacDashboardPage.clickOnrespondToRAI(d.spaID1);
  });
});

And("Verify CHIP RAI ID number matches CHIP SPA ID number", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacDashboardPage.verifySPARAIIDNumberMatchesCHIPSPAIDNumber(d.spaID1);
  });
});

And("verify submission date", () => {
  OneMacDashboardPage.verifyDate();
});
And("Verify submission type", () => {
  OneMacDashboardPage.verifyType("Medicaid SPA");
});

And("Verify submission type for SPA ID 2", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacDashboardPage.verifyTypeForID(d.attachmentsSPAID2, "Medicaid SPA");
  });
});
And("Verify submission type for RAI 1 parent SPA", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacDashboardPage.verifyTypeForID(d.SPAIDforRAI1, "Medicaid SPA");
  });
});

And("Verify submission Waiver type", () => {
  OneMacDashboardPage.verifyType("Waiver");
});

And("Verify submission CHIP type", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacDashboardPage.verifyTypeForID(d.spaID1, "CHIP SPA");
  });
});
And("click on spa Respond to RAI 2", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacDashboardPage.clickOnrespondToRAI(d.SPAIDforRAI2);
  });
});
And("click on spa Respond to RAI 1", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacDashboardPage.clickOnrespondToRAI(d.SPAIDforRAI1);
  });
});
And("Add file for RAI Response", () => {
  medicaidSPARAIResponsePage.uploadRAIResponseAddFile();
});
And("Add Additional Comments", () => {
  medicaidSPARAIResponsePage.addCommentsRAIRespone();
});
And("verify submission Successful message after RAI", () => {
  OneMacDashboardPage.verifySuccessMessageIsDisplayedAfterRAIResponse();
});
And("Verify submission type SPA RAI", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacDashboardPage.verifyTypeForID(d.SPAIDforRAI2, "SPA RAI");
  });
});

And("Verify submission type Waiver RAI", () => {
  cy.fixture("submissionDashboardWaiverNumbers.json").then((d) => {
    OneMacDashboardPage.verifyTypeForID(d.newWaiverNumber3, "Waiver RAI");
  });
});
And("Verify submission type of SPA ID for RAI 2", () => {
  cy.fixture("submissionDashboardSPAIDs.json").then((d) => {
    OneMacDashboardPage.verifyIDNumber(d.SPAIDforRAI2, "Medicaid SPA");
  });
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
And("User Role is Read Only User", () => {
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
And("Status text is not displayed", () => {
  OneMacMyProfilePage.verifyStatusHeaderDoesNotExist();
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
When("Login as a State System Admin", () => {
  OneMacDevLoginPage.loginAsStateSystemAdmin();
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
    OneMacSubmitNewWaiverActionPage.verifyOldErrorMessageIsDisplayed();
  }
);

And("Click on Waiver Action", () => {
  OneMacSubmissionTypePage.clickwaiverAction();
});

And("click on Waiver Action on Waiver Action Type page", () => {
  OneMacSubmissionTypePage.clickWaiverActionUnderWaiverAction();
});

And("click on Base Waiver", () => {
  OneMacSubmissionTypePage.clickBaseWaiver();
});

And("verify Base Waiver is a clickable option", () => {
  OneMacSubmissionTypePage.verifyBaseWaiverIsClickable();
});
And("verify Appendix K is a clickable option", () => {
  OneMacSubmissionTypePage.verifyAppendixKIsClickable();
});
And("verify Base Waiver Renewal is a clickable option", () => {
  OneMacSubmissionTypePage.verifyBaseWaiverRenewalIsClickable();
});
And("verify Amendment is a clickable option", () => {
  OneMacSubmissionTypePage.verifyAmendmentIsClickable();
});
And("verify CHIP SPA is a clickable option", () => {
  OneMacSubmissionTypePage.verifyChipSPAIsClickable();
});
And("verify Medicaid SPA is a clickable option", () => {
  OneMacSubmissionTypePage.verifyMedicaidSPAIsClickable();
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
  cy.fixture("raiWaiverNumber5.txt").then((num) => {
    OneMacDashboardPage.verifyIDNumber(num);
  });
});

And("click on Waiver Respond to RAI", () => {
  cy.fixture("submissionDashboardWaiverNumbers.json").then((d) => {
    OneMacDashboardPage.clickOnrespondToRAI(d.newWaiverNumber3);
  });
});

And("Add file for Waiver RAI Response", () => {
  medicaidSPARAIResponsePage.uploadRAIResponseAddFile();
});

And("Verify Waiver RAI ID number matches Waiver number", () => {
  cy.fixture("raiWaiverNumber5.txt").then((num) => {
    OneMacDashboardPage.verifySPARAIIDNumberMatchesMedicalSPAIDNumber(num);
  });
});

And("Click on Waiver Action under Waiver Type", () => {
  OneMacSubmissionTypePage.clickWaiverActionUnderWaiverAction();
});

And("Click on New Waiver under Action type", () => {
  OneMacSubmitNewWaiverActionPage.selectNewWaiverUnderActionType();
});

And("type in a correct Waiver Number with 4 characters", () => {
  cy.fixture("submissionDashboardWaiverNumbers.json").then((d) => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumberOldForms(
      d.formatWaiverTestNumber1
    );
  });
});

And("verify error message is not present on New Waiver Page", () => {
  OneMacSubmitNewWaiverActionPage.verifyErrorMessageIsNotDisplayed();
});

And("clear Waiver Number Input box in new form", () => {
  OneMacSubmitNewWaiverActionPage.clearWaiverNumberInputBoxNewForms();
});
And("clear Waiver Number Input box in old form", () => {
  OneMacSubmitNewWaiverActionPage.clearWaiverNumberInputBoxOldForms();
});

And("type in a correct Waiver Number with 5 characters", () => {
  cy.fixture("submissionDashboardWaiverNumbers.json").then((d) => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumberOldForms(
      d.formatWaiverTestNumber2
    );
  });
});

And("type in invalid Waiver Number", () => {
  OneMacSubmitNewWaiverActionPage.inputWaiverNumberOldForms("MD.123456");
});

And(
  "verify error message is present on submission dashboard New Waiver Page",
  () => {
    OneMacSubmitNewWaiverActionPage.verifyOldErrorMessageIsDisplayed();
  }
);

And("Click on Request Temporary Extension", () => {
  OneMacSubmissionTypePage.clickRequestTemporaryExtension();
});
And("Click the Request Extension button", () => {
  OneMacSubmissionTypePage.clickRequestExtensionBtn();
});

And(
  "Type waiver number with 4 characters on Request Waiver Temporary Extenstion Page",
  () => {
    cy.fixture("raiWaiverNumber4.txt", (num) => {
      OneMacRequestWaiverTemporaryExtension.inputWaiverNumber(
        `${num}.R00.TE01`
      );
    });
  }
);

And(
  "type waiver number with state abbreviation different from user on Request Waiver Temporary Extenstion Page",
  () => {
    OneMacRequestWaiverTemporaryExtension.inputWaiverNumber("JK");
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
    cy.fixture("raiWaiverNumber4.txt", (num) => {
      OneMacRequestWaiverTemporaryExtension.inputWaiverNumber(`${num}.R00.12`);
    });
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
    OneMacAppendixKAmendmentPage.inputWaiverNumber(`MD-10330.R00.12`);
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

And("upload Waiver Extension Request", () => {
  OneMacRequestWaiverTemporaryExtension.uploadWaiverExtensionRequest();
});

And("Type {string} in Summary Box", (Comments) => {
  OneMacSubmitNewWaiverActionPage.inputComments(Comments);
});

And("verify ID Number Exists", () => {
  cy.fixture("submissionDashboardWaiverNumbers.json").then((d) => {
    OneMacDashboardPage.verifyIDNumberIsDisplayed(d.newWaiverNumber1);
  });
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

And("type in Existing Waiver Number in new form", () => {
  OneMacSubmitNewWaiverActionPage.inputExistingWaiverNumberNewForms();
});
And("type in Existing Waiver Number in old form", () => {
  OneMacSubmitNewWaiverActionPage.inputExistingWaiverNumberOldForms();
});
And("Type new Waiver Number 1 in format SS-#####.R00.00", () => {
  cy.fixture("submissionDashboardWaiverNumbers.json").then((d) => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumberOldForms(
      d.newWaiverNumber1
    );
  });
});
And("Type new Waiver Number 2 in format SS-#####.R00.00", () => {
  cy.fixture("submissionDashboardWaiverNumbers.json").then((d) => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumberOldForms(
      d.newWaiverNumber2
    );
  });
});
And("Type new Waiver Number for RAI in format SS-#####.R00.00", () => {
  cy.fixture("submissionDashboardWaiverNumbers.json").then((d) => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumberOldForms(
      d.newWaiverNumber3
    );
  });
});
And("Type Base Waiver Number in format SS-#####.R00.00", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((d) => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumberNewForms(
      d.newBaseWaiverNumber1
    );
  });
});
And("Type Base Waiver Number 2 in format SS-#####.R00.00", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((d) => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumberNewForms(
      d.newBaseWaiverNumber2
    );
  });
});
And("Type existing Unique Valid Waiver Number With 5 Characters", () => {
  cy.fixture("submissionDashboardWaiverNumbers.json").then((data) => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumberOldForms(
      data.newWaiverNumber1
    );
  });
});
And("Type TE number based on existing waiver number 2", () => {
  cy.fixture("submissionDashboardWaiverNumbers.json").then((data) => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumberOldForms(
      data.newTempExtNumber
    );
  });
});
And("Type Unique Valid Waiver Amendment Number With 5 Characters", () => {
  cy.fixture("submissionDashboardWaiverNumbers.json").then((data) => {
    var number = `${data.newWaiverNumber}.R00.M00`;
    var f = "./fixtures/submissionDashboardWaiverNumbers.json";
    OneMacSubmitNewWaiverActionPage.inputWaiverNumberOldForms(number);
    cy.readFile(f).then((d) => {
      d.waiverAmendmentNumber = number;
      // write the merged object
      cy.writeFile(f, d);
    });
  });
});
And("search for Base Waiver Number 1 with 12 Characters", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackagePage.searchFor(data.newBaseWaiverNumber1);
  });
  cy.wait(1000);
});
And("search for approved Base Waiver Number 1", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackagePage.searchFor(data.approvedBaseWaiverNum1);
  });
  cy.wait(1000);
});
And("search for Base Waiver Number 2 with 12 Characters", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackagePage.searchFor(data.newBaseWaiverNumber2);
  });
  cy.wait(1000);
});
And("search for Medicaid SPA ID", () => {
  cy.fixture("packageDashboardSPAIDs.json").then((data) => {
    OneMacPackagePage.searchFor(data.newMedicaidSPAID);
  });
  cy.wait(1000);
});
And("search for CHIP SPA ID", () => {
  cy.fixture("packageDashboardSPAIDs.json").then((data) => {
    OneMacPackagePage.searchFor(data.newChipSPAID);
  });
  cy.wait(1000);
});
And("verify id number in the first row matches Base Waiver Number 1", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackagePage.verifyIDNumberInFirstRowIs(data.newBaseWaiverNumber1);
  });
});
And("verify id number in the first row matches Medicaid SPA ID", () => {
  cy.fixture("packageDashboardSPAIDs.json").then((data) => {
    OneMacPackagePage.verifyIDNumberInFirstRowIs(data.newMedicaidSPAID);
  });
});
And("verify id number in the first row matches CHIP SPA ID", () => {
  cy.fixture("packageDashboardSPAIDs.json").then((data) => {
    OneMacPackagePage.verifyIDNumberInFirstRowIs(data.newChipSPAID);
  });
});
And("search for Unique Valid Waiver Number with 5 Characters", () => {
  cy.fixture("submissionDashboardWaiverNumbers.json").then((data) => {
    OneMacPackagePage.searchFor(data.newWaiverNumber);
  });
  cy.wait(1000);
});
And("click actions button on the child row", () => {
  OneMacPackagePage.clickActionsColumnForChild();
});
And("verify actions button on the child row is disabled", () => {
  OneMacPackagePage.verifyChildActionsBtnIsDisabled();
});
And("click actions button for Temporary Extension in Child Row", () => {
  OneMacPackagePage.clickActionsBtnForTempExtensionChild();
});
And("verify child row has status {string}", (status) => {
  OneMacPackagePage.verifyChildRowStatusIs(status);
});
And("verify success message for Withdrawal", () => {
  OneMacPackagePage.verifyPackageWithdrawalMessageIsDisplayed();
});

And("Type Valid Waiver Number With 5 Characters", () => {
  cy.fixture("sharedWaiverNumber5.txt").then((num) => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumberOldForms(`${num}.TE01`);
  });
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

And(
  "verify that value of the column for the ID is NA Pending or a date",
  () => {
    OneMacPackagePage.verifyValue();
  }
);

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
And("Add file for 1915c Appendix K Amendment Waiver Template", () => {
  OneMacAppendixKAmendmentPage.uploadAppKAmendmentWaiverTemplate();
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
    OneMacFAQPage.verifyVerifywhatBrowsersHeaderBtnlinkisdisplayedandclickit();
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
And("verify user exists with id number searched", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackagePage.verifyIDNumberExists(data.newBaseWaiverNumber2);
  });
});
And("clear search bar", () => {
  OneMacPackagePage.clearSearchBar();
});
And("type in submitters name", () => {
  OneMacPackagePage.typeSubmittersName();
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
And(
  "verify search by package id or submitter name is displayed ontop of search bar",
  () => {
    OneMacPackagePage.verifySearchisDisplayed();
  }
);
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
And("verify 1915b Base Waiver exists", () => {
  OneMacPackagePage.verifyBaseWaiver1915bCheckBoxExists();
});
And("verify 1915b Waiver Renewal exists", () => {
  OneMacPackagePage.verifyWaiverRenewal1915bCheckBoxExists();
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
  OneMacPackagePage.verifyInReviewCheckBoxExists();
});
And("verify Submitted status checkbox exists", () => {
  OneMacPackagePage.verifySubmittedCheckboxExists();
});
And("verify Withdrawn status checkbox exists", () => {
  OneMacPackagePage.verifyWithdrawnCheckBoxExists();
});
And("verify RAI Issued status checkbox exists", () => {
  OneMacPackagePage.verifyRaiIssuedCheckboxExists();
});
And("click In Review checkbox", () => {
  OneMacPackagePage.clickInReviewCheckBox();
});
And("click Terminated checkbox", () => {
  OneMacPackagePage.clickTerminatedCheckBox();
});
And("verify seatool status 1 exists", () => {
  OneMacPackagePage.verifyseaToolStatus1CheckBoxExists();
});
And("verify sparai submitted exists", () => {
  OneMacPackagePage.verifysparaiSubmittedExists();
});
And("click 1915b Base Waiver check box", () => {
  OneMacPackagePage.clickBaseWaiver1915bCheckBox();
});
And("click 1915b Waiver Renewal check box", () => {
  OneMacPackagePage.clickWaiverRenewal1915bCheckBox();
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
And("verify show hide columns button exists", () => {
  OneMacPackagePage.verifyShowHideColumnsBTNExists();
});
And("click show hide columns button", () => {
  OneMacPackagePage.clickShowHideColumnsBTN();
});
And("verify 90th day exists", () => {
  OneMacPackagePage.verifycheckBox90thDayExists();
});
And("verify date submitted exists", () => {
  OneMacPackagePage.verifycheckBoxDateSubmittedExists();
});
And("verify expiration date exists", () => {
  OneMacPackagePage.verifycheckBoxexpirationDateBTNExists();
});
And("verify state exists", () => {
  OneMacPackagePage.verifycheckboxStateExists();
});
And("verify status exists", () => {
  OneMacPackagePage.verifycheckBoxStatusExists();
});
And("verify submitted by exists", () => {
  OneMacPackagePage.verifycheckBoxSubmittedByExists();
});
And("verify type exists", () => {
  OneMacPackagePage.verifycheckBoxTypeExists();
});
And("verify 90th day column exists", () => {
  OneMacPackagePage.verify90thDayColumn();
});
And("verify date submitted column exists", () => {
  OneMacPackagePage.verifydateSubmittedColumnExists();
});
And("verify expiration date column exists", () => {
  OneMacPackagePage.verifyexpirationDateColumnExists();
});
And("verify state column exists", () => {
  OneMacPackagePage.verifystateColumnExists();
});
And("verify status column exists", () => {
  OneMacPackagePage.verifystatusColumnExists();
});
And("verify submitted by column exists", () => {
  OneMacPackagePage.verifysubmittedByColumnExists();
});
And("verify type column exists", () => {
  OneMacPackagePage.verifytypeColumnExists();
});
And("verify IDNumber column exists", () => {
  OneMacPackagePage.verifyIDNumberColumnExists();
});
And("verify actions column exists", () => {
  OneMacPackagePage.verifyactionsColumnExists();
});
And("click 90th day checkbox", () => {
  OneMacPackagePage.clickCheckBox90thDay();
});
And("click date submitted checkbox", () => {
  OneMacPackagePage.clickCheckBoxDateSubmitted();
});
And("click expiration date checkbox", () => {
  OneMacPackagePage.clickCheckBoxexpirationDate();
});
And("click state checkbox", () => {
  OneMacPackagePage.clickCheckboxState();
});
And("click status checkbox", () => {
  OneMacPackagePage.clickCheckboxStatus();
});
And("click submitted by checkbox", () => {
  OneMacPackagePage.clickCheckBoxSubmittedBy();
});
And("click type checkbox", () => {
  OneMacPackagePage.clickCheckBoxType();
});
And("verify type column does not exist", () => {
  OneMacPackagePage.verifytypeColumnDoesNotExist();
});
And("verify state column does not exist", () => {
  OneMacPackagePage.verifystateColumnDoesNotExist();
});
And("verify 90th day column does not exist", () => {
  OneMacPackagePage.verify90thDayColumnDoesNotExist();
});
And("verify expiration date column does not exist", () => {
  OneMacPackagePage.verifyexpirationDateColumnDoesNotExist();
});
And("verify status column does not exist", () => {
  OneMacPackagePage.verifystatusColumnDoesNotExist();
});
And("verify date submitted column does not exist", () => {
  OneMacPackagePage.verifydateSubmittedColumnDoesNotExist();
});
And("verify submitted by column does not exist", () => {
  OneMacPackagePage.verifysubmittedByColumnDoesNotExist();
});
And("verify the type on row one exists", () => {
  OneMacPackagePage.verifypackageRowOneTypeExists();
});
And("verify the type on row one is Medicaid SPA", () => {
  OneMacPackagePage.verifypackageRowOneTypeHasTextMedicaidSPA();
});
And("type partial existing ID in search bar", () => {
  OneMacPackagePage.typePartialExistingID();
});
And("verify the state on row one exists", () => {
  OneMacPackagePage.verifypackageRowOneStateExists();
});

And("verify that the 3 dots next to Approved status is not clickable", () => {
  OneMacPackagePage.checkforApprovedIsNotClickable();
});
And(
  "verify that the 3 dots next to Disapproved status is not clickable",
  () => {
    OneMacPackagePage.checkforDisapprovedIsNotClickable();
  }
);
And("verify that the 3 dots next to Withdrawn status is not clickable", () => {
  OneMacPackagePage.checkforWithdrawnIsNotClickable();
});
And("verify that the 3 dots next to Terminated status is not clickable", () => {
  OneMacPackagePage.checkforTerminatedIsNotClickable();
});
And(
  "verify that the 3 dots next to Unsubmitted status is not clickable",
  () => {
    OneMacPackagePage.checkforUnsubmittedIsNotClickable();
  }
);
And("verify 90th day filter dropdown exists", () => {
  OneMacPackagePage.verify90thDayFilterDropDownExists();
});
And("verify expiration date filter dropdown exists", () => {
  OneMacPackagePage.verifyExpirationDateFilterDropDownExists();
});
And("verify date submitted filter dropdown exists", () => {
  OneMacPackagePage.verifyDateSubmittedFilterDropDownExists();
});
And("click on 90th day filter dropdown", () => {
  OneMacPackagePage.clickOn90thDayFilterDropDown();
});
And("verify 90th day na checkbox exists", () => {
  OneMacPackagePage.verifyNinetiethDayNACheckboxExists();
});
And("click on 90th day na checkbox", () => {
  OneMacPackagePage.clickOnNinetiethDayNACheckbox();
});
And("verify 90th day pending checkbox exists", () => {
  OneMacPackagePage.verifyNinetiethDayPendingCheckboxExists();
});
And("click on 90th day pending checkbox", () => {
  OneMacPackagePage.clickOnNinetiethDayPendingCheckbox();
});
And("verify 90th day date picker exists", () => {
  OneMacPackagePage.verifyNinetiethDayDatePickerFilterExists();
});
And("click on 90th day date picker filter", () => {
  OneMacPackagePage.clickOnNinetiethDayDatePickerFilter();
});
And("click on expiration date filter dropdown", () => {
  OneMacPackagePage.clickOnExpirationDateFilterDropDown();
});
And("verify expiration date date picker exists", () => {
  OneMacPackagePage.verifyExpirationDateDatePickerFilterExists();
});
And("click on expiration date date picker filter", () => {
  OneMacPackagePage.clickOnExpirationDateDatePickerFilter();
});
And("click on date submitted filter dropdown", () => {
  OneMacPackagePage.clickOnDateSubmittedFilterDropDown();
});
And("verify date submitted date picker filter exists", () => {
  OneMacPackagePage.verifyDateSubmittedDatePickerFilterExists();
});
And("click on date submitted date picker filter", () => {
  OneMacPackagePage.clickOnDateSubmittedDatePickerFilter();
});
And("click on this quarter date picker button", () => {
  OneMacPackagePage.clickOnThisQuarterDatePickerBtn();
});
And("click on quarter to date date picker button", () => {
  OneMacPackagePage.clickOnQuarterToDateDatePickerBtn();
});
And("click on OK date picker button", () => {
  OneMacPackagePage.clickOnOkDatePickerBtn();
});
And("click on today date picker button", () => {
  OneMacPackagePage.clickOntodayPickerBtn();
});
And("click on reset button", () => {
  OneMacPackagePage.clickOnResetButton();
});
And("verify package row one exists", () => {
  OneMacPackagePage.verifyPackageRowOneExists();
});
And("verify 90th day column one is not na", () => {
  if (OneMacPackagePage.checkIfPackageListResultsExist()) {
    OneMacPackagePage.verify90thDayRowOneIsNotNA();
  }
});
And("verify 90th day column one is not Pending", () => {
  if (OneMacPackagePage.checkIfPackageListResultsExist()) {
    OneMacPackagePage.verify90thDayRowOneIsNotPending();
  }
});
And("verify date submitted column one date is this quarter", () => {
  if (OneMacPackagePage.checkIfPackageListResultsExist()) {
    OneMacPackagePage.verifypackageRowOneDateSubmittedIsThisQuarter();
  }
});
And("verify states selected includes {string}", (state) => {
  OneMacPackagePage.verifyStatesSelectedIncludes(state);
});
And("verify state dropdown filter exists", () => {
  OneMacPackagePage.verifyStateDropdownFilterExists();
});
And("click on state dropdown filter", () => {
  OneMacPackagePage.clickStateDropdownFilter();
});
And("verify state filter select exists", () => {
  OneMacPackagePage.verifyStateFilterSelectExists();
});
And("click on state filter select", () => {
  OneMacPackagePage.clickStateFilterSelect();
});
And("verify no states are selected", () => {
  OneMacPackagePage.verifyStateFilterSelectIsEmpty();
});
And("set value on state filter select to {string}", (state) => {
  OneMacPackagePage.typeStateToSelect(state + "{enter}");
});
And("verify {string} is showing in the state column", (state) => {
  OneMacPackagePage.verifypackageRowOneValueIs(state);
});
And("verify remove {string} button exists", (state) => {
  OneMacPackagePage.verifyremoveBtnExistsFor(state);
});
And("click remove {string} button", (state) => {
  OneMacPackagePage.clickRemoveBtnFor(state);
});
And("verify the Waivers tab exists", () => {
  OneMacPackagePage.verifyWaiversTabExists();
});
And("click on the Waivers tab", () => {
  OneMacPackagePage.clickOnWaiversTab();
});
And("verify the SPAs tab exists", () => {
  OneMacPackagePage.verifySPAsTabExists();
});
And("click on SPAs tab", () => {
  OneMacPackagePage.clickOnSPAsTab();
});
And("verify SPA ID column exists", () => {
  OneMacPackagePage.verifySPAIDColumnExists();
});
And("verify Waiver Number column exists", () => {
  OneMacPackagePage.verifyWaiverNumberColumnExists();
});
And("verify status DropDown Filter exists", () => {
  OneMacPackagePage.verifystatusDropDownFilterExists();
});
And("verify the SPAs tab is selected", () => {
  //if it's disabled then it is selected.
  OneMacPackagePage.verifySPAsTabIsDisabled();
});
And("verify the SPAs tab is clickable", () => {
  //if it's disabled then it is selected.
  OneMacPackagePage.verifySPAsTabIsClickable();
});
And("verify the Waivers tab is selected", () => {
  //if it's disabled then it is selected.
  OneMacPackagePage.verifyWaiversTabIsDisabled();
});
And("verify the Waivers tab is clickable", () => {
  OneMacPackagePage.verifyWaiversTabIsClickable();
});
And("refresh the page", () => {
  cy.reload();
});
And("verify the Waiver Family # column does not exist", () => {
  OneMacPackagePage.verifyWaiverFamilyNumColumnDoesNotExists();
});
And("verify the Waiver Family checkbox does not exist", () => {
  OneMacPackagePage.verifyWaiverFamilyCheckboxDoesNotExists();
});
And("verify the Waivers Family # column exists", () => {
  OneMacPackagePage.verifyWaiverFamilyNumColumnExists();
});
And("verify Waiver Family # column is sortable", () => {
  OneMacPackagePage.verifyWaiverFamilyNumColumnIsSortable();
});
And("verify the Waiver family format in row one is SS.#### or SS.#####", () => {
  OneMacPackagePage.verifyWaiverFamilyRowOneFormat();
});
And("verify the Waivers Family checkbox exists", () => {
  OneMacPackagePage.verifyWaiverFamilyCheckboxExists();
});
And("click the Waivers Family checkbox", () => {
  OneMacPackagePage.clickOnWaiverFamilyCheckbox();
});
And("verify that Clock Stopped checkbox exists", () => {
  OneMacPackagePage.verifyNinetiethDayClockStoppedCheckboxExists();
});
And("click all of the status checkboxes", () => {
  OneMacPackagePage.clickAllStatusFilterCheckboxes();
});
And("click RAI Issued checkbox", () => {
  OneMacPackagePage.clickRaiIssuedCheckbox();
});
And(
  "verify that the value of the column for the 90th day is Clock Stopped",
  () => {
    OneMacPackagePage.verify90thDayRowOneIsClockStopped();
  }
);
And("click Approved checkbox", () => {
  OneMacPackagePage.clickApprovedCheckbox();
});
And("verify that the value of the column for the 90th day is NA", () => {
  OneMacPackagePage.verify90thDayRowOneIsNA();
});
And("click Disapproved checkbox", () => {
  OneMacPackagePage.clickDisapprovedCheckbox();
});
And("click the SPA ID link in the first row", () => {
  OneMacPackagePage.clickSPAIDLinkInFirstRow();
});
And("click the Waiver Number link in the first row", () => {
  OneMacPackagePage.clickWaiverNumberLinkInFirstRow();
});
And("click the Withdrawn checkbox", () => {
  OneMacPackagePage.clickWithdrawnCheckBoxExists();
});
And("verify that the value of the column for the 90th day is Pending", () => {
  OneMacPackagePage.verify90thDayRowOneIsPending();
});
And("click Unsubmitted checkbox", () => {
  OneMacPackagePage.clickUnsubmittedCheckbox();
});
And("click Submitted checkbox", () => {
  OneMacPackagePage.clickSubmittedCheckbox();
});
And("verify the type in row one is some kind of 1915b Waiver", () => {
  OneMacPackagePage.verifypackageRowOneTypeContains1915bWaiver();
});
And("verify the type in row one is Base Waiver", () => {
  OneMacPackagePage.verifypackageRowOneTypeHasTextBaseWaiver();
});
And("verify the type in row one is Waiver Renewal", () => {
  OneMacPackagePage.verifypackageRowOneTypeHasTextWaiverRenewal();
});
And("verify the waiver number format in row one is SS.#### or SS.#####", () => {
  OneMacPackagePage.verifypackageRowOneIDBaseWaiverFormat();
});
And(
  "verify the waiver number format in row one is SS.#####.S## or SS.####.S##",
  () => {
    OneMacPackagePage.verifypackageRowOneIDWaiverRenewalFormat();
  }
);
And("verify Onboarding Materials exists", () => {
  OneMacFAQPage.verifyOnboardingMaterialsBtnExists();
});
And("click on Onboarding Materials", () => {
  OneMacFAQPage.clickOnboardingMaterialsBtn();
});
And("verify Welcome to OneMac link exists", () => {
  OneMacFAQPage.verifyWelcomeToOneMacLinkExists();
});
And("verify Welcome to OneMac link is valid", () => {
  OneMacFAQPage.verifyWelcomeToOneMacLinkIsValid();
});
And("verify IDM Instructions for OneMAC Users link exists", () => {
  OneMacFAQPage.verifyIdmInstructionsLinkExists();
});
And("verify OneMAC IDM Guide link exists", () => {
  OneMacFAQPage.verifyIdmGuideLinkExists();
});
And("verify OneMAC State Submitter Guide link exists", () => {
  OneMacFAQPage.verifyStateSubmitterGuideLinkExists();
});
And("verify OneMAC State Administrator Guide link exists", () => {
  OneMacFAQPage.verifyStateAdminGuideLinkExists();
});
And("verify OneMAC CMS User Guide link exists", () => {
  OneMacFAQPage.verifyCmsUserGuideLinkExists();
});
And("verify OneMAC CMS Role Approver Guide link exists", () => {
  OneMacFAQPage.verifyCmsRoleApproverGuideLinkExists();
});
And("verify IDM Instructions for OneMAC Users is valid", () => {
  OneMacFAQPage.verifyIdmInstructionsLinkIsValid();
});
And("verify OneMAC IDM Guide is valid", () => {
  OneMacFAQPage.verifyIdmGuideLinkIsValid();
});
And("verify OneMAC State Submitter Guide is valid", () => {
  OneMacFAQPage.verifyStateSubmitterGuideLinkIsValid();
});
And("verify OneMAC State Administrator Guide is valid", () => {
  OneMacFAQPage.verifyStateAdminGuideLinkIsValid();
});
And("verify OneMAC CMS User Guide is valid", () => {
  OneMacFAQPage.verifyCmsUserGuideLinkIsValid();
});
And("verify OneMAC CMS Role Approver Guide is valid", () => {
  OneMacFAQPage.verifyCmsRoleApproverGuideLinkIsValid();
});
And("click on Respond to Medicaid SPA RAI", () => {
  OneMacSubmissionTypePage.clickRespondToMedicaidSPARAI();
});
And("click on Respond to CHIP SPA RAI", () => {
  OneMacSubmissionTypePage.clickRespondToCHIPSPARAI();
});
And("click on Respond to Waiver RAI", () => {
  OneMacSubmissionTypePage.clickRespondToWaiverRAI();
});
And("verify ID field is empty and not disabled", () => {
  medicaidSPARAIResponsePage.verifySPAIDFieldIsEmptyAndNotDisabled();
});

And("search for {string}", (part) => {
  OneMacPackagePage.searchFor(part);
  cy.wait(1000);
});
And("verify parent row expander exists", () => {
  OneMacPackagePage.verifyFirstParentRowExpanderExists();
});
And("verify parent row expander is disabled", () => {
  OneMacPackagePage.verifyFirstParentRowExpanderIsDisabled();
});
And("wait for parent row expander to be enabled", () => {
  OneMacPackagePage.verifyFirstParentRowExpanderIsNotDisabled();
});
And("verify the next row is not a child", () => {
  OneMacPackagePage.verifyTheNextRowIsNotAChild();
});
And("click parent row expander", () => {
  OneMacPackagePage.clickFirstParentRowExpander();
});
And("verify the next row is a child", () => {
  OneMacPackagePage.verifyTheNextRowIsAChild();
});
And("verify all children start with {string}", (part) => {
  OneMacPackagePage.verifyAllChildrenStartWith(part);
});
And("verify Waiver Number column exists for the child", () => {
  OneMacPackagePage.verifyWaiverNumberColumnExistsForChild();
});
And("verify type column exists for the child", () => {
  OneMacPackagePage.verifytypeColumnExistsForChild();
});
And("verify state column exists for the child", () => {
  OneMacPackagePage.verifystateColumnExistsForChild();
});
And("verify 90th day column exists for the child", () => {
  OneMacPackagePage.verify90thDayColumnExistsForChild();
});
And("verify status column exists for the child", () => {
  OneMacPackagePage.verifystatusColumnExistsForChild();
});
And("verify date submitted column exists for the child", () => {
  OneMacPackagePage.verifyDateSubmittedColumnExistsForChild();
});
And("verify submitted by column exists for the child", () => {
  OneMacPackagePage.verifysubmittedByColumnExistsForChild();
});
And("verify actions column exists for the child", () => {
  OneMacPackagePage.verifyactionsColumnExistsForChild();
});
And("verify expiration date column exists for the child", () => {
  OneMacPackagePage.verifyexpirationDateColumnExistsForChild();
});

And("verify that Request a Role Change button exists", () => {
  OneMacUserManagmentPage.verifyRequestARoleChangeBtnExists();
});

And("click on Request a Role Change button", () => {
  OneMacUserManagmentPage.clickRequestARoleChangeBtn();
});

And("verify Select the role for which you are registering is visible", () => {
  OneMacRequestARoleChangePage.verifySelectTheRoleTextExists();
});

And("verify SSA is the role available", () => {
  OneMacRequestARoleChangePage.verifySSARoleBtnExists();
});

And("click on the SSA role", () => {
  OneMacRequestARoleChangePage.clickSSARoleBtn();
});

And("verify the user role is {string}", (string) => {
  OneMacRequestARoleChangePage.verifyUserRoleHeaderIs(string);
});

And("verify the error message says {string}", (string) => {
  OneMacRequestARoleChangePage.verifyErrorMessageTextIs(string);
});

And("verify the submit button is disabled", () => {
  OneMacRequestARoleChangePage.verifySubmitBtnIsDisabled();
});
And("verify the submit button is disabled via class", () => {
  OneMacRequestARoleChangePage.verifySubmitBtnIsDisabledViaClass();
});
And("select {string} for state access", (state) => {
  OneMacRequestARoleChangePage.clickStateForStateAccess(state);
});

And("verify the submit button is enabled", () => {
  OneMacRequestARoleChangePage.verifySubmitBtnIsEnabled();
});

And("verify there is no error message", () => {
  OneMacRequestARoleChangePage.verifyErrorMsgDoesNotExist();
});

And("click on cancel", () => {
  OneMacRequestARoleChangePage.clickCancelBtn();
});

And("verify the cancel button is clickable", () => {
  OneMacRequestARoleChangePage.verifyCancelBtnIsEnabled();
});
And("click stay on page in the modal", () => {
  OneMacRequestARoleChangePage.clickStayOnPageBtn();
});

And("click confirm in the modal", () => {
  OneMacRequestARoleChangePage.clickConfirmBtn();
});

And("verify State Submitter is the role available", () => {
  OneMacRequestARoleChangePage.verifyStateSubmitterRoleBtnExists();
});

And("click on the State Submitter role", () => {
  OneMacRequestARoleChangePage.clickStateSubmitterRoleBtn();
});

And("verify the CMS Reviewer role is available", () => {
  OneMacRequestARoleChangePage.verifyCMSReviewerRoleBtnExists();
});

And("click on the CMS Reviewer role", () => {
  OneMacRequestARoleChangePage.clickCMSReviewerRoleBtn();
});

And("verify the group dropdown exists", () => {
  OneMacRequestARoleChangePage.verifyGroupDropdownExists();
});

And("verify the CMS Role Approver role is available", () => {
  OneMacRequestARoleChangePage.verifyCMSRoleApproverBtnExists();
});

And("click on the CMS Role Approver role", () => {
  OneMacRequestARoleChangePage.clickCMSRoleApproverBtn();
});

And("verify that Request a Role Change button does not exist", () => {
  OneMacUserManagmentPage.verifyRequestARoleChangeBtnDoesNotExist();
});
And("click withdraw package button", () => {
  OneMacPackagePage.clickWithdrawPackageBtn();
});
And("click yes, withdraw package button", () => {
  OneMacPackagePage.clickConfirmWithdrawPackageBtn();
});
And("verify the package details page is visible", () => {
  OneMacPackageDetailsPage.verifyPackageDetailsPageIsVisible();
});
And("verify action card exists", () => {
  OneMacPackageDetailsPage.verifyActionCardExists();
});
And("verify the status on the card is {string}", (status) => {
  OneMacPackageDetailsPage.verifyStatusIs(status);
});
And("verify there is not a 90th day date on the card", () => {
  OneMacPackageDetailsPage.verify90thDayDateDoesntExist();
});
And("verify package actions header is visible", () => {
  OneMacPackageDetailsPage.verifyPackageActionsHeaderIsVisible();
});
And("verify there are no package actions available", () => {
  OneMacPackageDetailsPage.verifyNoPackageActionsAvailable();
});
And("verify the package actions section is unavailable", () => {
  OneMacPackageDetailsPage.verifyPackageActionsSectionDoesNotExist();
});
And("verify Respond to RAI action exists", () => {
  OneMacPackageDetailsPage.verifyRespondtoRAIActionExists();
});
And("verify withdraw package action exists", () => {
  OneMacPackageDetailsPage.verifyWithdrawPackageActionExists();
});
And("verify Request a Temporary Extension package action exists", () => {
  OneMacPackageDetailsPage.verifyRequestTempExtensionPackageActionExists();
});
And("click Request a Temporary Extension package action", () => {
  OneMacPackageDetailsPage.clickRequestTempExtensionPackageAction();
});
And("click on Respond to RAI package action", () => {
  OneMacPackageDetailsPage.clickRespondToRAIAction();
});
And("verify the details section exists", () => {
  OneMacPackageDetailsPage.verifyDetailSectionExists();
});
And("verify there is a SPA ID header in the details section", () => {
  OneMacPackageDetailsPage.verifyCHIPSPAIDHeaderExists();
});
And("verify an ID exists for the SPA ID", () => {
  OneMacPackageDetailsPage.verifyIDExists();
});
And("verify there is a Type header in the details section", () => {
  OneMacPackageDetailsPage.verifyTypeHeaderExists();
});
And("verify a type containing SPA exists for the Type", () => {
  OneMacPackageDetailsPage.verifyTypeContainsSPA();
});
And("verify the type is Base Waiver", () => {
  OneMacPackageDetailsPage.verifyTypeContainsBaseWaiver();
});
And("verify the type is Waiver Renewal", () => {
  OneMacPackageDetailsPage.verifyTypeContainsWaiverRenewal();
});
And("verify the type is 1915(b) Temporary Extension", () => {
  OneMacPackageDetailsPage.verifyTypeContainsTempExtension();
});
And("verify there is a State header in the details section", () => {
  OneMacPackageDetailsPage.verifyStateHeaderExists();
});
And("verify a state exists for the State", () => {
  OneMacPackageDetailsPage.verifyStateExists();
});
And("verify there is a Date Submitted header in the details section", () => {
  OneMacPackageDetailsPage.verifyDateSubmittedHeaderExists();
});
And("verify a date exists for the Date Submitted", () => {
  OneMacPackageDetailsPage.verifyDateExists();
});
And(
  "verify the form is titled Formal Request for Additional Information Response",
  () => {
    OneMacRespondToRAIPage.verifyPageHeader();
  }
);
And("click back arrow", () => {
  OneMacRespondToRAIPage.clickBackArrow();
});
And("click Leave, anyway", () => {
  OneMacRespondToRAIPage.clickLeaveAnyway();
});
And("verify user is on new spa page", () => {
  OneMacSubmissionTypePage.verifyNewSPAPage();
});
And("verify user is on new waiver page", () => {
  OneMacSubmissionTypePage.verifyNewWaiverPage();
});
And("verify user is on new base waiver page", () => {
  OneMacSubmissionTypePage.verifyNewBaseWaiverPage();
});
And("verify user is on new Medicaid SPA page", () => {
  OneMacSubmitNewMedicaidSpaPage.verifyNewMedicaidSPAPage();
});
And("verify user is on new CHIP SPA page", () => {
  OneMacCHIPSPAPage.verifyNewChipSPAPage();
});
And("verify RAI Responses header exists", () => {
  OneMacPackageDetailsPage.verifyRaiResponseHeaderExists();
});
And(
  "verify the Medicaid RAI Responses caret at the top of the list exists and is enabled",
  () => {
    OneMacPackageDetailsPage.verifyMedicaidTopRaiRespCaretExistsAndEnabled();
  }
);
And(
  "verify the CHIP RAI Responses caret at the top of the list exists and is enabled",
  () => {
    OneMacPackageDetailsPage.verifyCHIPTopRaiRespCaretExistsAndEnabled();
  }
);
And(
  "verify the title of the Medicaid RAI Responses caret at the top of the list is in Submitted on format",
  () => {
    OneMacPackageDetailsPage.verifyMedicaidTopRaiRespCaretTitle();
  }
);
And(
  "verify the title of the CHIP RAI Responses caret at the top of the list is in Submitted on format",
  () => {
    OneMacPackageDetailsPage.verifyCHIPTopRaiRespCaretTitle();
  }
);
And(
  "verify the Medicaid RAI response card at the top of the list exists",
  () => {
    OneMacPackageDetailsPage.verifyMedicaidTopRaiRespCardExists();
  }
);
And("verify the CHIP RAI response card at the top of the list exists", () => {
  OneMacPackageDetailsPage.verifyCHIPTopRaiRespCardExists();
});
And(
  "verify the download button for the Medicaid RAI response at the top of the list exists",
  () => {
    OneMacPackageDetailsPage.verifyMedicaidTopRaiRespDownloadBtnExistsAndEnabled();
  }
);
And(
  "verify the download button for the CHIP RAI response at the top of the list exists",
  () => {
    OneMacPackageDetailsPage.verifyCHIPTopRaiRespDownloadBtnExistsAndEnabled();
  }
);
And("verify the first RAI response does not have Additional Info", () => {
  OneMacPackageDetailsPage.verifyTopRaiRespAddInfoDoesNotExist();
});
And("verify the first RAI response has Additional Info", () => {
  OneMacPackageDetailsPage.verifyTopRaiRespAddInfoExists();
});
And("click the actions button in row one", () => {
  OneMacPackagePage.clickPackageRowOneActionsBtn();
});
And("click the Respond to RAI button", () => {
  OneMacPackagePage.clickRespondToRAIBtn();
});
And("click the Request Temporary Extension button", () => {
  OneMacPackagePage.clickRequestTempExtensionBtn();
});
And("verify the Request Temporary Extension button is displayed", () => {
  OneMacPackagePage.verifyRequestTempExtensionBtnExists();
});
And("verify the Respond to RAI button is displayed", () => {
  OneMacPackagePage.verifyRespondToRAIBtnExists();
});
And("verify Package Overview navigation button exists", () => {
  OneMacPackageDetailsPage.verifyPackageOverviewNavBtnExists();
});
And("verify Package Overview navigation button is enabled", () => {
  OneMacPackageDetailsPage.verifyPackageOverviewNavBtnIsEnabled();
});
And("verify Package Overview navigation button is expanded", () => {
  OneMacPackageDetailsPage.verifyPackageOverviewNavBtnIsExpanded();
});
And("verify Package Details is listed under Package Overview", () => {
  OneMacPackageDetailsPage.verifyPackageDetailsNavBtnExists();
});
And("click the pending user action button", () => {
  OneMacUserManagmentPage.clickPendingUserActionBtn();
});
And("click the deny access button", () => {
  OneMacUserManagmentPage.clickDenyAccessBtn();
});
And("click the logout button", () => {
  OneMacDashboardPage.clickLogoutBtn();
});
And(
  "verify there is a Proposed Effective Date header in the details section",
  () => {
    OneMacPackageDetailsPage.verifyProposedEffectiveDateHeaderExists();
  }
);
And("verify the Proposed Effective Date is NA", () => {
  OneMacPackageDetailsPage.verifyproposedEffectiveDateHeaderContainsNA();
});
And("click the Waiver Number link for the Amendment", () => {
  cy.fixture("submissionDashboardWaiverNumbers.json").then((data) => {
    var number = `${data.newWaiverNumber}.R00.M00`;
    OneMacPackagePage.clickLinkForWaiver(number);
  });
  cy.wait(1000);
});
And("verify the Amendment Number header exists", () => {
  OneMacPackageDetailsPage.verifyAmendmentNumberHeaderExists();
});
And("verify the amendment number matches", () => {
  cy.fixture("submissionDashboardWaiverNumbers.json").then((data) => {
    var number = `${data.newWaiverNumber}.R00.M00`;
    OneMacPackageDetailsPage.verifyAmendmentNumbermatches(number);
  });
});
And("verify the amendment title header exists", () => {
  OneMacPackageDetailsPage.verifyAmendmentTitleHeaderExists();
});
And("verify the amendment title is NA", () => {
  OneMacPackageDetailsPage.verifyAmendmentTitleHeaderContainsNA();
});
And("verify the waiver authority header exists", () => {
  OneMacPackageDetailsPage.verifyWaiverAuthorityHeaderExists();
});
And("verify the supporting documentation section exists", () => {
  OneMacPackageDetailsPage.verifySupportingDocumentationSectionExists();
});
And("verify the download all button exists", () => {
  OneMacPackageDetailsPage.verifyDownloadAllBtnExists();
});
And("verify the additional information section exists", () => {
  OneMacPackageDetailsPage.verifyAdditionalInfoSectionExists();
});
And("verify 90th day header exists", () => {
  OneMacPackageDetailsPage.verify90thDayHeaderExists();
});
And("verify 90th day header is NA", () => {
  OneMacPackageDetailsPage.verify90thDayHeaderContainsNA();
});
And("click withdraw button", () => {
  OneMacPackageDetailsPage.clickWithdrawBtn();
});
And("click withdraw confirmation", () => {
  OneMacPackageDetailsPage.clickWithdrawConfirmationBtn();
});
And("verify submission message for withdrawn amendment", () => {
  OneMacPackageDetailsPage.verifySubmissionMsgForWithdrawnAmendment();
});
And("verify the amendment details section exists", () => {
  OneMacPackageDetailsPage.verifyAmendmentDetailSectionExists();
});
And("verify success message for denied role", () => {
  OneMacDashboardPage.verifySuccessMessageIsDisplayedForRoleChange();
});
And("select proposed effective date 3 months from today", () => {
  OneMacSubmitNewWaiverActionPage.setProposedEffectiveDateThreeMonthsAway();
});
And("Type Temporary Extension Number 1 With 5 Characters", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumberNewForms(
      data.newTemporaryExtensionNumber1
    );
  });
});
And("click on the link for temporary extension number 1", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackageDetailsPage.clickTempExtensionID(
      data.newTemporaryExtensionNumber1
    );
  });
});
And("Type Temporary Extension Number 2 With 5 Characters", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumberNewForms(
      data.newTemporaryExtensionNumber2
    );
  });
});
And("Type Temporary Extension Number 3 With 5 Characters", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumberNewForms(
      data.newTemporaryExtensionNumber3
    );
  });
});
And("Type Temporary Extension Number 4", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
      data.newTemporaryExtensionNumber4
    );
  });
});
And("Type Temporary Extension Number 5", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacSubmitNewWaiverActionPage.inputWaiverNumber(
      data.newTemporaryExtensionNumber5
    );
  });
});
And("verify the temporary extension exists", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackageDetailsPage.verifyTempExtensionIDExists(
      data.newTemporaryExtensionNumber1
    );
  });
});
And("click the action button for the temporary extension", () => {
  cy.fixture("packageDashboardWaiverNumbers.json").then((data) => {
    OneMacPackageDetailsPage.clickTempExtensionActionBtn(
      data.newTemporaryExtensionNumber1
    );
  });
});
And("click withdraw button on the temp extension page", () => {
  OneMacPackageDetailsPage.clickWithdrawBtnOnTempExt();
});
And("click on the Temporary Extension nav button", () => {
  OneMacPackageDetailsPage.clickTempExtensionsNavBtn();
});
And("copy the ID from the link in the first row", () => {
  OneMacPackagePage.copyTheIDFromLinkInFirstRow();
});
And("search for the ID copied from the link in the first row", () => {
  cy.fixture("savedID.json").then((data) => {
    OneMacPackagePage.searchFor(data.savedID);
  });
  cy.wait(1000);
});
And("verify the ID searched for is the ID in the first result", () => {
  cy.fixture("savedID.json").then((data) => {
    OneMacPackagePage.compareSearchIDToFirstLinkID(data.savedID);
  });
  cy.wait(1000);
});
And("reset EUA CMS Read Only User state if needed", () => {
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

And("verify the actions button is unavailable", () => {
  OneMacDashboardPage.verifyActionsBtnUnvailableOnFirstRow();
});
And("verify actions column is unavailable", () => {
  OneMacPackagePage.verifyActionsColumnDoesNotExist();
});
And("verify the first RAI Response header is titled", () => {
  OneMacPackageDetailsPage.verifyRaiResponseHeaderTitle();
});
And(
  "verify What format is used to enter a 1915b Base Waiver number header is visible",
  () => {
    OneMacFAQPage.verifyBaseWaiverFormatHeaderBtnExists();
  }
);
And(
  "click What format is used to enter a 1915b Base Waiver number header",
  () => {
    OneMacFAQPage.clickBaseWaiverFormatHeaderBtn();
  }
);
And(
  "verify What format is used to enter a 1915b Base Waiver number body is visible",
  () => {
    OneMacFAQPage.verifyBaseWaiverFormatBody();
  }
);
And(
  "verify What format is used to enter a 1915b Waiver Renewal number header is visible",
  () => {
    OneMacFAQPage.verifyWaiverRenewalFormatHeaderBtnExists();
  }
);
And(
  "click What format is used to enter a 1915b Waiver Renewal number header",
  () => {
    OneMacFAQPage.clickWaiverRenewalFormatHeaderBtn();
  }
);
And(
  "verify What format is used to enter a 1915b Waiver Renewal number is visible",
  () => {
    OneMacFAQPage.verifyWaiverRenewalFormatBody();
  }
);
And("verify the submit button is not disabled", () => {
  OneMacDefaultForms.verifySubmitBtnIsNotDisabled();
});
And("verify the submit button is disabled", () => {
  OneMacDefaultForms.verifySubmitBtnIsDisabled();
});

And("type in valid waiver amendment number in old forms", () => {
  OneMacSubmitNewWaiverActionPage.inputWaiverNumberOldForms("MD-10330.R01.01");
});
And("type base waiver number in old format SS.####.R00.00", () => {
  OneMacSubmitNewWaiverActionPage.inputWaiverNumberNewForms("MD.1055.R00.00");
});
And("type base waiver number in old format SS.#####.R00.00", () => {
  OneMacSubmitNewWaiverActionPage.inputWaiverNumberNewForms("MD.10555.R00.00");
});
And(
  "verify error message is present on package dashboard New Waiver Page",
  () => {
    OneMacSubmitNewWaiverActionPage.verifyErrorMessageIsDisplayed();
  }
);
And(
  "verify What format is used to enter a 1915b and 1915c Temporary Extension number header",
  () => {
    OneMacFAQPage.verifyTempExtFormatHeaderBtnExists();
  }
);
And(
  "click What format is used to enter a 1915b and 1915c Temporary Extension number header",
  () => {
    OneMacFAQPage.clickTempExtFormatHeaderBtn();
  }
);
And(
  "verify What format is used to enter a 1915b and 1915c Temporary Extension number body is visible",
  () => {
    OneMacFAQPage.verifyTempExtFormatBody();
  }
);
And(
  "verify What are the attachments for a 1915c Waiver - Request for Temporary Extension header is visible",
  () => {
    OneMacFAQPage.verifyAttachmentsFor1915cRequestTempExtHeaderBtnExists();
  }
);
And(
  "click What are the attachments for a 1915c Waiver - Request for Temporary Extension header",
  () => {
    OneMacFAQPage.clickAttachmentsFor1915cRequestTempExtHeaderBtn();
  }
);
And(
  "verify What are the attachments for a 1915c Waiver - Request for Temporary Extension body is visible",
  () => {
    OneMacFAQPage.verifyAttachmentsFor1915cRequestTempExtBody();
  }
);
And(
  "Verify blue eerror message says user can submit in submission view",
  () => {
    OneMacDefaultForms.verifyBlueErrorSaysUserCanSubmitInSubmissionView();
  }
);
And("Verify blue eerror message says user can submit in package view", () => {
  OneMacDefaultForms.verifyBlueErrorSaysUserCanSubmitInPkgView();
});
And("Type {string} into Approved Base or Renewal Waiver Number field", (n) => {
  OneMacRequestWaiverTemporaryExtension.inputApprovedBaseOrRenewalWaiverNumber(
    n
  );
});
And(
  "Type existing waiver number into Approved Base or Renewal Waiver Number field",
  () => {
    cy.fixture("submissionDashboardWaiverNumbers.json").then((d) => {
      OneMacRequestWaiverTemporaryExtension.inputApprovedBaseOrRenewalWaiverNumber(
        d.existingWaiverNum
      );
    });
  }
);
And(
  "verify Approved Base or Renewal Waiver Number error message is displayed",
  () => {
    OneMacRequestWaiverTemporaryExtension.verifyParentErrorMessageIsDisplayed();
  }
);
And(
  "verify Approved Base or Renewal Waiver Number error message text is correct",
  () => {
    OneMacRequestWaiverTemporaryExtension.verifyParentErrorMessageText();
  }
);
And(
  "verify Approved Base or Renewal Waiver Number error message is not displayed",
  () => {
    OneMacRequestWaiverTemporaryExtension.verifyParentErrorMessageIsNotDisplayed();
  }
);
And("clear Approved Base or Renewal Waiver Number input box", () => {
  OneMacRequestWaiverTemporaryExtension.clearApprovedBaseOrRenewalWaiverNumberInputBox();
});
And("wait for {string} miliseconds", (s) => {
  cy.wait(parseInt(s));
});
And(
  "Type new Waiver Number 2 into Approved Base or Renewal Waiver Number field",
  () => {
    cy.fixture("submissionDashboardWaiverNumbers.json").then((d) => {
      OneMacRequestWaiverTemporaryExtension.inputApprovedBaseOrRenewalWaiverNumber(
        d.newWaiverNumber2
      );
    });
  }
);
