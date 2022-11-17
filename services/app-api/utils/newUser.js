import AWS from "aws-sdk";
import { dynamoConfig } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

export const newUser = async (userDetails) => {
  try {
    const contactParams = {
      TableName: process.env.oneMacTableName,
      Item: {
        pk: userDetails.email.toLowerCase(),
        sk: "ContactInfo",
        ...userDetails,
      },
    };

    await dynamoDb.put(contactParams).promise();
  } catch (e) {
    console.log("newUser put error: ", e);
    throw e;
  }
};
