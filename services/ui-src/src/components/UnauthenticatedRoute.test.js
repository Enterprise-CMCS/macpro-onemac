import React  from "react";
import { render } from "@testing-library/react";
import { AppContext } from "../libs/contextLib";
import {MemoryRouter} from "react-router-dom";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

it("renders Developer Children", () => {
    const response = render(
        <AppContext.Provider value={{isAuthenticated: true }}>
            <MemoryRouter>
                <UnauthenticatedRoute>
                    <div>FOOX</div>
                </UnauthenticatedRoute>
            </MemoryRouter>
        </AppContext.Provider>
    );
    expect(response.baseElement.textContent).not.toContain("FOOX")
});


it("Does not render Developer Children", () => {
    const response = render(
        <AppContext.Provider value={{isAuthenticated: false }}>
            <MemoryRouter>
                <UnauthenticatedRoute>
                    <div>FOOX</div>
                </UnauthenticatedRoute>
            </MemoryRouter>
        </AppContext.Provider>
    );
    expect(response.baseElement.textContent).toContain("FOOX")
});


