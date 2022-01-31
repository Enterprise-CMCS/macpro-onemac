import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

const buildSK = (role, territory) => {
  switch (role) {
    case "statesubmitter":
      return `statesystemadmin#${territory}`;
    case "cmsreviewer":
    case "statesystemadmin":
      return "cmsroleapprover";
    default:
      return "Boss";
  }
};

/**
 * Perform data migrations
 */

export const main = handler(async (event) => {
  console.log("Migrate was called with event: ", event);

  const params = {
    TableName: process.env.userTableName,
    ExclusiveStartKey: null,
    ScanIndexForward: false,
  };

  const promiseItems = [];

  do {
    const results = await dynamoDb.scan(params);
    promiseItems.push(...results.Items);
    params.ExclusiveStartKey = results.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);

  // convert UserTable to OneTable
  await Promise.all(
    promiseItems.map(async (item) => {
      const updateList = [];

      const contactParams = {
        TableName: process.env.oneMacTableName,
        Item: {
          pk: item.id,
          sk: "ContactInfo",
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.id,
          phoneNumber: item.phoneNumber,
          group: item.group,
          division: item.division,
        },
      };
      try {
        await dynamoDb.put(contactParams);
      } catch (e) {
        console.log("error!", e);
      }

      switch (item.type) {
        case "systemadmin":
          updateList.push({
            territory: "All",
            status: "active",
            date: 1584194366,
            doneBy: item.id,
          });
          break;
        case "helpdesk":
        case "cmsreviewer":
        case "cmsroleapprover":
          item.attributes
            .sort(
              (attribute, nextAttribute) => attribute.date - nextAttribute.date
            )
            .forEach((attribute) => {
              updateList.push({
                territory: "All",
                ...attribute,
              });
            });
          break;
        case "statesystemadmin":
        case "statesubmitter":
          item.attributes.forEach((attribute) => {
            attribute.history
              .sort((one, next) => one.date - next.date)
              .forEach((event) => {
                updateList.push({
                  territory: attribute.stateCode,
                  ...event,
                });
              });
          });
          break;
      }

      try {
        await Promise.all(
          updateList.map(async (thing) => {
            const response = await dynamoDb.update({
              TableName: process.env.oneMacTableName,
              ReturnValues: "UPDATED_NEW",
              Key: {
                pk: item.id,
                sk: `v0#${item.type}#${thing.territory}`,
              },
              UpdateExpression:
                "SET Latest = if_not_exists(Latest, :defaultval) + :incrval, #status = :status, #doneBy = :doneBy, #role = :role, #territory = :territory, #date = :date, #GSI1pk = :GSI1pk, #GSI1sk = :GSI1sk",
              ExpressionAttributeNames: {
                "#status": "status",
                "#doneBy": "doneBy",
                "#role": "role",
                "#territory": "territory",
                "#date": "date",
                "#GSI1pk": "GSI1pk",
                "#GSI1sk": "GSI1sk",
              },
              ExpressionAttributeValues: {
                ":status": thing.status,
                ":doneBy": thing.doneBy,
                ":role": item.type,
                ":territory": thing.territory,
                ":date": thing.date,
                ":GSI1pk": "USER",
                ":GSI1sk": buildSK(item.type, thing.territory),
                ":defaultval": 0,
                ":incrval": 1,
              },
            });

            const latestVersion = response["Attributes"]["Latest"];

            await dynamoDb.put({
              TableName: process.env.oneMacTableName,
              Item: {
                pk: item.id,
                sk: `v${latestVersion}#${item.type}#${thing.territory}`,
                status: thing.status,
                doneBy: thing.doneBy,
                role: item.type,
                territory: thing.territory,
                date: thing.date,
              },
            });
          })
        );
      } catch (e) {
        console.log("migrate error: ", e);
      }
    })
  );
  return "Done";
});
