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
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }

  const user = await getUser(event.queryStringParameters.email);
  if (!user) {
    return RESPONSE_CODE.USER_NOT_FOUND;
  }
  var allResults = [];
  return await getDataFromDB(null).then(function () {
    // extracts items from each of the results
    let items = [];
    allResults.forEach((result) => {
      items = items.concat(result[0].Items);
    });

    if (items.length === 0) {
      console.log(`No change requests found matching that query.`);
    }

    console.log(`Sending back ${items.length} change request(s).`);
    return items;
  });

  async function getDataFromDB(startingKey) {
    let promises;
    if (user.type === USER_TYPE.HELPDESK) {
      promises = [dynamoDb.scan({
        TableName: process.env.tableName,
        ExclusiveStartKey: startingKey
      })];
    } else {
      // query dynamodb for each territory in the territiories array
      promises = getAuthorizedStateList(user).map((territory) =>
        dynamoDb.query({
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
        })
      );
    }
    // resolve promises from all queries
    let results;
    try {
      results = await Promise.all(promises);
      allResults.push(results);
      if (results[0].LastEvaluatedKey) {
        await getDataFromDB(results[0].LastEvaluatedKey);
      } else {
        return;
      }
    } catch (error) {
      console.error("Could not fetch results from Dynamo:", error);
      return RESPONSE_CODE.DATA_RETRIEVAL_ERROR;
    }
  }
});
