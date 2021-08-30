import dynamoDb from "../libs/dynamodb-lib";

/**
 * Get a OneMAC package by package ID.
 * @param {string} package ID
 * @returns {Object} package data
 */
export default async function getPackage(packageId) {
  const { Item: data } = await dynamoDb.get({
    TableName: process.env.oneMacTableName,
    Key: { pk: packageId, sk: "PACKAGE" },
  });

  if (!data) throw new Error("ItemNotFound");

  return data;
}
