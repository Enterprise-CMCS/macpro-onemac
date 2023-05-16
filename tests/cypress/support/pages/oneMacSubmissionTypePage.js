//Element is Xpath use cy.xpath instead of cy.get
const statePlanAmendmentSPA = '//div[text()="State Plan Amendment (SPA)"]';
//Element is Xpath use cy.xpath instead of cy.get
const waiverAction =
  "//a[contains(@href,'waiver')]//div[text()='Waiver Action']";
const waiverActions1915b =
  "//a[contains(@href,'waiver-b')]//div[text()='1915(b) Waiver Actions']";
//Element is Xpath use cy.xpath instead of cy.get
const MedicalSPA = '//div[text()="Medicaid SPA"]';
//Element is Xpath use cy.xpath instead of cy.get
const ChipSPA = '//div[text()="CHIP SPA"]';
//Element is Xpath use cy.xpath instead of cy.get
const waiverActionWaiverAction =
  '//p[contains(text(),"Submit 1915(b) waivers, amendments, and renewals")]';
const ffsSelectiveAuthority =
  "//div[contains(text(),'1915(b)(4) FFS Selective Contracting Waivers')]";
const comprehensiveCapitatedWaiverAuthority =
  "//div[contains(text(),'1915(b) Comprehensive (Capitated) Waiver Authority')]";
//Element is Xpath use cy.xpath instead of cy.get
const RequestTemporaryExtension =
  '//div[text()="Request 1915(b) and 1915(c) Temporary Extension"]';
const requestTemporaryExtensionPkgView =
  '//div[text()="Request Temporary Extension"]';
//Element is Xpath use cy.xpath instead of cy.get
const AppendixKAmendment = '//div[text()="1915(c) Appendix K Amendment"]';
//Element is Xpath use cy.xpath instead of cy.get
const respondToMedicaidSPARAI =
  '//div[text()="Respond to Formal Medicaid SPA RAI"]';
//Element is Xpath use cy.xpath instead of cy.get
const respondToCHIPSPARAI = '//div[text()="Respond to Formal CHIP SPA RAI"]';
//Element is Xpath use cy.xpath instead of cy.get
const respondToWaiverRAI = "//a//div[text()='Respond to Waiver RAI']";
//Element is Xpath use cy.xpath instead of cy.get
const initialWaiver1915b4 =
  "//div[text()='1915(b)(4) FFS Selective Contracting New Initial Waiver']";
//Element is Xpath use cy.xpath instead of cy.get
const comprehensiveInitialWaiver =
  "//div[text()='1915(b) Comprehensive (Capitated) New Initial Waiver']";
//Element is Xpath use cy.xpath instead of cy.get
const RequestExtensionBtn = '//button[text()="Request Extension"]';
//Element is Xpath use cy.xpath instead of cy.get
const appendixK = '//div[text()="1915(c) Appendix K Amendment"]';
//Element is Xpath use cy.xpath instead of cy.get
const amendment1915b4 =
  '//div[text()="1915(b)(4) FFS Selective Contracting Waiver Amendment"]';
const comprehensiveWaiverAmendment =
  '//div[text()="1915(b) Comprehensive (Capitated) Waiver Amendment"]';
//Element is Xpath use cy.xpath instead of cy.get
const renewalWaiver1915b4 =
  '//div[text()="1915(b)(4) FFS Selective Contracting Renewal Waiver"]';
const comprehensiveRenewalWaiver =
  '//div[text()="1915(b) Comprehensive (Capitated) Renewal Waiver"]';

export class oneMacSubmissionTypePage {
  clickStatePlanAmendmentSPA() {
    cy.xpath(statePlanAmendmentSPA).click();
  }
  verifyNewWaiverPage() {
    cy.url().should("include", "/newwaiver");
  }
  verifyNewSPAPage() {
    cy.url().should("include", "/newspa");
  }
  verifyNewInitialWaiverPage() {
    cy.url().should("include", "/initial-waiver");
  }
  verifyNewWaiverRenewalPage() {
    cy.url().should("include", "/waiver-renewal");
  }
  verifyNewWaiverAmendmentPage() {
    cy.url().should("include", "/waiver-amendment");
  }
  verifyNewAppendixKPage() {
    cy.url().should("include", "/appendix-k-amendment");
  }
  clickwaiverAction() {
    cy.xpath(waiverAction).click();
  }
  click1915bWaiverActions() {
    cy.xpath(waiverActions1915b).click();
  }
  clickFssSelectiveAuthority() {
    cy.xpath(ffsSelectiveAuthority).click();
  }
  click1915bComprehensiveCapitatedWaiverAuthority() {
    cy.xpath(comprehensiveCapitatedWaiverAuthority).click();
  }
  clickMedicaidSPA() {
    cy.xpath(MedicalSPA).click();
  }

  clickChipSPA() {
    cy.xpath(ChipSPA).click();
  }

  clickWaiverActionUnderWaiverAction() {
    cy.xpath(waiverActionWaiverAction).click();
  }

  clickRequestTemporaryExtension() {
    cy.xpath(RequestTemporaryExtension).click();
  }
  clickRequestExtensionBtn() {
    cy.xpath(RequestExtensionBtn).click();
  }
  clickRequestTemporaryExtensionPkgView() {
    cy.xpath(requestTemporaryExtensionPkgView).click();
  }
  clickAppendixKAmendment() {
    cy.xpath(AppendixKAmendment).click();
  }
  clickRespondToMedicaidSPARAI() {
    cy.xpath(respondToMedicaidSPARAI).click();
  }
  clickRespondToCHIPSPARAI() {
    cy.xpath(respondToCHIPSPARAI).click();
  }
  clickRespondToWaiverRAI() {
    cy.xpath(respondToWaiverRAI).click();
  }
  clickInitialWaiver() {
    cy.xpath(initialWaiver1915b4).click();
  }
  clickComprehensiveInitialWaiver() {
    cy.xpath(comprehensiveInitialWaiver).click();
  }
  click1915b4WaiverRenewal() {
    cy.xpath(renewalWaiver1915b4).click();
  }
  clickComprehensiveRenewalWaiver() {
    cy.xpath(comprehensiveRenewalWaiver).click();
  }
  clickWaiverAmendment1915b4() {
    cy.xpath(amendment1915b4).click();
  }
  clickComprehensiveWaiverAmendmentWaiverAmendment() {
    cy.xpath(comprehensiveWaiverAmendment).click();
  }
  verifyFFSNewInitialWaiverIsClickable() {
    cy.xpath(initialWaiver1915b4)
      .parent()
      .parent()
      .should("have.attr", "href", "/initial-waiver-b-4");
  }
  verifyComprehensiveNewInitialWaiverIsClickable() {
    cy.xpath(comprehensiveInitialWaiver)
      .parent()
      .parent()
      .should("have.attr", "href", "/initial-waiver-b-other");
  }
  verifyAppendixKIsClickable() {
    cy.xpath(appendixK)
      .parent()
      .parent()
      .should("have.attr", "href", "/appendix-k-amendment");
  }
  verify1915b4WaiverRenewalIsClickable() {
    cy.xpath(renewalWaiver1915b4)
      .parent()
      .parent()
      .should("have.attr", "href", "/waiver-renewal-b-4");
  }
  verifyCompreheniveCapitatedRenewalWaiverIsClickable() {
    cy.xpath(comprehensiveRenewalWaiver)
      .parent()
      .parent()
      .should("have.attr", "href", "/waiver-renewal-b-other");
  }
  verifyFFSWaiverAmendmentIsClickable() {
    cy.xpath(amendment1915b4)
      .parent()
      .parent()
      .should("have.attr", "href", "/waiver-amendment-b-4");
  }
  verifyComprehensiveWaiverAmendmentIsClickable() {
    cy.xpath(comprehensiveWaiverAmendment)
      .parent()
      .parent()
      .should("have.attr", "href", "/waiver-amendment-b-other");
  }
  verifyChipSPAIsClickable() {
    cy.xpath(ChipSPA)
      .parent()
      .parent()
      .should("have.attr", "href", "/chip-spa");
  }
  verifyMedicaidSPAIsClickable() {
    cy.xpath(MedicalSPA)
      .parent()
      .parent()
      .should("have.attr", "href", "/medicaid-spa");
  }
}
export default oneMacSubmissionTypePage;
