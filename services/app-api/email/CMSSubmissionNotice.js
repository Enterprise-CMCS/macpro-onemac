import { getAccessInstructions } from "./getAccessInstructions.js";
import { formatPackageDetails } from "./formatPackageDetails.js";

/**
 * Package Submission email to CMS
 * @param {Object} data from the package.
 * @returns {Object} email parameters in generic format.
 */
export const CMSSubmissionNotice = (data, config) => ({
  ToAddresses: [process.env.reviewerEmail, process.env.testingEmail].filter(
    Boolean
  ),
  CcAddresses:
    data.componentType === "chipspa" || data.componentType === "chipsparai"
      ? process.env.chipCcEmail?.split(";")?.filter((s) => s.trim())
      : [],
  Subject: `${config.typeLabel} ${data.transmittalNumber} Submitted`,
  HTML: `
          <p>The OneMAC Submission Portal received a ${
            config.typeLabel
          } Submission:</p>
          ${getAccessInstructions()}
          ${formatPackageDetails(data, config)}
          <br>
          <p>If the contents of this email seem suspicious, do not open them, and instead forward this email to <a href="mailto:SPAM@cms.hhs.gov">SPAM@cms.hhs.gov</a>.</p>
          <p>Thank you!</p>
      `,
});
