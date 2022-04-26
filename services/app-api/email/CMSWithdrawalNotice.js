import { formatPackageDetails } from "./formatPackageDetails.js";

/**
 * Package withdrawal email to CMS
 * @param {Object} data from the package.
 * @returns {Object} email parameters in generic format.
 */
export const CMSWithdrawalNotice = (data, config) => ({
  ToAddresses: [process.env.reviewerEmail],
  CcAddresses:
    data.componentType === "chipspa" || data.componentType === "chipsparai"
      ? process.env.chipCcEmail?.split(";")?.filter((s) => s.trim())
      : [],
  Subject: `${config.typeLabel} Package ${data.componentId} Withdraw Request`,
  HTML: `
      <p>The OneMAC Submission Portal received a request to withdraw the package below. The package will no longer be considered for CMS review:</p>
      ${formatPackageDetails(data, config)}
      <p>Thank you!</p>
    `,
});
