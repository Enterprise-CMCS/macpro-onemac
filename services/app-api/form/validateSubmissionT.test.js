import { validateSubmission } from "./validateSubmission";

const testConfig = {
  componentType: "onetype",
  idRegex: "^[A-Z]{5}",
  requiredAttachments: ["required"],
  optionalAttachments: ["optional"],
  deprecatedAttachmentTypes: ["deprecated"],
};

const goodData = {
  componentId: "ABCDE",
  attachments: [
    {
      title: "required",
      contentType: "image/.",
      filename: "file.img",
      s3Key: "s3keytestdata",
      url: "https://www.test.com/file",
    },
  ],
  territory: "MD",
  submitterName: "Tester Submitter",
  submitterEmail: "tester@email.com",
};

const badData = {
  componentId: "A",
  attachments: [
    {
      title: "required",
      contentType: "font/.",
      filename: "file.img",
      s3Key: "s3keytestdata",
      url: "https://www.test.com/file",
    },
  ],
  territory: "MD",
  submitterName: "Tester Submitter",
  submitterEmail: "tester@email.com",
};

it("returns null for valid data", async () => {
  expect(validateSubmission(goodData, testConfig)).toStrictEqual(null);
});

it("returns error message for invalid data", async () => {
  expect(validateSubmission(badData, testConfig)).not.toBeNull();
});
