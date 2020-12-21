//import dynamoDb from "../libs/dynamodb-lib";

/**
 * Check to see if the included id exists in the data
 * @param {String} id ID to check for
 * @returns {Boolean} true if found in data, false if not in data
 */
export default async function idExists(id) {
  return false;
 /* const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'id': change request ID
    Key: {
      id: id
    }
  };
  let idResponse = true;
  const result = await dynamoDb.get(params);
  if (result.Item) {
    idResponse = true;
  }

  return idResponse; */
}