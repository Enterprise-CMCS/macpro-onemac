
import { Auth } from "aws-amplify";

export async function checkUser() {

    try {
        const user = await Auth.currentAuthenticatedUser();
        //
        // TODO: Update cognito to allow profile info
        //
        console.log(JSON.stringify(user.signInUserSession.idToken.payload.email))
        console.log(JSON.stringify(user.signInUserSession.idToken.payload.family_name))
        console.log(JSON.stringify(user.signInUserSession.idToken.payload.given_name))
        return {
            authenticated: true,
            email: JSON.stringify(user.signInUserSession.idToken.payload.email),
            first_name: JSON.stringify(user.signInUserSession.idToken.payload.given_name),
            last_name: JSON.stringify(user.signInUserSession.idToken.payload.family_name)
        }
    } catch (error) {
        if (error !== "No current user") {
            console.log(
                "There was an error while loading the user information.",
                error
            );
        }
        return {
            authenticated: false,
            email: '',
            first_name: '',
            last_name: ''
        }

    }

}
