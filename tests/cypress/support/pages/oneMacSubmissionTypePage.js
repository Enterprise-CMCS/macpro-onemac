//Element is Xpath use cy.xpath instead of cy.get
const statePlanAmendmentSPA =
  '//h4[contains(text(),"State Plan Amendment (SPA)")]';
//Element is Xpath use cy.xpath instead of cy.get
const waiverAction = '//h4[contains(text(),"Waiver Action")]';
//Element is Xpath use cy.xpath instead of cy.get
const MedicalSPA = '//h4[text()="Medicaid SPA"]';
//Element is Xpath use cy.xpath instead of cy.get
const ChipSPA = '//h4[text()="CHIP SPA"]';
//Element is Xpath use cy.xpath instead of cy.get
const waiverActionWaiverAction = '//h4[contains(text(),"Waiver Action")]';
//Element is Xpath use cy.xpath instead of cy.get
const RequestTemporaryExtension =
  '//h4[contains(text(),"Request Temporary Extension")]';
//Element is Xpath use cy.xpath instead of cy.get
const AppendixKAmendment = '//h4[contains(text(),"Appendix K Amendment")]';

export class oneMacSubmissionTypePage {
  clickStatePlanAmendmentSPA() {
    cy.xpath(statePlanAmendmentSPA).click();
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
}
export default oneMacSubmissionTypePage;
