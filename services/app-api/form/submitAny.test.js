import { RESPONSE_CODE } from "cmscommonlib";
import { submitAny } from "./submitAny";
import { getUser } from "../getUser";
import { initialWaiverB4FormConifg } from "./submitInitialWaiver";
import { withdrawMedicaidSPAFormConfig } from "./withdrawMedicaidSPA";
import { waiverTemporaryExtensionFormConfig } from "./submitWaiverExtension";
import packageExists from "../utils/packageExists";
import { newEvent } from "../utils/newEvent";
import sendEmail from "../libs/email-lib";

jest.mock("../getUser");
jest.mock("../utils/packageExists");
jest.mock("../utils/newEvent");
jest.mock("../libs/email-lib");

const testDoneBy = {
  roleList: [
    { role: "statesubmitter", status: "active", territory: "VA" },
    { role: "statesubmitter", status: "active", territory: "MD" },
  ],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

const testUnauthUser = {
  roleList: [],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

const eventBody = {
  componentId: "VA-1117.R00.00",
  territory: "VA",
  submitterEmail: "statesubmitteractive@cms.hhs.local",
  submitterName: "Angie Active",
  proposedEffectiveDate: "2022-01-01",
  attachments: [
    {
      contentType: "image/png",
      filename: "myfile.png",
      s3Key: "path/in/s3",
      title: "Other",
      url: "https://www.notasite.gov",
    },
  ],
  waiverAuthority: "me",
};

const eventBody2 = {
  componentId: "VA-11-0909",
  componentType: "medicaidspawithdraw",
  parentId: "VA-11-0909",
  parentType: "medicaidspa",
  territory: "VA",
  submitterEmail: "statesubmitteractive@cms.hhs.local",
  submitterName: "Angie Active",
  proposedEffectiveDate: "2022-01-01",
  attachments: [
    {
      contentType: "image/png",
      filename: "myfile.png",
      s3Key: "path/in/s3",
      title: "Other",
      url: "https://www.notasite.gov",
    },
  ],
  waiverAuthority: "me",
};

const tempExtensionEventBody = {
  componentId: "VA-9887.R00.TE01",
  parentId: "VA-9887.R00.00",
  parentType: "waivernew",
  territory: "VA",
  submitterEmail: "statesubmitteractive@cms.hhs.local",
  submitterName: "Angie Active",
  temporaryExtensionType: "1915(b)",
  attachments: [
    {
      contentType: "image/png",
      filename: "myfile.png",
      s3Key: "path/in/s3",
      title: "Other",
      url: "https://www.notasite.gov",
    },
  ],
};

const invalidEventBody = {
  transmittalNumber: "VA-1117", //transmittal number is invalid format
  submitterEmail: "statesubmitteractive@cms.hhs.local",
  submitterName: "Angie Active",
  proposedEffectiveDate: "2022-01-01",
  uploads: [
    {
      contentType: "image/png",
      filename: "myfile.png",
      s3Key: "path/in/s3",
      title: "Other",
      url: "https://www.notasite.gov",
    },
  ],
  waiverAuthority: "me",
};

const testEventNoParse = {
  body: `{this should not parse!!!!!`,
};

const testEvent = {
  body: JSON.stringify(eventBody),
  requestContext: {
    identity: {
      cognitoIdentityId: "1234",
    },
  },
};

const testEvent2 = {
  body: JSON.stringify(eventBody2),
  requestContext: {
    identity: {
      cognitoIdentityId: "1234",
    },
  },
};

const tempExtensionTestEvent = {
  body: JSON.stringify(tempExtensionEventBody),
  requestContext: {
    identity: {
      cognitoIdentityId: "1234",
    },
  },
};

const invalidTestEvent = {
  body: JSON.stringify(invalidEventBody),
  requestContext: {
    identity: {
      cognitoIdentityId: "1234",
    },
  },
};

const testConfig = { ...initialWaiverB4FormConifg };
const testConfig2 = { ...withdrawMedicaidSPAFormConfig };
const tempExtentsionTestConfig = { ...waiverTemporaryExtensionFormConfig };

beforeEach(() => {
  jest.clearAllMocks();

  getUser.mockResolvedValue(testDoneBy);
  packageExists.mockResolvedValue(false);
  sendEmail.mockResolvedValue(null);
  newEvent.mockResolvedValue({});
});

it("catches a badly parsed event", async () => {
  expect(submitAny(testEventNoParse, testConfig))
    .rejects.toThrow("Unexpected token t in JSON at position 1")
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("submits a initial waiver", async () => {
  const response = await submitAny(testEvent, testConfig);
  expect(response).toEqual(RESPONSE_CODE.SUCCESSFULLY_SUBMITTED);
});

it("rejects a duplicate id initial waiver", async () => {
  packageExists.mockResolvedValue(true);
  const response = await submitAny(testEvent, testConfig);
  expect(response).toEqual(RESPONSE_CODE.DUPLICATE_ID);
});

it("rejects a duplicate id for temp extension", async () => {
  packageExists.mockResolvedValue(true);
  const response = await submitAny(
    tempExtensionTestEvent,
    tempExtentsionTestConfig
  );
  expect(response).toEqual(RESPONSE_CODE.DUPLICATE_ID);
});

it("returns error code for validation error", async () => {
  const response = await submitAny(invalidTestEvent, testConfig);
  expect(response).toEqual(RESPONSE_CODE.VALIDATION_ERROR);
});

it("returns error code for unauthorized user", async () => {
  getUser.mockResolvedValue(testUnauthUser);
  const response = await submitAny(testEvent, testConfig);
  expect(response).toEqual(RESPONSE_CODE.USER_NOT_AUTHORIZED);
});

it("returns error code when new submission fails", async () => {
  newEvent.mockImplementation(() => {
    throw new Error("Submit error");
  });
  const response = await submitAny(testEvent, testConfig);
  expect(response).toEqual(RESPONSE_CODE.SUBMISSION_SAVE_FAILURE);

  // const response2 = await submitAny(testEvent2, testConfig2);
  // expect(response2).toEqual(RESPONSE_CODE.SUBMISSION_SAVE_FAILURE);
});

it("returns error code when CMS email fails", async () => {
  sendEmail.mockImplementation(() => {
    throw new Error("Email error");
  });
  const response = await submitAny(testEvent, testConfig);
  expect(response).toEqual(RESPONSE_CODE.EMAIL_NOT_SENT);
});

it("returns success code even when State email fails", async () => {
  sendEmail.mockImplementationOnce(() => {
    return null; //success - first email is CMS email
  });
  sendEmail.mockImplementationOnce(() => {
    throw new Error("Email error"); //second email is state email
  });
  const response = await submitAny(testEvent, testConfig);
  expect(response).toEqual(RESPONSE_CODE.SUCCESSFULLY_SUBMITTED);
});
