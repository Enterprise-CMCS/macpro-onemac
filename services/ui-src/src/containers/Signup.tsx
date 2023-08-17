import React, { useEffect, useMemo } from "react";
import { Redirect } from "react-router-dom";

import { useAppContext } from "../libs/contextLib";
import { useSignupCallback } from "../libs/hooksLib";
import {
  USER_STATUS,
  USER_ROLE,
  RESPONSE_CODE,
  getUserRoleObj,
  ONEMAC_ROUTES,
  ROUTES,
} from "cmscommonlib";
import PageTitleBar from "../components/PageTitleBar";
import {
  MACFieldsetCard,
  MACFieldsetOption,
  MACFieldsetOptionsList,
} from "../components/MACCard";

const ignoreEventPayload = () => undefined;
const activeOrPending = new Set([USER_STATUS.ACTIVE, USER_STATUS.PENDING]);

function StateUserSignup() {
  const { userRole, userStatus } = useAppContext() ?? {};
  const STATE_CHOICES = [
    (userRole !== USER_ROLE.STATE_SUBMITTER ||
      !activeOrPending.has(userStatus!)) && {
      title: "State Submitter",
      description: "Responsible for submitting packages",
      linkTo: "/signup/state",
      state: { role: USER_ROLE.STATE_SUBMITTER },
    },
    (userRole !== USER_ROLE.STATE_SYSTEM_ADMIN ||
      !activeOrPending.has(userStatus!)) && {
      title: "State System Administrator",
      description: "Ability to approve state submitters and submit packages",
      linkTo: "/signup/state",
      state: { role: USER_ROLE.STATE_SYSTEM_ADMIN },
    },
  ].filter(Boolean);
  return (
    <MACFieldsetOptionsList choices={STATE_CHOICES as MACFieldsetOption[]} />
  );
}

function CMSSignup() {
  const { isLoggedInAsDeveloper, userRole, userStatus } = useAppContext() ?? {};
  const roleAccess = getUserRoleObj(USER_ROLE.CMS_ROLE_APPROVER);
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
        linkTo: "/signup/cmsreviewer",
      },
    (userRole !== USER_ROLE.CMS_ROLE_APPROVER ||
      !activeOrPending.has(userStatus!)) && {
      title: "CMS Role Approver",
      description:
        "Responsible for managing CMS Reviewers and State System Admins",
      linkTo: "/usermanagement",
      onClick: onClickCMS,
    },
  ].filter(Boolean);
  return (
    <MACFieldsetOptionsList choices={CMS_CHOICES as MACFieldsetOption[]} />
  );
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

const CMS_ROLES: USER_ROLE[] = [
  USER_ROLE.CMS_REVIEWER,
  USER_ROLE.CMS_ROLE_APPROVER,
  USER_ROLE.DEFAULT_CMS_USER,
  USER_ROLE.SYSTEM_ADMIN,
];

// `cmsRoles` is from OKTA and is a string containing comma-separated role names
const isStateUser = (cmsRoles: string) =>
  !!cmsRoles.split(",").includes("onemac-state-user");
const isCmsUser = (userRole: USER_ROLE | null | undefined) =>
  !userRole || CMS_ROLES.includes(userRole);
const isHelpdeskUser = (cmsRoles: string) =>
  !!cmsRoles.split(",").includes("onemac-helpdesk");

export function Signup() {
  const { userRole, userProfile: { cmsRoles = "" /*, userData = {}*/ } = {} } =
    useAppContext() ?? {};

  const signupOptions = useMemo(
    () =>
      isStateUser(cmsRoles) ? (
        <StateUserSignup />
      ) : isHelpdeskUser(cmsRoles) ? (
        <div className="ds-l-col--auto ds-u-margin-x--auto">
          <HelpdeskSignup />
        </div>
      ) : isCmsUser(userRole) ? (
        <CMSSignup />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { passCode: RESPONSE_CODE.SYSTEM_ERROR }, // ALERTS_MSG.CONTACT_HELP_DESK },
          }}
        />
      ),
    [cmsRoles, userRole]
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
      <MACFieldsetCard legend="Select the role for which you are registering.">
        {signupOptions}
      </MACFieldsetCard>
    </>
  );
}
