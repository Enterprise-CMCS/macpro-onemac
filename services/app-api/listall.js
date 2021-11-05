import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { generateMetrics } from "./libs/metrics-lib";

export const main = handler(async () => {
  const params = {
    TableName: process.env.tableName,
  };

  const result = await dynamoDb.scan(params);

  // Return the matching list of items in response body

  return generateMetrics(result.Items);
});
