import { getUser } from "../../app-api/getUser";

const handler = async (event) => {
    console.log("JWT claims before modification:", JSON.stringify(event));
    try{
        const userEmail = event.request.userAttributes.email;
        const user = await getUser(userEmail);
        const roles = [];
        for (const role of user.roleList) {
            roles.push(role.role)
        }
        event.response = event.response || {};
        event.response.claimsOverrideDetails = event.response.claimsOverrideDetails || {};
        event.response.claimsOverrideDetails.claimsToAddOrOverride = event.response.claimsOverrideDetails.claimsToAddOrOverride || {};
    
        // Example of adding roles dynamically from DynamoDB to the JWT claims
        event.response.claimsOverrideDetails.claimsToAddOrOverride["custom:user_roles"] = JSON.stringify(roles); // Add user roles
    } catch(e) {
        console.log("error updating id token claims", e)
    }
    console.log("JWT claims after modification:", JSON.stringify(event));
    return event;
};

export { handler };
