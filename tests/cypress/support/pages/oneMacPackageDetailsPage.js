const topRaiRespCaret = "#sparai0_caret-button";
const topRaiRespDownloadBtn = "#dl_sparai0";
const topRaiRespCard = "#sparai0_caret";
const topRaiRespAddInfo = "#addl-info-rai-0";

//Elements are Xpath use cy.xpath instead of cy.xpath
const detailsPage = "//div[@class='form-container']";
const actionCard = "//div[@class='detail-card']";
const statusHeader = "//div[@class='detail-card']//section[1]//h2";
const date90thDay = "//h3[contains(text(),'90th Day')]";
const packageActionsHeader =
  "//div[@class='detail-card']//section[@class='package-actions']//h2";
const packageActionsList = "//ul[@class='action-list']";
const respondToRAIAction = "//button[text()='Respond to RAI']";
const withdrawPackageAction = "//button[text()='Withdraw']";
const detailSection =
  "//section[@class='detail-section']//h2[contains(text(),'Package')]";
const CHIPSPAIDHeader = "//h3[contains(text(),'SPA ID')]";
const typeHeader = "//h3[contains(text(),'Type')]";
const stateHeader = "//h3[text()='State']";
const dateSubmittedHeader = "//h3[text()='Date Submitted']";
const raiResponsesHeader = "//section//h2[text()='RAI Responses']";
const packageOverviewNavBtn = "//button[text()='Package Overview']";
const packageDetailsNavBtn =
  "//li[contains(@class, 'nav')]//a[text()='Package Details']";
const proposedEffectiveDateHeader =
  "//h3[contains(text(),'Proposed Effective Date')]";
const ninetieththDayHeader = "//h3[text()='90th Day']";
const additionalInfoSection =
  "//section[@id='addl-info-base']//h2[text()='Additional Information']";
const waiverAuthorityHeader = "//h3[text()='Waiver Authority']";
const supportingDocumentationSection =
  "//h2[text()='Supporting Documentation']";
const downloadAllBtn = "//button[contains(text(),'Download All')]";
const amendmentTitleHeader = "//h3[text()='Amendment Title']";
const amendmentNumberHeader = "//h3[text()='Amendment Number']";
const successMessage = "#alert-bar";
const withdrawConfirmationBtn = "//button[text()='Withdraw?']";
const withdrawBtn = "//button[text()='Withdraw']";
const amendmentHeaders = "//h2[text()='Waiver Amendment']";
const tempExtensionsNavBtn =
  "//li[contains(@class, 'nav')]//a[text()='Temporary Extension']";
const tempExtensionID = "//td[contains(@id,'componentId-')]";
const withdrawBtnOnTempExt = "//li[text()='Withdraw']";

export class oneMacPackageDetailsPage {
  verifyPackageDetailsPageIsVisible() {
    cy.xpath(detailsPage).should("be.visible");
  }
  verifyActionCardExists() {
    cy.xpath(actionCard).should("be.visible");
  }
  verifyStatusIs(status) {
    cy.xpath(statusHeader).contains(status);
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
  verifyRespondtoRAIActionExists() {
    cy.xpath(respondToRAIAction).should("be.visible");
  }
  verifyWithdrawPackageActionExists() {
    cy.xpath(withdrawPackageAction).should("be.visible");
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
  verifyTypeContainsBaseWaiver() {
    cy.xpath(typeHeader).next().contains("Base Waiver");
  }
  verifyTypeContainsWaiverRenewal() {
    cy.xpath(typeHeader).next().contains("Waiver Renewal");
  }
  verifyStateHeaderExists() {
    cy.xpath(stateHeader).should("be.visible");
  }
  verifyStateExists() {
    cy.xpath(stateHeader).next().should("be.visible");
  }
  verifyDateSubmittedHeaderExists() {
    cy.xpath(dateSubmittedHeader).should("be.visible");
  }
  verifyDateExists() {
    cy.xpath(dateSubmittedHeader).next().should("be.visible");
  }
  verifyRaiResponseHeaderExists() {
    cy.xpath(raiResponsesHeader).scrollIntoView().should("be.visible");
  }
  verifyTopRaiRespCaretExistsAndEnabled() {
    cy.get(topRaiRespCaret).scrollIntoView().should("be.visible");
    cy.get(topRaiRespCaret).should("be.enabled");
  }
  verifyTopRaiRespCardExists() {
    cy.get(topRaiRespCard).scrollIntoView().should("be.visible");
  }
  verifyTopRaiRespDownloadBtnExistsAndEnabled() {
    cy.get(topRaiRespDownloadBtn).scrollIntoView().should("be.visible");
    cy.get(topRaiRespDownloadBtn).should("be.enabled");
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
  clickTempExtensionActionBtn(num) {
    cy.xpath(tempExtensionID).contains(num).next().next().click();
  }
  clickWithdrawBtnOnTempExt() {
    cy.xpath(withdrawBtnOnTempExt).click();
  }
}
export default oneMacPackageDetailsPage;
