import { formatPackageDetails } from "./formatPackageDetails.js";
import { getCPOCandSRTEmailAddresses } from "../utils/getCpocAndSrtEmail.js";

/**
 * Package Submission email to CMS
 * @param {Object} data from the package.
 * @returns {Object} email parameters in generic format.
 */
export const CMSSubsequentSubmissionNotice = async (data, config) => {
  const CMSEmailItem = await getCPOCandSRTEmailAddresses(data.componentId);

  const ToAddresses = CMSEmailItem.reviewTeamEmailList
    ? [...CMSEmailItem.reviewTeamEmailList]
    : [];

  CMSEmailItem?.cpocEmail && ToAddresses.push(CMSEmailItem.cpocEmail);

  return {
    ToAddresses: ToAddresses,
    CcAddresses: [],
    Subject: `Action required: review new documents for ${config.typeLabel} ${data.componentId}`,
    HTML: `
        <p>New documents have been submitted for ${config.typeLabel} ${
      data.componentId
    } in OneMAC.</p>
        ${formatPackageDetails(data, config)}
        <br>
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
        <p>If the contents of this email seem suspicious, do not open them, and instead forward this email to <a href="mailto:SPAM@cms.hhs.gov">SPAM@cms.hhs.gov</a>.</p>
        <p>Thank you!</p>
        `,
  };
};
