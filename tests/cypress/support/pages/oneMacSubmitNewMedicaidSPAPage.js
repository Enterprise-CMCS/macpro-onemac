const SpaIDInput = "#componentId";
const additionalInformationCommentBox = "//textarea[@name='summary']";
const additionalInfoCommentBox = "//textarea[@name='additionalInformation']";
const SPAIDErrorMessage = "#componentIdStatusMsg0";
const warningText = "//p[@class='submission-message']";
//Element is Xpath use cy.xpath instead of cy.get
const stayOnPageBtn = "//button[contains(text(),'Stay on Page')]";
//Element is Xpath use cy.xpath instead of cy.get
const leaveAnywayBtn = "//button[contains(text(),'Leave Anyway')]";
const uploadedFile =
  "div.header-and-content:nth-child(1) div.form-container div.upload-card:nth-child(4) div.uploader tbody:nth-child(1) tr:nth-child(1) td:nth-child(3) div.uploader-file-items > span:nth-child(1)";
const uploadedSpaFile =
  "div.header-and-content:nth-child(1) div.form-container div.upload-card:nth-child(4) div.uploader tbody:nth-child(1) tr:nth-child(2) td:nth-child(3) div.uploader-file-items > span:nth-child(1)";
const SPAPagesMainElement =
  "div.header-and-content:nth-child(1) div.form-container div.upload-card:nth-child(4) div.uploader tbody:nth-child(1) tr:nth-child(2)";

const deleteForm179File = "//tbody/tr[1]/td[3]/div[1]/button[1]/*[1]";
const deleteSpaPagesFile = "//tbody/tr[2]/td[3]/div[1]/button[1]/*[1]";
//Element is Xpath use cy.xpath instead of cy.get
const CMSForm179AddFileBTN =
  "//label[@aria-label='Add file of type CMS Form 179']";
const CMSForm179AddFileUpload = "#uploader-input-0";
//Element is Xpath use cy.xpath instead of cy.get
const SPAPagesAddFileBTN = "//label[@aria-label='Add files of type SPA Pages']";
const SPAPAgesAddFileUpload = "#uploader-input-1";
const dashboardTabBTN = "#dashboardLink";
const enterMacProBtn = "//button[contains(text(),'Enter the MACPro system')]";

export class oneMacSubmitNewMedicaidSPAPage {
  verifyNewMedicaidSPAPage() {
    cy.url().should("include", "/medicaid-spa");
  }
  verifyMedicaidEligibilityPage() {
    cy.url().should("include", "/medicaid-eligibility");
  }
  verifyMedicaidAlternativePage() {
    cy.url().should("include", "medicaid-abp");
  }
  inputSpaID(s) {
    cy.get(SpaIDInput).type(s);
  }

  uploadCMSForm179AddFile() {
    cy.xpath(CMSForm179AddFileBTN).click();
    const filePath = "/files/15MB.pdf";
    cy.get(CMSForm179AddFileUpload).attachFile(filePath);
  }

  addFileForForm179(fileName) {
    cy.xpath(CMSForm179AddFileBTN).click();
    const filePath = "/files/";
    cy.get(CMSForm179AddFileUpload).attachFile(filePath + fileName);
  }

  uploadSPAPagesAddFile() {
    cy.xpath(SPAPagesAddFileBTN).click();
    const filePath = "/files/adobe.pdf";
    cy.get(SPAPAgesAddFileUpload).attachFile(filePath);
  }

  additionalInfoTypeComment(s) {
    cy.xpath(additionalInfoCommentBox).type(s);
  }
  clickStayOnPageBtn() {
    cy.xpath(stayOnPageBtn).click();
  }
  clickLeaveAnywayBtn() {
    cy.xpath(leaveAnywayBtn).click();
  }
  verifySPAIDErrorMessageIsNotDisplayed() {
    cy.get(SPAIDErrorMessage).should("not.exist");
  }

  clearSPAIDInputBox() {
    cy.get(SpaIDInput).clear();
  }

  typeIncorrectSPAIDAndFormat() {
    cy.get(SpaIDInput).type("MD-DD-DDDD");
  }

  verifySPAIDErrorMessageIsDisplayed() {
    cy.get(SPAIDErrorMessage).should("be.visible");
  }
  clickWhatIsMySPAIDLink() {
    cy.get("a:visible")
      .contains("What is my SPA ID?")
      .invoke("attr", "href")
      .then((href) => {
        cy.visit(href);
      });
  }
  verifyMacProSystenBtn() {
    cy.xpath(enterMacProBtn).should("be.visible");
    cy.xpath(enterMacProBtn)
      .parent("a")
      .should(
        "have.attr",
        "href",
        "https://www.medicaid.gov/resources-for-states/medicaid-and-chip-program-macpro-portal/index.html#MACPro"
      );
  }
}
export default oneMacSubmitNewMedicaidSPAPage;
