//Element is Xpath use cy.xpath instead of cy.get
const statePlanAmendmentSPA = '//div[text()="State Plan Amendment (SPA)"]';
//Element is Xpath use cy.xpath instead of cy.get
const waiverAction =
  "//a[contains(@href,'waiver')]//div[text()='Waiver Action']";
//Element is Xpath use cy.xpath instead of cy.get
const MedicalSPA = '//div[text()="Medicaid SPA"]';
//Element is Xpath use cy.xpath instead of cy.get
const ChipSPA = '//div[text()="CHIP SPA"]';
//Element is Xpath use cy.xpath instead of cy.get
const waiverActionWaiverAction =
  '//p[contains(text(),"Submit 1915(b) waivers, amendments, and renewals")]';
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
const initialWaiver = "//a//div[text()='1915(b) Initial Waiver']";
//Element is Xpath use cy.xpath instead of cy.get
const RequestExtensionBtn = '//button[text()="Request Extension"]';
//Element is Xpath use cy.xpath instead of cy.get
const appendixK = '//div[text()="1915(c) Appendix K Amendment"]';
//Element is Xpath use cy.xpath instead of cy.get
const amendment = '//a//div[text()="1915(b) Waiver Amendment"]';
//Element is Xpath use cy.xpath instead of cy.get
const initialWaiverRenewal = '//div[text()="1915(b) Waiver Renewal"]';

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
    cy.xpath(initialWaiver).click();
  }
  clickWaiverRenewal() {
    cy.xpath(initialWaiverRenewal).click();
  }
  clickWaiverAmendment() {
    cy.xpath(amendment).click();
  }
  verifyInitialWaiverIsClickable() {
    cy.xpath(initialWaiver)
      .parent()
      .parent()
      .should("have.attr", "href", "/initial-waiver");
  }
  verifyAppendixKIsClickable() {
    cy.xpath(appendixK)
      .parent()
      .parent()
      .should("have.attr", "href", "/appendix-k-amendment");
  }
  verifyWaiverRenewalIsClickable() {
    cy.xpath(initialWaiverRenewal)
      .parent()
      .parent()
      .should("have.attr", "href", "/waiver-renewal");
  }
  verifyAmendmentIsClickable() {
    cy.xpath(amendment)
      .parent()
      .parent()
      .should("have.attr", "href", "/waiver-amendment");
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
