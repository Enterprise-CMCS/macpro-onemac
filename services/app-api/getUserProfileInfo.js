import handler from "./libs/handler-lib";
import jwt_decode from "jwt-decode";
import {getUser} from "./getUser";
import { verifyIdToken } from "./tokenVerificationService";
import { getUserRoleObj } from "cmscommonlib";

/**
 * returns the User Table entry who's id is this email
 * @param {String} userEmail User to return
 * @returns {Object} the User json object
 */

const allowedRoles = [
  "cmsroleapprover",
  "systemadmin",
  "helpdesk",
  "defaultcmsuser",
  "cmsreviewer"
];

function checkMatchingRoles(arr1, arr2) {
  console.log("check matching roles called")
  // Iterate through each element in array1
  for (let i = 0; i<arr1.length; i++) {
    // Iterate through each element in array2
    for (let j = 0; j<arr2.length; j++) {
      // Check if both role and territory match
      if ((arr1[i]).territory === (arr2[j]).territory) {
        console.log("match found")
        return true; 
      }
    }
  }
  console.log("no match found")
  return false; // Return false if no match is found
}

function checkAdminUser(arr) {
  for (let i = 0; i < arr.length; i++) {        
    if (allowedRoles.includes(arr[i])) {
      console.log("admin user");
      return true;
    }
  }
  console.log("not an admin user");
  return false;
}

// Gets owns user data from User DynamoDB table
export const main = handler(async (event) => {
  const body = JSON.parse(event.body);
  const idToken = body.idToken;
  console.log("Received idToken:", idToken);
  const isIdTokenValid = await verifyIdToken(idToken);
  console.log("idtoken valid: "+ isIdTokenValid);
  if (!idToken || !isIdTokenValid) {
    console.log("idToken header is missing or invalid");
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "idToken event body missing or invalid" }),
    };
  }
  const decodedIdToken = jwt_decode(idToken);
  console.log("decoded id token: ", decodedIdToken);
  const idTokenEmail = decodedIdToken.email; 
  let userRoles = decodedIdToken["custom:user_roles"];
  console.log("user roles: " + userRoles)

  if(!userRoles) {
    console.log("no roles for user")
    const userItem = (await getUser(event.queryStringParameters.email)) ?? {};
    userItem.validRoutes = getUserRoleObj(userItem.roleList).getAccesses();
    return userItem;
  }
  
  try {
    userRoles = JSON.parse(userRoles);
  } catch (error) {
    console.error('Error parsing user_roles:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "no user roles for user: ", idTokenEmail}),
    };
  }
  console.log("id token email: ", idTokenEmail);
  console.log("event query email: ",event.queryStringParameters.email )
  if(checkAdminUser(userRoles) || idTokenEmail === event.queryStringParameters.email) {
    const userItem = (await getUser(event.queryStringParameters.email)) ?? {};
    userItem.validRoutes = getUserRoleObj(userItem.roleList).getAccesses();
    return userItem;
  } else {
    const userItem = (await getUser(event.queryStringParameters.email)) ?? {};
    const loggedInUserItem = await getUser(idTokenEmail);
    const hasMatchingRoles = await checkMatchingRoles(userItem.roleList, loggedInUserItem.roleList);
    if(!hasMatchingRoles) {
      console.log("permission denied");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "permission denied" }),
      } 
    } else {
      userItem.validRoutes = getUserRoleObj(userItem.roleList).getAccesses();
      return userItem;
    }
  }
});
