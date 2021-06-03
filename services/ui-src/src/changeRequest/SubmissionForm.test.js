import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ROUTES } from "cmscommonlib";

import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import { SubmissionForm } from "./SubmissionForm";

import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
jest.mock("../utils/ChangeRequestDataApi");

import { uploadFiles } from "../utils/s3Uploader";
jest.mock("../utils/s3Uploader");


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

it("does not clear Transmittal Number if submit fails.", async () => {
  const testValues = {
    transmittalNumber: "MI-12-1122-CHIP",
    additionalInformation: "This is a test",
  };

  window.HTMLElement.prototype.scrollIntoView = function () {};

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
  const summaryEl = screen.getByLabelText("Additional Information");

  expect(transmittalNumberEl.value).toBe("");
  expect(summaryEl.value).toBe("");

  ChangeRequestDataApi.packageExists.mockResolvedValue(false);
  userEvent.type(transmittalNumberEl, testValues.transmittalNumber);
  userEvent.type(summaryEl, testValues.additionalInformation);

  expect(transmittalNumberEl.value).toBe(testValues.transmittalNumber);
  expect(summaryEl.value).toBe(testValues.additionalInformation);

  // click the submit button
  userEvent.click(screen.getByText("Submit", { selector: "input" }));
  await screen.findByText("There was a problem submitting your form.");

  expect(transmittalNumberEl.value).toBe(testValues.transmittalNumber);
  expect(summaryEl.value).toBe(testValues.additionalInformation);
});

it("does not clear already uploaded file list if submit fails.", async () => {
  const testFile = new File(["hello"], "hello.png", { type: "image/png" });

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

  // add the file via the upload widget
  const uploadInput = screen.getByTestId("uploader-input-0");
  userEvent.upload(uploadInput, [testFile]);
  await screen.findByText(testFile.name);

  uploadFiles.mockResolvedValue();
  userEvent.click(screen.getByText("Submit", { selector: "input" }));
  await screen.findByText("There was a problem submitting your form.");
  expect(screen.getByText(testFile.name)).toBeInTheDocument();
});
