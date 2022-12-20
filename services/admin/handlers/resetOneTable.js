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
            const splitSk = item.sk.split("#");
            if (splitSk[0] !== "SEATool" || splitSk.length > 2) {
              console.log("%s deleted SK: ", item.pk, splitSk);
              await dynamoDb
                .delete({
                  TableName: process.env.oneMacTableName,
                  Key: {
                    pk: item.pk,
                    sk: item.sk,
                  },
                })
                .promise();
            } else console.log("%s un-deleted Sk: ", item.pk, splitSk);
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
