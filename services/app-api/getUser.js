import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import jwt_decode from "jwt-decode";

import { getUserRoleObj } from "cmscommonlib";

/**
 * returns the User Table entry who's id is this email
 * @param {String} userEmail User to return
 * @returns {Object} the User json object
 */
export const getUser = async (userEmail) => {
  const cParams = {
    TableName: process.env.oneMacTableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    Key: {
      pk: userEmail.toLowerCase(),
      sk: "ContactInfo",
    },
    ProjectionExpression: "email, fullName, phoneNumber",
  };

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
  let cResult;

  try {
    cResult = await dynamoDb.get(cParams);

    result = await dynamoDb.query(params);

    if (!result.Items) {
      result = setTimeout(await dynamoDb.query(params), 1500);
    }
  } catch (dbError) {
    console.log(`Error happened while reading from DB:  ${dbError}`);
    throw dbError;
  }

  if (!cResult.Item) {
    console.log(
      `The user does not exist with the id: %s in the User table`,
      userEmail,
      cResult
    );
    return null;
  }

  const returnUser = cResult.Item;
  returnUser.roleList = result.Items;
  console.log(`Selected User ${userEmail}: ${JSON.stringify(returnUser)}`);
  return returnUser;
};

const allowedRoles = [
  "cmsroleapprover",
  "systemadmin",
  "statesystemadmin",
  "helpdesk",
  "defaultcmsuser",
  "cmsreviewer"
];

function checkMatchingRoles(arr1, arr2) {
  // Iterate through each element in array1
  for (let i = 0; i<arr1.length; i++) {
    // Iterate through each element in array2
    for (let j = 0; j<arr2.length; j++) {
      // Check if both role and territory match
      if (arr1[i].role === "active" && arr2[j].role === "active" && arr1[i].territory === arr2[j].territory) {
        console.log("match found")
        return true; 
      }
    }
  }
  return false; // Return false if no match is found
}

function checkAdminUser(arr) {
  for (let i = 0; i < arr.length; i++) {        
    if (allowedRoles.includes(arr[i])) {
      console.log("not an admin user");
      return true;
    }
  }
  console.log("not an admin user");
  return false;
}




// Gets owns user data from User DynamoDB table
export const main = handler(async (event) => {
  const idToken = event.headers["xidToken"];
  console.log("Received idToken:", idToken);
  if (!idToken) {
    console.log("idToken header is missing");
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "idToken header is missing" }),
    };
  }

  const decodedIdToken = jwt_decode(idToken);
  const idTokenEmail = decodedIdToken.email; 
  console.log("id token email: ", idTokenEmail);
  const userItem = (await getUser(event.queryStringParameters.email)) ?? {};

  if(idTokenEmail !== event.queryStringParameters.email) {
    let userRoles = decodedIdToken.user_roles;
    try {
      userRoles = JSON.parse(userRoles);
    } catch (error) {
      console.error('Error parsing user_roles:', error);
      userRoles = [];
    }
    const loggedInUserItem = await getUser(idTokenEmail)
    console.log("loggedInUserItem: ", loggedInUserItem)
    const loggedInUserRoleList =  loggedInUserItem.roleList; 
    const queryUserRoleList = userItem.roleList;
    const hasMatchingRoles = checkMatchingRoles(loggedInUserRoleList, queryUserRoleList);
    const isAdminUser = checkAdminUser(userRoles);
    if(!hasMatchingRoles && !isAdminUser ) {
      console.log("permission denied");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "permission denied" }),
      };
    }
  }
  userItem.validRoutes = getUserRoleObj(userItem.roleList).getAccesses();

  return userItem;
});
