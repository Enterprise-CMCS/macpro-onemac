import { formatPackageDetails } from "./formatPackageDetails.js";
import { getAllActiveStateUserEmailAddresses } from "./stateWithdrawalReceipt.js";

/**
 * RAI Response withdrawal email to state user(s)
 * @param {Object} data from the package.
 * @param {Object} config for the package.
 * @returns {Object} email parameters in generic format.
 */
export const stateWithdrawRaiReceipt = async (data, config, user) => {
  const stateReceipt = {
    ToAddresses: [],
    CcAddresses: [],
    Subject: `${config.typeLabel} Package ${data.componentId} Withdraw Request`,
    HTML: `
        <p>The OneMAC submission portal received a request to withdraw the Formal RAI Response. You are receiving this email notification as the Formal RAI for ${
          data.componentId
        } was withdrawn by ${user.fullName} (${
      user.email
    }).  The package will revert to the “RAI Issued” status.</p>
        ${formatPackageDetails(data, config)}
        <p>Thank you!</p>
        `,
  };
  try {
    stateReceipt.ToAddresses = await getAllActiveStateUserEmailAddresses(
      data.componentId.substring(0, 2)
    );
  } catch (e) {
    console.log("Error retrieving the state user addresses ", e);
  }
  console.log("the state receipt: ", stateReceipt);
  return stateReceipt;
};
