import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { RESPONSE_CODE, getUserRoleObj } from "cmscommonlib";
import getUser from "./utils/getUser";
import { getAuthorizedStateList } from "./user/user-util";

/**
 * Gets all packages from the DynamoDB one table
 * that correspond to the user's active access to states/territories
 */

export const main = handler((event) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    return null;
  }

  if (!event?.queryStringParameters?.email) return RESPONSE_CODE.USER_NOT_FOUND;

  return getUser(event.queryStringParameters.email)
    .then((user) => {
      if (!user) {
        throw new Error(RESPONSE_CODE.USER_NOT_FOUND);
      }

      const userRoleObj = getUserRoleObj(user.type);

      const territoryList = getAuthorizedStateList(user);
      if (!userRoleObj.canAccessDashboard || territoryList === []) {
        throw new Error(RESPONSE_CODE.USER_NOT_AUTHORIZED);
      }

      const baseParams = {
        TableName: process.env.oneMACTableName,
        IndexName: "GSI1",
        ExclusiveStartKey: null,
        ScanIndexForward: false,
        ProjectionExpression:
          "componentId,componentType,currentStatus,submissionTimestamp,submitterName,submitterEmail,submissionId,submitterId",
      };

      let paramList = [];
      if (typeof territoryList !== "string") {
        paramList = territoryList.map((territory) => {
          return {
            ...baseParams,
            KeyConditionExpression: "GSI1pk = :pk AND begins_with(GSI1sk,:t1)",
            ExpressionAttributeValues: {
              ":pk": "OneMAC",
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
              ":pk": "OneMAC",
            },
          },
        ];
      }

      return Promise.all(
        paramList.map(async (params) => {
          const promiseItems = [];
          do {
            const results = await dynamoDb.query(params);
            console.log("params are: ", params);
            console.log("results are: ", results);
            promiseItems.push(...results.Items);
            params.ExclusiveStartKey = results.LastEvaluatedKey;
          } while (params.ExclusiveStartKey);
          return promiseItems;
        })
      ).then((values) => {
        console.log("the promises resolve to: ", values);
        return values.flat();
      });
    })
    .catch((error) => {
      console.log("error is: ", error);
      throw error;
    });
});
