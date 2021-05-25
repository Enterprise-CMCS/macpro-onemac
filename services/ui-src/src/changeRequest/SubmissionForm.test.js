import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import { ROUTES } from "cmscommonlib";

import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import { SubmissionForm } from "./SubmissionForm";

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

  render(
    <SubmissionForm
      formInfo={testFormInfo}
      changeRequestType={CHANGE_REQUEST_TYPES.CHIP_SPA}
    ></SubmissionForm>
  );

  // fields should start out empty
  expect(
    screen.queryByLabelText(testFormInfo.transmittalNumber.idLabel)
  ).toBeNull();

  // Add the value to the transmittal number
  fireEvent.change(
    screen.getByLabelText(testFormInfo.transmittalNumber.idLabel),
    {
      target: { value: testValues.transmittalNumber },
    }
  );

  // click the submit button
  fireEvent.click(screen.getByText("Submit", { selector: "button" }));

  // the transmittal number still contains the value
  expect(
    screen.getByText(testFormInfo.transmittalNumber.idLabel).parentNode
  ).toHaveTextContent(testValues.transmittalNumber);
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
