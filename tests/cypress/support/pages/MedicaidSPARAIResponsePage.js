const RAIResponseAddFileBTN =
  "div.header-and-content:nth-child(1) div.form-container div.upload-card:nth-child(4) div.uploader table:nth-child(1) tbody:nth-child(1) tr:nth-child(1) td.uploader-input-cell:nth-child(2) > label.uploader-input-label-active";
const RAIResponseUploadFile = "#uploader-input-0";
const AdditionalInformationBox = "//textarea[@name='summary']";
const submitBTN = "#form-submission-button";
//locator is xpath, please user cy.xpath();
const RevisedAmendedStatePlanLanguageBTN = "//tbody/tr[1]/td[2]/label[1]";
const RevisedAmendedStatePlanLanguageBTNUploadFile = "#uploader-input-0";

//locator is xpath, please user cy.xpath();
const officialRAIResponseBTN = "//tbody/tr[2]/td[2]/label[1]";
const officialRAIResponseBTNUploadFile = "#uploader-input-1";

const spaIDField = "#transmittalNumber";

export class MedicaidSPARAIResponsePage {
  uploadRAIResponseAddFile() {
    cy.get(RAIResponseAddFileBTN).click();
    const filePath = "/files/adobe.pdf";
    cy.get(RAIResponseUploadFile).attachFile(filePath);
  }

  addCommentsRAIRespone() {
    cy.xpath(AdditionalInformationBox).type("This is just a test");
  }

  clickSubmitBTN() {
    cy.get(submitBTN).click();
  }

  uploadChipSPARAIRESPONSERevisedAmendedStatePlanLanguage() {
    cy.xpath(RevisedAmendedStatePlanLanguageBTN).click();
    const filePath = "/files/adobe.pdf";
    cy.get(RevisedAmendedStatePlanLanguageBTNUploadFile).attachFile(filePath);
  }

  uploadOfficialRAIResponse() {
    cy.xpath(officialRAIResponseBTN).click();
    const filePath = "/files/adobe.pdf";
    cy.get(officialRAIResponseBTNUploadFile).attachFile(filePath);
  }
  verifySPAIDFieldIsEmptyAndNotDisabled() {
    cy.get(spaIDField).should("be.empty").and("not.be.disabled");
  }
}
export default MedicaidSPARAIResponsePage;
