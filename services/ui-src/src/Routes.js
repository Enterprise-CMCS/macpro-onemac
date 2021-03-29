import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import FAQ from "./containers/FAQ"
import Dashboard from "./containers/Dashboard";
import UserManagement from "./containers/UserManagement";
import UserPage from "./containers/UserPage";
import NotFound from "./containers/NotFound";
import ComponentPage from "./containers/ComponentPage";
import DeveloperOnlyRoute from "./components/DeveloperOnlyRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import DevLogin from "./containers/DevLogin";
import DynamicRoutes from "./DynamicRoutes";
import AuthenticatedRoute from "./components/AuthenticatedRoute";


export const ROUTES = {
    DASHBOARD: '/dashboard',
    USER_MANAGEMENT: '/usermanagement',
    FAQ: '/FAQ',
    FAQ_TOP: '/FAQ/#top',
    FAQ_SPA_ID: '/FAQ#spa-id-format',
    FAQ_WAIVER_ID: '/FAQ#waiver-id-format',
    HOME: '/',
    PROFILE: '/profile',
    METRICS: '/metrics',
    DEVLOGIN: '/devlogin',
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
            <AuthenticatedRoute exact path={ROUTES.DASHBOARD}>
                <Dashboard />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={ROUTES.USER_MANAGEMENT}>
                <UserManagement />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={ROUTES.PROFILE}>
                <UserPage/>
            </AuthenticatedRoute>
            <DynamicRoutes/>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}
