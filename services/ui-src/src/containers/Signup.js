import React, { useEffect, useMemo ,useCallback} from "react";
import { Redirect, useHistory } from "react-router-dom";

import { ALERTS_MSG } from "../libs/alert-messages";
import { useAppContext } from "../libs/contextLib";
import { useSignupCallback } from "../libs/hooksLib";
import { AlertBar } from "../components/AlertBar";
import CardButton from "../components/cardButton";

const createAttribute = () => [{ status: "pending" }];

function CMSSignup() {
  const [loading, onClickCMS] = useSignupCallback(
    "cmsapprover",
    createAttribute
  );

  return (
    <CardButton loading={loading} onClick={onClickCMS} type="cmsapprover" />
  );
}
function HelpdeskSignup() {
  const [_,onLoadHelpdesk]=useSignupCallback("helpdesk",createAttribute);
  useEffect(() => {
    if(onLoadHelpdesk)onLoadHelpdesk();
  },[onLoadHelpdesk]);
  return null
}

// `cmsRoles` is from OKTA and is a string containing comma-separated role names
const isStateUser = (cmsRoles) =>
  !!cmsRoles.split(",").includes("onemac-state-user");
const isCmsUser = (cmsRoles) =>
  !!cmsRoles.split(",").includes("onemac-cms-user");
const isHelpdeskUser = (cmsRoles) =>
  !!cmsRoles.split(",").includes("onemac-helpdesk-user");

export function Signup() {
  const history = useHistory();
  const { userProfile: { cmsRoles = "", userData: { type } } = {} } =
    useAppContext() ?? {};

  const signupOptions = useMemo(
    () =>
      isStateUser(cmsRoles) ? (
        <>
          <div className="ds-l-col--6">
            <CardButton type="stateuser" />
          </div>
          <div className="ds-l-col--6">
            <CardButton type="stateadmin" />
          </div>
        </>
      ) : isCmsUser(cmsRoles) ? (
        <div className="ds-l-col--auto ds-u-margin-x--auto">
          <CMSSignup />
        </div>
      ) : isHelpdeskUser(cmsRoles) ? (
        <div className="ds-l-col--auto ds-u-margin-x--auto">
         <HelpdeskSignup/>
        </div>
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { showAlert: ALERTS_MSG.CONTACT_HELP_DESK },
          }}
        />
      ),
    [cmsRoles]
  );

  useEffect(() => {
    if (type) history.replace("/dashboard");
  }, [history, type]);

  return (
    <>
      <div className="page-title-bar" id="title_bar">
        <h2>Registration: User Role</h2>
      </div>
      <div className="signup-container">
        <AlertBar />
        <div className="signup-center">
          <p className="signup-prompt">
            Select the user role you're registering for.
          </p>
          <section className="signup-collapse-padding ds-l-container">
            <div className="signup-collapse-padding ds-l-row">
              {signupOptions}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
