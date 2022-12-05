import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE
    ? {
        endpoint: "http://localhost:8000",
      }
    : {}
);

/**
 * Use this reset to remove all current OneMAC packages from the Dashboard.
 */

export const main = async (event) => {
  console.log("resetOneTable event: ", event);

  const params = {
    TableName: process.env.oneMacTableName,
    ExclusiveStartKey: event.ExclusiveStartKey
      ? JSON.parse(event.ExclusiveStartKey)
      : null,
  };
  if (event.Limit) params.Limit = event.Limit;

  do {
    try {
      console.log("params are: ", params);
      const results = await dynamoDb.scan(params).promise();
      await Promise.all(
        results.Items.map(async (item) => {
          if (!item.pk.includes("@")) {
            const [eventSource] = item.sk.split("#");
            console.log(" the event Source: ", eventSource);
            if (eventSource !== "SEATool") {
              await dynamoDb
                .delete({
                  TableName: process.env.oneMacTableName,
                  Key: {
                    pk: item.pk,
                    sk: item.sk,
                  },
                })
                .promise();
            }
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
