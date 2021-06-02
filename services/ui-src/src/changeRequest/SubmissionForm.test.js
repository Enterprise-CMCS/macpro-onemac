import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ROUTES } from "cmscommonlib";

import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import { SubmissionForm } from "./SubmissionForm";

import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
jest.mock("../utils/ChangeRequestDataApi");

import { AppContext } from "../libs/contextLib";

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

const actionTypeOptions = [
  { label: "New waiver", value: "new" },
  { label: "Waiver amendment", value: "amendment" },
  {
    label: "Request for waiver renewal",
    value: "renewal",
  },
];
const waiverAuthorityOptions = [
  {
    label: "1915(b)(4) FFS Selective Contracting waivers",
    value: "1915(b)(4)",
  },
  { label: "All other 1915(b) Waivers", value: "1915(b)" },
];

// oy2-3734 -
it("does not clear Transmittal Number if submit fails.", async () => {
  const testFormInfo = {
    pageTitle: "Testing Submission Form",
    readOnlyPageTitle: "Read Only Title - Test",
    detailsHeader: "Testing Header",
    subheaderMessage:
      "This text should never show, it is in place for unit testing.",
    actionType: {
      fieldName: "actionType",
      errorMessage: "Please select the Action Type.",
      optionsList: actionTypeOptions,
      defaultItem: "an action type",
    },
    waiverAuthority: {
      fieldName: "waiverAuthority",
      errorMessage: "Please select the Waiver Authority.",
      optionsList: waiverAuthorityOptions,
      defaultItem: "a waiver authority",
    },
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
    actionType: "amendment",
    waiverAuthority: "1915(b)",
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
  const actionTypeEl = screen.getByLabelText("Action Type");
  const waiverAuthorityEl = screen.getByLabelText("Waiver Authority");

  // values start out empty
  expect(transmittalNumberEl.value).toBe("");
  expect(actionTypeEl.value).toBe("");
  expect(waiverAuthorityEl.value).toBe("");

  // Add the values to the fields
  userEvent.type(transmittalNumberEl, testValues.transmittalNumber);

  //userEvent.selectOptions(actionTypeEl, "amendment");
  //await screen.findByText("Waiver amendment");
  //expect(screen.getByText("New waiver").selected).toBe(false);
  //expect(screen.getByText("Waiver amendment").selected).toBe(true);
  //expect(screen.getByText("Request for waiver renewal").selected).toBe(false);

  //userEvent.selectOptions(waiverAuthorityEl, "1915(b)");
  //expect(screen.getByRole("option", { name: "1915(b)(4) FFS Selective Contracting waivers" }).selected).toBe(false);
  //expect(screen.getByRole("option", { name: "All other 1915(b) Waivers" }).selected).toBe(true);

  // the transmittal number contains the value
  expect(transmittalNumberEl.value).toBe(testValues.transmittalNumber); // testValues.transmittalNumber);

  // click the submit button
  userEvent.click(screen.getByText("Submit", { selector: "input" }));
  await screen.findByText("There was a problem submitting your form.");

  // the transmittal number still contains the value
  expect(transmittalNumberEl.value).toBe(testValues.transmittalNumber);
});
