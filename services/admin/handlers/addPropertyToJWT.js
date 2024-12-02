// import dynamoDb from "../../app-api/libs/dynamodb-lib"
import { getUser } from "../../app-api/getUser";


const handler = async (event) => {
    console.log("JWT claims before modification:", JSON.stringify(event));
    const userEmail = event.request.userAttributes.email;
    console.log("User email:", userEmail);x

    getUser(userEmail).then((user)=>{
        console.log("***** USER", user)
        console.log("role list:::", user.roleList)
    });

    // Proceed with modifying the claims if needed
    if (event.request.userAttributes['custom:cms_roles'] === 'statesystemadmin') {

        event.response = event.response || {};
        event.response.claimsOverrideDetails = event.response.claimsOverrideDetails || {};
        event.response.claimsOverrideDetails.claimsToAddOrOverride = event.response.claimsOverrideDetails.claimsToAddOrOverride || {};
        event.response.claimsOverrideDetails.claimsToAddOrOverride['user_type'] = 'admin';
        // Add custom claim
    }

    // Log modified claims
    console.log("JWT claims after modification:", JSON.stringify(event));

    return event;
};

export { handler };