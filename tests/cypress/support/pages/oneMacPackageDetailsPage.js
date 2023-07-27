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
const withdrawFormalRAIResponseAction =
  "//a[text()='Withdraw Formal RAI Response']";
const detailSection =
  "//section[@class='detail-section']//h2[contains(.,'Details')]";
const CHIPSPAIDHeader = "//h3[contains(text(),'SPA ID')]";
const typeHeader = "//h3[contains(text(),'Type')]";
const parentWaiverNumberHeader =
  "//h3[contains(text(),'Approved Initial or Renewal Number')]";
const stateHeader = "//h3[text()='State']";
const initialSubmittedDateHeader = "//h3[text()='Initial Submission Date']";
const raiResponsesHeader = "//section//h2[text()='Formal RAI Responses']";
const packageOverviewNavBtn = "//button[text()='Package Overview']";
const packageDetailsNavBtn =
  "//li[contains(@class, 'nav')]//a[text()='Package Details']";
const proposedEffectiveDateHeader =
  "//h3[contains(text(),'Proposed Effective Date')]";
const finalDispositionDateHeader =
  "//h3[contains(text(),'Final Disposition Date')]";
const approvedEffectiveDateHeader =
  "//h3[contains(text(),'Approved Effective Date')]";
const actualEffectiveDateHeader =
  "//h3[contains(text(),'Actual Effective Date')]";
const formalRAIReceivedDateHeader =
  "//h3[contains(text(),'Formal RAI Received')]";
const adminPkgChangeSection = "//h2[text()='Administrative Package Changes']";
const additionalInfoSection =
  "//section[@id='addl-info-base']//h2[text()='Additional Information']";
const waiverAuthorityHeader = "//h3[text()='Waiver Authority']";
const attachmentsSection = "//h2[text()='Attachments']";
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
const subjectHeader = "//h3[contains(text(),'Subject')]";
const descriptionHeader = "//h3[contains(text(),'Description')]";
const cPOCNameHeader = "//h3[contains(text(),'CPOC')]";
const reviewTeamSRTHeader = "//h3[contains(text(),'Review Team (SRT)')]";

export class oneMacPackageDetailsPage {
  verifyPackageDetailsPageIsVisible() {
    cy.xpath(detailsPage).should("be.visible");
  }
  verifyActionCardExists() {
    cy.xpath(actionCard).should("have.length", 2);
  }
  verifyStatusIs(status) {
    cy.xpath(statusHeader).next().contains(status);
  }
  verify2ndClockIsVisible() {
    cy.xpath(actionCard).first().find("span").should("be.visible");
  }
  verify2ndClockIsNotVisible() {
    cy.xpath(actionCard).first().find("span").should("not.exist");
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
    cy.xpath(respondToRAIAction).scrollIntoView().should("be.visible");
  }
  verifyWithdrawPackageActionExists() {
    cy.xpath(withdrawPackageAction).scrollIntoView().should("be.visible");
  }
  verifyRequestTempExtensionPackageActionExists() {
    cy.xpath(requestTempExtensionPackageAction)
      .scrollIntoView()
      .should("be.visible");
  }
  clickRequestTempExtensionPackageAction() {
    cy.xpath(requestTempExtensionPackageAction).click();
  }
  verifyAddAmendmentActionExists() {
    cy.xpath(addAmendmentPackageAction).scrollIntoView().should("be.visible");
  }
  clickAddAmendmentPackageAction() {
    cy.xpath(addAmendmentPackageAction).click();
  }
  verifyWithdrawFormalRAIResponseActionExists() {
    cy.xpath(withdrawFormalRAIResponseAction)
      .scrollIntoView()
      .should("be.visible");
  }
  clickWithdrawFormalRAIResponseAction() {
    cy.xpath(withdrawFormalRAIResponseAction).click();
  }
  clickRespondToRAIAction() {
    cy.xpath(respondToRAIAction).click();
  }
  verifyDetailSectionExists() {
    cy.xpath(detailSection).should("be.visible");
  }
  verifyTitleContains(s) {
    cy.get("h2").first().contains(s);
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
  verifyTypeContains1915cTempExtension() {
    cy.xpath(typeHeader).next().contains("1915(c) Temporary Extension");
  }
  verifyTypeContains1915bTempExtension() {
    cy.xpath(typeHeader).next().contains("1915(b) Temporary Extension");
  }
  verifyTypeContains1915bWaiverAmendment() {
    cy.xpath(typeHeader).next().contains("1915(b) Waiver Amendment");
  }
  verifyTypeContainsMedicaidSPA() {
    cy.xpath(typeHeader).next().contains("Medicaid SPA");
  }
  verifyTypeContainsCHIPSPA() {
    cy.xpath(typeHeader).next().contains("CHIP SPA");
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
  verifyRaiResponseHeaderDoesNotExist() {
    cy.xpath(raiResponsesHeader).should("not.exist");
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
  verifyproposedEffectiveDateHeaderContainsPending() {
    cy.xpath(proposedEffectiveDateHeader).next().contains("Pending");
  }
  verifyproposedEffectiveDateHeaderContainsDate() {
    cy.xpath(proposedEffectiveDateHeader)
      .next()
      .contains(/^[a-zA-Z]{3}.\d{2}.\d{4}||^[a-zA-Z]{3}.\d{1}.\d{4}/);
  }
  verifyFinalDispositionDateHeaderExists() {
    cy.xpath(finalDispositionDateHeader).should("be.visible");
  }
  verifyFinalDispositionDateHeaderDoesNotExists() {
    cy.xpath(finalDispositionDateHeader).should("not.exist");
  }
  verifyFinalDispositionDateHeaderContainsDate() {
    cy.xpath(finalDispositionDateHeader)
      .next()
      .contains(/^[a-zA-Z]{3}.\d{2}.\d{4}||^[a-zA-Z]{3}.\d{1}.\d{4}/);
  }
  verifyApprovedEffectiveDateHeaderExists() {
    cy.xpath(approvedEffectiveDateHeader).should("be.visible");
  }
  verifyApprovedEffectiveDateHeaderDoesNotExists() {
    cy.xpath(approvedEffectiveDateHeader).should("not.exist");
  }
  verifyApprovedEffectiveDateHeaderContainsDate() {
    cy.xpath(approvedEffectiveDateHeader)
      .next()
      .contains(/^[a-zA-Z]{3}.\d{2}.\d{4}||^[a-zA-Z]{3}.\d{1}.\d{4}/);
  }
  verifyActualEffectiveDateHeaderExists() {
    cy.xpath(actualEffectiveDateHeader).should("be.visible");
  }
  verifyActualEffectiveDateHeaderDoesNotExists() {
    cy.xpath(actualEffectiveDateHeader).should("not.exist");
  }
  verifyActualEffectiveDateHeaderContainsDate() {
    cy.xpath(actualEffectiveDateHeader)
      .next()
      .contains(/^[a-zA-Z]{3}.\d{2}.\d{4}||^[a-zA-Z]{3}.\d{1}.\d{4}/);
  }
  verifyFormalRAIReceivedDateHeaderExists() {
    cy.xpath(formalRAIReceivedDateHeader).should("be.visible");
  }
  verifyFormalRAIReceivedDateHeaderDoesNotExists() {
    cy.xpath(formalRAIReceivedDateHeader).should("not.exist");
  }
  verifyFormalRAIReceivedDateHeaderContainsDate() {
    cy.xpath(formalRAIReceivedDateHeader)
      .next()
      .contains(/^[a-zA-Z]{3}.\d{2}.\d{4}||^[a-zA-Z]{3}.\d{1}.\d{4}/);
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
  verifyAmendmentTitleExists() {
    cy.xpath(amendmentTitleHeader).next().should("be.visible");
  }
  verifyAmendmentTitleIs(s) {
    cy.xpath(amendmentTitleHeader).next().contains(s);
  }

  verifyWaiverAuthorityHeaderExists() {
    cy.xpath(waiverAuthorityHeader).should("be.visible");
  }
  verifyWaiverAuthorityHeaderis1915cHCBS() {
    cy.xpath(waiverAuthorityHeader).next().contains("1915(c) HCBS");
  }
  verifyAttachmentsSectionExists() {
    cy.xpath(attachmentsSection).should("be.visible");
  }
  verifyDownloadAllBtnExists() {
    cy.xpath(downloadAllBtn)
      .first()
      .scrollIntoView({ easing: "linear" })
      .should("be.visible");
  }
  verifyAdditionalInfoSectionExists() {
    cy.xpath(additionalInfoSection).should("be.visible");
  }
  verifyAdministrativePackageChangesSectionExists() {
    cy.xpath(adminPkgChangeSection).should("be.visible");
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
  verifySubjectHeaderExists() {
    cy.xpath(subjectHeader).should("be.visible");
  }
  verifySubjectValueExists() {
    cy.xpath(subjectHeader)
      .next("div")
      .contains(/^(?!\s*$).+/);
  }
  verifySubjectDoesNotExists() {
    cy.xpath(subjectHeader).should("not.exist");
  }
  verifyDescrptionHeaderExists() {
    cy.xpath(descriptionHeader).should("be.visible");
  }
  verifyDescriptionValueExists() {
    cy.xpath(descriptionHeader)
      .next("div")
      .contains(/^(?!\s*$).+/);
  }
  verifyDescrptionDoesNotExists() {
    cy.xpath(descriptionHeader).should("not.exist");
  }
  verifyCPOCNameHeaderExists() {
    cy.xpath(cPOCNameHeader).should("be.visible");
  }
  verifyCPOCNameValueExists() {
    cy.xpath(cPOCNameHeader)
      .next("div")
      .contains(/^(?!\s*$).+/);
  }
  verifyCPOCNameDoesNotExists() {
    cy.xpath(cPOCNameHeader).should("not.exist");
  }
  verifyReviewTeamSRTHeaderExists() {
    cy.xpath(reviewTeamSRTHeader).should("be.visible");
  }
  verifyReviewTeamSRTValueExists() {
    cy.xpath(reviewTeamSRTHeader)
      .next("div")
      .contains(/^(?!\s*$).+/);
  }
  verifyReviewTeamSRTDoesNotExists() {
    cy.xpath(reviewTeamSRTHeader).should("not.exist");
  }
}
export default oneMacPackageDetailsPage;
