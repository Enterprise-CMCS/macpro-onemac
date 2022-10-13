import { formatPackageDetails } from "./formatPackageDetails.js";

/**
 * Package withdrawal email to state user(s)
 * @param {Object} data from the package.
 * @param {Object} config for the package.
 * @returns {Object} email parameters in generic format.
 */
export const stateWithdrawalReceipt = (data, config) => ({
  ToAddresses: [`${data.submitterName} <${data.submitterEmail}>`],
  Subject: `${config.typeLabel} Package ${data.componentId} Withdraw Request`,
  HTML: `
      <p>This is confirmation that you have requested to withdraw the package below. The package will no longer be considered for CMS review:</p>
      ${formatPackageDetails(data, config)}
      <p>Thank you!</p>
      `,
});
