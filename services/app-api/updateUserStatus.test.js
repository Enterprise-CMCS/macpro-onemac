import { RESPONSE_CODE, USER_STATUS } from "cmscommonlib";
import sendEmail from "./libs/email-lib";

import { getUser } from "./getUser";
import { getMyApprovers } from "./getMyApprovers";
import { changeUserStatus } from "./utils/changeUserStatus";
import {
  main,
  accessChangeNotice,
  selfRevokeAdminNotice,
  doUpdate,
  updateUserStatus,
} from "./updateUserStatus";

const testDoneBy = {
  roleList: [{ role: "statesubmitter", status: "active", territory: "MD" }],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

jest.mock("./getUser");
jest.mock("./getMyApprovers");
jest.mock("./libs/email-lib");
jest.mock("./utils/changeUserStatus");

beforeAll(() => {
  jest.clearAllMocks();

  getUser.mockImplementation(() => {
    return testDoneBy;
  });
  getMyApprovers.mockImplementation(() => {
    return [
      { fullName: "admin One", email: "email1" },
      { fullName: "admin Two", email: "email2" },
    ];
  });
  sendEmail.mockImplementation(() => {
    return null;
  });
  changeUserStatus.mockImplementation(() => {
    return null;
  });
});

const testEvent = {
  body: '{"doneByEmail":"testDoneByEmail","email":"testEmail","role":"testRole", "territory":"MD", "status": "active"}',
};

const testRevokedEvent = {
  body: '{"doneByEmail":"testDoneByEmail","email":"testDoneByEmail","role": "defaultcmsuser", "territory":"MD", "status": "revoked"}',
};

it("builds the access change notice", () => {
  const expectedResponse = {
    fromAddressSource: "userAccessEmailSource",
    ToAddresses: [`Full Name <email@test.com>`],
    Subject: `Your OneMAC State Submitter Access for Maryland has been granted`,
    HTML: `<p>Hello,</p><p>Your access as a State Submitter for Maryland has been granted. If you have any questions, please reach out to your State System Admin.</p><p>Thank you!</p>`,
  };

  expect(
    accessChangeNotice(
      "MD",
      "Full Name",
      "statesubmitter",
      "email@test.com",
      USER_STATUS.ACTIVE
    )
  ).toStrictEqual(expectedResponse);
});

it("builds the self-revoke admin notice", () => {
  const expectedResponse = {
    fromAddressSource: "userAccessEmailSource",
    ToAddresses: [`admin One <email1>`, `admin Two <email2>`],
    Subject: `OneMAC State access for Maryland was self-revoked by Full Name`,
    HTML: `<p>Hello,</p><p>The OneMAC State access for Maryland has been self-revoked by Full Name. Please log into your User Management Dashboard to see the updated access.</p><p>Thank you!</p>`,
  };

  expect(
    selfRevokeAdminNotice("MD", "Full Name", [
      { fullName: "admin One", email: "email1" },
      { fullName: "admin Two", email: "email2" },
    ])
  ).toStrictEqual(expectedResponse);
});

it("does the updates", async () => {
  const expectedReturn = undefined;
  expect(
    doUpdate(
      "test body",
      { fullName: "doneBy fullName", email: "email1" },
      { fullName: "doneTo fullName", email: "email2" }
    )
  )
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("handles doUpdate exception 1", async () => {
  changeUserStatus.mockImplementationOnce(() => {
    throw "an exception";
  });

  const expectedReturn = RESPONSE_CODE.USER_SUBMISSION_FAILED;
  expect(
    doUpdate(
      "test body",
      { fullName: "doneBy fullName", email: "email1" },
      { fullName: "doneTo fullName", email: "email2" }
    )
  )
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("ignores doUpdate exception 2", async () => {
  sendEmail.mockImplementationOnce(() => {
    throw "an exception";
  });

  const expectedReturn = undefined;
  expect(
    doUpdate(
      "test body",
      { fullName: "doneBy fullName", email: "email1" },
      { fullName: "doneTo fullName", email: "email2" }
    )
  )
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("handles JSON.parse exceptions", async () => {
  const badParse = "bleh";
  const expectedReturn = RESPONSE_CODE.USER_SUBMISSION_FAILED;
  expect(updateUserStatus(badParse))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("handles getUser exceptions", async () => {
  getUser.mockImplementationOnce(() => {
    throw "an Exception!";
  });

  const expectedReturn = RESPONSE_CODE.USER_NOT_FOUND;
  expect(updateUserStatus(testEvent))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("ignores sendEmail exception", async () => {
  sendEmail.mockImplementationOnce(() => {
    throw "an Exception!";
  });

  const expectedReturn = RESPONSE_CODE.USER_SUBMITTED;
  expect(updateUserStatus(testEvent))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("returns User Submitted when complete", async () => {
  const expectedReturn = {
    statusCode: 200,
    body: JSON.stringify(RESPONSE_CODE.USER_SUBMITTED),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };

  expect(main(testEvent)).resolves.toStrictEqual(expectedReturn);
});

it("returns User Submitted when complete for default CMS users", async () => {
  sendEmail.mockImplementationOnce(() => {
    throw "an Exception!";
  });

  const expectedReturn = {
    statusCode: 200,
    body: JSON.stringify(RESPONSE_CODE.USER_SUBMITTED),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };

  expect(main(testRevokedEvent)).resolves.toStrictEqual(expectedReturn);
});
