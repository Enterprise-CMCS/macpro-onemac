import { RESPONSE_CODE } from "cmscommonlib";
import { submitAny } from "./submitAny";
import { getUser } from "../getUser";
import { defaultFormConfig } from "./defaultFormConfig";
import { baseWaiverFormConfig } from "./submitBaseWaiver";
import packageExists from "../utils/packageExists";
import sendEmail from "../libs/email-lib";
import newSubmission from "../utils/newSubmission";

jest.mock("../getUser");
jest.mock("../utils/packageExists");
jest.mock("../libs/email-lib");
jest.mock("../utils/newSubmission");

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
  transmittalNumber: "VA.1117.R00.00",
  submitterEmail: "statesubmitteractive@cms.hhs.local",
  submitterName: "Angie Active",
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
const testConfig = { ...baseWaiverFormConfig };

beforeAll(() => {
  jest.clearAllMocks();

  getUser.mockResolvedValue(testDoneBy);
  packageExists.mockResolvedValue(false);
  sendEmail.mockResolvedValue(null);
  newSubmission.mockResolvedValue(null);
});

it("catches a badly parsed event", async () => {
  expect(submitAny(testEventNoParse, testConfig))
    .rejects.toThrow("Unexpected token t in JSON at position 1")
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("submits a base waiver", async () => {
  const response = await submitAny(testEvent, testConfig);
  expect(response).toEqual(RESPONSE_CODE.SUCCESSFULLY_SUBMITTED);
});

it("returns error code for unauthorized user", async () => {
  getUser.mockResolvedValue(testUnauthUser);
  const response = await submitAny(testEvent, testConfig);
  expect(response).toEqual(RESPONSE_CODE.USER_NOT_AUTHORIZED);
});
