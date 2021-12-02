import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import {App} from "./App";
import React from "react";

jest.mock("aws-amplify");


it("renders successfully", () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );
});
