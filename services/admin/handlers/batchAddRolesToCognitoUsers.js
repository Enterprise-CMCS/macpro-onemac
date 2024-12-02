import AWS from 'aws-sdk';
import dynamoDb from "../../app-api/libs/dynamodb-lib"
// import { getUser } from "../../app-api/getUser";

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
    // console.log("roles for user emai: " + userEmail + " :::" + result.items);
    return result.Items ? result.Items: [];  // Assuming roles is an array
};

const processUsers = async () => {
    try {
        const users = await listUsers();  // Await the listUsers call to get all users
        for (const user of users) {
            console.log("User:", user.Username);  // Logging user info

            const userEmail = user.Attributes.find(attr => attr.Name === 'email')?.Value;  // Get the user's email

            if (userEmail) {
                // Fetch roles from DynamoDB for the user
                const roles = await getUserRolesFromDynamoDB(userEmail);
                console.log(`Roles for ${userEmail}:`, roles);
                
                // You can now use the roles to update Cognito user attributes or other processing.
            }
        }
    } catch (error) {
        console.error('Error processing users:', error);
    }
};



export const main = () => {
    processUsers();
}

