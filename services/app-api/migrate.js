import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import { newUser } from "./utils/newUser";
import { changeUserStatus } from "./utils/changeUserStatus";

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

  const approverNamesById = Object.fromEntries(
    promiseItems.map(({ id, firstName, lastName }) => [
      id.toLowerCase(),
      `${firstName} ${lastName}`,
    ])
  );

  // convert UserTable to OneTable
  await Promise.all(
    promiseItems.map(async (item) => {
      const updateList = [];

      switch (item.type) {
        case "systemadmin":
          updateList.push({
            territory: "N/A",
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
                territory: "N/A",
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
        const contactDetails = {
          fullName: `${item.firstName} ${item.lastName}`,
          email: item.id,
          phoneNumber: item.phoneNumber,
          group: item.group,
          division: item.division,
        };

        await newUser(contactDetails);

        for (const thing of updateList) {
          const doneBy = thing.doneBy.toLowerCase();
          await changeUserStatus({
            fullName: contactDetails.fullName,
            email: item.id,
            doneByEmail: doneBy,
            doneByName: approverNamesById[doneBy] ?? "",
            date: thing.date,
            role: item.type,
            territory: thing.territory,
            status: thing.status,
          });
        }
      } catch (e) {
        console.log("migrate error: ", e);
      }
    })
  );

  return "Done";
});
