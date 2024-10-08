import { RESPONSE_CODE } from "cmscommonlib";
import { main, setContactInfo } from "./setContactInfo";
import { getUser } from "./getUser";
import { newUser } from "./utils/newUser";
import { changeUserStatus } from "./utils/changeUserStatus";

jest.mock("./getUser");
jest.mock("./utils/newUser");
jest.mock("./utils/changeUserStatus");

beforeEach(() => {
  getUser.mockImplementation(() => {
    return null;
  });
  newUser.mockImplementation(() => {
    return null;
  });
  changeUserStatus.mockImplementation(() => {
    return null;
  });
});

const testEvent = { body: '{"email":"testEmail"}' };

it("handles JSON.parse exceptions", async () => {
  const badParse = "bleh";
  const expectedReturn = RESPONSE_CODE.USER_SUBMISSION_FAILED;
  expect(setContactInfo(badParse))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("returns immediately when user exists", async () => {
  getUser.mockImplementationOnce(() => {
    return {
      email: "testemail",
      fullName: "I exist",
      roleList: [{ status: "aStatus", role: "aRole", territory: "N/A" }],
    };
  });

  const expectedReturn = RESPONSE_CODE.USER_EXISTS;
  expect(setContactInfo(testEvent))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("returns User Submitted with new state user", async () => {
  const expectedReturn = {
    statusCode: 200,
    body: JSON.stringify(RESPONSE_CODE.USER_SUBMITTED),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
  const validStateUserEvent = {
    body: '{"email":"testEmail","cmsRoles":"onemac-stateuser"}',
  };

  expect(main(validStateUserEvent))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("returns User Submitted with new cms user", async () => {
  const expectedReturn = {
    statusCode: 200,
    body: JSON.stringify(RESPONSE_CODE.USER_SUBMITTED),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
  const validStateUserEvent = {
    body: '{"email":"testEmail","cmsRoles":"onemac-notstateuser"}',
  };

  expect(main(validStateUserEvent))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("handles getUser exceptions", async () => {
  getUser.mockImplementationOnce(() => {
    throw "an Exception!";
  });

  const expectedReturn = RESPONSE_CODE.USER_SUBMISSION_FAILED;
  expect(setContactInfo(testEvent))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("handles newUser exceptions", async () => {
  newUser.mockImplementationOnce(() => {
    throw "an Exception!";
  });

  const expectedReturn = RESPONSE_CODE.USER_SUBMISSION_FAILED;
  expect(setContactInfo(testEvent))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
