import dynamoDb from "./libs/dynamodb-lib";
import { getUser } from "./getUser";
import { getMyUserList, buildParams } from "./getMyUserList";
import { RESPONSE_CODE, /*getUserRoleObj,*/ USER_ROLE } from "cmscommonlib";

const testDoneBy = {
  roleList: [{ role: "statesystemadmin", status: "active", territory: "MD" }],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

const testDoneByHelpdesk = {
  roleList: [{ role: "helpdesk", status: "active", territory: "N/A" }],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

const testCantBeDoneBy = {
  roleList: [{ role: "statesubmitter", status: "active", territory: "MD" }],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

jest.mock("./getUser");
jest.mock("./libs/dynamodb-lib");
//jest.mock("cmscommonlib");

beforeAll(() => {
  jest.clearAllMocks();

  getUser.mockImplementation(() => {
    return testDoneBy;
  });
  /* getUserRoleObj.mockImplementation(() => {
    return { canAccessUserManagement: true };
  }); */
  dynamoDb.query.mockImplementation(() => {
    return { Items: "something" };
  });
});

it("builds the correct parameters for system admin", () => {
  const expectedParams = {
    ExpressionAttributeNames: {
      "#date": "date",
      "#role": "role",
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":user": "USER",
    },
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk=:user",
    ProjectionExpression:
      "#date, doneByName, email, fullName, #role, #status, territory",
    TableName: undefined,
  };
  expect(buildParams(USER_ROLE.SYSTEM_ADMIN, "Territory")).toStrictEqual(
    expectedParams
  );
});

it("builds the correct parameters for CMS Role Approvers", () => {
  const expectedParams = {
    ExpressionAttributeNames: {
      "#date": "date",
      "#role": "role",
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":sk": "cmsroleapprover",
      ":user": "USER",
    },
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk=:user AND GSI1sk=:sk",
    ProjectionExpression:
      "#date, doneByName, email, fullName, #role, #status, territory",
    TableName: undefined,
  };
  expect(buildParams(USER_ROLE.CMS_ROLE_APPROVER, "Territory")).toStrictEqual(
    expectedParams
  );
});

it("builds the correct parameters for State System Admins", () => {
  const expectedParams = {
    ExpressionAttributeNames: {
      "#date": "date",
      "#role": "role",
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":sk": "statesystemadmin#VA",
      ":user": "USER",
    },
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk=:user AND GSI1sk=:sk",
    ProjectionExpression:
      "#date, doneByName, email, fullName, #role, #status, territory",
    TableName: undefined,
  };
  expect(buildParams(USER_ROLE.STATE_SYSTEM_ADMIN, "VA")).toStrictEqual(
    expectedParams
  );
});

it("builds the correct parameters for Helpdesk", () => {
  const expectedParams = {
    ExpressionAttributeNames: {
      "#date": "date",
      "#role": "role",
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":role": "systemadmin",
      ":user": "USER",
    },
    FilterExpression: "#role <> :role",
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk=:user",
    ProjectionExpression:
      "#date, doneByName, email, fullName, #role, #status, territory",
    TableName: undefined,
  };
  expect(buildParams(USER_ROLE.HELPDESK, "Territory")).toStrictEqual(
    expectedParams
  );
});

it("errors when no email provided", async () => {
  getUser.mockImplementationOnce(() => {
    return null;
  });

  const expectedReturn = RESPONSE_CODE.USER_NOT_FOUND;
  expect(getMyUserList({ queryStringParameters: { email: "" } }))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("errors when user lacks authority", async () => {
  getUser.mockImplementationOnce(() => {
    return testCantBeDoneBy;
  });

  /*getUserRoleObj.mockImplementationOnce(() => {
    return { canAccessUserManagement: false };
  });*/

  const expectedReturn = RESPONSE_CODE.USER_NOT_AUTHORIZED;
  expect(getMyUserList({ queryStringParameters: { email: "" } }))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("returns Items when successful", async () => {
  const expectedReturn = "something";

  expect(getMyUserList({ queryStringParameters: { email: "" } }))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("handle exceptions", async () => {
  dynamoDb.query.mockImplementationOnce(() => {
    throw "an exception";
  });

  const expectedReturn = RESPONSE_CODE.DATA_RETRIEVAL_ERROR;

  expect(getMyUserList({ queryStringParameters: { email: "" } }))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
