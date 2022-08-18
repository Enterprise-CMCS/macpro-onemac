import { Auth } from "aws-amplify";
import { AwsCognitoOAuthOpts } from "@aws-amplify/auth/lib-esm/types/Auth";

/**
 * Get the register URL depending on the current domain.
 * @returns the register URL
 */
export const getRegisterUrl = () => {
  const currentDomain = window.location.hostname;
  let registerUrl = "https://test.home.idm.cms.gov/";

  // TODO remove the 'spa.cms.gov' and 'spa-val.cms.gov' as options
  // after the rebrand has changed the domain to onemac
  if (currentDomain === "onemac.cms.gov" || currentDomain === "spa.cms.gov") {
    registerUrl = "https://home.idm.cms.gov/";
  } else if (
    currentDomain === "onemacval.cms.gov" ||
    currentDomain === "spa-val.cms.gov"
  ) {
    registerUrl = "https://impl.home.idm.cms.gov/";
  }

  return registerUrl;
};

/**
 * Get the sign in URL used with OKTA.
 * @returns the signin URL
 */
export function getSignInUrl() {
  const authConfig = Auth.configure();
  const { domain, redirectSignIn, responseType } =
    authConfig.oauth as AwsCognitoOAuthOpts;
  const clientId = authConfig.userPoolWebClientId;
  const url = `https://${domain}/oauth2/authorize?identity_provider=Okta&redirect_uri=${redirectSignIn}&response_type=${responseType}&client_id=${clientId}`;
  return url;
}

/**
 * Logout the user.
 */
export const logout = (isLoggedInAsDeveloper?: boolean) => {
  const authConfig = Auth.configure();
  Auth.signOut();
  if (isLoggedInAsDeveloper) {
    window.location.replace(
      (authConfig.oauth as AwsCognitoOAuthOpts).redirectSignOut
    );
  } else {
    window.location.href = getRegisterUrl();
  }
};
