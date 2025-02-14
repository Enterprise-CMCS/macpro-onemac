// Please refer to this post for more information on our routing approach and a
// detailed walkthrough of how it works
// https://www.ryanjyost.com/react-routing/

import React, { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useFlags } from "launchdarkly-react-client-sdk";

import {
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
import DevLogin from "./containers/DevLogin";
import PackageList from "./containers/PackageList";
import { Signup } from "./containers/Signup";
import { StateSignup } from "./containers/StateSignup";
import { GroupAndDivision } from "./containers/GroupAndDivision";
import Triage from "./containers/Triage";
import UserManagement from "./containers/UserManagement";
import UserPage from "./containers/UserPage";
import { useAppContext } from "./libs/contextLib";
import InitialWaiverWithdraw from "./page/initial-waiver/InitialWaiverWithdraw";
import InitialWaiverDetail from "./page/initial-waiver/InitialWaiverDetail";
import WaiverRenewalWithdraw from "./page/waiver-renewal/WaiverRenewalWithdraw";
import WaiverRenewalDetail from "./page/waiver-renewal/WaiverRenewalDetail";
import WaiverAmendmentDetail from "./page/waiver-amendment/WaiverAmendmentDetail";
import WaiverAppendixKDetail from "./page/waiver-appendix-k/WaiverAppendixKDetail";
import TemporaryExtensionForm from "./page/temporary-extension/TemporaryExtensionForm";
import TemporaryExtensionDetail from "./page/temporary-extension/TemporaryExtensionDetail";
import MedicaidSpaForm from "./page/medicaid-spa/MedicaidSpaForm";
import MedicaidSpaWithdraw from "./page/medicaid-spa/MedicaidSpaWithdraw";
import MedicaidSPADetail from "./page/medicaid-spa/MedicaidSPADetail";
import ChipSpaForm from "./page/chip-spa/ChipSpaForm";
import ChipSpaWithdraw from "./page/chip-spa/ChipSpaWithdraw";
import CHIPSPADetail from "./page/chip-spa/CHIPSPADetail";
import MedicaidSPARAIForm from "./page/medicaid-spa/MedicaidSPARAIForm";
import CHIPSPARAIForm from "./page/chip-spa/CHIPSPARAIForm";
import WaiverRAIForm from "./page/waiver-rai/WaiverRAIForm";
import WaiverAmendmentWithdraw from "./page/waiver-amendment/WaiverAmendmentWithdraw";
import WaiverAppendixKForm from "./page/waiver-appendix-k/WaiverAppendixKForm";
import WaiverAppendixKWithdraw from "./page/waiver-appendix-k/WaiverAppendixKWithdraw";
import WaiverAppendixKRAIForm from "./page/waiver-appendix-k/WaiverAppendixKRAIForm";
import DescribeForms from "./page/DescribeForms";
import EventList from "./page/event/EventList";
import MedicaidABPLandingPage from "./page/landing/MedicaidABPLandingPage";
import EventDetail from "./page/event/EventDetail";
import CHIPEligibilityLandingPage from "./page/landing/CHIPEligibilityLandingPage";
import MedicaidEligibilityLandingPage from "./page/landing/MedicaidEligibilityLandingPage";
import InitialWaiverB4Form from "./page/initial-waiver/InitialWaiverB4Form";
import InitialWaiverBForm from "./page/initial-waiver/InitialWaiverBForm";
import WaiverRenewalB4Form from "./page/waiver-renewal/WaiverRenewalB4Form";
import WaiverRenewalBForm from "./page/waiver-renewal/WaiverRenewalBForm";
import WaiverAmendmentB4Form from "./page/waiver-amendment/WaiverAmendmentB4Form";
import WaiverAmendmentBForm from "./page/waiver-amendment/WaiverAmendmentBForm";
import WithdrawRAIForm from "./page/withdraw-rai/WithdrawRAIForm";
import { clearTableStateStorageKeys } from "./utils/StorageKeys";
import EnableRaiWithdrawForm from "./page/enable-rai-withdraw/EnableRaiWithdrawForm";
import MedicaidSPASubsequentSubmissionForm from "./page/medicaid-spa/MedicaidSPASubsequentSubmissionForm";
import ChipSPASubsequentSubmissionForm from "./page/chip-spa/ChipSPASubsequentSubmissionForm";
import InitialWaiverSubsequentSubmissionForm from "./page/initial-waiver/InitialWaiverSubsequentSubmissionForm";
import WaiverRenewalSubsequentSubmissionForm from "./page/waiver-renewal/WaiverRenewalSubsequentSubmissionForm";
import WaiverAmendmentSubsequentSubmissionForm from "./page/waiver-amendment/WaiverAmendmentSubsequentSubmissionForm";
import WaiverAppKSubsequentSubmissionForm from "./page/waiver-appendix-k/WaiverAppKSubsequentSubmissionForm";
import DisableRaiWithdrawForm from "./page/disable-rai-withdraw/DisableRaiWithdrawForm";

const ID_TOKEN_KEY: string = "idToken";

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

const RouteListRenderer: FC<{ routes: RouteSpec[] }> = ({ routes }) => {
  if (!useAppContext()?.isAuthenticated) {
    clearTableStateStorageKeys();
  }

  const { enableSubsequentDocumentation, mmdlFaq } = useFlags();
  let filteredRoutes = routes;

  if (!enableSubsequentDocumentation) {
    // Filter out objects where the component includes a SubsequentSubmission form
    // This is not currently looking for subroutes since all subsub routes are at the root of the route object
    filteredRoutes = routes.filter(
      (route) => !route.path.includes("subsequent-submission")
    );
  }

  // mmdlFaq is the flag for all MMDL work these landing pages should not be accessable

  if (mmdlFaq) {
    filteredRoutes = routes.filter(
      (route) =>
        route.path !== ROUTES.ABP_LANDING &&
        route.path !== ROUTES.CHIP_ELIGIBILITY_LANDING
    );
  }

  return (
    <Switch>
      {filteredRoutes.map((routeSpec) => (
        <RouteWithSubRoutes
          key={routeSpec.key ?? routeSpec.path}
          {...routeSpec}
        />
      ))}
      <Route component={NotFound} />
    </Switch>
  );
};

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

const isAdminUser = () => {
  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const context = useAppContext();
  if (!context?.isAuthenticated) {
    return false;
  }

  let userRoles;
  //authenticated users will have idToken in Local Storage
  try {
    const idTokenKey: string[] = Object.keys(localStorage).filter((k) =>
      k.includes(ID_TOKEN_KEY)
    );
    const idToken: string | null =
      idTokenKey && localStorage.getItem(idTokenKey[0]);
    if (!idToken) return false;
    const decodedIdToken: any = jwt_decode(idToken);
    userRoles = decodedIdToken["custom:user_roles"];
  } catch (error) {
    console.error("error decoding idToken", error);
    return false;
  }

  const allowedRoles = [
    "cmsroleapprover",
    "systemadmin",
    "statesystemadmin",
    "helpdesk",
    "cmsreviewer",
    // "defaultcmsuser"
  ];

  // only passes admin check if roles from jwt one of the "allowed roles"
  if (userRoles) {
    try {
      userRoles = JSON.parse(userRoles);
    } catch (error) {
      console.error("Error parsing user_roles:", error);
      userRoles = [];
    }
    for (let i = 0; i < userRoles.length; i++) {
      if (allowedRoles.includes(userRoles[i])) {
        return true;
      }
    }
  }

  return false;
};

const accessGuardRouteListRenderer: (
  accessKey: keyof UserRole,
  redirectAccessKey?: keyof UserRole,
  redirectTo?: string,
  isAdminRoute?: boolean
) => FC<{ routes: RouteSpec[] }> =
  (accessKey, redirectAccessKey, redirectTo, isAdminRoute) =>
  ({ routes }) => {
    const { userProfile: { userData: { roleList = [] } = {} } = {} } =
      useAppContext() ?? {};
    const roleObj = getUserRoleObj(roleList);
    // Token based admin check will redirect if non admin user
    if (isAdminRoute && redirectTo) {
      if (!isAdminUser()) {
        return <Redirect to={redirectTo} />;
      }
    }
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
      redirectTo: ONEMAC_ROUTES.PACKAGE_LIST,
      isAdminRoute: true,
      component: UserManagement,
    },
    {
      path: ONEMAC_ROUTES.PACKAGE_LIST,
      accessKey: "canAccessDashboard",
      redirectAccessKey: "canAccessUserManagement",
      redirectTo: ROUTES.USER_MANAGEMENT,
      isAdminRoute: false,
      component: PackageList,
    },
  ].map(
    ({
      path,
      accessKey,
      redirectAccessKey,
      redirectTo,
      component,
      isAdminRoute,
    }) => ({
      path,
      component: SignupGuardRouteListRenderer,
      routes: [
        {
          path,
          component: accessGuardRouteListRenderer(
            accessKey as keyof UserRole,
            redirectAccessKey as keyof UserRole,
            redirectTo,
            isAdminRoute
          ),
          routes: [{ path, exact: true, component }],
        },
      ],
    })
  ),
  // legacy triage screens, plus current OneMACForm forms
  ...[
    { path: ONEMAC_ROUTES.MEDICAID_SPA, component: MedicaidSpaForm },
    { path: ONEMAC_ROUTES.CHIP_SPA, component: ChipSpaForm },
    { path: ONEMAC_ROUTES.MEDICAID_SPA_RAI, component: MedicaidSPARAIForm },
    {
      path: ONEMAC_ROUTES.MEDICAID_SPA_SUBSEQUENT_SUBMSISSION,
      component: MedicaidSPASubsequentSubmissionForm,
    },
    {
      path: ONEMAC_ROUTES.INITIAL_WAIVER_SUBSEQUENT_SUBMSISSION,
      component: InitialWaiverSubsequentSubmissionForm,
    },
    {
      path: ONEMAC_ROUTES.WAIVER_RENEWAL_SUBSEQUENT_SUBMSISSION,
      component: WaiverRenewalSubsequentSubmissionForm,
    },
    {
      path: ONEMAC_ROUTES.WAIVER_AMENDMENT_SUBSEQUENT_SUBMSISSION,
      component: WaiverAmendmentSubsequentSubmissionForm,
    },
    {
      path: ONEMAC_ROUTES.WAIVER_APP_K_SUBSEQUENT_SUBMSISSION,
      component: WaiverAppKSubsequentSubmissionForm,
    },
    {
      path: ONEMAC_ROUTES.MEDICAID_SPA_WITHDRAW,
      component: MedicaidSpaWithdraw,
    },
    { path: ONEMAC_ROUTES.CHIP_SPA_RAI, component: CHIPSPARAIForm },
    { path: ONEMAC_ROUTES.CHIP_SPA_WITHDRAW, component: ChipSpaWithdraw },
    {
      path: ONEMAC_ROUTES.CHIP_SPA_SUBSEQUENT_SUBMSISSION,
      component: ChipSPASubsequentSubmissionForm,
    },

    { path: ONEMAC_ROUTES.WAIVER_RAI, component: WaiverRAIForm },
    { path: ONEMAC_ROUTES.INITIAL_WAIVER_B_4, component: InitialWaiverB4Form },
    {
      path: ONEMAC_ROUTES.INITIAL_WAIVER_B_OTHER,
      component: InitialWaiverBForm,
    },
    {
      path: ONEMAC_ROUTES.INITIAL_WAIVER_WITHDRAW,
      component: InitialWaiverWithdraw,
    },
    { path: ONEMAC_ROUTES.WAIVER_RENEWAL_B_4, component: WaiverRenewalB4Form },
    {
      path: ONEMAC_ROUTES.WAIVER_RENEWAL_B_OTHER,
      component: WaiverRenewalBForm,
    },
    {
      path: ONEMAC_ROUTES.WAIVER_RENEWAL_WITHDRAW,
      component: WaiverRenewalWithdraw,
    },
    {
      path: ONEMAC_ROUTES.WAIVER_AMENDMENT_B_4,
      component: WaiverAmendmentB4Form,
    },
    {
      path: ONEMAC_ROUTES.WAIVER_AMENDMENT_B_OTHER,
      component: WaiverAmendmentBForm,
    },
    {
      path: ONEMAC_ROUTES.WAIVER_AMENDMENT_WITHDRAW,
      component: WaiverAmendmentWithdraw,
    },
    {
      path: ONEMAC_ROUTES.APPENDIX_K_AMENDMENT,
      component: WaiverAppendixKForm,
    },
    {
      path: ONEMAC_ROUTES.APPENDIX_K_AMENDMENT_WITHDRAW,
      component: WaiverAppendixKWithdraw,
    },
    {
      path: ONEMAC_ROUTES.WAIVER_APP_K_RAI,
      component: WaiverAppendixKRAIForm,
    },
    {
      path: ONEMAC_ROUTES.TEMPORARY_EXTENSION,
      component: TemporaryExtensionForm,
    },
    {
      path: ONEMAC_ROUTES.WITHDRAW_RAI,
      component: WithdrawRAIForm,
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
  // cms forms
  ...[
    {
      path: ONEMAC_ROUTES.ENABLE_RAI_WITHDRAW,
      component: EnableRaiWithdrawForm,
    },
    {
      path: ONEMAC_ROUTES.DISABLE_RAI_WITHDRAW,
      component: DisableRaiWithdrawForm,
    },
  ].map(({ path, ...rest }) => ({
    path,
    component: AuthenticatedRouteListRenderer,
    routes: [
      {
        path,
        component: accessGuardRouteListRenderer("isCMSUser"),
        routes: [{ path, exact: true, ...rest }],
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
          {
            path: ONEMAC_ROUTES.TRIAGE_MEDICAID_SPA,
            exact: true,
            component: Triage,
          },
          {
            path: ONEMAC_ROUTES.TRIAGE_CHIP_SPA,
            exact: true,
            component: Triage,
          },
          { path: ONEMAC_ROUTES.TRIAGE_WAIVER, exact: true, component: Triage },
          {
            path: ONEMAC_ROUTES.TRIAGE_WAIVER_B,
            exact: true,
            component: Triage,
          },
          {
            path: ONEMAC_ROUTES.TRIAGE_WAIVER_B_4,
            exact: true,
            component: Triage,
          },
          {
            path: ONEMAC_ROUTES.TRIAGE_WAIVER_B_OTHER,
            exact: true,
            component: Triage,
          },
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
            path: ONEMAC_ROUTES.MEDICAID_SPA_DETAIL + "/:componentId",
            exact: true,
            component: MedicaidSPADetail,
          },
          {
            path: ONEMAC_ROUTES.CHIP_SPA_DETAIL + "/:componentId",
            exact: true,
            component: CHIPSPADetail,
          },
          {
            path: ONEMAC_ROUTES.INITIAL_WAIVER_DETAIL + "/:componentId",
            exact: true,
            component: InitialWaiverDetail,
          },
          {
            path: ONEMAC_ROUTES.WAIVER_RENEWAL_DETAIL + "/:componentId",
            exact: true,
            component: WaiverRenewalDetail,
          },
          {
            path: ONEMAC_ROUTES.WAIVER_AMENDMENT_DETAIL + "/:componentId",
            exact: true,
            component: WaiverAmendmentDetail,
          },
          {
            path: ONEMAC_ROUTES.WAIVER_APP_K_DETAIL + "/:componentId",
            exact: true,
            component: WaiverAppendixKDetail,
          },
          {
            path: ONEMAC_ROUTES.TEMPORARY_EXTENSION_DETAIL + "/:componentId",
            exact: true,
            component: TemporaryExtensionDetail,
          },
          // {
          //   path:
          //     ROUTES.DETAIL +
          //     "/:componentType/:componentTimestamp/:componentId",
          //   exact: true,
          //   component: DetailView,
          // },
        ],
      },
    ],
  },
  {
    path: ROUTES.ATTACHMENT_LANDING,
    exact: true,
    component: AttachmentLanding,
  },
  {
    path: ROUTES.ABP_LANDING,
    exact: true,
    component: MedicaidABPLandingPage,
  },
  {
    path: ROUTES.MEDICAID_ELIGIBILITY_LANDING,
    exact: true,
    component: MedicaidEligibilityLandingPage,
  },
  {
    path: ROUTES.CHIP_ELIGIBILITY_LANDING,
    exact: true,
    component: CHIPEligibilityLandingPage,
  },
  {
    path: ONEMAC_ROUTES.FORMS_DESCRIBE,
    component: accessGuardRouteListRenderer("canAccessAdminTools"),
    routes: [
      {
        path: ONEMAC_ROUTES.FORMS_DESCRIBE,
        exact: true,
        component: DescribeForms,
      },
    ],
  },
  {
    path: ONEMAC_ROUTES.EVENT,
    component: accessGuardRouteListRenderer("canAccessAdminTools"),
    routes: [
      {
        path: ONEMAC_ROUTES.EVENT + "/:id/:changedDate",
        exact: true,
        component: EventDetail,
      },
      {
        path: ONEMAC_ROUTES.EVENT,
        exact: true,
        component: EventList,
      },
    ],
  },
];

export const Routes = () => <RouteListRenderer routes={ROUTE_LIST} />;
