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
  // changing config to match the docs in this one instance
  if (config.idLabel === "SPA ID") {
    let typeLabel = config.typeLabel;
    // cut the type label at sub sub and set that at the new idLabel
    typeLabel = typeLabel
      .substring(0, typeLabel.indexOf("Subsequent Submission"))
      .trim();
    config.idLabel = `${typeLabel} Package ID`;
  }

  // creating own object
  const cmsSubSubDetails = {
    componentId: data.componentId,
    additionalInformation: data.additionalInformation,
    attachments: data.attachments,
  };

  return {
    ToAddresses: ToAddresses,
    CcAddresses: [],
    Subject: `Action required: review new documents for ${config.typeLabel} ${data.componentId}`,
    HTML: `
        <p>New documents have been submitted for ${config.typeLabel} ${
      data.componentId
    } in OneMAC.</p>
        ${formatPackageDetails(cmsSubSubDetails, config)}
        <p><b>How to access:</b></p>
         <ul>
            <li>
            These documents can be found in OneMAC through <a href="${
              process.env.applicationEndpoint
            }/dashboard">this link</a>.
            </li>
            <li>
            If you are not already logged in, click “Login” at the top of the page and log in using your 
            Enterprise User Administration (EUA) credentials. 
            </li>
            <li>
            After you are logged in, click the submission ID number on the dashboard page to view details. 
            </li>
        </ul>
        <p>Thank you!</p>
        `,
  };
};
