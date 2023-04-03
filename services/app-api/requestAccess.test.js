import { RESPONSE_CODE } from "cmscommonlib";
import {
  main,
  requestAccess,
  accessPendingNotice,
  adminNotice,
} from "./requestAccess";
import { getUser } from "./getUser";
import { changeUserStatus } from "./utils/changeUserStatus";
import { getMyApprovers } from "./getMyApprovers";
import sendEmail from "./libs/email-lib";
import { getCMSDateFormat } from "./utils/date-utils";

const testDoneBy = {
  roleList: [{ role: "statesubmitter", status: "active", territory: "MD" }],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

jest.mock("./utils/date-utils");
jest.mock("./getUser");
jest.mock("./utils/changeUserStatus");
jest.mock("./getMyApprovers");
jest.mock("./libs/email-lib");

getCMSDateFormat.mockImplementation(() => "real now");
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

const testEvent = { body: '{"email":"testEmail"}' };

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

  const expectedReturn = RESPONSE_CODE.USER_NOT_FOUND;
  expect(requestAccess(testEvent))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("handles getUser exceptions", async () => {
  getUser.mockImplementationOnce(() => {
    throw "getUser Error";
  });

  const expectedReturn = RESPONSE_CODE.USER_NOT_FOUND;
  expect(requestAccess(testEvent))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("handles changeUserStatus exceptions", async () => {
  changeUserStatus.mockImplementationOnce(() => {
    throw "getUser Error";
  });

  const expectedReturn = RESPONSE_CODE.USER_SUBMISSION_FAILED;
  expect(requestAccess(testEvent))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("handles sendEmail exceptions", async () => {
  sendEmail.mockImplementationOnce(() => {
    throw "getUser Error";
  });

  const expectedReturn = RESPONSE_CODE.USER_SUBMITTED;
  expect(requestAccess(testEvent))
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

  expect(main(testEvent))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
