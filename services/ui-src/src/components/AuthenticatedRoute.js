import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import { ROUTES } from "../Routes"

export default function AuthenticatedRoute({ children, ...rest }) {
    const { pathname, search } = useLocation();
    const { isAuthenticated } = useAppContext();
    return (
        <Route {...rest}>
            {isAuthenticated ? (
                children
            ) : (
                <Redirect to={
                    `${ROUTES.LOGIN}?redirect=${pathname}${search}`
                } />
            )}
        </Route>
    );
}