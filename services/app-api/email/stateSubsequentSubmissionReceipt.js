import { formatPackageDetails } from "./formatPackageDetails.js";

/**
 * Package submission receipt email to state user(s)
 * @param {Object} data from the package.
 * @returns {Object} email parameters in generic format.
 */
export const stateSubsequentSubmissionReceipt = (data, config) => {
  // changing config to match the docs in this one instance
  if (config.idLabel === "SPA ID") {
    const typeLabel = config.typeLabel;
    // cut the type label at sub sub and set that at the new idLabel
    config.idLabel = typeLabel
      .substring(0, typeLabel.indexOf("Subsequent Submission"))
      .trim();
  }

  return {
    ToAddresses: [`${data.submitterName} <${data.submitterEmail}>`],
    CcAddresses: [],
    Subject: `Additional documents submitted for ${config.typeLabel} ${data.componentId}`,
    HTML: `
    <p>	You’ve successfully submitted the following to CMS reviewers for ${
      config.typeLabel
    } ${data.componentId}:</p>
    ${formatPackageDetails(data, config)}
    <p>If you have questions or did not expect this email, please contact <a href="mailto:spa@cms.hhs.gov">SPA@CMS.HHS.gov</a>.</p>
    <p>Thank you.</p>`,
  };
};
