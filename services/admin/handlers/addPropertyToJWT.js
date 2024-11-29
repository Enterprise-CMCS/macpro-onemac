exports.main = async (event) => {
    console.log("JWT claims before modification:", JSON.stringify(event));

    // Proceed with modifying the claims if needed
    if (event.request.userAttributes['custom:cms_roles'] === 'statesystemadmin') {

        event.response = event.response || {};
        event.response.claimsAndScopeOverrideDetails = event.response.claimsAndScopeOverrideDetails || {};
        event.response.claimsAndScopeOverrideDetails.idTokenGeneration = event.response.claimsAndScopeOverrideDetails.idTokenGeneration || {};
        event.response.claimsAndScopeOverrideDetails.idTokenGeneration.claimsToAddOrOverride = event.response.claimsAndScopeOverrideDetails.idTokenGeneration.claimsToAddOrOverride || {};

        // Add custom claim
        event.response.claimsAndScopeOverrideDetails.idTokenGeneration.claimsToAddOrOverride['user_type'] = 'admin';
    }

    // Log modified claims
    console.log("JWT claims after modification:", JSON.stringify(event));

    return event;
};