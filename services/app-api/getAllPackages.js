import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { RESPONSE_CODE } from "cmscommonlib";
import getUser from "./utils/getUser";

/**
 * Gets all change requests from the DynamoDB change requests table
 * that correspond to the user's active access to states/territories
 */

export const main = handler(async (event, context) => {
  var allResults = [];
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    return null;
  }

  try {
    const user = await getUser(event.queryStringParameters.email);
    if (!user) {
      return RESPONSE_CODE.USER_NOT_FOUND;
    }
    allResults = await getDataFromDB(user);
  } catch (error) {
    console.log("error is: ", error);
    throw error;
  }
  // extracts items from each of the results
  let items = [];
  console.log("allResults is: ", allResults);
  if (allResults) {
    allResults.forEach((result) => {
      items = items.concat(result.Items);
    });
  }
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
  let tempResults = [];
  if (!startingKey) {
    startingKey = null;
  }
  try {
    var keepSearching;
    keepSearching = true;
    while (keepSearching == true) {
      [startingKey, keepSearching, tempResults] = await getPackages(
        startingKey,
        keepSearching,
        tempResults
      );
    }
    return tempResults;
  } catch (error) {
    console.error("Could not fetch results from Dynamo:", error);
    throw RESPONSE_CODE.DATA_RETRIEVAL_ERROR;
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
async function getPackages(startingKey, keepSearching, allResults) {
  let results = await dynamoDb.query({
    TableName: process.env.oneMacTableName,
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk = :pk AND GSI1sk > :v_GSI1sk",
    ExpressionAttributeNames: {
      "#timestamp": "timestamp",
    },
    ExpressionAttributeValues: {
      ":pk": "PACKAGE",
      ":v_GSI1sk": 0,
    },
    ExclusiveStartKey: startingKey,
    ScanIndexForward: false,
    ProjectionExpression:
      "packageID, packageType, territory, #timestamp, lastModifiedByName, lastModifiedByEmail",
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
