//Element is Xpath use cy.xpath instead of cy.get
const statePlanAmendmentSPA = '//h4[text()="State Plan Amendment (SPA)"]';
//Element is Xpath use cy.xpath instead of cy.get
const waiverAction = '//h4[text()="Waiver Action"]';
//Element is Xpath use cy.xpath instead of cy.get
const MedicalSPA = '//h4[text()="Medicaid SPA"]';
//Element is Xpath use cy.xpath instead of cy.get
const ChipSPA = '//h4[text()="CHIP SPA"]';
//Element is Xpath use cy.xpath instead of cy.get
const waiverActionWaiverAction = '//h4[text()="Waiver Action"]';
//Element is Xpath use cy.xpath instead of cy.get
const RequestTemporaryExtension = '//h4[text()="Request Temporary Extension"]';
//Element is Xpath use cy.xpath instead of cy.get
const AppendixKAmendment = '//h4[text()="Appendix K Amendment"]';
//Element is Xpath use cy.xpath instead of cy.get
const respondToMedicaidSPARAI = '//h4[text()="Respond to Medicaid SPA RAI"]';
//Element is Xpath use cy.xpath instead of cy.get
const respondToCHIPSPARAI = '//h4[text()="Respond to CHIP SPA RAI"]';
//Element is Xpath use cy.xpath instead of cy.get
const respondToWaiverRAI = '//h4[text()="Respond to Waiver RAI"]';
//Element is Xpath use cy.xpath instead of cy.get
const baseWaiver = '//h4[text()="Base Waiver"]';

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
  verifyNewBaseWaiverPage() {
    cy.url().should("include", "/base-waiver");
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
  clickBaseWaiver() {
    cy.xpath(baseWaiver).click();
  }
  verifyBaseWaiverIsClickable() {
    cy.xpath(baseWaiver)
      .parent()
      .parent()
      .should("have.attr", "href", "/base-waiver");
  }
}
export default oneMacSubmissionTypePage;
