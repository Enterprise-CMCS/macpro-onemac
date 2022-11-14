import dynamoDb from "../libs/dynamodb-lib";
import { USER_ROLE, USER_STATUS } from "cmscommonlib";

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
        IndexName: "GSI2",
        KeyConditionExpression: "GSI2pk = :pk and GSI2sk = :sk",
        ExpressionAttributeValues: {
          ":pk": `${role}#${territory}`,
          ":sk": USER_STATUS.ACTIVE,
        },
        ProjectionExpression: "email, fullName",
      };
      try {
        const results = await dynamoDb.query(qParams);
        console.log("Found these results in One Table: ", results);
        stateSubmittingUsers.push(
          results.Items.map(({ fullName, email }) => `${fullName} <${email}>`)
        );
      } catch (e) {
        console.log("query error: ", e.message);
      }
    })
  );
  const returnUsers = stateSubmittingUsers.flat();
  console.log("return users: ", returnUsers);

  return returnUsers;
};

/**
 * Package withdrawal email to state user(s)
 * @param {Object} data from the package.
 * @param {Object} config for the package.
 * @returns {Object} email parameters in generic format.
 */
export const stateWithdrawalReceipt = async (data, config, user) => {
  const stateReceipt = {
    ToAddresses: [],
    CcAddresses: [],
    Subject: `${config.typeLabel} Package ${data.componentId} Withdraw Request`,
    HTML: `
        <p>The OneMAC submission portal received a request to withdraw a package. You are receiving this email notification as ${
          data.componentId
        } was withdrawn by ${user.fullName} and ${
      user.email
    }. The package will no longer be considered for CMS review.</p>
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
