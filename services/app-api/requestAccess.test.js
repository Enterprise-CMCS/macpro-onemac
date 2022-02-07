import { RESPONSE_CODE } from "cmscommonlib";
import {
  main,
  requestAccess,
  accessPendingNotice,
  adminNotice,
} from "./requestAccess";
import { getCMSDateFormatNow } from "./changeRequest/email-util";
import getUser from "./utils/getUser";
import { changeUserStatus } from "./utils/changeUserStatus";
import { getMyApprovers } from "./getMyApprovers";
import sendEmail from "./libs/email-lib";

const testDoneBy = {
  roleList: [{ role: "statesubmitter", status: "active", territory: "MD" }],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

jest.mock("./changeRequest/email-util");
jest.mock("./utils/getUser");
jest.mock("./utils/changeUserStatus");
jest.mock("./getMyApprovers");
jest.mock("./libs/email-lib");

getCMSDateFormatNow.mockImplementation(() => "real now");
getUser.mockImplementation(() => {
  return testDoneBy;
});
changeUserStatus.mockImplementation(() => {
  return null;
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

it("builds the pending notice", () => {
  const expectedResponse = {
    fromAddressSource: "userAccessEmailSource",
    ToAddresses: [`Full Name <email@test.com>`],
    Subject: "Your OneMAC Role Access is Pending Review",
    HTML: "<p>Hello,</p><p>We received your request as a State Submitter on real now. Your request is pending review and you will receive a confirmation receipt when your status is reviewed.</p><p>Thank you!</p>",
  };

  expect(
    accessPendingNotice("Full Name", "statesubmitter", "email@test.com")
  ).toStrictEqual(expectedResponse);
});

it("builds the admin notice", () => {
  const expectedResponse = {
    fromAddressSource: "userAccessEmailSource",
    ToAddresses: ["admin One <email1>", "admin Two <email2>"],
    Subject: `New OneMAC State Submitter Access Request`,
    HTML: "<p>Hello,</p><p>There is a new OneMAC State Submitter access request for Maryland from Full Name waiting for your review.  Please log into your User Management Dashboard to see the pending request.</p><p>Thank you!</p>",
  };

  expect(
    adminNotice(
      "MD",
      "Full Name",
      [
        { fullName: "admin One", email: "email1" },
        { fullName: "admin Two", email: "email2" },
      ],
      "statesubmitter"
    )
  ).toStrictEqual(expectedResponse);
});

it("errors when no email provided", async () => {
  getUser.mockImplementationOnce(() => {
    return null;
  });

  const testEvent = { body: '{"email":"testEmail"}' };
  const expectedReturn = RESPONSE_CODE.USER_NOT_FOUND;
  expect(requestAccess(testEvent)).resolves.toStrictEqual(expectedReturn);
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
