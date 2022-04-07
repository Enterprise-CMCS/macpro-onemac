import React, { useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

import {
  ROUTES,
  ChangeRequest,
  Workflow,
  effectiveRoleForUser,
  getUserRoleObj,
} from "cmscommonlib";
import UserDataApi from "./utils/UserDataApi";

import { Signup } from "./containers/Signup";
import { StateSignup } from "./containers/StateSignup";
import { GroupAndDivision } from "./containers/GroupAndDivision";
import Dashboard from "./containers/Dashboard";
import PackageList from "./containers/PackageList";
import UserManagement from "./containers/UserManagement";
import { useAppContext } from "./libs/contextLib";
import Metrics from "./containers/Metrics";
import NewSubmission from "./changeRequest/NewSubmission";
import NewSPA from "./changeRequest/NewSPA";
import Triage from "./containers/Triage";
import NewWaiver from "./changeRequest/NewWaiver";
import OneMACForm from "./forms/OneMACForm";
import SubmissionForm from "./changeRequest/SubmissionForm";
import SubmissionView from "./changeRequest/SubmissionView";
import DetailView from "./changeRequest/DetailView";
import UserPage from "./containers/UserPage";

// this is legacy and should not be touched!
const FORM_TYPES = {
  [ROUTES.CHIP_SPA]: ChangeRequest.TYPE.CHIP_SPA,
  [ROUTES.CHIP_SPA_RAI]: ChangeRequest.TYPE.CHIP_SPA_RAI,
  [ROUTES.SPA]: ChangeRequest.TYPE.SPA,
  [ROUTES.SPA_RAI]: ChangeRequest.TYPE.SPA_RAI,
  [ROUTES.WAIVER]: ChangeRequest.TYPE.WAIVER,
  [ROUTES.WAIVER_APP_K]: ChangeRequest.TYPE.WAIVER_APP_K,
  [ROUTES.WAIVER_EXTENSION]: ChangeRequest.TYPE.WAIVER_EXTENSION,
  [ROUTES.WAIVER_RAI]: ChangeRequest.TYPE.WAIVER_RAI,
};

export default function DynamicRoutes() {
  const {
    isAuthenticated,
    userProfile: { cmsRoles = "", userData: { roleList = [] } = {} } = {},
  } = useAppContext() ?? {};
  const history = useHistory();

  useEffect(() => {
    (async function () {
      const authUser = await Auth.currentAuthenticatedUser();
      const email = authUser.signInUserSession.idToken.payload.email;
      const { roleList, validRoutes } = await UserDataApi.userProfile(email);

      if (effectiveRoleForUser(roleList) === null || !validRoutes) return;

      // Loop check for allowed route base path
      const isValidURLPath = validRoutes.some((item) =>
        history.location.pathname.startsWith(item)
      );

      if (!isValidURLPath) {
        history.push(ROUTES.HOME);
      }
    })();

    let mounted = true;

    // Drop to home if user not logged in
    if (!isAuthenticated && mounted) {
      history.push(ROUTES.HOME);
    }

    return function cleanup() {
      mounted = false;
    };
  });

  if (!isAuthenticated) {
    return (
      <Route path={ROUTES.DASHBOARD}>
        <Redirect to={ROUTES.HOME} />
      </Route>
    );
  }

  const signupRoutes = (
    <>
      <Route exact path={ROUTES.SIGNUP}>
        <Signup />
      </Route>
      <Route exact path={ROUTES.STATE_SIGNUP}>
        <StateSignup />
      </Route>
      <Route exact path={ROUTES.REVIEWER_SIGNUP}>
        <GroupAndDivision />
      </Route>
    </>
  );

  if (effectiveRoleForUser(roleList) === null && cmsRoles) {
    // This view is for users who have not YET registered but have a role from IDM
    return (
      <>
        {signupRoutes}
        <Route exact path={ROUTES.DASHBOARD}>
          <Redirect to={ROUTES.SIGNUP} />
        </Route>
        <Route exact path={ROUTES.PACKAGE_LIST}>
          <Redirect to={ROUTES.SIGNUP} />
        </Route>
      </>
    );
  }

  const userRoleObj = getUserRoleObj(roleList);

  return (
    <>
      {signupRoutes}
      <Route exact path={ROUTES.DASHBOARD}>
        {userRoleObj.canAccessDashboard ? (
          <Dashboard />
        ) : userRoleObj.canAccessUserManagement ? (
          <Redirect to={ROUTES.USER_MANAGEMENT} />
        ) : (
          <Redirect to={ROUTES.HOME} />
        )}
      </Route>
      <Route exact path={ROUTES.PACKAGE_LIST}>
        {userRoleObj.canAccessDashboard ? (
          <PackageList />
        ) : userRoleObj.canAccessUserManagement ? (
          <Redirect to={ROUTES.USER_MANAGEMENT} />
        ) : (
          <Redirect to={ROUTES.HOME} />
        )}
      </Route>
      <Route exact path={ROUTES.PACKAGE_LIST_WAIVER}>
        {userRoleObj.canAccessDashboard ? (
          <PackageList startTab={Workflow.PACKAGE_GROUP.WAIVER} />
        ) : userRoleObj.canAccessUserManagement ? (
          <Redirect to={ROUTES.USER_MANAGEMENT} />
        ) : (
          <Redirect to={ROUTES.HOME} />
        )}
      </Route>
      <Route exact path={ROUTES.PACKAGE_LIST_SPA}>
        {userRoleObj.canAccessDashboard ? (
          <PackageList startTab={Workflow.PACKAGE_GROUP.SPA} />
        ) : userRoleObj.canAccessUserManagement ? (
          <Redirect to={ROUTES.USER_MANAGEMENT} />
        ) : (
          <Redirect to={ROUTES.HOME} />
        )}
      </Route>
      {userRoleObj.canAccessForms && (
        <>
          <Route path={`${ROUTES.NEW_SUBMISSION_SELECTION}`}>
            <NewSubmission />
          </Route>
          <Route path={`${ROUTES.NEW_SPA}`}>
            <NewSPA />
          </Route>
          <Route path={`${ROUTES.NEW_WAIVER}`}>
            <NewWaiver />
          </Route>
          <Route path={`${ROUTES.TRIAGE_GROUP}`}>
            <Triage />
          </Route>
          <Route path={`${ROUTES.TRIAGE_SPA}`}>
            <Triage />
          </Route>
          <Route path={`${ROUTES.TRIAGE_WAIVER}`}>
            <Triage />
          </Route>
          <Route path={`${ROUTES.BASE_WAIVER}`}>
            <OneMACForm />
          </Route>
          <Route path={`${ROUTES.TEMPORARY_EXTENSION}`}>
            <OneMACForm />
          </Route>
        </>
      )}
      {/* submission view */}
      {userRoleObj.canAccessForms &&
        Object.entries(FORM_TYPES).map(([route, type]) => (
          <Route key={route} exact path={route}>
            <SubmissionForm changeRequestType={type} />
          </Route>
        ))}
      {/* read only view */}
      {userRoleObj.canAccessDashboard &&
        Object.entries(FORM_TYPES).map(([route, type]) => (
          <Route key={route} exact path={`${route}/:id/:userId`}>
            <SubmissionView changeRequestType={type} />
          </Route>
        ))}
      {userRoleObj.canAccessDashboard && (
        <>
          <Route exact path={ROUTES.DETAIL + "/:componentType/:componentId"}>
            <DetailView />
          </Route>
          <Route
            exact
            path={
              ROUTES.DETAIL + "/:componentType/:componentTimestamp/:componentId"
            }
          >
            <DetailView />
          </Route>
        </>
      )}
      <Route exact path={ROUTES.USER_MANAGEMENT}>
        {userRoleObj.canAccessUserManagement ? (
          <UserManagement />
        ) : userRoleObj.canAccessDashboard ? (
          <Redirect to={ROUTES.DASHBOARD} />
        ) : (
          <Redirect to={ROUTES.HOME} />
        )}
      </Route>
      <Route exact path={ROUTES.PROFILE + "/:userId"}>
        <UserPage />
      </Route>
      {userRoleObj.canAccessMetrics && (
        <Route path={ROUTES.METRICS}>
          <Metrics />
        </Route>
      )}
    </>
  );
}
