// Please refer to this post for more information on our routing approach and a
// detailed walkthrough of how it works
// https://www.ryanjyost.com/react-routing/

import React, { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import {
  ChangeRequest,
  ROUTES,
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
import OneMACForm from "./forms/OneMACForm";
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

const useProcessedRole = () => {
  const { userProfile: { userData: { roleList = [] } = {} } = {} } =
    useAppContext() ?? {};

  return getUserRoleObj(roleList);
};

const accessGuardRouteListRenderer: (
  accessKey: keyof UserRole
) => FC<{ routes: RouteSpec[] }> =
  (accessKey) =>
  ({ routes }) => {
    const { [accessKey]: hasAccess } = useProcessedRole();
    return hasAccess ? <RouteListRenderer routes={routes} /> : <NotFound />;
  };

// this one is a little complex, but necessary since the behavior desired for
// when you access a dashboard screen is so specific
const DashboardWrapper: FC<{
  WrappedComponent: any;
  startTab?: string;
  isUserMgmt?: boolean;
}> = ({ WrappedComponent, isUserMgmt, ...rest }) => {
  const {
    isAuthenticated,
    userProfile: { cmsRoles = "", userData: { roleList = [] } = {} } = {},
  } = useAppContext() ?? {};

  const { canAccessDashboard, canAccessUserManagement } = useProcessedRole();

  if (!isAuthenticated) return <Redirect to={ROUTES.HOME} />;
  if (effectiveRoleForUser(roleList) === null && cmsRoles)
    return <Redirect to={ROUTES.SIGNUP} />;

  if (isUserMgmt) {
    if (canAccessUserManagement) return <WrappedComponent {...rest} />;
    else if (canAccessDashboard) return <Redirect to={ROUTES.DASHBOARD} />;
  } else {
    if (canAccessDashboard) return <WrappedComponent {...rest} />;
    else if (canAccessUserManagement)
      return <Redirect to={ROUTES.USER_MANAGEMENT} />;
  }

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
  {
    path: ROUTES.USER_MANAGEMENT,
    exact: true,
    component: () => (
      <DashboardWrapper isUserMgmt WrappedComponent={UserManagement} />
    ),
  },
  {
    path: ROUTES.DASHBOARD,
    exact: true,
    component: () => <DashboardWrapper WrappedComponent={Dashboard} />,
  },
  // legacy triage screens, plus current OneMACForm forms
  ...[
    { path: ROUTES.NEW_SUBMISSION_SELECTION, component: NewSubmission },
    { path: ROUTES.NEW_SPA, component: NewSPA },
    { path: ROUTES.NEW_WAIVER, component: NewWaiver },
    { path: ROUTES.BASE_WAIVER, component: OneMACForm },
    { path: ROUTES.TEMPORARY_EXTENSION, component: OneMACForm },
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
    path: ROUTES.PACKAGE_LIST,
    exact: true,
    component: () => <DashboardWrapper WrappedComponent={PackageList} />,
  },
  {
    path: ROUTES.TRIAGE_GROUP,
    component: AuthenticatedRouteListRenderer,
    routes: [
      {
        path: ROUTES.TRIAGE_GROUP,
        component: accessGuardRouteListRenderer("canAccessForms"),
        routes: [
          { path: ROUTES.TRIAGE_GROUP, exact: true, component: Triage },
          { path: ROUTES.TRIAGE_SPA, exact: true, component: Triage },
          { path: ROUTES.TRIAGE_WAIVER, exact: true, component: Triage },
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
