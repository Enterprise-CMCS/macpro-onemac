import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import FAQ from "./containers/FAQ"
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import NewAmendment from "./amendments/NewAmendment";
import Amendments from "./amendments/Amendments";
import NewWaiver from "./waivers/NewWaiver";
import Waivers from "./waivers/Waivers";
import SpaRai from "./components/SpaRai";
import Profile from "./containers/Profile"
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/FAQ">
                <FAQ />
            </Route>
            <UnauthenticatedRoute exact path="/login">
                <Login />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute exact path="/signup">
                <Signup />
            </UnauthenticatedRoute>
            <AuthenticatedRoute exact path="/profile">
                <Profile />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path="/amendment/new">
                <NewAmendment />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path="/amendment/:id">
                <Amendments />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path="/waiver/new">
                <NewWaiver />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path="/waiver/:id">
                <Waivers />
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/sparai">
                <SpaRai />
            </AuthenticatedRoute>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}
