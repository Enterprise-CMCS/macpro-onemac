import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import FAQ from "./containers/FAQ"
import Dashboard from "./containers/Dashboard";
import NotFound from "./containers/NotFound";
import Spa from "./changeRequest/Spa";
import SpaRai from "./changeRequest/SpaRai";
import Waiver from "./changeRequest/Waiver";
import WaiverRai from "./changeRequest/WaiverRai";
import WaiverExtension from "./changeRequest/WaiverExtension";
import Profile from "./containers/Profile"
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import DevLogin from "./containers/DevLogin";

export const ROUTES = {
    DASHBOARD: '/dashboard',
    FAQ: '/FAQ',
    FAQ_TOP: '/FAQ/#top',
    FAQ_SPA_ID: '/FAQ#spa-id-format',
    FAQ_WAIVER_ID: '/FAQ#waiver-id-format',
    HOME: '/',
    PROFILE: '/profile',
    DEVLOGIN: '/devlogin',
    SPA: '/spa',
    SPA_RAI: '/sparai',
    WAIVER: '/waiver',
    WAIVER_RAI: '/waiverrai',
    WAIVER_EXTENSION: '/waiverextension'
}

export default function Routes() {
    return (
        <Switch>
            <Route exact path={ROUTES.HOME}>
                <Home />
            </Route>
            <Route exact path={ROUTES.FAQ}>
                <FAQ />
            </Route>
            <UnauthenticatedRoute exact path={ROUTES.DEVLOGIN}>
                <DevLogin />
            </UnauthenticatedRoute>
            <AuthenticatedRoute exact path={ROUTES.PROFILE}>
                <Profile />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={ROUTES.DASHBOARD}>
                <Dashboard />
            </AuthenticatedRoute>
            <AuthenticatedRoute path={`${ROUTES.SPA}/:id?`}>
                <Spa/>
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
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}
