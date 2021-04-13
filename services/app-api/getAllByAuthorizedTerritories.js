import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
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
  const territories = getAuthorizedStateList(user);

  // query dynamodb for each territory in the territiories array
  const promises = territories.map((territory) => {
    const params = {
      TableName: process.env.tableName,
      IndexName: "territory-submittedAt-index",
      KeyConditionExpression:
        "territory = :v_territory and submittedAt > :v_submittedAt",
      ExpressionAttributeValues: {
        ":v_territory": territory,
        ":v_submittedAt": 0,
      },
      ScanIndexForward: false, // sorts the results by submittedAt in descending order (most recent first)
    };

    return dynamoDb.query(params);
  });

  // resolve promises from all queries
  const results = await Promise.all(promises);

  // extracts items from each of the results
  let items = [];
  results.forEach((result) => {
    items = items.concat(result.Items);
  });

  if (items.length === 0) {
    console.log(`No change requests found matching that query.`);
  }

  console.log(`Sending back ${items.length} change request(s).`);
  return items;
});
