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
    ToAddresses: [`${data.submitterName} <${data.submitterEmail}>`],
    CcAddresses: [],
    Subject: `Your ${config.typeLabel} ${data.componentId} has been submitted to CMS`,
    HTML: `
    <p>	This is confirmation that you submitted a ${
      config.typeLabel
    } to CMS for review:</p>
    ${formatPackageDetails(data, config)}
    ${config.closingRemarks.replace("%NINETYDAYS%", data.ninetyDayDate)}`,
  };
};
