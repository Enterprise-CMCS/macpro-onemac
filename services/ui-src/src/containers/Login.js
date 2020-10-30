
import { Auth } from "aws-amplify";

export function signInWithOkta() {
    const authConfig = Auth.configure();
    const {
        domain,
        redirectSignIn,
        responseType
    } = authConfig.oauth;
    const clientId = authConfig.userPoolWebClientId;
    const url = `https://${domain}/oauth2/authorize?identity_provider=Okta&redirect_uri=${redirectSignIn}&response_type=${responseType}&client_id=${clientId}`;
    window.location.assign(url);
}
