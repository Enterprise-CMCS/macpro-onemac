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
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { getApplicationNode } from "./utils";
import config from "./utils/config";
import { ROUTES } from "cmscommonlib";
import "core-js/stable";

let amplifyConfig = {
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    oauth: {
      domain: config.cognito.APP_CLIENT_DOMAIN,
      redirectSignIn: window.location.origin + ROUTES.DASHBOARD,
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

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  getApplicationNode()
);
