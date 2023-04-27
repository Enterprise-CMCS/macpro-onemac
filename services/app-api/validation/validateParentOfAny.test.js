import dynamoDb from "../libs/dynamodb-lib";
import { validateParentOfAny } from "./validateParentOfAny";

jest.mock("../libs/dynamodb-lib");

beforeEach(() => {
  jest.clearAllMocks();
});

const testEvent = {
  pathParameters: {
    parentId: "ParentID",
  },
};

// if the config does not specify type or status, then existence is all that's needed
const testConfig1 = {};

// if the config does specify type, status, or both, then must check those
const testConfig2 = {
  allowedParentStatuses: ["AllowedStatus1", "AllowedStatus2"],
  allowedParentTypes: ["ParentType1", "ParentType2"],
};

const emptyResults = {};
const getResults1 = { Item: [{ someAttribute: "someValue" }] };
const queryResults1 = { Items: [{ someAttribute: "someValue" }] };
const getResults2 = {
  Item: [
    { someAttribute: "someValue" },
    { componentType: "ParentType1", currentStatus: "AllowedStatus2" },
  ],
};
const queryResults2 = {
  Items: [
    { someAttribute: "someValue" },
    {
      STATE_PLAN: { SPW_STATUS_ID: 1, PLAN_TYPE: 2, ACTION_TYPE: 1 },
      SPW_STATUS: { SPW_STATUS_ID: 1, SPW_STATUS_DESC: "AllowedStatus1" },
      PLAN_TYPES: { PLAN_TYPE_ID: 2, PLAN_TYPE_NAME: "Parent" },
      ACTIONTYPES: { ACTION_NAME: "Type2", ACTION_ID: 1 },
    },
  ],
};

it("returns false if it does not find the parent as either a package item or a SEATool event", async () => {
  dynamoDb.get.mockResolvedValue(emptyResults);
  dynamoDb.query.mockResolvedValue(emptyResults);

  expect(validateParentOfAny(testEvent, testConfig1))
    .resolves.toEqual(false)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("returns true if any Package Items return and there are no config specifics", async () => {
  dynamoDb.get.mockResolvedValue(getResults1);
  dynamoDb.query.mockResolvedValue(queryResults1);

  expect(validateParentOfAny(testEvent, testConfig1))
    .resolves.toEqual(true)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("returns false if Items do not match config specifics", async () => {
  dynamoDb.get.mockResolvedValue(getResults1);
  dynamoDb.query.mockResolvedValue(queryResults1);

  expect(validateParentOfAny(testEvent, testConfig2))
    .resolves.toEqual(false)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("returns true if a Package Item does match config specifics", async () => {
  dynamoDb.get.mockResolvedValue(getResults2);

  expect(validateParentOfAny(testEvent, testConfig2))
    .resolves.toEqual(true)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("returns true if a Package Item is not found, but a SEATool event does match config specifics", async () => {
  dynamoDb.get.mockResolvedValue(emptyResults);
  dynamoDb.query.mockResolvedValue(queryResults2);

  expect(validateParentOfAny(testEvent, testConfig2))
    .resolves.toEqual(true)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

// it("updates status on a parent package", async () => {
//   const response = await changeStatusAny(testEvent, testConfig);
//   expect(response).toEqual(RESPONSE_CODE.PACKAGE_WITHDRAW_SUCCESS);
// });

// it("returns error code for unauthorized user", async () => {
//   getUser.mockResolvedValue(testUnauthUser);
//   const response = await changeStatusAny(testEvent, testConfig);
//   expect(response).toEqual(RESPONSE_CODE.USER_NOT_AUTHORIZED);
// });

// it("returns validation error code when error occurs getting user", async () => {
//   getUser.mockImplementation(() => {
//     throw new Error("User error");
//   });
//   const response = await changeStatusAny(testEvent, testConfig);
//   expect(response).toEqual(RESPONSE_CODE.VALIDATION_ERROR);
// });

// it("returns data retrieval error code when error occurs calling update", async () => {
//   updateComponent.mockImplementation(() => {
//     throw new Error("Update error");
//   });
//   const response = await changeStatusAny(testEvent, testConfig);
//   expect(response).toEqual(RESPONSE_CODE.DATA_RETRIEVAL_ERROR);
// });

// it("logs email error but still returns success code", async () => {
//   const mockError = new Error("Email error");
//   sendEmail.mockImplementation(() => {
//     throw mockError;
//   });
//   const logSpy = jest.spyOn(console, "error");

//   const response = await changeStatusAny(testEvent, testConfig);
//   expect(response).toEqual(RESPONSE_CODE.PACKAGE_WITHDRAW_SUCCESS);

//   expect(logSpy).toHaveBeenCalledWith(
//     "Failed to send acknowledgement emails",
//     mockError
//   );
// });
