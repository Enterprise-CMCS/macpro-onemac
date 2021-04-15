import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  // If this invokation is a prewarm, do nothing and return.
  if(event.source == "serverless-plugin-warmup" ) {
    console.log("Warmed up!");
    return null;
  }

  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'id': change request ID
    Key: {
      userId: event.pathParameters.userId,
      id: event.pathParameters.id
    }
  };

  const result = await dynamoDb.get(params);
  if ( ! result.Item) {
    throw new Error("Item not found.");
  } else {
    //Clear out the s3 URLs.  The UI will generate a temp one.
    if(result.Item.uploads) {
      result.Item.uploads.forEach((upload) => {
        upload.url = null;
      });
    }
  }
  console.log('Sending back result:', JSON.stringify(result,null,2));
  // Return the retrieved item
  return result.Item;
});
