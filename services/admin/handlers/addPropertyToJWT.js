// import dynamoDb from "../../app-api/libs/dynamodb-lib"
// import { getUser } from "../../app-api/getUser";

const handler = async () => {
    // console.log("JWT claims before modification:", JSON.stringify(event));
    // const userEmail = event.request.userAttributes.email;
    // console.log("User email:", userEmail);

    // try {
    //     // Await the response from DynamoDB
    //     const user = await getUser(userEmail);
    //     console.log("***** USER", user);
    //     console.log("role list:::", user.roleList);

    //     // Assuming you want to use user.roleList in your claims
    //     if (user.roleList) {
    //         event.response = event.response || {};
    //         event.response.claimsOverrideDetails = event.response.claimsOverrideDetails || {};
    //         event.response.claimsOverrideDetails.claimsToAddOrOverride = event.response.claimsOverrideDetails.claimsToAddOrOverride || {};

    //         // Example of adding roles dynamically from DynamoDB to the JWT claims
    //         event.response.claimsOverrideDetails.claimsToAddOrOverride['user_roles'] = user.roleList; // Add user roles
    //     }

    // } catch (error) {
    //     console.error("Error retrieving user data:", error);
    //     // Handle the error appropriately, possibly with a default claim or error response
    // }

    // // Log modified claims
    // console.log("JWT claims after modification:", JSON.stringify(event));

    // return event;
};

export { handler };


// const handler = async (event) => {
//     console.log("JWT claims before modification:", JSON.stringify(event));
//     const userEmail = event.request.userAttributes.email;
//     console.log("User email:", userEmail);

//     await getUser(userEmail).then((user)=>{
//         console.log("***** USER", user)
//         console.log("role list:::", user.roleList)
//     });

//     // Proceed with modifying the claims if needed
//     // if (event.request.userAttributes['custom:cms_roles'] === 'statesystemadmin') {

//     event.response = event.response || {};
//     event.response.claimsOverrideDetails = event.response.claimsOverrideDetails || {};
//     event.response.claimsOverrideDetails.claimsToAddOrOverride = event.response.claimsOverrideDetails.claimsToAddOrOverride || {};
//     event.response.claimsOverrideDetails.claimsToAddOrOverride['user_type'] = 'admin';
//         // Add custom claim
//     // }

//     // Log modified claims
//     console.log("JWT claims after modification:", JSON.stringify(event));

//     return event;
// };

// export { handler };