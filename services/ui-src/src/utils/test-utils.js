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

    let setUserInfo;
    let authState = {userProfile: { userData: UserData }, userData: UserData };

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
