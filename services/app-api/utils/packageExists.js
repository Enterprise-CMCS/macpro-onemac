import dynamoDb from "../libs/dynamodb-lib";

/**
 * Check to see if the included id exists in the data
 * @param {String} id ID to check for
 * @returns {Boolean} true if found in data, false if not in data
 */
export default async function packageExists(id) {

  const params = {
    TableName: process.env.spaIdTableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'id': change request ID
    Key: {
      id: id
    }
  };
  console.log("the params for checking", params);
  let idResponse;
  let result;
  try {
    result = await dynamoDb.get(params);
  } catch (error) {
    console.log("packageExists got an error: ", error);
  }
  if (result.Item) {
    console.log("the Item exists", result);
    idResponse = true;
  } else {
    idResponse = false;
  }
  return idResponse;
}
