import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Auth } from "aws-amplify";

import UserDataApi from "./utils/UserDataApi";
import DynamicRoutes from "./DynamicRoutes";

jest.mock("aws-amplify");
jest.mock("./utils/UserDataApi");

beforeEach(() => {
  Auth.currentAuthenticatedUser.mockResolvedValue({
    signInUserSession: {
      idToken: { payload: { email: "testemail@test.example" } },
    },
  });

  UserDataApi.userProfile.mockResolvedValue({
    type: "statesubmitter",
    validRoutes: [],
  });
});

it("renders successfully", () => {
  render(
    <MemoryRouter>
      <DynamicRoutes />
    </MemoryRouter>
  );
});
