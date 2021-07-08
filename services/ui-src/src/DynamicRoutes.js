import React from "react";
import { Redirect } from "react-router-dom";

import { ROUTES, ChangeRequest, getUserRoleObj } from "cmscommonlib";

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
  const { userProfile: { userData: { type } = {} } = {} } = useAppContext();

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
      {userRoleObj.canAccessUserManagement && (
        <AuthenticatedRoute exact path={ROUTES.USER_MANAGEMENT}>
          <UserManagement />
        </AuthenticatedRoute>
      )}
      {userRoleObj.canAccessMetrics && (
        <AuthenticatedRoute path={`${ROUTES.METRICS}`}>
          <Metrics />
        </AuthenticatedRoute>
      )}
    </>
  );
}
