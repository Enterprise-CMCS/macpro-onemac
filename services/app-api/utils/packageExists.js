import dynamoDb from "../libs/dynamodb-lib";

/**
 * Check to see if the included id exists in the data
 * @param {String} id ID to check for
 * @returns {Boolean} true if found in data, false if not in data
 */
export default async function packageExists(id) {
  //assume the territory is the first two chars

  let params = {
    TableName: process.env.oneMacTableName,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": id,
    },
  };

  let result;
  try {
    result = await dynamoDb.query(params);

    if (result.Count <= 0) {
      params = {
        TableName: process.env.spaIdTableName,
        // 'Key' defines the partition key and sort key of the item to be retrieved
        // - 'id': change request ID
        Key: {
          id: id,
        },
      };
      console.log("the params for checking", params);
      result = await dynamoDb.get(params);
    }
  } catch (error) {
    console.log(`packageExists ${params.TableName} got an error: `, error);
  }

  return result.Count > 0;
}
