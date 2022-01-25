import React from "react";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Auth } from "aws-amplify";

import { App } from "./App";

jest.mock("aws-amplify");
jest.mock("./utils/UserDataApi");

it("renders without crashing", async () => {
  Auth.currentAuthenticatedUser.mockResolvedValueOnce({
    signInUserSession: { idToken: { payload: {} } },
  });
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await act(async () => {});
});

it("handles error on fetch", async () => {
  Auth.configure.mockReturnValueOnce({ oauth: {} });
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await act(async () => {});
});
