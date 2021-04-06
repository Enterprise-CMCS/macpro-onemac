import React from "react";
import { Redirect } from "react-router-dom";
import { ROLES, ROUTES } from "cmscommonlib";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import { Signup } from "./containers/Signup";
import { StateSignup } from "./containers/StateSignup";
import Dashboard from "./containers/Dashboard";
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

export default function DynamicRoutes() {
  const { userProfile } = useAppContext();

  if (userProfile) {
    if (userProfile.userData) {
      switch (userProfile.userData.type) {
        case ROLES.STATE_USER:
          return (
            <>
              <AuthenticatedRoute path={`${ROUTES.CHIP_SPA}/:id?`}>
                    <ChipSpa />
              </AuthenticatedRoute>
              <AuthenticatedRoute exact path={ROUTES.DASHBOARD}>
                <Dashboard />
              </AuthenticatedRoute>
              <AuthenticatedRoute path={`${ROUTES.SPA}/:id?`}>
                <Spa />
              </AuthenticatedRoute>
              <AuthenticatedRoute exact path={`${ROUTES.WAIVER}/:id?`}>
                <Waiver />
              </AuthenticatedRoute>
              <AuthenticatedRoute path={`${ROUTES.SPA_RAI}/:id?`}>
                <SpaRai />
              </AuthenticatedRoute>
              <AuthenticatedRoute path={`${ROUTES.WAIVER_RAI}/:id?`}>
                <WaiverRai />
              </AuthenticatedRoute>
              <AuthenticatedRoute path={`${ROUTES.WAIVER_EXTENSION}/:id?`}>
                <WaiverExtension />
              </AuthenticatedRoute>
              <AuthenticatedRoute exact path={`${ROUTES.WAIVER_APP_K}/:id?`}>
                <WaiverAppK />
              </AuthenticatedRoute>
              <AuthenticatedRoute path={`${ROUTES.METRICS}`}>
                <Metrics />
              </AuthenticatedRoute>
            </>
          );
        case ROLES.STATE_ADMIN:
          return (
            <>
              <AuthenticatedRoute exact path={ROUTES.USER_MANAGEMENT}>
                <UserManagement />
              </AuthenticatedRoute>
              <AuthenticatedRoute path={`${ROUTES.METRICS}`}>
                <Metrics />
              </AuthenticatedRoute>
            </>
          );
        case ROLES.CMS_APPROVER:
          return (
            <>
              <AuthenticatedRoute exact path={ROUTES.USER_MANAGEMENT}>
                <UserManagement />
              </AuthenticatedRoute>
              <AuthenticatedRoute path={`${ROUTES.METRICS}`}>
                <Metrics />
              </AuthenticatedRoute>
            </>
          );
        case ROLES.SYSTEM_ADMIN:
          return (
            <>
              <AuthenticatedRoute exact path={ROUTES.USER_MANAGEMENT}>
                <UserManagement />
              </AuthenticatedRoute>
              <AuthenticatedRoute path={`${ROUTES.METRICS}`}>
                <Metrics />
              </AuthenticatedRoute>
            </>
          );
        default:
          break;
      }
    }
  }
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
