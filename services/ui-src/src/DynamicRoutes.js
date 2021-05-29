import React from "react";
import { Redirect } from "react-router-dom";
import { ROUTES, getUserRoleObj } from "cmscommonlib";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import { Signup } from "./containers/Signup";
import { StateSignup } from "./containers/StateSignup";
import Dashboard from "./containers/Dashboard";
import SubmissionSelection from "./containers/SubmissionSelection";
import UserManagement from "./containers/UserManagement";
import Spa from "./changeRequest/Spa";
import Waiver from "./changeRequest/Waiver";
import SpaRai from "./changeRequest/SpaRai";
import WaiverRai from "./changeRequest/WaiverRai";
import WaiverExtension from "./changeRequest/WaiverExtension";
import WaiverAppK from "./changeRequest/WaiverAppK";
import Metrics from "./containers/Metrics";
import { useAppContext } from "./libs/contextLib";
import ChipSpa from "./changeRequest/ChipSpa";
import ChipSpaRai from "./changeRequest/ChipSpaRai";

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
        <Redirect to={ROUTES.SIGNUP} />
      </>
    );
  }

  const userRoleObj = getUserRoleObj(type);

  return (
    <>
      <AuthenticatedRoute exact path={ROUTES.DASHBOARD}>
        {userRoleObj.canAccessDashboard ? (
          <Dashboard />
        ) : (
          <Redirect to={ROUTES.USER_MANAGEMENT} />
        )}
      </AuthenticatedRoute>
      {userRoleObj.canAccessDashboard && (
        <>
          <AuthenticatedRoute path={`${ROUTES.NEW_SUBMISSION_SELECTION}`}>
            <SubmissionSelection />
          </AuthenticatedRoute>
          <AuthenticatedRoute path={`${ROUTES.CHIP_SPA}/:id?/:userId?`}>
            <ChipSpa />
          </AuthenticatedRoute>
          <AuthenticatedRoute path={`${ROUTES.CHIP_SPA_RAI}/:id?/:userId?`}>
            <ChipSpaRai />
          </AuthenticatedRoute>
          <AuthenticatedRoute path={`${ROUTES.SPA}/:id?/:userId?`}>
            <Spa />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path={`${ROUTES.WAIVER}/:id?/:userId?`}>
            <Waiver />
          </AuthenticatedRoute>
          <AuthenticatedRoute path={`${ROUTES.SPA_RAI}/:id?/:userId?`}>
            <SpaRai />
          </AuthenticatedRoute>
          <AuthenticatedRoute path={`${ROUTES.WAIVER_RAI}/:id?/:userId?`}>
            <WaiverRai />
          </AuthenticatedRoute>
          <AuthenticatedRoute path={`${ROUTES.WAIVER_EXTENSION}/:id?/:userId?`}>
            <WaiverExtension />
          </AuthenticatedRoute>
          <AuthenticatedRoute
            exact
            path={`${ROUTES.WAIVER_APP_K}/:id?/:userId?`}
          >
            <WaiverAppK />
          </AuthenticatedRoute>
        </>
      )}
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
