const RAIResponseAddFileBTN =
  "div.header-and-content:nth-child(1) div.form-container div.upload-card:nth-child(4) div.uploader table:nth-child(1) tbody:nth-child(1) tr:nth-child(1) td.uploader-input-cell:nth-child(2) > label.uploader-input-label-active";
const RAIResponseUploadFile = "#uploader-input-0";
const AdditionalInformationBox = "#field_4";
const submitBTN = "#form-submission-button";

export class MedicaidSPARAIResponsePage {
  uploadRAIResponseAddFile() {
    cy.get(RAIResponseAddFileBTN).click();
    const filePath = "/files/adobe.pdf";
    cy.get(RAIResponseUploadFile).attachFile(filePath);
  }

  addCommentsRAIRespone() {
    cy.get(AdditionalInformationBox).type("This is just a test");
  }

  clickSubmitBTN() {
    cy.get(submitBTN).click();
  }
}
export default MedicaidSPARAIResponsePage;
