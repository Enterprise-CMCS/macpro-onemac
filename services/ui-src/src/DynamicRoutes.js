import React, { useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

import { ROUTES, ChangeRequest, getUserRoleObj } from "cmscommonlib";
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
import NewWaiver from "./changeRequest/NewWaiver";
import SubmissionForm from "./changeRequest/SubmissionForm";
import SubmissionView from "./changeRequest/SubmissionView";
import PackageView from "./changeRequest/PackageView";
import UserPage from "./containers/UserPage";

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
  const { isAuthenticated, userProfile: { userData: { type } = {} } = {} } =
    useAppContext();
  const history = useHistory();

  async function checkRoute() {
    let isValidURLPath = false;
    const authUser = await Auth.currentAuthenticatedUser();
    const email = authUser.signInUserSession.idToken.payload.email;
    const userData = await UserDataApi.userProfile(email);

    if (userData.type !== undefined && userData.validRoutes !== undefined) {
      const roleRoutes = userData.validRoutes;

      // Loop check for allowed route base path
      roleRoutes.forEach(checkBaseURLPath);

      function checkBaseURLPath(item) {
        let currentPath = document.location.pathname.substring(0, item.length);
        if (item === currentPath) {
          isValidURLPath = true;
        }
      }
      if (!isValidURLPath) {
        history.push(ROUTES.HOME);
        return;
      }
    }
  }

  useEffect(() => {
    let mounted = true;

    checkRoute();
    // Drop to home if user not logged in
    if (!isAuthenticated && mounted) {
      history.push(ROUTES.HOME);
    }
    return function cleanup() {
      mounted = false;
    };
  });

  if (!type) {
    return (
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
        <Route exact path={ROUTES.DASHBOARD}>
          <Redirect to={ROUTES.SIGNUP} />
        </Route>
      </>
    );
  }

  const userRoleObj = getUserRoleObj(type);

  return (
    <>
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
        <Route exact path={ROUTES.PACKAGE + "/:packageType/:packageId"}>
          <PackageView />
        </Route>
      )}
      {userRoleObj.canAccessUserManagement && (
        <Route exact path={ROUTES.USER_MANAGEMENT}>
          <UserManagement />
        </Route>
      )}
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
