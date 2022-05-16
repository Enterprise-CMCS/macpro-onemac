import { DateTime } from "luxon";

import { formatPackageDetails } from "./formatPackageDetails.js";

/**
 * Package submission receipt email to state user(s)
 * @param {Object} data from the package.
 * @returns {Object} email parameters in generic format.
 */
export const stateSubmissionReceipt = (data, config) => {
  data.ninetyDayDate = DateTime.fromMillis(data.clockEndTimestamp)
    .setZone("America/New_York")
    .toFormat("DDDD '@ 11:59pm' ZZZZ");
  data.attachments = {};

  return {
    ToAddresses: `${data.submitterName} <${data.submitterEmail}>`,
    CcAddresses: [],
    Subject: `Your ${config.typeLabel} ${data.componentId} has been submitted to CMS`,
    HTML: `
    <p>This response confirms the receipt of your ${config.typeLabel}:</p>
    ${formatPackageDetails(data, config)}
    <p>
        This response confirms the receipt of your Waiver request or your response to a Waiver Request for Additional Information (RAI)). 
        You can expect a formal response to your submittal to be issued within 90 days, before ${
          data.ninetyDayDate
        }.
    </p>
    <p>
        This mailbox is for the submittal of Section 1915(b) and 1915(c) non-web-based Waivers, responses to Requests for Additional 
        Information (RAI) on Waivers, and extension requests on Waivers only.  Any other correspondence will be disregarded. 
    </p>
    <p>If you have any questions, please contact <a href="mailto:spa@cms.hhs.gov">spa@cms.hhs.gov</a> or your state lead.</p>
    <p>Thank you!</p>
        `,
  };
};
