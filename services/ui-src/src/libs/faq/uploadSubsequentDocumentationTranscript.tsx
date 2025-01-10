import React from "react";
import { helpDeskContact } from "../helpDeskContact";
export const uploadSubsequentDocumentationTranscript: JSX.Element = (
  <div>
    <p>
        OneMac has been updated with a new package action called upload subsequent documentation 
        that allows states to submit revised or additional documentation to an under-review spa 
        or waiver submission package. 
    </p>
    <p>
        Now, instead of having to email these documents to CMS, you can upload them directly to your submission package in OneMac. The subsequent documentation feature is available for submission packages that are in the under-review status. 
        The functionality is accessed in the same way as all other package actions in OneMac, either directly from the package dashboard as an option in the actions column drop-down menu, or from within the submission package itself under the package actions section. 
    </p>
    <p>
        After selecting the upload subsequent documents package action, you are taken to the subsequent documentation details page. Select the add file button for the appropriate document type to add any additional documents that need to be submitted to CMS. 
        You can submit multiple documents at once, however, at least one attachment is required. Next, fill out the reason for subsequent documentation section, explaining why additional documents are being submitted. 
    </p>
    <p>
        After all information has been added, select submit. You will receive a confirmation message indicating that these documents will be added to the submission package and reviewed by CMS. If you are certain you wish to add these documents to the submission package, select yes, submit. 
        A green banner is shown indicating that the documents have been submitted and CMS reviewers will follow up by email if additional information is needed. Additionally, an email notification will be sent indicating that the action was taken and CMS will be notified. 
        A new latest package activity field was also added to the package dashboard and submission package details section. This field will automatically update to reflect when the most recent package action occurred, including when subsequent documentation is submitted. 
    </p>
    <p>
      Thank you for watching this overview of the latest OneMAC updates. If you
      have any questions, please free to contact the OneMAC Help Desk at{" "}
      <a href={`mailto: ${helpDeskContact.email}`}>{helpDeskContact.email}</a>
     </p>
  </div>
);
