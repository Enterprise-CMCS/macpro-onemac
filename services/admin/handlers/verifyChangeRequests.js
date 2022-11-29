import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE
    ? {
        endpoint: "http://localhost:8000",
      }
    : {}
);

export const main = async (event) => {
  const badIDs = [];

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
      const results = await dynamoDb.scan(params).promise();
      await Promise.all(
        results.Items.map(async (item) => {
          const queryParams = {
            TableName: process.env.oneMacTableName,
            KeyConditionExpression: "pk = :inPk AND sk = :package",
            ExpressionAttributeValues: {
              ":inPk": item.transmittalNumber,
              ":package": "Package",
            },
            ProjectionExpression: "pk,sk",
          };

          try {
            const qresults = await dynamoDb.query(queryParams).promise();
            if (qresults.Count !== 1) badIDs.push(item.transmittalNumber);
            console.log("%s qresults: ", item.transmittalNumber, qresults);
          } catch (e) {
            console.log("error received for %s: ", item.transmittalNumber, e);
          }
        })
      );
      params.ExclusiveStartKey = results.LastEvaluatedKey;
    } catch (e) {
      console.log("error! ", e);
    }
  } while (!params.Limit && params.ExclusiveStartKey);
  console.log("the Bad Ids are: ", badIDs);
  return "Done at : " + JSON.stringify(params.ExclusiveStartKey);
};
