const AWS = require('aws-sdk');
import { getUser } from "../../app-api/getUser";

const cognito = new AWS.CognitoIdentityServiceProvider();

const userPoolId = "us-east-1_Y1xWRr12w"

const listUsers = async (userPoolId, paginationToken = null) => {
    const params = {
        UserPoolId: userPoolId,
        PaginationToken: paginationToken,  // Use pagination token if necessary
    };
    const response = await cognito.listUsers(params).promise();
    console.log("cognito users:::: ",response)
    return response;

};

const getUserRolesFromDynamoDB = async (userEmail) => {
    // const params = {
    //     TableName: 'YourDynamoDBTable',
    //     Key: {
    //         'email': userEmail  // Assuming you have an index on email or userId
    //     }
    // };


  const params = {
    TableName: process.env.oneMacTableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    KeyConditionExpression: "pk = :pk AND begins_with(sk,:version)",
    ExpressionAttributeValues: {
      ":pk": userEmail.toLowerCase(),
      ":version": "v0",
    },
    ExpressionAttributeNames: {
      "#role": "role",
      "#status": "status",
    },
    ProjectionExpression: "#role, territory, #status",
  };

  let result;

  try {

    result = await dynamoDb.query(params);

    if (!result.Items) {
      result = setTimeout(await dynamoDb.query(params), 1500);
    }
  } catch (dbError) {
    console.log(`Error happened while reading from DB:  ${dbError}`);
    throw dbError;
  }
    // const result = await dynamoDb.get(params).promise();
    console.log("roles for user emai: " + userEmail + " :::" + result.items);
    return result.Items ? result.Items: [];  // Assuming roles is an array
};



export const main = () => {
    const users = listUsers();
    for(user in users) {
        console.log("user: " + user)
        getUserRolesFromDynamoDB(user.email)
    }
}

