import { USER_TYPE } from "cmscommonlib";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { RESPONSE_CODE } from "./libs/response-codes";
import getUser from "./utils/getUser";
import { getAuthorizedStateList } from "./user/user-util";

/**
 * Gets all change requests from the DynamoDB change requests table
 * that correspond to the user's active access to states/territories
 */

export const main = handler(async (event, context) => {
  var allResults = [];
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }

  const user = await getUser(event.queryStringParameters.email);
  if (!user) {
    return RESPONSE_CODE.USER_NOT_FOUND;
  }
  allResults = await getDataFromDB(user);
  // extracts items from each of the results
  let items = [];
  allResults.forEach((result) => {
    items = items.concat(result.Items);
  });
  if (items.length === 0) {
    console.log(`No change requests found matching that query.`);
  }

  console.log(`Sending back ${items.length} change request(s).`);
  return items;
});
/**
 * Determines how to scan/query depending on the user role.
 * @param {Object} user the user to query or scan for.
 * @returns Returns an array of change requests to display on users submission list.
 */

async function getDataFromDB(user) {
  let startingKey;
  let promises;
  let tempResults = [];
  let allResults = [];
  if (!startingKey) {
    startingKey = null;
  }
  try {
    var keepSearching;
    if ((user.type === USER_TYPE.HELPDESK)
      || (user.type === USER_TYPE.CMS_REVIEWER)) {
      keepSearching = true;
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
      // query dynamodb for each territory in the territiories array
      promises = getAuthorizedStateList(user).map(async (territory) => {
        tempResults = [];
        keepSearching = true;
        while (keepSearching == true) {
          [startingKey, keepSearching, tempResults] =
            await stateUserDynamoDbQuery(
              startingKey,
              territory,
              keepSearching,
              tempResults
            );
        }
        return tempResults;
      });
      // resolve promises from all queries
      allResults = await Promise.all(promises);
      let concatResults = [];
      for (var i = 0; i < allResults.length; i++) {
        allResults[i].forEach((stateInfo) => {
          concatResults.push(stateInfo);
        });
      }
      return concatResults;
    }
  } catch (error) {
    console.error("Could not fetch results from Dynamo:", error);
    return RESPONSE_CODE.DATA_RETRIEVAL_ERROR;
  }
}

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
  let results = await dynamoDb.scan({
    TableName: process.env.tableName,
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
async function stateUserDynamoDbQuery(
  startingKey,
  territory,
  keepSearching,
  allResults
) {
  let results = await dynamoDb.query({
    TableName: process.env.tableName,
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
