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
  let counter = 0;
  let hasRolesCounter = 0;
  let noRolesCounter =0;
  do {
    const params = {
      UserPoolId: userPoolId,
      AttributesToGet: ['email'],
      PaginationToken: paginationToken
    };
    
    const listUsersResponse = await cognito.listUsers(params).promise();
    console.log(listUsersResponse.Users.length + " users found")

    for (const user of listUsersResponse.Users) {
      const emailAttribute = user.Attributes.find(attr => attr.Name === 'email');
      if (emailAttribute) {
        const userEmail = emailAttribute.Value;
        
        try {
          const externalUser = await getUser(userEmail);
          let roles = [""];
          let roleList;
          try{
            roleList = externalUser.roleList;
          }catch(error) {
            noRolesCounter ++
            console.log(userEmail + " has no roles");
          }
          if (roleList && roleList.length > 0 && roleList[0] != null) {
           roles = externalUser.roleList.map(role => role.role);
           hasRolesCounter ++;
          } else {
            console.log("user parsing error for user" + userEmail)
          }
          await updateUserAttribute(userPoolId, user.Username, roles);
        } catch (error) {
          console.error(`Error processing user ${userEmail}:`, error);
        }
      }
      counter++;
    }
    
    paginationToken = listUsersResponse.PaginationToken;
  } while (paginationToken);
  console.log(counter+ "users modified, "+ hasRolesCounter + "users had roles and "+ noRolesCounter + " users had no roles")
}


export const main = async () => {
    await processCognitoUsers().catch(console.error);
    console.log("function complete")
}

