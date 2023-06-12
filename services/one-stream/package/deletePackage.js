import AWS from "aws-sdk";

import { dynamoConfig } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

const oneMacTableName = process.env.IS_OFFLINE
  ? process.env.localTableName
  : process.env.oneMacTableName;

export const deletePackage = async (packageId) => {
  console.log("deleting package: ", packageId);
  const queryParams = {
    TableName: oneMacTableName,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": packageId,
    },
  };
  console.log("%s the new query params are: ", packageId, queryParams);

  try {
    const result = await dynamoDb.query(queryParams).promise();
    console.log("%s query result: ", packageId, result);
    if (result?.Items.length <= 0) {
      console.log("%s did not have Items?", packageId);
      return;
    }
    await Promise.all(
      result.Items.map(async (item) => {
        if (item.GSI1pk) delete item.GSI1pk;
        if (item.GSI1sk) delete item.GSI1sk;
        if (item.GSI2pk) delete item.GSI2pk;
        if (item.GSI2sk) delete item.GSI2sk;
        const putParams = {
          TableName: oneMacTableName,
          Item: {
            ...item,
            pk: "DELETED_ITEMS",
            sk: `${item.pk}#${item.sk}`,
          },
        };
        await dynamoDb.put(putParams).promise();
      })
    );

    await Promise.all(
      result.Items.map(async (item) => {
        const deleteParams = {
          TableName: oneMacTableName,
          Key: {
            pk: item.pk,
            sk: item.sk,
          },
        };

        await dynamoDb.delete(deleteParams).promise();
      })
    );
  } catch (e) {
    console.log("%s deletePackage error: ", packageId, e);
  }
  console.log("%s the end of things", packageId);
};
