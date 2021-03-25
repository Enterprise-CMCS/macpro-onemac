import React from "react";
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
import ChangeRequestDataApi from "./utils/ChangeRequestDataApi";
import {Auth} from "aws-amplify";


export default function Routes() {

    async function isValidUserRoute(route) {

        try {
            // If User is logged in then check.  Verify each route request using
            // cognito.  Only public pages allowed.
            const authUser = await Auth.currentAuthenticatedUser();
            const email = authUser.signInUserSession.idToken.payload.email;
            const userData = await ChangeRequestDataApi.userProfile(email);

            if (userData.type !== undefined && userData.validRoutes !== undefined ) {
                const roleRoutes = userData.validRoutes
                const baseRoute = route.split("#")
                return roleRoutes.includes(baseRoute[0])
            } else {
                return false;
            }
        } catch (error) {
            if (error !== "not authenticated") {
                console.log(
                    "There was an error while loading the user information.",
                    error
                );
            }
            return false;
        }
    }

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
            <AuthenticatedRoute path={`${ROUTES.SPA}/:id?`}>
                {isValidUserRoute(ROUTES.SPA) === true ? <Spa/> : <NotFound/>}
            </AuthenticatedRoute>
            <AuthenticatedRoute path={`${ROUTES.WAIVER}/:id?`}>
                {isValidUserRoute(ROUTES.WAIVER) === true   ? <Waiver/> : <NotFound/>}
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={`${ROUTES.SPA_RAI}/:id?`}>
                {isValidUserRoute(ROUTES.SPA_RAI) === true  ? <SpaRai/> : <NotFound/>}
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={`${ROUTES.WAIVER_RAI}/:id?`}>
                { isValidUserRoute(ROUTES.WAIVER_RAI) === true   ? <WaiverRai/> : <NotFound/>}
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={`${ROUTES.WAIVER_EXTENSION}/:id?`}>
                {isValidUserRoute(ROUTES.WAIVER_EXTENSION) === true   ? <WaiverExtension/> : <NotFound/>}
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={`${ROUTES.WAIVER_APP_K}/:id?`}>
                {isValidUserRoute(ROUTES.WAIVER_APP_K) === true  ? <WaiverAppK/> : <NotFound/>}
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={`${ROUTES.METRICS}`}>
                {isValidUserRoute(ROUTES.METRICS) === true   ? <Metrics/> : <NotFound/>}
            </AuthenticatedRoute>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    );
}
