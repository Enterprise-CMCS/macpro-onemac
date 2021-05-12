import dynamoDb from "../libs/dynamodb-lib";

/**
 * returns the User Table entry who's id is this email
 * @param {String} userEmail User to return
 * @returns {Object} the User json object
 */
export default async function getUser(userEmail) {

  let params = {
    TableName: process.env.userTableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    Key: {
      id: userEmail,
    },
  };

  console.log("params are: ", params);
  let result;
  try {
      result = await dynamoDb.get(params);
  } catch (dbError) {
      console.log(`Error happened while reading from DB:  ${dbError}`);
      throw dbError;
  }

  if (!result.Item) {
      console.log(`The user does not exists with the id: ${userEmail} in the User table`);
      return result;
  }

  console.log(`Selected User ${userEmail}: ${JSON.stringify(result)}`);

  return result.Item;
}
