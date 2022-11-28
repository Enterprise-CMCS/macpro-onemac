import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE
    ? {
        endpoint: "http://localhost:8000",
      }
    : {}
);

export const main = async (event) => {
  // scan changeRequest table
  const params = {
    TableName: event.fromTable ? event.fromTable : process.env.tableName,
    ExclusiveStartKey: event.ExclusiveStartKey
      ? JSON.parse(event.ExclusiveStartKey)
      : null,
  };
  if (event.Limit) params.Limit = event.Limit;

  do {
    try {
      console.log("scan params are: ", params);
      const results = await dynamoDb.scan(params).promise();
      await Promise.all(
        results.Items.map(async (item) => {
          const queryParams = {
            TableName: process.env.oneMacTableName,
            KeyConditionExpression: "pk = :inPk AND sk = :package",
            ExpressionAttributeValues: {
              ":inPk": item.pk,
              ":package": "Package",
            },
            ProjectionExpression: "pk,sk",
          };

          try {
            const qresults = await dynamoDb.query(queryParams).promise();
            console.log("%s qresults: ", item.pk, qresults);
          } catch (e) {
            console.log("error received for %s: ", item.pk, e);
          }
        })
      );
      params.ExclusiveStartKey = results.LastEvaluatedKey;
    } catch (e) {
      console.log("error! ", e);
    }
  } while (!params.Limit && params.ExclusiveStartKey);

  return "Done at : " + JSON.stringify(params.ExclusiveStartKey);
};
