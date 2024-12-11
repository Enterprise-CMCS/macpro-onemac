import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import {
  RESPONSE_CODE,
  getActiveTerritories,
  getUserRoleObj,
  Workflow,
} from "cmscommonlib";
import { cmsStatusUIMap, stateStatusUIMap } from "./libs/status-lib";
import { getUser } from "./getUser";
import { getActionsForPackage } from "./utils/actionDelegate";

/**
 * Gets all packages from the DynamoDB one table
 * that correspond to the user's active access to states/territories
 */

export const getMyPackages = async (email, group) => {
  if (!email) return RESPONSE_CODE.USER_NOT_FOUND;
  if (!group) return RESPONSE_CODE.DATA_MISSING;

  try {
    const user = await getUser(email);
    if (!user) throw RESPONSE_CODE.USER_NOT_AUTHORIZED;

    const userRoleObj = getUserRoleObj(user.roleList);
    const territoryList = getActiveTerritories(user.roleList);
    const statusMap = userRoleObj.isCMSUser ? cmsStatusUIMap : stateStatusUIMap;

    if (
      !userRoleObj.canAccessDashboard ||
      (Array.isArray(territoryList) && territoryList.length === 0)
    ) {
      throw RESPONSE_CODE.USER_NOT_AUTHORIZED;
    }

    const baseParams = {
      TableName: process.env.oneMacTableName,
      IndexName: "GSI1",
      ExclusiveStartKey: null,
      ScanIndexForward: false,
      ProjectionExpression:
        "componentId,componentType,currentStatus,submissionTimestamp,latestRaiResponseTimestamp,lastActivityTimestamp,submitterName,submitterEmail,waiverAuthority, cpocName, reviewTeam, subStatus, finalDispositionDate",
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

    // Using a for...of loop to ensure async operations are awaited correctly
    const allItems = [];
    for (const params of paramList) {
      const promiseItems = [];
      do {
        const results = await dynamoDb.query(params);
        for (const oneItem of results.Items) {
          oneItem.actions = await getActionsForPackage(
            oneItem.componentType,
            oneItem.currentStatus,
            !!oneItem.latestRaiResponseTimestamp,
            oneItem.subStatus,
            userRoleObj,
            "package"
          );
          if (oneItem.waiverAuthority)
            oneItem.temporaryExtensionType = oneItem.waiverAuthority.slice(
              0,
              7
            );

          if (statusMap[oneItem.subStatus]) {
            oneItem.subStatus = statusMap[oneItem.subStatus];
          }

          if (!statusMap[oneItem.currentStatus])
            console.log(
              "%s status of %s not mapped!",
              oneItem.pk,
              oneItem.currentStatus
            );
          else {
            oneItem.currentStatus = statusMap[oneItem.currentStatus];
            if (oneItem.currentStatus !== Workflow.ONEMAC_STATUS.INACTIVATED)
              promiseItems.push(oneItem);
          }
        }
        params.ExclusiveStartKey = results.LastEvaluatedKey;
      } while (params.ExclusiveStartKey);

      allItems.push(...promiseItems);
    }

    return allItems; // Flattened list of all items
  } catch (error) {
    console.log("error is: ", error);
    return error;
  }
};

// get the approver list for a rols and possibly a territory
export const main = handler(async (event) => {
  return await getMyPackages(
    event?.queryStringParameters?.email,
    event?.queryStringParameters?.group
  );
});
