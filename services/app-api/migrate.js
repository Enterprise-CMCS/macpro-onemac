import handler from "./libs/handler-lib";
//import dynamoDb from "./libs/dynamodb-lib";

/**
 * Perform data migrations
 */

export const main = handler((event) => {
  console.log("Migrate was called with event: ", event);
  return "Nothing Migrated... Yet";
  // scan one table index as only indexed items need migration in this case
  /*    const scanParams = {
        TableName: process.env.oneMacTableName,
        IndexName: "GSI1",
        ExclusiveStartKey: null,
        ScanIndexForward: false,
        ProjectionExpression:
          "componentId,componentType,currentStatus,submissionTimestamp,submitterName,submitterEmail,submissionId,submitterId,clockEndTimestamp,expirationTimestamp",
      };

    // convert GSI1pl from OneMAC to OneMAC#spa or OneMAC#waiver based on component type

      const baseParams = {
        TableName: process.env.oneMacTableName,
        IndexName: "GSI1",
        ExclusiveStartKey: null,
        ScanIndexForward: false,
        ProjectionExpression:
          "componentId,componentType,currentStatus,submissionTimestamp,submitterName,submitterEmail,submissionId,submitterId,clockEndTimestamp,expirationTimestamp",
      };
      const grouppk = "OneMAC#" + event.queryStringParameters.group;
      let paramList = [];
      if (typeof territoryList !== "string") {
        paramList = territoryList.map((territory) => {
          return {
            ...baseParams,
            KeyConditionExpression: "GSI1pk = :pk AND begins_with(GSI1sk,:t1)",
            ExpressionAttributeValues: {
              ":pk": grouppk,
              ":t1": territory,
            },
          };
        });
      } else {
        paramList = [
          {
            ...baseParams,
            KeyConditionExpression: "GSI1pk = :pk",
            ExpressionAttributeValues: {
              ":pk": grouppk,
            },
          },
        ];
      }

      return Promise.all(
        paramList.map(async (params) => {
          const promiseItems = [];
          do {
            const results = await dynamoDb.query(params);
            console.log("params are: ", params);
            console.log("results are: ", results);
            promiseItems.push(...results.Items);
            params.ExclusiveStartKey = results.LastEvaluatedKey;
          } while (params.ExclusiveStartKey);
          return promiseItems;
        })
      ).then((values) => {
        console.log("the promises resolve to: ", values);
        return values.flat();
      });
    })
    .catch((error) => {
      console.log("error is: ", error);
      return error;
    });
    */
});
