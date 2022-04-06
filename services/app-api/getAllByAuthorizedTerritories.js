import { USER_ROLE } from "cmscommonlib";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { RESPONSE_CODE, USER_STATUS, effectiveRoleForUser } from "cmscommonlib";
import { getUser } from "./getUser";

const commonQueryConfig = {
  TableName: process.env.tableName,
  ExpressionAttributeNames: { "#type": "type", "#user": "user" },
  ProjectionExpression:
    "transmittalNumber,#type,territory,submittedAt,#user.firstName,#user.lastName,#user.email,userId,id",
};

/**
 * Returns an array of updated parameters for querying a helpdesk or reviewer role
 * Will stop once entire dynamoDB has been scanned
 * @param {String} startingKey the key to continue from if the query is not complete
 * @param {Boolean} keepSearching determines how to proceed with the query true==continue query/false==end query
 * @param {Object} allResults the results of the query/past queries
 * @returns the updated versions of the parameters
 */
async function helpdeskOrReviewerDynamoDbQuery(
  startingKey,
  keepSearching,
  allResults
) {
  const results = await dynamoDb.scan({
    ...commonQueryConfig,
    ExclusiveStartKey: startingKey,
  });
  allResults.push(results);
  if (results.LastEvaluatedKey) {
    startingKey = results.LastEvaluatedKey;
    return [startingKey, keepSearching, allResults];
  } else {
    keepSearching = false;
    return [null, keepSearching, allResults];
  }
}

/**
 * Returns an array of updated parameters for querying a state submitter role
 * Will stop once all results for particular territory have been returned
 * @param {String} startingKey the key to continue from if the query is not complete
 * @param {String} territory the territory to query
 * @param {Boolean} keepSearching determines how to proceed with the query true==continue query/false==end query
 * @param {Object} allResults the results of the query/past queries
 * @returns the updated versions of the parameters
 */
async function stateSubmitterDynamoDbQuery(
  startingKey,
  territory,
  keepSearching,
  allResults
) {
  const results = await dynamoDb.query({
    ...commonQueryConfig,
    ExclusiveStartKey: startingKey,
    IndexName: "territory-submittedAt-index",
    KeyConditionExpression:
      "territory = :v_territory and submittedAt > :v_submittedAt",
    ExpressionAttributeValues: {
      ":v_territory": territory,
      ":v_submittedAt": 0,
    },
    ScanIndexForward: false, // sorts the results by submittedAt in descending order (most recent first)
  });
  allResults.push(results);
  if (results.LastEvaluatedKey) {
    startingKey = results.LastEvaluatedKey;
    return [startingKey, keepSearching, allResults];
  } else {
    keepSearching = false;
    return [null, keepSearching, allResults];
  }
}

const usersWhoSeeEverything = new Set([
  USER_ROLE.HELPDESK,
  USER_ROLE.DEFAULT_CMS_USER,
  USER_ROLE.CMS_REVIEWER,
  USER_ROLE.SYSTEM_ADMIN,
]);

/**
 * Determines how to scan/query depending on the user role.
 * @param {Object} user the user to query or scan for.
 * @returns Returns an array of change requests to display on users submission list.
 */
async function getDataFromDB(user) {
  let startingKey = null;

  const userAccess = effectiveRoleForUser(user.roleList);

  try {
    if (userAccess === null || usersWhoSeeEverything.has(userAccess[0])) {
      let keepSearching = true;
      let tempResults = [];
      while (keepSearching == true) {
        [startingKey, keepSearching, tempResults] =
          await helpdeskOrReviewerDynamoDbQuery(
            startingKey,
            keepSearching,
            tempResults
          );
      }
      return tempResults;
    } else {
      return (
        await Promise.all(
          // query dynamodb for each territory in the territiories array
          user.roleList
            .filter(({ status }) => status === USER_STATUS.ACTIVE)
            .map(async ({ territory }) => {
              let tempResults = [];
              let keepSearching = true;
              while (keepSearching == true) {
                [startingKey, keepSearching, tempResults] =
                  await stateSubmitterDynamoDbQuery(
                    startingKey,
                    territory,
                    keepSearching,
                    tempResults
                  );
              }
              return tempResults;
            })
        )
      ).flat();
    }
  } catch (error) {
    console.error("Could not fetch results from Dynamo:", error);
    return RESPONSE_CODE.DATA_RETRIEVAL_ERROR;
  }
}

/**
 * Gets all change requests from the DynamoDB change requests table
 * that correspond to the user's active access to states/territories
 */
export const main = handler(async (event) => {
  const user = await getUser(event.queryStringParameters.email);

  const allResults = await getDataFromDB(user);
  if (typeof allResults === "string") return allResults;
  // extracts items from each of the results
  return allResults.flatMap(({ Items }) => Items);
});
