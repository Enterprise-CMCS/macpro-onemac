import dynamoDb from "../libs/dynamodb-lib";
import { USER_STATUS, Workflow } from "cmscommonlib";

export const getAllActiveStateUserEmailAddresses = async (territory) => {
  const qParams = {
    TableName: process.env.oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk = :pk",
    FilterExpression: "#status = :status and territory = :territory",
    ExpressionAttributeNames: {
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":pk": "USER",
      ":territory": territory,
      ":status": USER_STATUS.ACTIVE,
    },
    ProjectionExpression: "email, fullName",
  };

  try {
    const results = await dynamoDb.query(qParams);
    const returnUsers = results.Items.map(
      ({ fullName, email }) => `${fullName} <${email}>`
    );
    return returnUsers;
  } catch (e) {
    console.log("query error: ", e.message);
    return [];
  }
};

/**
 * Package withdrawal email to state user(s)
 * @param {Object} data from the package.
 * @param {Object} config for the package.
 * @returns {Object} email parameters in generic format.
 */
export const stateWithdrawalReceipt = async (data, config, user) => {
  const parentTypeNice =
    Workflow.ONEMAC_LABEL[data.parentType] ?? config.typeLabel;

  const stateReceipt = {
    ToAddresses: [],
    CcAddresses: [],
    Subject: `${parentTypeNice} ${data.componentId} Withdrawal Confirmation`,
    HTML: `
        <p>This email is to confirm ${parentTypeNice} ${data.componentId} was withdrawn by ${user.fullName}. 
        The review of ${parentTypeNice} ${data.componentId} has concluded.
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
