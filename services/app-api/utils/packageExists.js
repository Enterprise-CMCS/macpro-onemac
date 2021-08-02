import dynamoDb from "../libs/dynamodb-lib";

/**
 * Check to see if the included id exists in the data
 * @param {String} id ID to check for
 * @returns {Boolean} true if found in data, false if not in data
 */
export default async function packageExists(id) {
  //assume the territory is the first two chars
  let pk = id.substring(0, 2);
  let sk = "v0#" + id;
  const params = {
    TableName: process.env.oneMacTableName,
    KeyConditionExpression: "pk = :pk AND sk = :sk",
    ExpressionAttributeValues: {
      ":pk": pk,
      ":sk": sk,
    },
  };
  let idResponse;
  let result;
  try {
    result = await dynamoDb.query(params);
  } catch (error) {
    console.log("packageExists got an error: ", error);
  }
  if (result.Count > 0) {
    idResponse = true;
  } else {
    idResponse = false;
  }
  return idResponse;
}
