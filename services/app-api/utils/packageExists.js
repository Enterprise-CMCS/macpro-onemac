import dynamoDb from "../libs/dynamodb-lib";

/**
 * Check to see if the included id exists in the data
 * @param {String} id ID to check for
 * @returns {Boolean} true if found in data, false if not in data
 */
export default async function packageExists(id) {
  //assume the territory is the first two chars
  let pk = id;
  const params = {
    TableName: process.env.oneMacTableName,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": pk,
    },
  };

  let result;
  try {
    result = await dynamoDb.query(params);
  } catch (error) {
    console.log("packageExists got an error: ", error);
  }

  return result.Count > 0;
}
