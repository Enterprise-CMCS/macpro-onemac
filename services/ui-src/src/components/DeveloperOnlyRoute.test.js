import React  from "react";
import { render } from "@testing-library/react";
import DeveloperOnlyRoute from "./DeveloperOnlyRoute";
import { AppContext } from "../libs/contextLib";
import {MemoryRouter} from "react-router-dom";

it("renders Developer Children", () => {
  const response = render(
      <AppContext.Provider value={{isLoggedInAsDeveloper: true }}>
          <MemoryRouter>
           <DeveloperOnlyRoute>
               <div>FOOX</div>
           </DeveloperOnlyRoute>
          </MemoryRouter>
      </AppContext.Provider>
  );
  expect(response.baseElement.textContent).toContain("FOOX")
});


it("Does not render Developer Children", () => {
    const response = render(
        <AppContext.Provider value={{isLoggedInAsDeveloper: false }}>
            <MemoryRouter>
                <DeveloperOnlyRoute>
                    <div>FOOX</div>
                </DeveloperOnlyRoute>
            </MemoryRouter>
        </AppContext.Provider>
    );
    expect(response.baseElement.textContent).not.toContain("FOOX")
});


