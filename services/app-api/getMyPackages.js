import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import {
  RESPONSE_CODE,
  getActiveTerritories,
  getUserRoleObj,
  Workflow,
} from "cmscommonlib";
import { getUser } from "./getUser";

const cmsStatusUIMap = {
  [Workflow.ONEMAC_STATUS.SUBMITTED]: "Submitted",
  [Workflow.ONEMAC_STATUS.INACTIVATED]: "CMS Inactivated",
  [Workflow.ONEMAC_STATUS.UNSUBMITTED]: "CMS Unsubmitted",
  [Workflow.ONEMAC_STATUS.RAI_SUBMITTED]: "CMS RAI Submitted",
  [Workflow.ONEMAC_STATUS.IN_REVIEW]: "CMS Under Review",
  [Workflow.ONEMAC_STATUS.RAI_ISSUED]: "CMS RAI Issued",
  [Workflow.ONEMAC_STATUS.APPROVED]: "CMS Approved",
  [Workflow.ONEMAC_STATUS.DISAPPROVED]: "CMS Disapproved",
  [Workflow.ONEMAC_STATUS.WITHDRAWN]: "CMS Package Withdrawn",
  [Workflow.ONEMAC_STATUS.TERMINATED]: "CMS Waiver Terminated",
  [Workflow.ONEMAC_STATUS.PAUSED]: "CMS Review Paused, Off the Clock",
  [Workflow.ONEMAC_STATUS.UNKNOWN]: "CMS -- --",
};

/**
 * Gets all packages from the DynamoDB one table
 * that correspond to the user's active access to states/territories
 */

export const getMyPackages = async (email, group) => {
  if (!email) return RESPONSE_CODE.USER_NOT_FOUND;
  if (!group) return RESPONSE_CODE.DATA_MISSING;

  return getUser(email)
    .then((user) => {
      if (!user) throw RESPONSE_CODE.USER_NOT_AUTHORIZED;

      const userRoleObj = getUserRoleObj(user.roleList);
      const territoryList = getActiveTerritories(user.roleList);

      if (!userRoleObj.canAccessDashboard || territoryList === []) {
        throw RESPONSE_CODE.USER_NOT_AUTHORIZED;
      }

      const baseParams = {
        TableName: process.env.oneMacTableName,
        IndexName: "GSI1",
        ExclusiveStartKey: null,
        ScanIndexForward: false,
        ProjectionExpression:
          "componentId,componentType,currentStatus,submissionTimestamp,submitterName,submitterEmail",
      };
      const grouppk = "OneMAC#" + group;
      let paramList = [];
      if (territoryList[0] !== "N/A") {
        paramList = territoryList.map((territory) => {
          return {
            ...baseParams,
            KeyConditionExpression: "GSI1pk = :pk AND begins_with(GSI1sk,:t1)",
            ExpressionAttributeValues: {
              ":pk": grouppk,
              ":t1": territory,
            },
          };
        });
      } else {
        paramList = [
          {
            ...baseParams,
            KeyConditionExpression: "GSI1pk = :pk",
            ExpressionAttributeValues: {
              ":pk": grouppk,
            },
          },
        ];
      }

      return Promise.all(
        paramList.map(async (params) => {
          const promiseItems = [];
          do {
            const results = await dynamoDb.query(params);
            results.Items.map((oneItem) => {
              if (!cmsStatusUIMap[oneItem.currentStatus])
                console.log(
                  "%s status of %s not mapped!",
                  oneItem.pk,
                  oneItem.currentStatus
                );
              else {
                oneItem.currentStatus = cmsStatusUIMap[oneItem.currentStatus];
                promiseItems.push(oneItem);
              }
            });
            params.ExclusiveStartKey = results.LastEvaluatedKey;
          } while (params.ExclusiveStartKey);
          return promiseItems;
        })
      ).then((values) => {
        return values.flat();
      });
    })
    .catch((error) => {
      console.log("error is: ", error);
      return error;
    });
};

// get the approver list for a rols and possibly a territory
export const main = handler(async (event) => {
  return await getMyPackages(
    event?.queryStringParameters?.email,
    event?.queryStringParameters?.group
  );
});
