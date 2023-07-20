import { formatPackageDetails } from "./formatPackageDetails.js";

/**
 * RAI Response withdrawal email to CMS
 * @param {Object} data from the package.
 * @returns {Object} email parameters in generic format.
 */
export const CMSWithdrawRaiNotice = (data, config, user) => ({
  ToAddresses: config.CMSToAddresses,
  CcAddresses: config.CMSCcAddresses,
  Subject: `${config.typeLabel} ${data.componentId} Withdraw Request`,
  HTML: `<>The OneMAC submission portal received a request to withdraw the Formal RAI Response. You are receiving this email notification as the Formal RAI for 
  ${data.componentId} was withdrawn by ${user.fullName} (${
    user.email
  }). The package will revert to the “RAI Issued” status.</p>
   ${formatPackageDetails(data, config)}
   <p>Thank you!</p>
   `,
});
