import jwt from 'jsonwebtoken';
import jwksClient  from 'jwks-rsa';
import handler from "./libs/handler-lib";

const userPoolId = process.env.userPoolId;
const region = process.env.region; 
const jwksUrl = 'https://cognito-idp.' + region +'.amazonaws.com/'+ userPoolId +'/.well-known/jwks.json';

// Function to get the signing key based on the JWT header
function getSigningKey(kid) {

// Initialize the JWKS client
const client = jwksClient({
    jwksUri: jwksUrl,
  });
  
console.log("jwksUrl: " + jwksUrl)
  return new Promise((resolve, reject) => {
    client.getSigningKey(kid, (err, key) => {
      if (err) {
        console.error("Error retrieving signing key: ", err);
        reject(err);
      }
      console.log("key recieved: ", key)
      const signingKey = key.publicKey || key.rsaPublicKey;
      resolve(signingKey);
    });
  });
}

// Function to verify the idToken and return true or false based on validity
export async function verifyIdToken(idToken)  {
  try {
    // Decode the token header to get the kid (key id)
    const decodedHeader = jwt.decode(idToken, { complete: true });
    if (!decodedHeader) {
      return false; // Invalid token (couldn't decode)
    }

    const kid = decodedHeader.header.kid;

    // Get the public key from the JWKS
    const signingKey = await getSigningKey(kid);

    // Verify the token using the public key and the algorithm (e.g., RS256)
    jwt.verify(idToken, signingKey, { algorithms: ['RS256'] });

    // If no error was thrown, the token is valid
    return true;
  } catch (err) {
    // If any error occurs (invalid signature, expired token, etc.), return false
    console.error('Error verifying idToken:', err);
    return false;
  }
}

// main method not being invoded as getUserProfileInfo calls verifyIdToken directly
export const main = handler(async (event) => {
    const idToken = event.idToken;
    verifyIdToken(idToken).then(isValid => {
        if (isValid) {
          console.log('idToken is valid');
          return true; 
        } else {
          console.log('idToken is invalid');
          return false;
        }
      });
  });


