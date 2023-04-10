import dynamoDb from "../libs/dynamodb-lib";

/**
 * Check to see if the included id exists in the data
 * @param {String} id ID to check for
 * @returns {Promise<Boolean>} true if found in data, false if not in data
 */
export default async function packageExists(id) {
  //assume the territory is the first two chars

  const params = {
    TableName: process.env.oneMacTableName,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": id,
    },
  };

  let result;
  try {
    result = await dynamoDb.query(params);
  } catch (error) {
    console.log(`packageExists ${params.TableName} got an error: `, error);
  }

  return result.Count > 0;
}
