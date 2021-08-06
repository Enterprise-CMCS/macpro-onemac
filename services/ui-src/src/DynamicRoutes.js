import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

import { ROUTES, Package, getUserRoleObj } from "cmscommonlib";
import UserDataApi from "./utils/UserDataApi";

import AuthenticatedRoute from "./components/AuthenticatedRoute";
import { Signup } from "./containers/Signup";
import { StateSignup } from "./containers/StateSignup";
import { GroupAndDivision } from "./containers/GroupAndDivision";
import Dashboard from "./containers/Dashboard";
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
  [ROUTES.CHIP_SPA]: Package.TYPE.CHIP_SPA,
  [ROUTES.CHIP_SPA_RAI]: Package.TYPE.CHIP_SPA_RAI,
  [ROUTES.SPA]: Package.TYPE.SPA,
  [ROUTES.SPA_RAI]: Package.TYPE.SPA_RAI,
  [ROUTES.WAIVER]: Package.TYPE.WAIVER,
  [ROUTES.WAIVER_APP_K]: Package.TYPE.WAIVER_APP_K,
  [ROUTES.WAIVER_EXTENSION]: Package.TYPE.WAIVER_EXTENSION,
  [ROUTES.WAIVER_RAI]: Package.TYPE.WAIVER_RAI,
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
        <AuthenticatedRoute exact path={ROUTES.SIGNUP}>
          <Signup />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path={ROUTES.STATE_SIGNUP}>
          <StateSignup />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path={ROUTES.REVIEWER_SIGNUP}>
          <GroupAndDivision />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path={ROUTES.DASHBOARD}>
          <Redirect to={ROUTES.SIGNUP} />
        </AuthenticatedRoute>
      </>
    );
  }

  const userRoleObj = getUserRoleObj(type);

  return (
    <>
      <AuthenticatedRoute exact path={ROUTES.DASHBOARD}>
        {userRoleObj.canAccessDashboard ? (
          <Dashboard />
        ) : userRoleObj.canAccessUserManagement ? (
          <Redirect to={ROUTES.USER_MANAGEMENT} />
        ) : (
          <Redirect to={ROUTES.HOME} />
        )}
      </AuthenticatedRoute>
      {userRoleObj.canAccessForms && (
        <>
          <AuthenticatedRoute path={`${ROUTES.NEW_SUBMISSION_SELECTION}`}>
            <NewSubmission />
          </AuthenticatedRoute>
          <AuthenticatedRoute path={`${ROUTES.NEW_SPA}`}>
            <NewSPA />
          </AuthenticatedRoute>
          <AuthenticatedRoute path={`${ROUTES.NEW_WAIVER}`}>
            <NewWaiver />
          </AuthenticatedRoute>
        </>
      )}
      {/* submission view */}
      {userRoleObj.canAccessForms &&
        Object.entries(FORM_TYPES).map(([route, type]) => (
          <AuthenticatedRoute key={route} exact path={route}>
            <SubmissionForm changeRequestType={type} />
          </AuthenticatedRoute>
        ))}
      {/* read only view */}
      {userRoleObj.canAccessDashboard &&
        Object.entries(FORM_TYPES).map(([route, type]) => (
          <AuthenticatedRoute key={route} exact path={`${route}/:id/:userId`}>
            <SubmissionView changeRequestType={type} />
          </AuthenticatedRoute>
        ))}
      {userRoleObj.canAccessDashboard && (
        <AuthenticatedRoute exact path={`${ROUTES.PACKAGE}/:packageId`}>
          <PackageView />
        </AuthenticatedRoute>
      )}
      {userRoleObj.canAccessUserManagement && (
        <AuthenticatedRoute exact path={ROUTES.USER_MANAGEMENT}>
          <UserManagement />
        </AuthenticatedRoute>
      )}
      <AuthenticatedRoute exact path={ROUTES.PROFILE + "/:userId"}>
        <UserPage />
      </AuthenticatedRoute>
      {userRoleObj.canAccessMetrics && (
        <AuthenticatedRoute path={ROUTES.METRICS}>
          <Metrics />
        </AuthenticatedRoute>
      )}
    </>
  );
}
