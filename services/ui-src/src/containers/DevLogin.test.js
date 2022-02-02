import React from "react";
import { act } from "react-dom/test-utils";
import { render, fireEvent, screen } from "@testing-library/react";
import { Auth } from "aws-amplify";

import { AppContext } from "../libs/contextLib";
import DevLogin from "./DevLogin";

jest.mock("aws-amplify");
jest.mock("../utils/config", () => ({ ALLOW_DEV_LOGIN: "true" }));

beforeEach(() => {
  HTMLElement.prototype.scrollIntoView = jest.fn();
});

it("clicky click", async () => {
  render(
    <AppContext.Provider value={{ setUserInfo: jest.fn() }}>
      <DevLogin />
    </AppContext.Provider>
  );
  await act(async () => {
    fireEvent.click(screen.getByRole("button"));
  });
});

it("handles error gracefully", async () => {
  Auth.signIn.mockImplementationOnce(() => {
    throw "";
  });
  render(
    <AppContext.Provider value={{ setUserInfo: jest.fn() }}>
      <DevLogin />
    </AppContext.Provider>
  );

  await act(async () => {
    fireEvent.click(screen.getByRole("button"));
  });

  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Dismiss alert" }));
  });
});
