import React, { useEffect, useMemo } from "react";
import { Redirect, useHistory } from "react-router-dom";

import { useAppContext } from "../libs/contextLib";
import { useSignupCallback } from "../libs/hooksLib";
import { USER_TYPE, RESPONSE_CODE } from "cmscommonlib";
import PageTitleBar from "../components/PageTitleBar";
import ChoiceList from "../components/ChoiceList";

const ignoreEventPayload = () => undefined;

function StateUserSignup() {
  const history = useHistory();
  const STATE_CHOICES = [
    {
      title: "State Submitter",
      description: "Responsible for submitting packages",
      linkTo: "/state",
      onclick: () => {
        history.replace("signup/state", { role: USER_TYPE.STATE_SUBMITTER });
      },
    },
    {
      title: "State System Administrator",
      description: "Ability to approve state submitters and submit packages",
      linkTo: "/state",
      onclick: () => {
        history.replace("signup/state", { role: USER_TYPE.STATE_SYSTEM_ADMIN });
      },
    },
  ];
  return <ChoiceList choices={STATE_CHOICES} />;
}

function CMSSignup() {
  const { isLoggedInAsDeveloper } = useAppContext() ?? {};
  const [, onClickCMS] = useSignupCallback(
    USER_TYPE.CMS_ROLE_APPROVER,
    ignoreEventPayload
  );

  const CMS_CHOICES = [
    isLoggedInAsDeveloper && {
      title: "CMS Reviewer",
      description: "Responsible for reviewing packages",
      linkTo: "signup/cmsreviewer",
    },
    {
      title: "CMS Role Approver",
      description:
        "Responsible for managing CMS Reviewers and State System Admins",
      linkTo: "/usermanagement",
      onclick: onClickCMS,
    },
  ].filter(Boolean);
  return <ChoiceList choices={CMS_CHOICES} />;
}
function HelpdeskSignup() {
  const [, onLoadHelpdesk] = useSignupCallback(
    USER_TYPE.HELPDESK,
    ignoreEventPayload
  );
  useEffect(() => {
    onLoadHelpdesk?.({});
  }, [onLoadHelpdesk]);
  return null;
}

// `cmsRoles` is from OKTA and is a string containing comma-separated role names
const isStateUser = (cmsRoles: string) =>
  !!cmsRoles.split(",").includes("onemac-state-user");
const isCmsUser = (cmsRoles: string) =>
  !cmsRoles || !!cmsRoles.split(",").includes("onemac-cms-user");
const isHelpdeskUser = (cmsRoles: string) =>
  !!cmsRoles.split(",").includes("onemac-helpdesk");

export function Signup() {
  // const history = useHistory();
  const { userProfile: { cmsRoles = "" /*, userData = {}*/ } = {} } =
    useAppContext() ?? {};

  const signupOptions = useMemo(
    () =>
      isStateUser(cmsRoles) ? (
        <StateUserSignup />
      ) : isCmsUser(cmsRoles) ? (
        <CMSSignup />
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

  // useEffect(() => {
  //   if (type) history.replace("/dashboard");
  // }, [history, type]);

  // //<p className="signup-prompt">
  // Select the user role you're registering for.
  // </p>
  return (
    <>
      <PageTitleBar heading="Registration: User Role" />
      <div className="choice-container">
        <div className="choice-intro">
          Select the role for which you are registering.
        </div>
        {signupOptions}
      </div>
    </>
  );
}
