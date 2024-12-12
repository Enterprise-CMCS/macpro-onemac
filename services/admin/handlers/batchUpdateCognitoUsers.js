import AWS from "aws-sdk";
const cognito = new AWS.CognitoIdentityServiceProvider();
import { getUser } from "../../app-api/getUser";

async function updateUserAttribute(userPoolId, username, roles) {
    const params = {
      UserPoolId: userPoolId,
      Username: username,
      UserAttributes: [
        {
          Name: 'custom:user_roles',
          Value: JSON.stringify(roles)
        }
      ]
    };
    
    await cognito.adminUpdateUserAttributes(params).promise();
  }

async function processCognitoUsers() {
  const userPoolId = process.env.USER_POOL_ID;
  console.log("user pool id: ", userPoolId)
  let paginationToken = null;
  
  do {
    const params = {
      UserPoolId: userPoolId,
      AttributesToGet: ['email'],
      PaginationToken: paginationToken
    };
    
    const listUsersResponse = await cognito.listUsers(params).promise();
    
    for (const user of listUsersResponse.Users) {
      const emailAttribute = user.Attributes.find(attr => attr.Name === 'email');
      if (emailAttribute) {
        const userEmail = emailAttribute.Value;
        
        try {
          const externalUser = await getUser(userEmail);
          const roles = externalUser.roleList.map(role => role.role);
          
          await updateUserAttribute(userPoolId, user.Username, roles);
        } catch (error) {
          console.error(`Error processing user ${userEmail}:`, error);
        }
      }
    }
    
    paginationToken = listUsersResponse.PaginationToken;
  } while (paginationToken);
}


export const main = async () => {
    await processCognitoUsers().catch(console.error);
    console.log("function complete")
}

