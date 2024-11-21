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
export const logout = async () => {
  const authConfig = Auth.configure();
  try {
    await Auth.signOut();
    window.location.replace(
      (authConfig.oauth as AwsCognitoOAuthOpts).redirectSignOut
    );
  } catch (error) {
    console.log("signout error: ", error);
  }
};

export async function getNewSession() {
  console.log("get session called")
  try {
    // Get the current session
    const session = await Auth.currentSession();

    console.log("session: " + session);
    
    // The session contains access, id, and refresh tokens
    const refreshToken = session.getRefreshToken();
    const accessToken = session.getAccessToken();
    const idToken = session.getIdToken();

    const accessTokenKey: string[] = Object.keys(localStorage).filter((k) =>
      k.includes("accessToken")
    );
    const loginAccessToken: string | null =
    accessTokenKey && localStorage.getItem(accessTokenKey[0]);
    if (!loginAccessToken) return;

    const refreshTokenKey: string[] = Object.keys(localStorage).filter((k) =>
      k.includes("refreshToken")
    );
    const loginRefreshToken: string | null =
    accessTokenKey && localStorage.getItem(refreshTokenKey[0]);
    if (!loginRefreshToken) return;

    const idTokenKey: string[] = Object.keys(localStorage).filter((k) =>
      k.includes("idToken")
    );
    const loginIdToken: string | null =
    accessTokenKey && localStorage.getItem(idTokenKey[0]);
    if (!loginIdToken) return;

    if(accessToken.getJwtToken() !== loginAccessToken) {
      console.log("new access token")
      localStorage.setItem(accessTokenKey[0], loginAccessToken)
    } else {
      console.log("access tokens match")
    }

    if(refreshToken.getToken() !== loginRefreshToken) {
      console.log("new refresh token")
      localStorage.setItem(refreshTokenKey[0], loginRefreshToken)
    } else {
      console.log("refresh tokens match")
    }

    if(idToken.getJwtToken() !== loginIdToken) {
      console.log("new id token")
      localStorage.setItem(idTokenKey[0], loginIdToken)
    } else {
      console.log("id tokens match")
    }

    return accessToken.getJwtToken(); 
  } catch (error) {
    console.error("Error getting session", error);
  }
}