import { formatPackageDetails } from "./formatPackageDetails.js";

/**
 * Package withdrawal email to CMS
 * @param {Object} data from the package.
 * @returns {Object} email parameters in generic format.
 */
export const CMSWithdrawalNotice = (data, config, user) => ({
  ToAddresses: [process.env.reviewerEmail],
  CcAddresses:
    data.componentType === "chipspa" || data.componentType === "chipsparai"
      ? process.env.chipCcEmail?.split(";")?.filter((s) => s.trim())
      : [],
  Subject: `${config.typeLabel} Package ${data.componentId} Withdraw Request`,
  HTML: `
      <p>The OneMAC submission portal received a request to withdraw a package. You are receiving this email notification as ${
        data.componentId
      } was withdrawn by ${user.fullName} (${user.email}). 
      The package will no longer be considered for CMS review.</p>
      ${formatPackageDetails(data, config)}
      <p>Thank you!</p>
    `,
});
