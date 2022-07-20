const RAIResponseUploadFile = "#uploader-input-0";
const AdditionalInformationBox = "//textarea[@name='summary']";
const submitBTN = "#form-submission-button";
//locator is xpath, please user cy.xpath();
const RevisedAmendedStatePlanLanguageBTN =
  "//td[div[contains(text(),'Revised Amended State Plan Language')]]";
const RevisedAmendedStatePlanLanguageBTNUploadFile = "#uploader-input-0";

//locator is xpath, please user cy.xpath();
const officialRAIResponseBTNUploadFile = "#uploader-input-1";
//locator is xpath, please user cy.xpath();
const RAIResponseAddFileBTN = "//td[div[contains(text(),'RAI Response')]]";

const spaIDField = "#transmittalNumber";

export class MedicaidSPARAIResponsePage {
  uploadRAIResponseAddFile() {
    cy.xpath(RAIResponseAddFileBTN).clickAndScreenshot();
    const filePath = "/files/adobe.pdf";
    cy.get(RAIResponseUploadFile).attachFile(filePath);
  }

  addCommentsRAIRespone() {
    cy.xpath(AdditionalInformationBox).type("This is just a test");
  }

  clickSubmitBTN() {
    cy.get(submitBTN).clickAndScreenshot();
  }

  uploadChipSPARAIRESPONSERevisedAmendedStatePlanLanguage() {
    cy.xpath(RevisedAmendedStatePlanLanguageBTN)
      .next("td")
      .clickAndScreenshot();
    const filePath = "/files/adobe.pdf";
    cy.get(RevisedAmendedStatePlanLanguageBTNUploadFile).attachFile(filePath);
  }

  uploadOfficialRAIResponse() {
    cy.xpath(RAIResponseAddFileBTN).next("td").clickAndScreenshot();
    const filePath = "/files/adobe.pdf";
    cy.get(officialRAIResponseBTNUploadFile).attachFile(filePath);
  }
  verifySPAIDFieldIsEmptyAndNotDisabled() {
    cy.get(spaIDField).should("be.empty").and("not.be.disabled");
  }
}
export default MedicaidSPARAIResponsePage;
