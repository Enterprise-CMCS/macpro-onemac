import React from "react";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";
import { render } from "@testing-library/react";
import {AppContext} from "../libs/contextLib";
import UserData from "../utils/getUser.json"

export function renderWithProviders(
    ui,
    {
        route = "/",
        history = createMemoryHistory({ initialEntries: [route] })
    } = {},
    apolloMocks
) {

    console.log("I am route inside renderWithProviders Wrapper:", route);
    let setUserInfo;
    let authState = {userProfile: { userData: UserData }, userData: UserData };

    console.log("DEBUG [CurrentUserData]:" + JSON.stringify(authState))
    return {
        ...render(
            <AppContext.Provider
                value={{
                    ...authState,
                    setUserInfo,
                }}
            >
            <Router history={history}>
                <Route path={route}>{ui}</Route>
            </Router>
            </AppContext.Provider>
        ),
        history
    };
}
