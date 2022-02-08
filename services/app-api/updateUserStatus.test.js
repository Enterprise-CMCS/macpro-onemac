import {
  RESPONSE_CODE,
  USER_STATUS,
  territoryMap,
  roleLabels,
  APPROVING_USER_TYPE,
} from "cmscommonlib";
import sendEmail from "./libs/email-lib";

import { getUser } from "./getUser";
import { getMyApprovers } from "./getMyApprovers";
import {
  main,
  accessChangeNotice,
  selfRevokeAdminNotice,
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
/*
it("errors when user exists", async () => {
  getUser.mockImplementationOnce(() => {
    return { email: "testemail", fullName: "I exist" };
  });

  const testEvent = { body: '{"email":"testEmail"}' };
  const expectedReturn = RESPONSE_CODE.USER_EXISTS;
  expect(setContactInfo(testEvent)).resolves.toStrictEqual(expectedReturn);
});

it("returns User Submitted when complete", async () => {
  const testEvent = { body: '{"email":"testEmail"}' };
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
*/
