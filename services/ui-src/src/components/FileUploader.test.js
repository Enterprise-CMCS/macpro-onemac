import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import { FileUploader } from "./FileUploader";

it("has an upload lane for each required and optional upload", async () => {
  const requiredList = ["Required File 1", "Required File 2"],
    optionalList = ["Optional File 1", "Optional File 2"];

  render(
    <FileUploader
      requiredUploads={requiredList}
      optionalUploads={optionalList}
    ></FileUploader>
  );

  // there should be a row for each entry


});

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