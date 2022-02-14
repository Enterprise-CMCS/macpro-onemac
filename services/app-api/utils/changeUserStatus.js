import dynamoDb from "../libs/dynamodb-lib";

export const buildSK = (role, territory) => {
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

export const changeUserStatus = async ({
  email,
  fullName,
  doneByEmail,
  doneByName,
  date,
  role,
  territory,
  status,
}) => {
  // add a new v0 and v latest

  // update contactInfo GSI
  try {
    const updateParams = {
      TableName: process.env.oneMacTableName,
      ReturnValues: "UPDATED_NEW",
      Key: {
        pk: email.toLowerCase(),
        sk: `v0#${role}#${territory}`,
      },
      UpdateExpression:
        "SET Latest = if_not_exists(Latest, :defaultval) + :incrval, " +
        "#email = :email, #status = :status, #fullName = :fullName, " +
        "#doneByEmail = :doneByEmail, #doneByName = :doneByName, " +
        "#role = :role, #territory = :territory, #date = :date, " +
        "#GSI1pk = :GSI1pk, #GSI1sk = :GSI1sk",
      ExpressionAttributeNames: {
        "#email": "email",
        "#status": "status",
        "#fullName": "fullName",
        "#doneByEmail": "doneByEmail",
        "#doneByName": "doneByName",
        "#role": "role",
        "#territory": "territory",
        "#date": "date",
        "#GSI1pk": "GSI1pk",
        "#GSI1sk": "GSI1sk",
      },
      ExpressionAttributeValues: {
        ":email": email.toLowerCase(),
        ":status": status,
        ":fullName": fullName,
        ":doneByEmail": doneByEmail.toLowerCase(),
        ":doneByName": doneByName,
        ":role": role,
        ":territory": territory,
        ":date": date,
        ":GSI1pk": "USER",
        ":GSI1sk": buildSK(role, territory),
        ":defaultval": 0,
        ":incrval": 1,
      },
    };

    const response = await dynamoDb.update(updateParams);

    const latestVersion = response["Attributes"]["Latest"];

    const putParams = {
      TableName: process.env.oneMacTableName,
      Item: {
        pk: email.toLowerCase(),
        sk: `v${latestVersion}#${role}#${territory}`,
        status,
        doneByEmail: doneByEmail.toLowerCase(),
        doneByName,
        role,
        territory,
        date,
      },
    };
    await dynamoDb.put(putParams);
  } catch (e) {
    console.log("newUser put error: ", e);
    throw e;
  }

  const contactParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: email.toLowerCase(),
      sk: "ContactInfo",
    },
  };
  if (role !== "statesubmitter" && status === "active") {
    contactParams.UpdateExpression = "SET GSI1pk = :newPk, GSI1sk = :newSk";
    contactParams.ExpressionAttributeValues = {
      ":newPk": `${role}#${territory}`,
      ":newSk": email.toLowerCase(),
    };
  } else {
    contactParams.UpdateExpression = "REMOVE GSI1pk, GSI1sk";
  }
  await dynamoDb.update(contactParams);
};
