import dynamoDb from "../libs/dynamodb-lib";
import { USER_ROLE } from "cmscommonlib";

import { formatPackageDetails } from "./formatPackageDetails.js";

export const getAllActiveStateUserEmailAddresses = async (territory) => {
  const stateSubmittingUserRoles = [
    USER_ROLE.STATE_SUBMITTER,
    USER_ROLE.STATE_SYSTEM_ADMIN,
  ];
  const stateSubmittingUsers = [];

  await Promise.all(
    stateSubmittingUserRoles.map(async (role) => {
      console.log("Collecting all Role: ", role);
      const qParams = {
        TableName: process.env.oneMacTableName,
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1pk = :pk",
        ExpressionAttributeValues: {
          ":pk": `${role}#${territory}`,
        },
        ProjectionExpression: "email, fullName",
      };
      try {
        const results = await dynamoDb.query(qParams);
        console.log("Found these results in One Table: ", results);
        stateSubmittingUsers.push(
          results.Items.map(({ fullname, email }) => `${fullname} <${email}>`)
        );
      } catch (e) {
        console.log("query error: ", e.message);
      }
    })
  );
  console.log("state submitting users: ", stateSubmittingUsers);

  return [
    ...stateSubmittingUsers,
    `Kristin ${territory} Grue <k.grue.stateadmn@gmail.com>`,
    `Kristin  ${territory} Grue2 <k.grue.stateuser@gmail.com>`,
  ];
};

/**
 * Package withdrawal email to state user(s)
 * @param {Object} data from the package.
 * @param {Object} config for the package.
 * @returns {Object} email parameters in generic format.
 */
export const stateWithdrawalReceipt = async (data, config) => ({
  ToAddresses: await getAllActiveStateUserEmailAddresses(
    data.componentId.substring(0, 2)
  ),
  Subject: `${config.typeLabel} Package ${data.componentId} Withdraw Request`,
  HTML: `
      <p>This is confirmation that you have requested to withdraw the package below. The package will no longer be considered for CMS review:</p>
      ${formatPackageDetails(data, config)}
      <p>Thank you!</p>
      `,
});
