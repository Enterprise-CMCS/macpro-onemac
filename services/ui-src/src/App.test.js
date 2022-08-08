import React from "react";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import UserDataApi from "./utils/UserDataApi";

import { App } from "./App";
import { RESPONSE_CODE } from "cmscommonlib";

jest.mock("aws-amplify");
jest.mock("./utils/UserDataApi");
jest.mock("./components/LogoutTimerWrapper");

beforeEach(() => {
  jest.clearAllMocks();

  // render does not work for idleTimer -- workaround
  LogoutTimerWrapper.mockReturnValue(<></>);

  Auth.currentAuthenticatedUser.mockResolvedValue({
    signInUserSession: { idToken: { payload: {} } },
  });
  Auth.configure.mockReturnValue({ oauth: {} });
  UserDataApi.userProfile.mockResolvedValue({
    phoneNumber: "555.12wer",
    email: "anemail",
    firstName: "Unita",
    lastName: "Testing",
    fullName: "Unita Testing",
    roleList: [
      { role: "cmsroleapprover", territory: "N/A", status: "revoked" },
      { role: "defaultcmsuser", territory: "N/A", status: "active" },
    ],
    validRoutes: [
      "/",
      "/profile",
      "/devlogin",
      "/FAQ",
      "/dashboard",
      "/packagelist",
    ],
  });
  UserDataApi.setContactInfo.mockResolvedValue(RESPONSE_CODE.USER_EXISTS);
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
  Auth.currentAuthenticatedUser.mockImplementationOnce(() => {
    throw "an Error";
  });

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await act(async () => {});
});
