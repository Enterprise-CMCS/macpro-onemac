import React, { useEffect, useMemo } from "react";
import { Redirect, useHistory } from "react-router-dom";

import { useAppContext } from "../libs/contextLib";
import { useSignupCallback } from "../libs/hooksLib";
import CardButton from "../components/cardButton";
import { RESPONSE_CODE } from "cmscommonlib";
import PageTitleBar from "../components/PageTitleBar";

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
  const [, onLoadHelpdesk] = useSignupCallback("helpdesk", createAttribute);
  useEffect(() => {
    if (onLoadHelpdesk) onLoadHelpdesk();
  }, [onLoadHelpdesk]);
  return null;
}

// `cmsRoles` is from OKTA and is a string containing comma-separated role names
const isStateUser = (cmsRoles) =>
  !!cmsRoles.split(",").includes("onemac-state-user");
const isCmsUser = (cmsRoles) =>
  !!cmsRoles.split(",").includes("onemac-cms-user");
const isHelpdeskUser = (cmsRoles) =>
  !!cmsRoles.split(",").includes("onemac-helpdesk");

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
          <HelpdeskSignup />
        </div>
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { passCode: RESPONSE_CODE.SYSTEM_ERROR }, // ALERTS_MSG.CONTACT_HELP_DESK },
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
      <PageTitleBar heading="Registration: User Role" />
      <div className="signup-container">
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
