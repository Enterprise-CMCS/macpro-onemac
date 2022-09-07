import React, { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";

import { useAppContext } from "../libs/contextLib";
import { useSignupCallback } from "../libs/hooksLib";
import { USER_STATUS, USER_ROLE } from "cmscommonlib";
import PageTitleBar from "../components/PageTitleBar";
import ChoiceList from "../components/ChoiceList";

const ignoreEventPayload = () => undefined;
const activeOrPending = new Set([USER_STATUS.ACTIVE, USER_STATUS.PENDING]);

function StateUserSignup() {
  const history = useHistory();
  const { userRole, userStatus } = useAppContext() ?? {};
  const STATE_CHOICES = [
    (userRole !== USER_ROLE.STATE_SUBMITTER ||
      !activeOrPending.has(userStatus!)) && {
      title: "State Submitter",
      description: "Responsible for submitting packages",
      linkTo: "/state",
      onclick: () => {
        history.replace("signup/state", { role: USER_ROLE.STATE_SUBMITTER });
      },
    },
    (userRole !== USER_ROLE.STATE_SYSTEM_ADMIN ||
      !activeOrPending.has(userStatus!)) && {
      title: "State System Administrator",
      description: "Ability to approve state submitters and submit packages",
      linkTo: "/state",
      onclick: () => {
        history.replace("signup/state", {
          role: USER_ROLE.STATE_SYSTEM_ADMIN,
        });
      },
    },
  ].filter(Boolean);
  return <ChoiceList choices={STATE_CHOICES} />;
}

function CMSSignup() {
  const { isLoggedInAsDeveloper, userRole, userStatus } = useAppContext() ?? {};
  const [, onClickCMS] = useSignupCallback(
    USER_ROLE.CMS_ROLE_APPROVER,
    ignoreEventPayload
  );

  const CMS_CHOICES = [
    isLoggedInAsDeveloper &&
      (userRole !== USER_ROLE.CMS_REVIEWER ||
        !activeOrPending.has(userStatus!)) && {
        title: "CMS Reviewer",
        description: "Responsible for reviewing packages",
        linkTo: "signup/cmsreviewer",
      },
    (userRole !== USER_ROLE.CMS_ROLE_APPROVER ||
      !activeOrPending.has(userStatus!)) && {
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
    USER_ROLE.HELPDESK,
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
const isHelpdeskUser = (cmsRoles: string) =>
  !!cmsRoles.split(",").includes("onemac-helpdesk");

export function Signup() {
  const { userProfile: { cmsRoles = "" /*, userData = {}*/ } = {} } =
    useAppContext() ?? {};

  const signupOptions = useMemo(
    () =>
      isStateUser(cmsRoles) ? (
        <StateUserSignup />
      ) : isHelpdeskUser(cmsRoles) ? (
        <div className="ds-l-col--auto ds-u-margin-x--auto">
          <HelpdeskSignup />
        </div>
      ) : (
        <CMSSignup />
      ),
    [cmsRoles]
  );

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
