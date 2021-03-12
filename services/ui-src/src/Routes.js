import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import FAQ from "./containers/FAQ"
import { Signup } from "./containers/Signup";
import { StateSignup } from "./containers/StateSignup";
import Dashboard from "./containers/Dashboard";
import UserPage from "./containers/UserPage";
import NotFound from "./containers/NotFound";
import ComponentPage from "./containers/ComponentPage";
import DeveloperOnlyRoute from "./components/DeveloperOnlyRoute";
import Spa from "./changeRequest/Spa";
import SpaRai from "./changeRequest/SpaRai";
import Waiver from "./changeRequest/Waiver";
import WaiverAppK from "./changeRequest/WaiverAppK";
import WaiverRai from "./changeRequest/WaiverRai";
import WaiverExtension from "./changeRequest/WaiverExtension";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import DevLogin from "./containers/DevLogin";
import Metrics from "./containers/Metrics";


export const ROUTES = {
    DASHBOARD: '/dashboard',
    FAQ: '/FAQ',
    FAQ_TOP: '/FAQ/#top',
    FAQ_SPA_ID: '/FAQ#spa-id-format',
    FAQ_WAIVER_ID: '/FAQ#waiver-id-format',
    HOME: '/',
    PROFILE: '/profile',
    METRICS: '/metrics',
    DEVLOGIN: '/devlogin',
    SIGNUP: '/signup',
    STATE_SIGNUP: '/signup/state',
    SPA: '/spa',
    SPA_RAI: '/sparai',
    COMPONENT_PAGE: '/componentpage', // temporary placeholder for the developers to house components //
    WAIVER: '/waiver',
    WAIVER_RAI: '/waiverrai',
    WAIVER_EXTENSION: '/waiverextension',
    WAIVER_APP_K: '/waiverappk'
}

export default function Routes() {
    return (
        <Switch>
            <Route exact path={ROUTES.HOME}>
                <Home />
            </Route>
            <DeveloperOnlyRoute exact path={ROUTES.COMPONENT_PAGE}>
                <ComponentPage />
            </DeveloperOnlyRoute>
            <Route exact path={ROUTES.FAQ}>
                <FAQ />
            </Route>
            <UnauthenticatedRoute exact path={ROUTES.DEVLOGIN}>
                <DevLogin />
            </UnauthenticatedRoute>
            <AuthenticatedRoute exact path={ROUTES.SIGNUP}>
              <Signup />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={ROUTES.STATE_SIGNUP}>
              <StateSignup />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={ROUTES.DASHBOARD}>
                <Dashboard />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={ROUTES.PROFILE}>
                <UserPage />
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
                <Metrics/>
            </AuthenticatedRoute>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}
