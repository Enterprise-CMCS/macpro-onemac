import dynamoDb from "../libs/dynamodb-lib";

import { ONEMAC_TYPE } from "cmscommonlib/workflow.js";
import { formatPackageDetails } from "./formatPackageDetails.js";

export const getCPOCandSRTEmailAddresses = async (packageId) => {
  let returnObj = {};
  const qParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: `${packageId}`,
      sk: "Package",
    },
    ProjectionExpression: "cpocEmail, reviewTeamEmailList",
  };
  try {
    const packageItem = await dynamoDb.get(qParams);

    console.log("Found this package Item: ", packageItem);
    returnObj = packageItem.Item;
  } catch (e) {
    console.log("query error: ", e.message);
  }
  return returnObj;
};

/**
 * RAI Response withdrawal email to CMS
 * @param {Object} data from the package.
 * @returns {Object} email parameters in generic format.
 */
export const CMSWithdrawRaiNotice = async (data, config, user) => {
  try {
    const CMSEmailItem = await getCPOCandSRTEmailAddresses(data.componentId);

    const ToAddresses = CMSEmailItem.reviewTeamEmailList
      ? [...CMSEmailItem.reviewTeamEmailList]
      : [];

    switch (data.parentType) {
      case ONEMAC_TYPE.MEDICAID_SPA:
        CMSEmailItem?.cpocEmail && ToAddresses.push(CMSEmailItem.cpocEmail);
        ToAddresses.push(process.env.osgEmail);
        ToAddresses.push(process.env.dpoEmail);
        break;
      case ONEMAC_TYPE.CHIP_SPA:
        ToAddresses.push(process.env.chipEmail);
        ToAddresses.push(process.env.chippoEmail);
        break;
      case ONEMAC_TYPE.WAIVER_INITIAL:
      case ONEMAC_TYPE.WAIVER_RENEWAL:
      case ONEMAC_TYPE.WAIVER_AMENDMENT:
        CMSEmailItem?.cpocEmail && ToAddresses.push(CMSEmailItem.cpocEmail);
        ToAddresses.push(process.env.osgEmail);
        ToAddresses.push(process.env.dmcoEmail);
        break;
      case ONEMAC_TYPE.WAIVER_APP_K:
        CMSEmailItem?.cpocEmail && ToAddresses.push(CMSEmailItem.cpocEmail);
        ToAddresses.push(process.env.osgEmail);
        ToAddresses.push(process.env.dhcboEmail);
        break;
    }

    return {
      ToAddresses,
      CcAddresses: config.CMSCcAddresses,
      Subject: `${config.typeLabel} ${data.componentId} Withdraw Request`,
      HTML: `<>The OneMAC submission portal received a request to withdraw the Formal RAI Response. You are receiving this email notification as the Formal RAI for 
  ${data.componentId} was withdrawn by ${user.fullName} (${
        user.email
      }). The package will revert to the “RAI Issued” status.</p>
   ${formatPackageDetails(data, config)}
   <p>Thank you!</p>
   `,
    };
  } catch (e) {
    console.log("Error creating the CMS notice", e);
  }
};
