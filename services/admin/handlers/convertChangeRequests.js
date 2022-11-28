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
          let componentType = item.type;
          if (componentType === "spa") componentType = "medicaidspa";
          if (componentType === "sparai") componentType = "medicaidsparai";
          if (componentType === "waiver") componentType += item.actionType;
          if (
            componentType === "waiverrai" &&
            item?.parentType === "waiverappk"
          )
            componentType = "waiverappkrai";

          let currentStatus = "Submitted";
          if (item.state === "inactivated") currentStatus = "Inactivated";

          console.log(
            "for %s: %s becomes %s",
            item.pk,
            item.type,
            componentType
          );

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
              currentStatus,
              currentStatusTimestamp: item.submittedAt,
              proposedEffectiveDate: "none",
              clockEndTimestamp: item.ninetyDayClockEnd,
              additionalInformation: item.summary,
              submitterEmail: item.user.email.toLowerCase(),
              submitterName: `${item.user.firstName} ${item.user.lastName}`,
              originallyFrom: `${params.TableName}`,
              convertTimestamp: Date.now(),
            },
          };

          if (item.waiverAuthority !== "")
            putParams.Item.waiverAuthority = item.waiverAuthority;
          if (item.parentType !== "")
            putParams.Item.parentType = item.parentType;
          // default to only processing new
          if (event.processAll !== "true")
            putParams.ConditionExpression = "attribute_not_exists(pk)";

          console.log(
            "params for convert: ",
            JSON.stringify(putParams, null, 2)
          );
          try {
            await dynamoDb.put(putParams).promise();
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
