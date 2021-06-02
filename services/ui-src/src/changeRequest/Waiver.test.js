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

/*
// 8778 Regression Testing - Attachment is required message is not displayed if uploaded doc is deleted
it("displays required message after required file is deleted and in show error mode.", async () => {
  const requiredList = ["Required File 1", "Required File 2"],
    optionalList = ["Optional File 1", "Optional File 2"],
    showErrorMode = true;

  render(
    <FileUploader
      requiredUploads={requiredList}
      optionalUploads={optionalList}
      showRequiredFieldErrors={showErrorMode}
    ></FileUploader>
  );

  // there should be a row for each entry


});

// 8776 Regression Testing - Uploaded documents are deleted
it("maintains file list information through failed submit", async () => {
  const requiredList = ["Required File 1", "Required File 2"],
    optionalList = ["Optional File 1", "Optional File 2"],
    showErrorMode = true;

  render(
    <FileUploader
      requiredUploads={requiredList}
      optionalUploads={optionalList}
      showRequiredFieldErrors={showErrorMode}
    ></FileUploader>
  );

  // there should be a row for each entry


});


/*
it("sets the label to the file name of the files to be uploaded", () => {
  const initial = "303-909-8080",
    replacement = "202-867-5309";

  render(<PhoneNumber initialValue={initial} />);

  // click Edit button to start editing
  fireEvent.click(screen.getByText("Edit", { selector: "button" }));
  // change the value in the input
  fireEvent.change(screen.getByLabelText("Phone Number"), {
    target: { value: replacement },
  });
  // click Cancel button to revert changes
  fireEvent.click(screen.getByText("Cancel", { selector: "button" }));

  // input is no longer there
  expect(screen.queryByLabelText("Phone Number")).toBeNull();
  // the review component is back with the original value
  expect(screen.getByText("Phone Number").parentNode).toHaveTextContent(
    initial
  );
});

it("lets you submit your changes", () => {
  const initial = "303-909-8080",
    replacement = "202-867-5309",
    onSubmitFn = jest.fn();

  render(<PhoneNumber initialValue={initial} onSubmit={onSubmitFn} />);

  // click Edit button to start editing
  fireEvent.click(screen.getByText("Edit", { selector: "button" }));
  // change the value in the input
  fireEvent.change(screen.getByLabelText("Phone Number"), {
    target: { value: replacement },
  });
  // click Submit button to persist changes
  fireEvent.click(screen.getByText("Submit", { selector: "button" }));

  // check that submit handler was called
  expect(onSubmitFn).toBeCalledWith(replacement);
});
*/
