import React from "react";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Auth } from "aws-amplify";

import { App } from "./App";

jest.mock("aws-amplify");
jest.mock("./utils/UserDataApi");

beforeEach(() => {
  jest.clearAllMocks();

  Auth.currentAuthenticatedUser.mockResolvedValue({
    signInUserSession: { idToken: { payload: {} } },
  });
  Auth.configure.mockReturnValue({ oauth: {} });
});

it("renders without crashing", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await act(async () => {});
});

it("handles error on fetch", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await act(async () => {});
});
