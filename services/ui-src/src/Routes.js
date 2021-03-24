import React, {useState} from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./containers/Home";
import FAQ from "./containers/FAQ"
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
import {ROUTES} from "cmscommonlib";
import {useAppContext} from "./libs/contextLib";

export default function Routes() {
    const { userProfile } = useAppContext();

    console.log(JSON.stringify(userProfile.userData.type))
    return (
        <Switch>
            <Route exact path={ROUTES.HOME}>
                <Home/>
            </Route>
            <DeveloperOnlyRoute exact path={ROUTES.COMPONENT_PAGE}>
                <ComponentPage/>
            </DeveloperOnlyRoute>
            <Route exact path={ROUTES.FAQ}>
                <FAQ/>
            </Route>
            <UnauthenticatedRoute exact path={ROUTES.DEVLOGIN}>
                <DevLogin/>
            </UnauthenticatedRoute>
            <AuthenticatedRoute exact path={ROUTES.DASHBOARD}>
                <Dashboard/>
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={ROUTES.PROFILE}>
                <UserPage/>
            </AuthenticatedRoute>
            <AuthenticatedRoute  path={`${ROUTES.SPA}/:id?`}>
                { userProfile.userData.type === "stateuser" ? <Spa/> : <NotFound/> }
            </AuthenticatedRoute>
            <AuthenticatedRoute  path={`${ROUTES.WAIVER}/:id?`}>
                { userProfile.userData.type === "stateuser" ? <Waiver/> : <NotFound/> }
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={`${ROUTES.SPA_RAI}/:id?`}>
                { userProfile.userData.type === "stateuser" ? <SpaRai/> : <NotFound/> }
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={`${ROUTES.WAIVER_RAI}/:id?`}>
                { userProfile.userData.type === "stateuser" ? <WaiverRai/> : <NotFound/> }
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={`${ROUTES.WAIVER_EXTENSION}/:id?`}>
                { userProfile.userData.type === "stateuser" ? <WaiverExtension/> : <NotFound/> }
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={`${ROUTES.WAIVER_APP_K}/:id?`}>
                { userProfile.userData.type === "stateuser" ? <WaiverAppK/> : <NotFound/> }
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={`${ROUTES.METRICS}`}>
                { userProfile.userData.type === "stateuser" ? <Metrics/> : <NotFound/> }
            </AuthenticatedRoute>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    );
}
