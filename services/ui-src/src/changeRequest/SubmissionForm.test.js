import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ROUTES } from "cmscommonlib";

import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import { SubmissionForm } from "./SubmissionForm";

import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
jest.mock("../utils/ChangeRequestDataApi");

import { AppContext } from "../libs/contextLib";
import { act } from "react-dom/test-utils";

it("does not clear inputs if submit fails.", async () => {
  const testFormInfo = {
    pageTitle: "Testing Submission Form",
    readOnlyPageTitle: "Read Only Title - Test",
    detailsHeader: "Testing Header",
    subheaderMessage:
      "This text should never show, it is in place for unit testing.",
    requiredUploads: [
      "Required File 1",
      "Required File with a really long title 2",
      "Required File 3",
    ],
    optionalUploads: [
      "Optional file upload type 1",
      "Optional file upload type with a really long title 2",
      "O3",
      "Optional file upload type 4",
    ],
    transmittalNumber: {
      idType: "chipspa",
      idLabel: "Transmittal Number",
      idHintText: "Must follow the format SS-YY-NNNN-xxxx",
      idFAQLink: ROUTES.FAQ_SPA_ID,
      idFormat: "SS-YY-NNNN or SS-YY-NNNN-xxxx",
      idRegex:
        "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
      idMustExist: false,
      errorLevel: "error",
    },
  };

  const testValues = {
    transmittalNumber: "MI-12-1122-CHIP",
  };
  const initialAuthState = {
    isAuthenticating: false,
    isAuthenticated: true,
    isLoggedInAsDeveloper: false,
    isValidRoute: true,
    userProfile: {
      cmsRoles: "onemac-state-user",
      email: "stateuseractive@cms.hhs.local",
      firstName: "TestFirstName",
      lastName: "TestLastName",
      userData: {
        firstName: "Angie",
        lastName: "Active",
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

  window.HTMLElement.prototype.scrollIntoView = function () {};

  // have to mock the package-exists call
  ChangeRequestDataApi.packageExists.mockResolvedValue(false);

  render(
    <AppContext.Provider
      value={{
        ...initialAuthState,
      }}
    >
      <SubmissionForm
        formInfo={testFormInfo}
        changeRequestType={CHANGE_REQUEST_TYPES.CHIP_SPA}
      ></SubmissionForm>
    </AppContext.Provider>
  );

  const transmittalNumberEl = screen.getByLabelText(
    testFormInfo.transmittalNumber.idLabel
  );

  // value starts out empty
  expect(transmittalNumberEl.value).toBe("");

  act(() => {
    // Add the value to the transmittal number
    userEvent.type(transmittalNumberEl, testValues.transmittalNumber);
   //await waitForElementToBeRemoved(() => screen.getByText(/saving/i))
  });

  // the transmittal number contains the value
  expect(transmittalNumberEl.value).toBe(testValues.transmittalNumber); // testValues.transmittalNumber);

  act(() => {
    // click the submit button
    userEvent.click(screen.getByText("Submit", { selector: "input" }));
  });

  // the transmittal number still contains the value
  expect(transmittalNumberEl.value).toBe(testValues.transmittalNumber);
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
