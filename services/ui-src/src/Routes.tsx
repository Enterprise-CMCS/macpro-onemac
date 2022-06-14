// Please refer to this post for more information on our routing approach and a
// detailed walkthrough of how it works
// https://www.ryanjyost.com/react-routing/

import React, { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import {
  ChangeRequest,
  ROUTES,
  ONEMAC_ROUTES,
  UserRole,
  effectiveRoleForUser,
  getUserRoleObj,
} from "cmscommonlib";

import Home from "./containers/Home";
import FAQ from "./containers/FAQ";
import { AttachmentLanding } from "./containers/AttachmentLanding";
import NotFound from "./containers/NotFound";
import Dashboard from "./containers/Dashboard";
import DetailView from "./containers/DetailView";
import DevLogin from "./containers/DevLogin";
import Metrics from "./containers/Metrics";
import NewSubmission from "./changeRequest/NewSubmission";
import NewSPA from "./changeRequest/NewSPA";
import NewWaiver from "./changeRequest/NewWaiver";
import PackageList from "./containers/PackageList";
import { Signup } from "./containers/Signup";
import { StateSignup } from "./containers/StateSignup";
import { GroupAndDivision } from "./containers/GroupAndDivision";
import SubmissionForm from "./changeRequest/SubmissionForm";
import SubmissionView from "./changeRequest/SubmissionView";
import Triage from "./containers/Triage";
import UserManagement from "./containers/UserManagement";
import UserPage from "./containers/UserPage";
import { useAppContext } from "./libs/contextLib";
import BaseWaiverForm from "./page/base-waiver/BaseWaiverForm";
import TemporaryExtensionForm from "./page/temporary-extension/TemporaryExtensionForm";
import MedicaidSpaForm from "./page/medicaid-spa/MedicaidSpaForm";
import ChipSpaForm from "./page/chip-spa/ChipSpaForm";

// this is legacy and should not be touched!
const FORM_TYPES = {
  [ROUTES.CHIP_SPA]: ChangeRequest.TYPE.CHIP_SPA,
  [ROUTES.CHIP_SPA_RAI]: ChangeRequest.TYPE.CHIP_SPA_RAI,
  [ROUTES.MEDICAID_SPA]: ChangeRequest.TYPE.MEDICAID_SPA,
  [ROUTES.MEDICAID_SPA_RAI]: ChangeRequest.TYPE.MEDICAID_SPA_RAI,
  [ROUTES.WAIVER]: ChangeRequest.TYPE.WAIVER,
  [ROUTES.WAIVER_APP_K]: ChangeRequest.TYPE.WAIVER_APP_K,
  [ROUTES.WAIVER_EXTENSION]: ChangeRequest.TYPE.WAIVER_EXTENSION,
  [ROUTES.WAIVER_RAI]: ChangeRequest.TYPE.WAIVER_RAI,
};

type RouteSpec = {
  path: string;
  component: any;
  key?: string;
  exact?: boolean;
  routes?: RouteSpec[];
};

const RouteWithSubRoutes: FC<RouteSpec> = (route) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={(props) => <route.component {...props} routes={route.routes} />}
  />
);

const RouteListRenderer: FC<{ routes: RouteSpec[] }> = ({ routes }) => (
  <Switch>
    {routes.map((routeSpec) => (
      <RouteWithSubRoutes
        key={routeSpec.key ?? routeSpec.path}
        {...routeSpec}
      />
    ))}
    <Route component={NotFound} />
  </Switch>
);

const AuthenticatedRouteListRenderer: FC<{ routes: RouteSpec[] }> = ({
  routes,
}) =>
  useAppContext()?.isAuthenticated ? (
    <RouteListRenderer routes={routes} />
  ) : (
    <Redirect to={ROUTES.HOME} />
  );

const SignupGuardRouteListRenderer: FC<{ routes: RouteSpec[] }> = ({
  routes,
}) => {
  const {
    isAuthenticated,
    userProfile: { cmsRoles = "", userData: { roleList = [] } = {} } = {},
  } = useAppContext() ?? {};

  if (!isAuthenticated) return <Redirect to={ROUTES.HOME} />;
  if (effectiveRoleForUser(roleList) === null && cmsRoles)
    return <Redirect to={ROUTES.SIGNUP} />;

  return <RouteListRenderer routes={routes} />;
};

const accessGuardRouteListRenderer: (
  accessKey: keyof UserRole,
  redirectAccessKey?: keyof UserRole,
  redirectTo?: string
) => FC<{ routes: RouteSpec[] }> =
  (accessKey, redirectAccessKey, redirectTo) =>
  ({ routes }) => {
    const { userProfile: { userData: { roleList = [] } = {} } = {} } =
      useAppContext() ?? {};
    const roleObj = getUserRoleObj(roleList);

    if (roleObj[accessKey]) return <RouteListRenderer routes={routes} />;
    if (redirectAccessKey && redirectTo && roleObj[redirectAccessKey])
      return <Redirect to={redirectTo} />;
    return <NotFound />;
  };

const ROUTE_LIST: RouteSpec[] = [
  { path: ROUTES.HOME, exact: true, component: Home },
  { path: ROUTES.FAQ, exact: true, component: FAQ },
  { path: ROUTES.DEVLOGIN, exact: true, component: DevLogin },
  {
    path: ROUTES.PROFILE,
    component: AuthenticatedRouteListRenderer,
    routes: [
      {
        path: ROUTES.PROFILE,
        exact: true,
        component: UserPage,
      },
      {
        path: ROUTES.PROFILE + "/:userId",
        exact: true,
        component: UserPage,
      },
    ],
  },
  {
    path: ROUTES.SIGNUP,
    component: AuthenticatedRouteListRenderer,
    routes: [
      { path: ROUTES.SIGNUP, exact: true, component: Signup },
      { path: ROUTES.STATE_SIGNUP, exact: true, component: StateSignup },
      {
        path: ROUTES.REVIEWER_SIGNUP,
        exact: true,
        component: GroupAndDivision,
      },
    ],
  },
  // dashboards, including user management
  ...[
    {
      path: ROUTES.USER_MANAGEMENT,
      accessKey: "canAccessUserManagement",
      redirectAccessKey: "canAccessDashboard",
      redirectTo: ROUTES.DASHBOARD,
      component: UserManagement,
    },
    {
      path: ROUTES.DASHBOARD,
      accessKey: "canAccessDashboard",
      redirectAccessKey: "canAccessUserManagement",
      redirectTo: ROUTES.USER_MANAGEMENT,
      component: Dashboard,
    },
    {
      path: ONEMAC_ROUTES.PACKAGE_LIST,
      accessKey: "canAccessDashboard",
      redirectAccessKey: "canAccessUserManagement",
      redirectTo: ROUTES.USER_MANAGEMENT,
      component: PackageList,
    },
  ].map(({ path, accessKey, redirectAccessKey, redirectTo, component }) => ({
    path,
    component: SignupGuardRouteListRenderer,
    routes: [
      {
        path,
        component: accessGuardRouteListRenderer(
          accessKey as keyof UserRole,
          redirectAccessKey as keyof UserRole,
          redirectTo
        ),
        routes: [{ path, exact: true, component }],
      },
    ],
  })),
  // legacy triage screens, plus current OneMACForm forms
  ...[
    { path: ROUTES.NEW_SUBMISSION_SELECTION, component: NewSubmission },
    { path: ROUTES.NEW_SPA, component: NewSPA },
    { path: ROUTES.NEW_WAIVER, component: NewWaiver },
    { path: ONEMAC_ROUTES.MEDICAID_SPA, component: MedicaidSpaForm },
    { path: ONEMAC_ROUTES.CHIP_SPA, component: ChipSpaForm },
    { path: ONEMAC_ROUTES.BASE_WAIVER, component: BaseWaiverForm },
    {
      path: ONEMAC_ROUTES.TEMPORARY_EXTENSION,
      component: TemporaryExtensionForm,
    },
  ].map(({ path, ...rest }) => ({
    path,
    component: AuthenticatedRouteListRenderer,
    routes: [
      {
        path,
        component: accessGuardRouteListRenderer("canAccessForms"),
        routes: [{ path, exact: true, ...rest }],
      },
    ],
  })),
  // legacy detail views and forms
  ...Object.entries(FORM_TYPES).map(([path, type]) => ({
    path,
    component: AuthenticatedRouteListRenderer,
    routes: [
      {
        path,
        exact: true,
        component: accessGuardRouteListRenderer("canAccessForms"),
        routes: [
          {
            path,
            exact: true,
            component: () => <SubmissionForm changeRequestType={type} />,
          },
        ],
      },
      {
        path: path + "/:id/:userId",
        exact: true,
        component: accessGuardRouteListRenderer("canAccessDashboard"),
        routes: [
          {
            path: path + "/:id/:userId",
            exact: true,
            component: () => <SubmissionView changeRequestType={type} />,
          },
        ],
      },
    ],
  })),
  {
    path: ONEMAC_ROUTES.TRIAGE_GROUP,
    component: AuthenticatedRouteListRenderer,
    routes: [
      {
        path: ONEMAC_ROUTES.TRIAGE_GROUP,
        component: accessGuardRouteListRenderer("canAccessForms"),
        routes: [
          { path: ONEMAC_ROUTES.TRIAGE_GROUP, exact: true, component: Triage },
          { path: ONEMAC_ROUTES.TRIAGE_SPA, exact: true, component: Triage },
          { path: ONEMAC_ROUTES.TRIAGE_WAIVER, exact: true, component: Triage },
        ],
      },
    ],
  },
  {
    path: ROUTES.DETAIL,
    component: AuthenticatedRouteListRenderer,
    routes: [
      {
        path: ROUTES.DETAIL,
        component: accessGuardRouteListRenderer("canAccessDashboard"),
        routes: [
          {
            path: ROUTES.DETAIL + "/:componentType/:componentId",
            exact: true,
            component: DetailView,
          },
          {
            path:
              ROUTES.DETAIL +
              "/:componentType/:componentTimestamp/:componentId",
            exact: true,
            component: DetailView,
          },
        ],
      },
    ],
  },
  // TODO determine if these features are supported or even wanted anymore
  {
    path: ROUTES.METRICS,
    component: AuthenticatedRouteListRenderer,
    routes: [
      {
        path: ROUTES.METRICS,
        component: accessGuardRouteListRenderer("canAccessMetrics"),
        routes: [
          {
            path: ROUTES.METRICS,
            exact: true,
            component: Metrics,
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.ATTACHMENT_LANDING,
    exact: true,
    component: AttachmentLanding,
  },
];

export const Routes = () => <RouteListRenderer routes={ROUTE_LIST} />;
