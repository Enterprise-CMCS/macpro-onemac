import { formatPackageDetails } from "./formatPackageDetails.js";

/**
 * Package submission receipt email to state user(s)
 * @param {Object} data from the package.
 * @returns {Object} email parameters in generic format.
 */
export const stateSubsequentSubmissionReceipt = (data, config) => {
  data.attachments = {}; //remove attachments because we dont want them listed in the state email

  return {
    ToAddresses: [`${data.submitterName} <${data.submitterEmail}>`],
    CcAddresses: [],
    Subject: `Subsequent Documentation for ${config.typeLabel} ${data.componentId}`,
    HTML: `
    <p>	This is confirmation that you submitted ${
      config.typeLabel
    } materials to CMS for review:</p>
    ${formatPackageDetails(data, config)}
    <br>
    <p>If you have questions or did not expect this email, please contact <a href="mailto:spa@cms.hhs.gov">SPA@CMS.HHS.gov</a>.</p>
    <p>Thank you!</p>`,
  };
};
