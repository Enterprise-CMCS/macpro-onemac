import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import handler from './libs/handler-lib';

// Function to get the signing key based on the JWT header
function getSigningKey(kid, jwksUrl) {
  console.log("jwksUrl: " + jwksUrl);
  return new Promise((resolve, reject) => {
    const client = jwksClient({
      jwksUri: jwksUrl,
    });

    client.getSigningKey(kid, (err, key) => {
      if (err) {
        console.error("Error retrieving signing key: ", err);
        reject(err);
      }
      console.log("kid used to search: ", kid);
      console.log("key received: ", key);
      const signingKey = key.publicKey || key.rsaPublicKey;
      resolve(signingKey);
    });
  });
}

// Function to verify the idToken and return true or false based on validity
export async function verifyIdToken(idToken) {
  console.log("verify ID token called");
  try {
    // Decode the token header to get the kid (key id)
    const decodedHeader = jwt.decode(idToken, { complete: true });
    if (!decodedHeader) {
      return false; // Invalid token (couldn't decode)
    }

    const kid = decodedHeader.header.kid;

    // Get environment variables inside the function
    const userPoolId = process.env.cognitoUserPoolId;
    const region = process.env.region;
    const jwksUrl = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;

    // Get the public key from the JWKS
    const signingKey = await getSigningKey(kid, jwksUrl);

    // Verify the token using the public key and the algorithm (e.g., RS256)
    jwt.verify(idToken, signingKey, { algorithms: ['RS256'] });

    // If no error was thrown, the token is valid
    return true;
  } catch (err) {
    // If any error occurs (invalid signature, expired token, etc.), return false
    console.error("Error verifying idToken:", err);
    return false;
  }
}

export const main = handler(async (event) => {
  // Ensure you're logging the environment variables to confirm they're being read correctly
  const userPoolId = process.env.cognitoUserPoolId;
  const region = process.env.region;
  console.log("userPool Id: " + userPoolId);
  console.log("region: " + region);

  const idToken = event.idToken;
  console.log("verify idToken: " + idToken);

  verifyIdToken(idToken).then((isValid) => {
    if (isValid) {
      console.log("idToken is valid");
      return true;
    } else {
      console.log("idToken is invalid");
      return false;
    }
  });
});




// import AWS from "aws-sdk";
// const cognito = new AWS.CognitoIdentityServiceProvider();
// import { getUser } from "../../app-api/getUser";

// async function updateUserAttribute(userPoolId, username, roles) {
//     const params = {
//       UserPoolId: userPoolId,
//       Username: username,
//       UserAttributes: [
//         {
//           Name: 'custom:user_roles',
//           Value: JSON.stringify(roles)
//         }
//       ]
//     };
    
//     await cognito.adminUpdateUserAttributes(params).promise();
//   }

// async function processCognitoUsers() {
//   const userPoolId = process.env.USER_POOL_ID;
//   console.log("user pool id: ", userPoolId)
//   let paginationToken = null;
//   let counter = 0;
//   let hasRolesCounter = 0;
//   let noRolesCounter =0;
//   do {
//     const params = {
//       UserPoolId: userPoolId,
//       AttributesToGet: ['email'],
//       PaginationToken: paginationToken
//     };
    
//     const listUsersResponse = await cognito.listUsers(params).promise();
//     console.log(listUsersResponse.Users.length + " users found")

//     for (const user of listUsersResponse.Users) {
//       const emailAttribute = user.Attributes.find(attr => attr.Name === 'email');
//       if (emailAttribute) {
//         const userEmail = emailAttribute.Value;
        
//         try {
//           const externalUser = await getUser(userEmail);
//           let roles = [""];
//           let roleList;
//           try{
//             roleList = externalUser.roleList;
//           }catch(error) {
//             noRolesCounter ++
//             console.log(userEmail + " has no roles");
//           }
//           if (roleList && roleList.length > 0 && roleList[0] != null) {
//            roles = externalUser.roleList.map(role => role.role);
//            hasRolesCounter ++;
//           } else {
//             console.log("user parsing error for user" + userEmail)
//           }
//           await updateUserAttribute(userPoolId, user.Username, roles);
//         } catch (error) {
//           console.error(`Error processing user ${userEmail}:`, error);
//         }
//       }
//       counter++;
//     }
    
//     paginationToken = listUsersResponse.PaginationToken;
//   } while (paginationToken);
//   console.log(counter+ "users modified, "+ hasRolesCounter + "users had roles and "+ noRolesCounter + " users had no roles")
// }


// export const main = async () => {
//     await processCognitoUsers().catch(console.error);
//     console.log("function complete")
// }

