import dynamoDb from "../libs/dynamodb-lib";

export default async function newRaiResponse(newData) {
  var getParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: newData.packageId,
      sk: "RAI_RESPONSE",
    },
  };

  console.log("getParams: ", getParams);
  dynamoDb
    .get(getParams)
    .then((result) => {
      if (!result.Item) {
        result.Item = {
          pk: newData.packageId,
          sk: "RAI_RESPONSE",
          changeHistory: [newData],
        };
      } else {
        result.Item.changeHistory.unshift(newData);
      }
      console.log("item with new changeHistory is: ", result.Item);

      var putParams = {
        TableName: process.env.oneMacTableName,
        Item: { ...result.Item },
      };
      console.log("did we get to the put", putParams);
      return dynamoDb.put(putParams);
    })
    .catch((error) => {
      console.log(
        `Error newRaiResponse happened while reading from DB:  ${error.message}`
      );
      throw error;
    });

  return "Success - newRaiResponse";
}
