import React, { useEffect, useMemo } from "react";
import { Redirect, useHistory } from "react-router-dom";

import { useAppContext } from "../libs/contextLib";
import { useSignupCallback } from "../libs/hooksLib";
import { RESPONSE_CODE } from "cmscommonlib";
import PageTitleBar from "../components/PageTitleBar";
import ChoiceList from "../components/ChoiceList"


const createAttribute = () => [{ status: "pending" }];


function StateUserSignup() {
  const history = useHistory();
  const STATE_CHOICES = [
  
    {
      title: "State Submitter",
      description: "Responsible for submitting packages",
      linkTo: "/state",
      onclick: ()=>{history.replace("signup/state", {"role": "stateuser"})}
    },
    {
      title: "State System Administrator",
      description: "Approves State Submitters",
      linkTo: "/state",
      onclick: ()=>{history.replace("signup/state", {"role": "stateadmin"})}
    }
  ];
  return (
     <ChoiceList choices={STATE_CHOICES} />
  );
}

 function CMSSignup() {
  const [_, onClickCMS] = useSignupCallback(
    "cmsapprover",
    createAttribute
  );

  const CMS_CHOICES = [
    {
      title: "CMS Reviewer",
      description: "Responsible for reviewing packages",
      linkTo: "signup/cmsreviewer",
    },
    {
      title: "CMS Role Approver",
      description: "Responsible for managing CMS Reviewers and State System Admins",
      linkTo: "/usermanagement",
      onclick:onClickCMS,
    }
  ];
  return (
     <ChoiceList choices={CMS_CHOICES} />
  );
}
function HelpdeskSignup() {
  const [dummy, onLoadHelpdesk] = useSignupCallback(
    "helpdesk",
    createAttribute
  );
  useEffect(() => {
    if (onLoadHelpdesk) onLoadHelpdesk();
  }, [onLoadHelpdesk]);
  console.log("Dummy is: ", dummy);
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

  useEffect(() => {
    if (type) history.replace("/dashboard");
  }, [history, type]);


  // //<p className="signup-prompt">
  // Select the user role you're registering for.
  // </p>
  return (
    <>
      <PageTitleBar heading="Registration: User Role" />
      <div className="choice-container">
        <div className="choice-intro">
        Select the user role you're registering for.
        </div>
        {signupOptions}
      </div>
    </>
  );
}
