//Element is Xpath use cy.xpath instead of cy.get: All of the following are xpath
//overall headers and help desk section
const frequentlyAskedQuestionHeader =
  '//h1[contains(text(),"Frequently Asked Questions")]';
const generalHeader = '//h2[contains(text(),"General")]';
const statePlanAmendmentSPAHeader =
  '//h2[contains(text(),"State Plan Amendments (SPAs)")]';
const waiversHeader = '//h2[contains(text(),"Waivers")]';
const oneMacHelpDeskContactInfoHeader =
  '//h2[contains(text(),"OneMAC Help Desk Contact Info")]';
const phoneNumber = '//dt[contains(text(),"Phone Number")]';
const actualPhoneNumber = '//a[contains(text(),"(833) 228-2540")]';
const email = '//dt[contains(text(),"Email")]';
const actualEmail =
  "//*[@id='faq-contact-info-box']//a[@href='mailto:OneMAC_Helpdesk@cms.hhs.gov']";
//General Section
const whatBrowsersCanIUseToAccessTheSystem = "#browsers-button";
//Element is Xpath use cy.xpath instead of cy.get
const whatBrowsersCanIUseToAccessTheSystemValue =
  '//p[contains(text(),"The submission portal works best on Google Chrome")]';
const whatShouldWeDoIfWeDontRecieveAConfirmationEmail = "#confirm-email-button";
//Element is Xpath use cy.xpath instead of cy.get
const whatShouldWeDoIfWeDontRecieveAConfirmationEmailValue =
  '//p[contains(text(),"Refresh your inbox, check your SPAM filters, then contact the OneMAC Help")]';
const isThisConsideredTheStateOfficialSubmission = "#is-official-button";
//Element is Xpath use cy.xpath instead of cy.get
const isThisConsideredTheStateOfficialSubmissionValue =
  '//p[contains(text(),"Yes, as long as you have the electronic receipt (c")]';
const whatAreTheOneMacUserRoles = "#onemac-roles-button";
//Element is Xpath use cy.xpath instead of cy.get
const whatAreTheOneMacUserRolesValueStateSubmitter =
  "//*[@id='onemac-roles']//td[text()='State Submitter']";
//Element is Xpath use cy.xpath instead of cy.get
const whatAreTheOneMacUserRolesValueStateSystemAdministrator =
  "//*[@id='onemac-roles']//tr[2]/td[text()='State System Administrator']";
//Element is Xpath use cy.xpath instead of cy.get
const whatAreTheOneMacUserRolesValueCMSRoleApprover =
  "//*[@id='onemac-roles']//tr[3]//td[text()='CMS Role Approver']";
//State Plan Amendment (SPA's) Section
const whatFormatIsUsedToEnterASPAID = "#spa-id-format-button";
const whatFormatIsUsedToEnterASPAIDValue = "#spa-id-format";
const whatAreTheAttachmentForMedicaidSPA = "#medicaid-spa-attachments-button";
const whatAreTheAttachmentForMedicaidSPAValue =
  "div.header-and-content:nth-child(1) div.form-container div.faq-card div.faq-left-column:nth-child(2) div.faq-section:nth-child(2) div.ds-c-accordion div:nth-child(2) div.ds-c-accordion__content.accordion-content:nth-child(2) > p:nth-child(2)";
const wharAreTheAttachmentForMedicaidResponseToSPARAI =
  "#medicaid-spa-rai-attachments-button";
const wharAreTheAttachmentForMedicaidResponseToSPARAIValue =
  "div.header-and-content:nth-child(1) div.form-container div.faq-card div.faq-left-column:nth-child(2) div.faq-section:nth-child(2) div.ds-c-accordion div:nth-child(3) div.ds-c-accordion__content.accordion-content:nth-child(2) > p:nth-child(1)";
const whatAreTheAttachmentsForChIPSPA = "#chip-spa-attachments-button";
const whatAreTheAttachmentsForChIPSPAValue =
  "div.header-and-content:nth-child(1) div.form-container div.faq-card div.faq-left-column:nth-child(2) div.faq-section:nth-child(2) div.ds-c-accordion div:nth-child(4) div.ds-c-accordion__content.accordion-content:nth-child(2) > p:nth-child(1)";
const whatAreTheAttachmentsForChIPSPAResponseToRAI =
  "#chip-spa-rai-attachments-button";
const whatAreTheAttachmentsForChIPSPAResponseToRAIValue =
  "div.header-and-content:nth-child(1) div.form-container div.faq-card div.faq-left-column:nth-child(2) div.faq-section:nth-child(2) div.ds-c-accordion div:nth-child(5) div.ds-c-accordion__content.accordion-content:nth-child(2) > p:nth-child(1)";
const canISubmitSPAFORPHEInOneMac = "#public-health-emergency-button";
//Element is Xpath use cy.xpath instead of cy.get
const canISubmitSPAFORPHEInOneMacValue =
  '//p[contains(text(),"Yes, all PHE-related SPAs should be submitted thro")]';
//Waiver section
const whatFormatIsUsedToEnterASPAIDforWaivers = "#waiver-id-format-button";
const whatFormatIsUsedToEnterASPAIDforWaiversValue =
  // "div.header-and-content:nth-child(1) div.form-container div.faq-card div.faq-left-column:nth-child(2) div.faq-section:nth-child(3) div.ds-c-accordion div:nth-child(1) div.ds-c-accordion__content.accordion-content:nth-child(2) > p:nth-child(1)";
  "#waiver-id-format";
const whoCanIContactToHelpMeFigureOutTheCorrect1915bWaiverNumber =
  "#waiver-id-help-button";
const whoCanIContactToHelpMeFigureOutTheCorrect1915bWaiverNumberValue =
  "#waiver-id-help";
const whatFormatIsUsedToEnter1915cwaiverNumber = "#waiver-c-id-button";
const whatFormatIsUsedToEnter1915cwaiverNumberValue = "#waiver-c-id";
const whatAttachmentsAreNeededToSubmitA1915bWaiverAction =
  "#waiverb-attachments-button";
const whatAttachmentsAreNeededToSubmitA1915bWaiverActionValue =
  "#waiverb-attachments";
const whatAreTheAttachmentsFor1915bResponsetoRAI =
  "#waiverb-rai-attachments-button";
const whatAreTheAttachmentsFor1915bResponsetoRAIValue =
  "#waiverb-rai-attachments";
const whatAreTheAttachmentsFor1915bRequestTemprorayExtension =
  "#waiverb-extension-attachments-button";
const whatAreTheAttachmentsFor1915bRequestTemprorayExtensionValue =
  "#waiverb-extension-attachments";
const canISubmitAppendixKAmmendmentsInOneMac = "#appk-button";
const canISubmitAppendixKAmmendmentsInOneMacValue = "#appk";
const whatAreTheAttachmentsForAppendixKWaiver = "#appk-attachments-button";
const whatAreTheAttachmentsForAppendixKWaiverValue = "#appk-attachments";
const onboardingMaterialsBtn = "#onboarding-materials-button";
const welcomeToOneMacLink =
  "//div[@id='onboarding-materials']//a[text() = 'Welcome to OneMAC']";
const idmInstructionsLink =
  "//div[@id='onboarding-materials']//a[text() = 'IDM Instructions for OneMAC Users']";
const idmGuideLink =
  "//div[@id='onboarding-materials']//a[text() = 'OneMAC IDM Guide']";
const stateSubmitterGuideLink =
  "//div[@id='onboarding-materials']//a[text() = 'OneMAC State Submitter Guide']";
const stateAdminGuideLink =
  "//div[@id='onboarding-materials']//a[text() = 'OneMAC State Administrator Guide']";
const cmsUserGuideLink =
  "//div[@id='onboarding-materials']//a[text() = 'OneMAC CMS User Guide']";
const cmsRoleApproverGuideLink =
  "//div[@id='onboarding-materials']//a[text() = 'OneMAC CMS Role Approver Guide']";

export class oneMacFAQPage {
  verifyGeneralSectionExists() {
    cy.xpath(generalHeader).should("be.visible");
  }

  verifySPASectionExists() {
    cy.xpath(statePlanAmendmentSPAHeader).should("be.visible");
  }
  verifyWaiversExists() {
    cy.xpath(waiversHeader).should("be.visible");
  }
  verifyOneMacHelpDeskInfoExists() {
    cy.xpath(oneMacHelpDeskContactInfoHeader).should("be.visible");
  }

  verifyVerifyWhatbrowserscanIusetoaccessthesystemlinkisdisplayedandclickit() {
    cy.get(whatBrowsersCanIUseToAccessTheSystem).click();
  }

  verifytextcontainsThesubmissionportalworksbestonGoogleChrome() {
    cy.xpath(whatBrowsersCanIUseToAccessTheSystemValue).should("be.visible");
  }

  VerifyWhatshouldwedoifwedontreceiveaconfirmationemailisdisplayedandclickit() {
    cy.get(whatShouldWeDoIfWeDontRecieveAConfirmationEmail).click();
  }

  VerifytextcontainsRefreshyourinboxcheckyourSPAMfiltersthencontacttheOneMACHelpDesk() {
    cy.xpath(whatShouldWeDoIfWeDontRecieveAConfirmationEmailValue).should(
      "be.visible"
    );
  }
  VerifyIsthisconsideredtheofficialstatesubmissionisdisplayedandclickit() {
    cy.get(isThisConsideredTheStateOfficialSubmission).click();
  }

  VerifytextcontainsYesaslongasuouhavetheelectronicreceipt() {
    cy.xpath(isThisConsideredTheStateOfficialSubmissionValue).should(
      "be.visible"
    );
  }
  VerifyWhataretheOneMACuserrolesisdisplayedandclickit() {
    cy.get(whatAreTheOneMacUserRoles).click();
  }
  VerifytextcontainsStateSubmitter() {
    cy.xpath(whatAreTheOneMacUserRolesValueStateSubmitter).should("be.visible");
  }
  VerifytextcontainsStateSystemAdministrator() {
    cy.xpath(whatAreTheOneMacUserRolesValueStateSystemAdministrator).should(
      "be.visible"
    );
  }
  VerifytextcontainsCMSRoleApprover() {
    cy.xpath(whatAreTheOneMacUserRolesValueCMSRoleApprover).should(
      "be.visible"
    );
  }
  VerifyWhatWhatformatisusedtoenteraSPAIDisdisplayedandclickit() {
    cy.get(whatFormatIsUsedToEnterASPAID).click();
  }

  VerifytextcontainsEntertheStatePlanAmendmenttransmittalnumberAssignconsecutivenumbersonacalendaryearbasis() {
    cy.get(whatFormatIsUsedToEnterASPAIDValue).should("be.visible");
  }
  VerifyWhataretheattachmentsforaMedicaidSPAisdisplayedandclickit() {
    cy.get(whatAreTheAttachmentForMedicaidSPA).click();
  }

  VerifytextcontainsSPAsubmissionrequirementscanbefoundinregulation() {
    cy.get(whatAreTheAttachmentForMedicaidSPAValue).should("be.visible");
  }

  VerifyWhataretheattachmentsforaMedicaidresponsetoRequestforAdditionalInformationRAIisdisplayedandclickit() {
    cy.get(wharAreTheAttachmentForMedicaidResponseToSPARAI).click();
  }
  Verifytextcontainsindicatesarequiredattachment() {
    cy.get(wharAreTheAttachmentForMedicaidResponseToSPARAIValue).should(
      "be.visible"
    );
  }

  VerifyWhataretheattachmentsforaCHIPSPAisdisplayedandclickit() {
    cy.get(whatAreTheAttachmentsForChIPSPA).click();
  }
  VerifyWhataretheattachmentsforaCHIPSPAresponsetoRequestforAdditionalInformationRAIisdisplayedandclickit() {
    cy.get(whatAreTheAttachmentsForChIPSPAResponseToRAI).click();
  }
  VerifyCanIsubmitSPAsrelatingtothePublicHealthEmergencyPHEinOneMACisdisplayedandclickit() {
    cy.get(canISubmitSPAFORPHEInOneMac).click();
  }
  VerifytextcontainsYesallPHErelatedSPAsshouldbesubmittedthroughOneMAC() {
    cy.xpath(canISubmitSPAFORPHEInOneMacValue).should("be.visible");
  }

  VerifyWhatformatisusedtoentera1915bwaivernumberisdisplayedandclickit() {
    cy.get(whatFormatIsUsedToEnterASPAIDforWaivers).click();
  }
  VerifytextcontainsWaivernumbermustfollowtheformat() {
    cy.get(whatFormatIsUsedToEnterASPAIDforWaiversValue).should("be.visible");
  }
  VerifyWhocanIcontacttohelpmefigureoutthecorrect1915bWaiverNumberisdisplayedandclickit() {
    cy.get(whoCanIContactToHelpMeFigureOutTheCorrect1915bWaiverNumber).click();
  }
  VerifytextcontainsEmailMCOGDMCOActionscmshhsgovtogetsupportwithdeterminingthecorrect1915bWaiverNumber() {
    cy.get(
      whoCanIContactToHelpMeFigureOutTheCorrect1915bWaiverNumberValue
    ).should("be.visible");
  }
  VerifyWhatformatisusedtoentera1915cwaivernumberisdisplayedandclickit() {
    cy.get(whatFormatIsUsedToEnter1915cwaiverNumber).click();
  }
  VerifytextcontainsWaivernumbermustfollowtheformatSStoinclude() {
    cy.get(whatFormatIsUsedToEnter1915cwaiverNumberValue).should("be.visible");
  }
  VerifyWhatattachmentsareneededtosubmita1915bwaiveractionisdisplayedandclickit() {
    cy.get(whatAttachmentsAreNeededToSubmitA1915bWaiverAction).click();
  }
  VerifytextcontainsTheregulationsat42CFR4302543155and42CFR441301() {
    cy.get(whatAttachmentsAreNeededToSubmitA1915bWaiverActionValue).should(
      "be.visible"
    );
  }
  VerifyWhataretheattachmentsfora1915bWaiverresponsetoRequestforAdditionalInformationRAIisdisplayedandclickit() {
    cy.get(whatAreTheAttachmentsFor1915bResponsetoRAI).click();
  }
  VerifyWhataretheattachmentsfora1915bWaiverRequestforTemporaryExtensionisdisplayedandclickit() {
    cy.get(whatAreTheAttachmentsFor1915bRequestTemprorayExtension).click();
  }
  VerifyCanIsubmitAppendixKamendmentsinOneMACisdisplayedandclickit() {
    cy.get(canISubmitAppendixKAmmendmentsInOneMac).click();
  }
  VerifytextcontainsYesyoucansubmitAppendixKamendments() {
    cy.get(canISubmitAppendixKAmmendmentsInOneMacValue).should("be.visible");
  }
  VerifyWhataretheattachmentsfora1915cAppendixKWaiverisdisplayedandclickit() {
    cy.get(whatAreTheAttachmentsForAppendixKWaiver).click();
  }
  VerifytextcontainsTheregulationsat42CFR4302543155and42CFR441301describethe() {
    cy.get(whatAreTheAttachmentsForAppendixKWaiverValue).should("be.visible");
  }
  verifyPhoneNumberExists() {
    cy.get(phoneNumber).should("be.visible");
  }
  verifyActualphoneNumberExists() {
    cy.xpath(actualPhoneNumber).should("be.visible");
  }
  verifyemailExists() {
    cy.xpath(email).should("be.visible");
  }
  verifyActualemailExists() {
    cy.xpath(actualEmail).should("be.visible");
  }
  VerifypagetitleisFAQ() {
    cy.url().should("include", "/FAQ");
  }
  VerifyFrequentlyAskedQuestionsExists() {
    cy.xpath(frequentlyAskedQuestionHeader).should("be.visible");
  }
  verifyOnboardingMaterialsBtnExists() {
    cy.get(onboardingMaterialsBtn).should("be.visible");
  }
  clickOnboardingMaterialsBtn() {
    cy.get(onboardingMaterialsBtn).click();
  }
  verifyWelcomeToOneMacLinkExists() {
    cy.xpath(welcomeToOneMacLink).should("be.visible");
  }
  verifyIdmInstructionsLinkExists() {
    cy.xpath(idmInstructionsLink).should("be.visible");
  }
  verifyIdmGuideLinkExists() {
    cy.xpath(idmGuideLink).should("be.visible");
  }
  verifyStateSubmitterGuideLinkExists() {
    cy.xpath(stateSubmitterGuideLink).should("be.visible");
  }
  verifyStateAdminGuideLinkExists() {
    cy.xpath(stateAdminGuideLink).should("be.visible");
  }
  verifyCmsUserGuideLinkExists() {
    cy.xpath(cmsUserGuideLink).should("be.visible");
  }
  verifyCmsRoleApproverGuideLinkExists() {
    cy.xpath(cmsRoleApproverGuideLink).should("be.visible");
  }
  verifyWelcomeToOneMacLinkIsValid() {
    cy.xpath(welcomeToOneMacLink)
      .invoke("attr", "href")
      .then((href) => {
        cy.request(href).its("status").should("eq", 200);
      });
  }
  verifyIdmInstructionsLinkIsValid() {
    cy.xpath(idmInstructionsLink)
      .invoke("attr", "href")
      .then((href) => {
        cy.request(href).its("status").should("eq", 200);
      });
  }
  verifyIdmGuideLinkIsValid() {
    cy.xpath(idmGuideLink)
      .invoke("attr", "href")
      .then((href) => {
        cy.request(href).its("status").should("eq", 200);
      });
  }
  verifyStateSubmitterGuideLinkIsValid() {
    cy.xpath(stateSubmitterGuideLink)
      .invoke("attr", "href")
      .then((href) => {
        cy.request(href).its("status").should("eq", 200);
      });
  }
  verifyStateAdminGuideLinkIsValid() {
    cy.xpath(stateAdminGuideLink)
      .invoke("attr", "href")
      .then((href) => {
        cy.request(href).its("status").should("eq", 200);
      });
  }
  verifyCmsUserGuideLinkIsValid() {
    cy.xpath(cmsUserGuideLink)
      .invoke("attr", "href")
      .then((href) => {
        cy.request(href).its("status").should("eq", 200);
      });
  }
  verifyCmsRoleApproverGuideLinkIsValid() {
    cy.xpath(cmsRoleApproverGuideLink)
      .invoke("attr", "href")
      .then((href) => {
        cy.request(href).its("status").should("eq", 200);
      });
  }
}
export default oneMacFAQPage;
