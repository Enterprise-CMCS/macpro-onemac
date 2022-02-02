import dynamoDb from "../libs/dynamodb-lib";

export const newUser = (userDetails) => {
  try {
    const contactParams = {
      TableName: process.env.oneMacTableName,
      Item: {
        pk: userDetails.email,
        sk: "ContactInfo",
        ...userDetails,
      },
    };

    dynamoDb.put(contactParams);
  } catch (e) {
    console.log("newUser put error: ", e);
    throw e;
  }
};
