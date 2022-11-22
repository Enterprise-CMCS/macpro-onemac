import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE
    ? {
        endpoint: "http://localhost:8000",
      }
    : {}
);

export const main = async () => {
  // scan changeRequest table
  const params = {
    TableName: process.env.practicetableName,
    ExclusiveStartKey: null,
  };

  do {
    try {
      const results = await dynamoDb.scan(params).promise();
      await Promise.all(
        results.Items.map(async (item) => {
          let componentType = item.type;
          if (componentType === "spa") componentType = "medicaidspa";
          if (componentType === "waiver") componentType += item.actionType;
          console.log("change-request %s becomes %s", item.type, componentType);

          const putParams = {
            TableName: process.env.oneMacTableName,
            Item: {
              pk: item.transmittalNumber,
              sk: `OneMAC#${item.submittedAt}`,
              GSI1pk: `OneMAC#submit${componentType}`,
              GSI1sk: item.transmittalNumber,
              componentId: item.transmittalNumber,
              componentType,
              submissionTimestamp: item.submittedAt,
              attachments: item.uploads,
              currentStatus: "Submitted",
              currentStatusTimestamp: item.submittedAt,
              proposedEffectiveDate: "none",
              clockEndTimestamp: item.ninetyDayClockEnd,
              additionalInformation: item.summary,
              submitterEmail: item.user.email.toLowerCase(),
              submitterName: `${item.user.firstName} ${item.user.lastName}`,
              originallyFrom: `${process.env.practicetableName}`,
            },
            ConditionExpression: "attribute_not_exists(pk)",
          };

          if (item.waiverAuthority !== "")
            putParams.Item.waiverAuthority = item.waiverAuthority;

          console.log(
            "params for convert: ",
            JSON.stringify(putParams, null, 2)
          );
          try {
            await dynamoDb.put(putParams).promise();
          } catch (e) {
            console.log("error received: ", e);
          }
        })
      );
      params.ExclusiveStartKey = results.LastEvaluatedKey;
    } catch (e) {
      console.log("error! ", e);
    }
  } while (params.ExclusiveStartKey);

  return "Done";
};
