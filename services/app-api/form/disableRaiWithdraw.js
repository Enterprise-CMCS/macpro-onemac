import {
  disableRaiWithdraw,
  RESPONSE_CODE,
  Workflow,
  getUserRoleObj,
} from "cmscommonlib";
import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";
import { defaultFormConfig } from "./defaultFormConfig";
import Joi from "joi";
import { validateSubmission } from "./validateSubmission";
import { getUser } from "../getUser";
import { ONEMAC_TYPE } from "cmscommonlib/workflow";

export const disableRaiWithdrawFormConfig = {
  ...defaultFormConfig,
  successResponseCode: RESPONSE_CODE.RAI_RESPONSE_WITHDRAW_DISABLE_SUCCESS,
  ...disableRaiWithdraw,
  newStatus: Workflow.ONEMAC_STATUS.SUBMITTED,
  hasAuthorizationToSubmit: (userRole) => {
    return userRole.isCMSUser;
  },
  appendToSchema: {
    parentType: Joi.string().required(),
    submissionTimestamp: Joi.date().timestamp(),
    adminChanges: Joi.array().items(
      Joi.object({
        changeTimestamp: Joi.date().timestamp(),
        changeMade: Joi.string().required(),
        changeReason: Joi.string().required(),
      })
    ),
  },
};

async function validate(data) {
  if (validateSubmission(data, disableRaiWithdrawFormConfig)) {
    throw RESPONSE_CODE.VALIDATION_ERROR;
  }

  const doneBy = await getUser(data.submitterEmail);
  const userRoleObj = getUserRoleObj(doneBy?.roleList);
  if (JSON.stringify(doneBy) === "{}") {
    throw RESPONSE_CODE.USER_NOT_FOUND;
  }
  if (
    disableRaiWithdrawFormConfig.hasAuthorizationToSubmit(userRoleObj) !== true
  ) {
    throw RESPONSE_CODE.USER_NOT_AUTHORIZED;
  }
}

async function getRecordsByGSI1Keys(gsi1pk, gsi1sk) {
  const params = {
    TableName: process.env.oneMacTableName,
    IndexName: "GSI1", // Name of the Global Secondary Index
    KeyConditionExpression: "GSI1pk = :pkValue and GSI1sk = :skValue",
    ExpressionAttributeValues: {
      ":pkValue": gsi1pk,
      ":skValue": gsi1sk,
    },
    ScanIndexForward: false, // Sort in descending order by default (latest first)
  };

  try {
    const result = await dynamoDb.query(params);
    const sortedRecords = result.Items.sort((a, b) =>
      a.submissionTimestamp.localeCompare(b.submissionTimestamp)
    );
    return sortedRecords;
  } catch (error) {
    console.error("Error retrieving records:", error);
    throw error;
  }
}

async function updateRecord(record) {
  const params = {
    TableName: process.env.oneMacTableName,
    Item: record,
  };

  try {
    await dynamoDb.put(params);
  } catch (error) {
    console.error("Error updating record:", error);
    throw error;
  }
}

async function waitForStreamProcessing(componentId, eventTimestamp) {
  let packageUpdated = false;
  const checkParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: componentId,
      sk: `Package`,
    },
  };
  try {
    do {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const chkResponse = await dynamoDb.get(checkParams);
      packageUpdated =
        chkResponse?.Item?.adminChanges[0]?.changeTimestamp >= eventTimestamp;
    } while (!packageUpdated);
  } catch (e) {
    console.log("%s check error:", componentId, e);
  }
}

export const main = handler(async (event) => {
  let data;
  try {
    data = JSON.parse(event.body);
  } catch (e) {
    console.error("Failed to parse body", e);
    return RESPONSE_CODE.USER_SUBMISSION_FAILED;
  }
  try {
    await validate(data);
  } catch (e) {
    console.error("Failed to validate", e);
    return e;
  }

  const parentType =
    data.parentType === ONEMAC_TYPE.WAIVER_INITIAL ||
    data.parentType === ONEMAC_TYPE.WAIVER_RENEWAL ||
    data.parentType === ONEMAC_TYPE.WAIVER_AMENDMENT
      ? "waiver"
      : data.parentType;

  //get latest rai response - update status and add admin changes
  try {
    const gsi1pk = `OneMAC#submit${parentType}rai`;
    const gsi1sk = data.componentId;
    const records = await getRecordsByGSI1Keys(gsi1pk, gsi1sk);

    if (records.length > 0) {
      // the first record is the most recent as they were sorted by submissionTimestamp
      const mostRecentRecord = records[0];
      mostRecentRecord.currentStatus = Workflow.ONEMAC_STATUS.SUBMITTED;
      // set the eventTimestamp back to submissionTimestamp so that the
      // status is set correctly
      mostRecentRecord.eventTimestamp = data.submissionTimestamp;
      const checkTimestamp = Date.now();
      const adminChange = {
        changeTimestamp: checkTimestamp,
        changeMade: `${data.submitterName} has disabled State package action to withdraw Formal RAI Response`,
        changeReason: data.additionalInformation,
      };
      mostRecentRecord.adminChanges = mostRecentRecord.adminChanges
        ? [...mostRecentRecord.adminChanges, adminChange]
        : [adminChange];
      await updateRecord(mostRecentRecord);
      await waitForStreamProcessing(data.componentId, checkTimestamp);
    } else {
      throw new Error(
        "No RAI found when attempting to enable rai withdraw for ",
        data.componentId
      );
    }
  } catch (error) {
    console.error("Error enabling withraw rai:", error);
    return RESPONSE_CODE.SYSTEM_ERROR;
  }
  console.log("returning success response code from disableRaiWithdraw");
  return disableRaiWithdrawFormConfig.successResponseCode;
});
