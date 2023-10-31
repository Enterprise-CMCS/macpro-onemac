import dynamoDb from "../libs/dynamodb-lib";
import { USER_ROLE, USER_STATUS } from "cmscommonlib";

export const getAllActiveStateUserEmailAddresses = async (territory) => {
  const stateSubmittingUserRoles = [
    USER_ROLE.STATE_SUBMITTER,
    USER_ROLE.STATE_SYSTEM_ADMIN,
  ];
  const stateSubmittingUsers = [];

  await Promise.all(
    stateSubmittingUserRoles.map(async (role) => {
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
        stateSubmittingUsers.push(
          results.Items.map(({ fullName, email }) => `${fullName} <${email}>`)
        );
      } catch (e) {
        console.log("query error: ", e.message);
      }
    })
  );
  const returnUsers = stateSubmittingUsers.flat();

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
    Subject: `${config.packageLabel} ${data.componentId} Withdrawal Confirmation`,
    HTML: `
        <p>This email is to confirm ${config.packageLabel} ${data.componentId} was withdrawn by ${user.fullName}. 
        The review of ${config.packageLabel} ${data.componentId} has concluded.
        </p>
        `,
  };
  try {
    stateReceipt.ToAddresses = await getAllActiveStateUserEmailAddresses(
      data.componentId.substring(0, 2)
    );
  } catch (e) {
    console.log("Error retrieving the state user addresses ", e);
  }
  return stateReceipt;
};
