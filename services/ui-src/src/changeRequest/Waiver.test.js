import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AppContext } from "../libs/contextLib";
import Waiver from "./Waiver";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import { uploadFiles } from "../utils/s3Uploader";

jest.mock("../utils/s3Uploader");
jest.mock("../utils/ChangeRequestDataApi");

window.HTMLElement.prototype.scrollIntoView = function () {};

const history = createMemoryHistory();
const route = "/waiver";
history.push(route);
// end mocks

// test data
const initialAuthState = {
  isAuthenticating: false,
  isAuthenticated: true,
  isLoggedInAsDeveloper: false,
  isValidRoute: true,
  userProfile: {
    cmsRoles: "onemac-state-user",
    email: "stateuseractive@cms.hhs.local",
    firstName: "Unit",
    lastName: "Tester",
    userData: {
      firstName: "Unita",
      lastName: "Goodcode",
      attributes: [
        {
          stateCode: "MI",
          history: [
            {
              date: 1617149287,
              doneBy: "systemsadmin@cms.hhs.local",
              status: "active",
            },
          ],
        },
        {
          stateCode: "VA",
          history: [
            {
              date: 1617149287,
              doneBy: "systemsadmin@cms.hhs.local",
              status: "active",
            },
          ],
        },
      ],
      id: "stateuseractive@cms.hhs.local",
      type: "stateuser",
      validRoutes: [
        "/",
        "/componentpage",
        "/profile",
        "/devlogin",
        "/FAQ",
        "/dashboard",
        "/dashboard",
        "/spa",
        "/sparai",
        "/chipspa",
        "/chipsparai",
        "/waiver",
        "/waiverappk",
        "/waiverextension",
        "/waiverrai",
      ],
    },
  },
};

describe("Effects of Failed Submit", () => {
  // oy2-3734 Part One - maintaining Action Type, Waiver Authority, and Transmittal Number
  // values after a failed Submit
  it("does not clear already completed form fields if submit fails. (oy2-3734)", async () => {
    const testValues = {
      transmittalNumber: "MI.17234.R03.M22",
      actionType: "amendment",
      waiverAuthority: "1915(b)",
    };

    render(
      <AppContext.Provider
        value={{
          ...initialAuthState,
        }}
      >
        <Router history={history}>
          <Waiver />
        </Router>
      </AppContext.Provider>
    );

    const transmittalNumberEl = screen.getByLabelText("Waiver Number");
    const actionTypeEl = screen.getByLabelText("Action Type");
    const waiverAuthorityEl = screen.getByLabelText("Waiver Authority");

    // values start out empty
    expect(transmittalNumberEl.value).toBe("");
    expect(actionTypeEl.value).toBe("");
    expect(waiverAuthorityEl.value).toBe("");

    userEvent.selectOptions(actionTypeEl, testValues.actionType);
    await screen.findByText("Waiver amendment");

    userEvent.selectOptions(waiverAuthorityEl, testValues.waiverAuthority);
    await screen.findByText("All other 1915(b) Waivers");

    // Don't find the package
    ChangeRequestDataApi.packageExists.mockResolvedValue(false);
    userEvent.type(transmittalNumberEl, testValues.transmittalNumber);
    await screen.findByText(
      "Waiver Number not found. Please ensure you have the correct Waiver Number before submitting. Contact the MACPro Help Desk (code: OMP002) if you need support."
    );
    expect(transmittalNumberEl.value).toBe(testValues.transmittalNumber);

    // click the submit button
    userEvent.click(screen.getByText("Submit", { selector: "input" }));
    await screen.findByText("Missing Required Attachments");

    // the transmittal number still contains the value
    expect(transmittalNumberEl.value).toBe(testValues.transmittalNumber);
    expect(actionTypeEl.value).toBe(testValues.actionType);
    expect(waiverAuthorityEl.value).toBe(testValues.waiverAuthority);
  });

  it("does not clear already uploaded file list if submit fails.", async () => {
    const testFile = new File(["hello"], "hello.png", { type: "image/png" });

    render(
      <AppContext.Provider
        value={{
          ...initialAuthState,
        }}
      >
        <Router history={history}>
          <Waiver />
        </Router>
      </AppContext.Provider>
    );
  
    // add the file via the upload widget
    const uploadInput = screen.getByTestId("uploader-input-0");
    userEvent.upload(uploadInput, [testFile]);
    await screen.findByText(testFile.name);
  
    uploadFiles.mockResolvedValue();
    userEvent.click(screen.getByText("Submit", { selector: "input" }));
    await screen.findByText("There was a problem submitting your form.");
    expect(screen.getByText(testFile.name)).toBeInTheDocument();
  });

});
