import { formatPackageDetails } from "./formatPackageDetails.js";
import { getCPOCandSRTEmailAddresses } from "../utils/getCpocAndSrtEmail.js";

/**
 * Package Submission email to CMS
 * @param {Object} data from the package.
 * @returns {Object} email parameters in generic format.
 */
export const CMSSubsequentSubmissionNotice = async (data, config) => {
  data.submitterName = ""; // remove this bc we dont want it on the cms email
  const CMSEmailItem = await getCPOCandSRTEmailAddresses(data.componentId);

  const ToAddresses = CMSEmailItem.reviewTeamEmailList
    ? [...CMSEmailItem.reviewTeamEmailList]
    : [];

  CMSEmailItem?.cpocEmail && ToAddresses.push(CMSEmailItem.cpocEmail);
  // changing config to match the docs in this one instance
  if (config.idLabel === "SPA ID") {
    let typeLabel = config.typeLabel;
    // cut the type label at sub sub and set that at the new idLabel
    typeLabel = typeLabel
      .substring(0, typeLabel.indexOf("Subsequent Document"))
      .trim();
    config.idLabel = `${typeLabel} Package ID`;
  }

  return {
    ToAddresses: ToAddresses,
    CcAddresses: [],
    Subject: `Action required: review new documents for ${config.typeLabel} ${data.componentId}`,
    HTML: `
        <p>New documents have been submitted for ${config.typeLabel} ${
      data.componentId
    } in OneMAC.</p>
        ${formatPackageDetails(data, config)}
        <p><b>How to access:</b></p>
         <ul>
            <li>
            These documents can be found in OneMAC through <a href="${
              process.env.applicationEndpoint
            }/dashboard">this link</a>.
            </li>
            <li>
            If you are not already logged in, please click the "Login" link at the
            top of the page and log in using your Enterprise User Administration
            (EUA) credentials.
            </li>
            <li>
            After you have logged in, you will be taken to the OneMAC application.
            The submission will be listed on the dashboard page, and you can view
            its details by clicking on its ID number.
            </li>
        </ul>
        <p>Thank you!</p>
        `,
  };
};
