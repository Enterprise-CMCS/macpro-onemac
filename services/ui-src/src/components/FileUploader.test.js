import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FileUploader, { MISSING_REQUIRED_MESSAGE } from "./FileUploader";

const requiredList = ["Required File 1", "Required File 2"],
  optionalList = ["Optional File 1", "Optional File 2"];

it("has an upload lane for each required and optional upload", () => {
  render(
    <FileUploader
      requiredUploads={requiredList}
      optionalUploads={optionalList}
    ></FileUploader>
  );

  requiredList.map((attachmentTypeName) => {
    expect(screen.getByText(attachmentTypeName)).toBeInTheDocument();
  });
  optionalList.map((attachmentTypeName) => {
    expect(screen.getByText(attachmentTypeName)).toBeInTheDocument();
  });
});

// 8778 Regression Testing - Attachment is required message is not displayed if uploaded doc is deleted
it("displays required message in show error mode.", () => {
  const showErrorMode = true;

  render(
    <FileUploader
      requiredUploads={requiredList}
      optionalUploads={optionalList}
      showRequiredFieldErrors={showErrorMode}
    ></FileUploader>
  );

  expect(screen.getByText(MISSING_REQUIRED_MESSAGE)).toBeInTheDocument();
});

it("removes required message when requirements met.", async () => {
  const showErrorMode = true;

  render(
    <FileUploader
      requiredUploads={requiredList}
      optionalUploads={optionalList}
      showRequiredFieldErrors={showErrorMode}
    ></FileUploader>
  );

  expect(screen.getByText(MISSING_REQUIRED_MESSAGE)).toBeInTheDocument();

  let testFile0 = new File(["hello0"], "hello0.png", {
    type: "image/png",
  });
  let uploadInput0 = screen.getByTestId("uploader-input-0");
  userEvent.upload(uploadInput0, [testFile0]);
  await screen.findByText(testFile0.name);

  expect(screen.getByText(MISSING_REQUIRED_MESSAGE)).toBeInTheDocument();

  let testFile1 = new File(["hello1"], "hello1.png", {
    type: "image/png",
  });
  let uploadInput1 = screen.getByTestId("uploader-input-1");
  userEvent.upload(uploadInput1, [testFile1]);
  await screen.findByText(testFile1.name);

  expect(screen.queryByText(MISSING_REQUIRED_MESSAGE)).not.toBeInTheDocument();
});

it("uploads when referenced.", async () => {
  const showErrorMode = true;

  render(
    <FileUploader
      requiredUploads={requiredList}
      optionalUploads={optionalList}
      showRequiredFieldErrors={showErrorMode}
    ></FileUploader>
  );

  expect(screen.getByText(MISSING_REQUIRED_MESSAGE)).toBeInTheDocument();

  let testFile0 = new File(["hello0"], "hello0.png", {
    type: "image/png",
  });
  let uploadInput0 = screen.getByTestId("uploader-input-0");
  userEvent.upload(uploadInput0, [testFile0]);
  await screen.findByText(testFile0.name);

  expect(screen.getByText(MISSING_REQUIRED_MESSAGE)).toBeInTheDocument();

  let testFile1 = new File(["hello1"], "hello1.png", {
    type: "image/png",
  });
  let uploadInput1 = screen.getByTestId("uploader-input-1");
  userEvent.upload(uploadInput1, [testFile1]);
  await screen.findByText(testFile1.name);

  expect(screen.queryByText(MISSING_REQUIRED_MESSAGE)).not.toBeInTheDocument();
});

it("removes the file when X is clicked", async () => {
  const showErrorMode = true;

  render(
    <FileUploader
      requiredUploads={requiredList}
      optionalUploads={optionalList}
      showRequiredFieldErrors={showErrorMode}
    ></FileUploader>
  );

  let testFile0 = new File(["hello0"], "hello0.png", {
    type: "image/png",
  });
  let uploadInput0 = screen.getByTestId("uploader-input-0");
  userEvent.upload(uploadInput0, [testFile0]);
  await screen.findByText(testFile0.name);

  let removeFile = screen.getByTitle("Remove file");
  userEvent.click(removeFile);
  await waitFor(() => expect(removeFile).not.toBeInTheDocument());
});
