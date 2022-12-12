const medicaidTopRaiRespCaret = "#medicaidsparai0_caret-button";
const medicaidTopRaiRespDownloadBtn = "#dl_medicaidsparai0";
const medicaidTopRaiRespCard = "#medicaidsparai0_caret";
const topRaiRespAddInfo = "#addl-info-rai-0";
const chipTopRaiRespCaret = "#chipsparai0_caret-button";
const chipTopRaiRespDownloadBtn = "#dl_chipsparai0";
const chipTopRaiRespCard = "#chipsparai0_caret";
const appKTopRaiRespCaret = "#waiverappkrai0_caret-button";
const appKTopRaiRespDownloadBtn = "#dl_waiverappkrai0";
const appKTopRaiRespCard = "#waiverappkrai0_caret";

//Elements are Xpath use cy.xpath instead of cy.xpath
const detailsPage = "//div[@class='form-container']";
const actionCard = "//div[@class='detail-card']";
const statusHeader = "//h3[contains(text(),'Status')]";
const date90thDay = "//h3[contains(text(),'90th Day')]";
const packageActionsHeader =
  "//div[@class='detail-card']//section[@class='package-actions']//h3";
const packageActionsList = "//ul[@class='action-list']";
const respondToRAIAction = "//a[text()='Respond to RAI']";
const withdrawPackageAction = "//a[text()='Withdraw Package']";
const requestTempExtensionPackageAction =
  "//a[text()='Request Temporary Extension']";
const addAmendmentPackageAction = "//a[text()='Add Amendment']";
const detailSection =
  "//section[@class='detail-section']//h2[contains(.,'Details')]";
const CHIPSPAIDHeader = "//h3[contains(text(),'SPA ID')]";
const typeHeader = "//h3[contains(text(),'Type')]";
const parentWaiverNumberHeader =
  "//h3[contains(text(),'Approved Initial or Renewal Number')]";
const stateHeader = "//h3[text()='State']";
const initialSubmittedDateHeader = "//h3[text()='Date Submitted']";
const raiResponsesHeader = "//section//h2[text()='Formal RAI Responses']";
const packageOverviewNavBtn = "//button[text()='Package Overview']";
const packageDetailsNavBtn =
  "//li[contains(@class, 'nav')]//a[text()='Package Details']";
const proposedEffectiveDateHeader =
  "//h3[contains(text(),'Proposed Effective Date')]";
const ninetieththDayHeader = "//h3[text()='90th Day']";
const additionalInfoSection =
  "//section[@id='addl-info-initial']//h2[text()='Additional Information']";
const waiverAuthorityHeader = "//h3[text()='Waiver Authority']";
const supportingDocumentationSection = "//h2[text()='Attachments']";
const downloadAllBtn = "//button[contains(text(),'Download All')]";
const amendmentTitleHeader = "//h3[text()='Amendment Title']";
const amendmentNumberHeader = "//h3[text()='Amendment Number']";
const successMessage = "#alert-bar";
const withdrawConfirmationBtn = "//button[text()='Withdraw Package?']";
const withdrawBtn = "//a[text()='Withdraw Package']";
const amendmentHeaders = "//h2[text()='Waiver Amendment']";
const tempExtensionsNavBtn =
  "//li[contains(@class, 'nav')]//a[text()='Temporary Extension']";
const tempExtensionID = "//td[contains(@id,'componentId-')]";
const withdrawBtnOnTempExt = "//li[text()='Withdraw Package']";
const packageAction = "//td[contains(@id,'packageActions-')]";

export class oneMacPackageDetailsPage {
  verifyPackageDetailsPageIsVisible() {
    cy.xpath(detailsPage).should("be.visible");
  }
  verifyActionCardExists() {
    cy.xpath(actionCard).should("be.visible");
  }
  verifyStatusIs(status) {
    cy.xpath(statusHeader).next().contains(status);
  }
  verify90thDayDateDoesntExist() {
    cy.xpath(date90thDay).should("not.exist");
  }
  verifyPackageActionsHeaderIsVisible() {
    cy.xpath(packageActionsHeader).should("be.visible");
  }
  verifyNoPackageActionsAvailable() {
    cy.xpath(packageActionsList).should("be.visible");
  }
  verifyPackageActionsSectionDoesNotExist() {
    cy.xpath(packageActionsList).should("not.exist");
  }
  verifyRespondtoRAIActionExists() {
    cy.xpath(respondToRAIAction).should("be.visible");
  }
  verifyWithdrawPackageActionExists() {
    cy.xpath(withdrawPackageAction).should("be.visible");
  }
  verifyRequestTempExtensionPackageActionExists() {
    cy.xpath(requestTempExtensionPackageAction).should("be.visible");
  }
  clickRequestTempExtensionPackageAction() {
    cy.xpath(requestTempExtensionPackageAction).click();
  }
  verifyAddAmendmentActionExists() {
    cy.xpath(addAmendmentPackageAction).should("be.visible");
  }
  clickAddAmendmentPackageAction() {
    cy.xpath(addAmendmentPackageAction).click();
  }
  clickRespondToRAIAction() {
    cy.xpath(respondToRAIAction).click();
  }
  verifyDetailSectionExists() {
    cy.xpath(detailSection).should("be.visible");
  }
  verifyCHIPSPAIDHeaderExists() {
    cy.xpath(CHIPSPAIDHeader).should("be.visible");
  }
  verifyIDExists() {
    cy.xpath(CHIPSPAIDHeader).next().should("be.visible");
  }
  verifyTypeHeaderExists() {
    cy.xpath(typeHeader).should("be.visible");
  }
  verifyTypeContainsSPA() {
    cy.xpath(typeHeader).next().contains("SPA");
  }
  verifyTypeContainsInitialWaiver() {
    cy.xpath(typeHeader).next().contains("Initial Waiver");
  }
  verifyTypeContainsWaiverRenewal() {
    cy.xpath(typeHeader).next().contains("1915(b) Waiver Renewal");
  }
  verifyTypeContainsTempExtension() {
    cy.xpath(typeHeader).next().contains("Temporary Extension");
  }
  verifyParentWaiverNumberHeaderExists() {
    cy.xpath(parentWaiverNumberHeader).should("be.visible");
  }
  verifyParentWaiverNumber(s) {
    cy.xpath(parentWaiverNumberHeader).next().contains(s);
  }
  verifyStateHeaderExists() {
    cy.xpath(stateHeader).should("be.visible");
  }
  verifyStateExists() {
    cy.xpath(stateHeader).next().should("be.visible");
  }
  verifyInitialSubmittedDateHeaderExists() {
    cy.xpath(initialSubmittedDateHeader).should("be.visible");
  }
  verifyDateExists() {
    cy.xpath(initialSubmittedDateHeader).next().should("be.visible");
  }
  verifyRaiResponseHeaderExists() {
    cy.xpath(raiResponsesHeader).scrollIntoView().should("be.visible");
  }
  verifyRaiResponseHeaderTitle() {
    cy.xpath(raiResponsesHeader).scrollIntoView().should("be.visible");
  }
  verifyCHIPTopRaiRespCaretExistsAndEnabled() {
    cy.get(chipTopRaiRespCaret).scrollIntoView().should("be.visible");
    cy.get(chipTopRaiRespCaret).should("be.enabled");
  }
  verifyMedicaidTopRaiRespCaretExistsAndEnabled() {
    cy.get(medicaidTopRaiRespCaret).scrollIntoView().should("be.visible");
    cy.get(medicaidTopRaiRespCaret).should("be.enabled");
  }
  verifyAppKTopRaiRespCaretExistsAndEnabled() {
    cy.get(appKTopRaiRespCaret).scrollIntoView().should("be.visible");
    cy.get(appKTopRaiRespCaret).should("be.enabled");
  }
  verifyCHIPTopRaiRespCaretTitle() {
    cy.get(chipTopRaiRespCaret).scrollIntoView().contains("Submitted on");
  }
  verifyMedicaidTopRaiRespCaretTitle() {
    cy.get(medicaidTopRaiRespCaret).scrollIntoView().contains("Submitted on");
  }
  verifyAppKTopRaiRespCaretTitle() {
    cy.get(appKTopRaiRespCaret).scrollIntoView().contains("Submitted on");
  }
  verifyCHIPTopRaiRespCardExists() {
    cy.get(chipTopRaiRespCard).scrollIntoView().should("be.visible");
  }
  verifyMedicaidTopRaiRespCardExists() {
    cy.get(medicaidTopRaiRespCard).scrollIntoView().should("be.visible");
  }
  verifyAppKTopRaiRespCardExists() {
    cy.get(appKTopRaiRespCard).scrollIntoView().should("be.visible");
  }
  verifyCHIPTopRaiRespDownloadBtnExistsAndEnabled() {
    cy.get(chipTopRaiRespDownloadBtn).scrollIntoView().should("be.visible");
    cy.get(chipTopRaiRespDownloadBtn).should("be.enabled");
  }
  verifyMedicaidTopRaiRespDownloadBtnExistsAndEnabled() {
    cy.get(medicaidTopRaiRespDownloadBtn).scrollIntoView().should("be.visible");
    cy.get(medicaidTopRaiRespDownloadBtn).should("be.enabled");
  }
  verifyAppKTopRaiRespDownloadBtnxistsAndEnabled() {
    cy.get(appKTopRaiRespDownloadBtn).scrollIntoView().should("be.visible");
    cy.get(appKTopRaiRespDownloadBtn).should("be.enabled");
  }

  verifyTopRaiRespAddInfoDoesNotExist() {
    cy.get(topRaiRespAddInfo).should("not.exist");
  }
  verifyTopRaiRespAddInfoExists() {
    cy.get(topRaiRespAddInfo).scrollIntoView().should("be.visible");
  }
  verifyPackageOverviewNavBtnExists() {
    cy.xpath(packageOverviewNavBtn).should("be.visible");
  }
  verifyPackageOverviewNavBtnIsEnabled() {
    cy.xpath(packageOverviewNavBtn).should("be.enabled");
  }
  verifyPackageOverviewNavBtnIsExpanded() {
    cy.xpath(packageOverviewNavBtn).should(
      "have.attr",
      "aria-expanded",
      "true"
    );
  }
  verifyPackageDetailsNavBtnExists() {
    cy.xpath(packageDetailsNavBtn).should("be.visible");
  }
  verifyProposedEffectiveDateHeaderExists() {
    cy.xpath(proposedEffectiveDateHeader).should("be.visible");
  }
  verifyproposedEffectiveDateHeaderContainsNA() {
    cy.xpath(proposedEffectiveDateHeader).next().contains("N/A");
  }
  verifyAmendmentNumberHeaderExists() {
    cy.xpath(amendmentNumberHeader).should("be.visible");
  }
  verifyAmendmentNumbermatches(anumber) {
    cy.xpath(amendmentNumberHeader).next().contains(anumber);
  }
  verifyAmendmentTitleHeaderExists() {
    cy.xpath(amendmentTitleHeader).should("be.visible");
  }
  verifyAmendmentTitleHeaderContainsNA() {
    cy.xpath(amendmentTitleHeader).next().contains("N/A");
  }
  verifyWaiverAuthorityHeaderExists() {
    cy.xpath(waiverAuthorityHeader).should("be.visible");
  }
  verifyWaiverAuthorityHeaderis1915cHCBS() {
    cy.xpath(waiverAuthorityHeader).next().contains("1915(c) HCBS");
  }
  verifySupportingDocumentationSectionExists() {
    cy.xpath(supportingDocumentationSection).should("be.visible");
  }
  verifyDownloadAllBtnExists() {
    cy.xpath(downloadAllBtn)
      .scrollIntoView({ easing: "linear" })
      .should("be.visible");
  }
  verifyAdditionalInfoSectionExists() {
    cy.xpath(additionalInfoSection).should("be.visible");
  }
  verify90thDayHeaderExists() {
    cy.xpath(ninetieththDayHeader).should("be.visible");
  }
  verify90thDayHeaderContainsNA() {
    cy.xpath(ninetieththDayHeader).next().contains("N/A");
  }
  clickWithdrawBtn() {
    cy.xpath(withdrawBtn).click();
  }
  clickWithdrawConfirmationBtn() {
    cy.xpath(withdrawConfirmationBtn).click();
  }
  verifySubmissionMsgForWithdrawnAmendment() {
    cy.get(successMessage).contains(
      "Your submission package has successfully been withdrawn"
    );
  }
  verifyAmendmentDetailSectionExists() {
    cy.xpath(amendmentHeaders).should("be.visible");
  }
  clickTempExtensionsNavBtn() {
    cy.xpath(tempExtensionsNavBtn).click();
  }
  verifyTempExtensionIDExists(num) {
    cy.xpath(tempExtensionID).contains(num).should("be.visible");
  }
  clickTempExtensionID(num) {
    cy.xpath(tempExtensionID).contains(num).click();
  }
  clickTempExtensionActionBtn(num) {
    cy.xpath(tempExtensionID)
      .contains(num)
      .parents("tr")
      .first()
      .find("button")
      .click();
  }
  clickWithdrawBtnOnTempExt() {
    cy.xpath(withdrawBtnOnTempExt).filter(":visible").click();
  }
}
export default oneMacPackageDetailsPage;
