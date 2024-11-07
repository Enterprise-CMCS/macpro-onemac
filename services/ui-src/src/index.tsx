import React from "react";
import ReactDOM from "react-dom";
import "promise-polyfill/src/polyfill";
import "core-js/es/typed-array/uint32-array";
import "core-js/es/array/find";
import "core-js/es/object/assign";
import "core-js/es/object/entries";
import "core-js/es/array";
import "core-js/es/object";
import "isomorphic-fetch";
import "rsuite/dist/rsuite.min.css";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { getApplicationNode } from "./utils";
import config from "./utils/config";
import { ONEMAC_ROUTES } from "cmscommonlib";
import "core-js/stable";
import { withLDProvider } from 'launchdarkly-react-client-sdk';
const clientId = process.env.REACT_APP_LD_CLIENT_ID;

// Amplify configuration
let amplifyConfig = {
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    oauth: {
      domain: config.cognito.APP_CLIENT_DOMAIN,
      redirectSignIn: window.location.origin + ONEMAC_ROUTES.PACKAGE_LIST,
      redirectSignOut: window.location.origin,
      scope: ["email", "openid", "aws.cognito.signin.user.admin", "profile"],
      responseType: "token",
    },
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "oneMacAPI",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
};

Amplify.configure(amplifyConfig);

// Wrap your App component with withLDProvider
const LDProviderApp = withLDProvider({
  clientSideID: clientId ?? "undefined", // Make sure this is set correctly
  options: {
  // @ts-ignore
  streamUrl: "https://clientstream.launchdarkly.us",
  baseUrl: "https://clientsdk.launchdarkly.us",
  eventsUrl: "https://events.launchdarkly.us",
  }
})(App);

ReactDOM.render(
  <BrowserRouter>
    <LDProviderApp />
  </BrowserRouter>,
  getApplicationNode()
);