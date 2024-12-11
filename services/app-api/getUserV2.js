import handler from "./libs/handler-lib";
import jwt_decode from "jwt-decode";
import {getUser} from "./getUser";
 
import { getUserRoleObj } from "cmscommonlib";

/**
 * returns the User Table entry who's id is this email
 * @param {String} userEmail User to return
 * @returns {Object} the User json object
 */


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
  console.log("get user invoked")
  const body = JSON.parse(event.body);
  console.log("body: ", body)
  const idToken = body.idToken;
  console.log("Received idToken:", idToken);
  if (!idToken) {
    console.log("idToken header is missing");
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "idToken event body missing" }),
    };
  }
  const decodedIdToken = jwt_decode(idToken);
  console.log("decoded id token: ", decodedIdToken);
  const idTokenEmail = decodedIdToken.email; 
  let userRoles = decodedIdToken.user_roles;

  if(!userRoles) {
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
    const queryUserRoleList = JSON.parse(userItem.roleList)
    const loggedInUserRoleList =  JSON.parse(loggedInUserItem.roleList); 
    const hasMatchingRoles = checkMatchingRoles(loggedInUserRoleList, queryUserRoleList);
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
  // const userItem = (await getUser(event.queryStringParameters.email)) ?? {};
  // if(idTokenEmail !== event.queryStringParameters.email) {
  //   let userRoles = decodedIdToken.user_roles;
  //   try {
  //     userRoles = JSON.parse(userRoles);
  //   } catch (error) {
  //     console.error('Error parsing user_roles:', error);
  //     userRoles = [];
  //   }
  //   const loggedInUserItem = await getUser(idTokenEmail)
  //   console.log("loggedInUserItem: ", loggedInUserItem)
  //   const loggedInUserRoleList =  JSON.parse(loggedInUserItem.roleList); 
  //   const queryUserRoleList = JSON.parse(userItem.roleList);
  //   const hasMatchingRoles = checkMatchingRoles(loggedInUserRoleList, queryUserRoleList);
  //   // const isAdminUser = checkAdminUser(userRoles);
  //   if(!hasMatchingRoles && !isAdminUser ) {
  //     console.log("permission denied");
  //     return {
  //       statusCode: 400,
  //       body: JSON.stringify({ error: "permission denied" }),
  //     };
  //   }
  // }
  // // userItem.validRoutes = getUserRoleObj(userItem.roleList).getAccesses();

  // return userItem;
});
