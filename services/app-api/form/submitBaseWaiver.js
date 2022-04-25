import { cmsEmailMapToFormWarningMessages } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { processAny } from "./processAny";
import { defaultFormConfig } from "./defaultFormConfig";
import { getAccessInstructions } from "./getAccessInstructions";
import { getLinksHtml } from "./getLinksHtml";

/**
 * Submitting a Base Waiver MUST do the following to return SUCCESS:
 *  - parse the event
 *  - authenticate the user
 *  - validate the submission data
 *  - save the data as a new component
 *  - send email to notify CMS
 *
 * Submitting also:
 *  - sends submission receipt
 */

const baseWaiverConfig = {
  ...defaultFormConfig,
  typeLabel: "1915(b) Base Waiver",
  validateSubmission: (data) => {
    if (data) return true;
    return null;
  },
  getCMSEmail: (data) => ({
    ToAddresses: [process.env.reviewerEmail, process.env.testingEmail].filter(
      Boolean
    ),
    Subject: `New Waiver ${data.transmittalNumber} submitted`,
    HTML: `
          <p>The Submission Portal received a Base Waiver Submission:</p>
          ${getAccessInstructions()}
          <p>
              <br><b>State or territory</b>: ${data.territory}
              <br><b>Name</b>: ${data.submitterName}
              <br><b>Email Address</b>: ${data.submitterEmail}
              <br><b>Waiver #</b>: ${data.transmittalNumber}${
      data.transmittalNumberWarningMessage
        ? cmsEmailMapToFormWarningMessages[data.transmittalNumberWarningMessage]
        : ""
    } 
              <br><b>Action Type</b>: new
              <br><b>Waiver Authority</b>: ${data.waiverAuthority}
          </p>
          <p>
              <b>Additional Information</b>:
              <br>${data.summary}
          </p>
          <p>
              <b>Files</b>:
              ${getLinksHtml(data.uploads)}
          </p>
          <br>
          <p>If the contents of this email seem suspicious, do not open them, and instead forward this email to <a href="mailto:SPAM@cms.hhs.gov">SPAM@cms.hhs.gov</a>.</p>
          <p>Thank you!</p>
      `,
  }),
};

export const main = handler(async (event) => {
  try {
    return processAny(event, baseWaiverConfig);
  } catch (error) {
    console.log("Exception: ", error);
    throw error;
  }
});
