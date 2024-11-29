const handler = async (event) => {

    console.log("JWT claims before modification:", JSON.stringify(event));

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