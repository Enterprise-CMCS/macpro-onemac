import dynamoDb from "./libs/dynamodb-lib";
import getUser from "./utils/getUser";
import { getMyUserList, buildParams } from "./getMyUserList";
import { RESPONSE_CODE, getUserRoleObj } from "cmscommonlib";

const testDoneBy = {
  roleList: [{ role: "statesubmitter", status: "active", territory: "MD" }],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};
jest.mock("./utils/getUser");
jest.mock("./libs/dynamodb-lib");
jest.mock("cmscommonlib");

beforeEach(() => {
  getUser.mockImplementation(() => {
    return testDoneBy;
  });
  getUserRoleObj.mockImplementation(() => {
    return { canAccessUserManagement: true };
  });
  dynamoDb.query.mockImplementation(() => {
    return { Items: "something" };
  });
});

it("builds the correct paramaters", () => {
  const expectedParams = {
    ExpressionAttributeNames: {
      "#date": "date",
      "#role": "role",
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":sk": "statesystemadmin#Territory",
      ":user": "USER",
    },
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk=:user AND GSI1sk=:sk",
    ProjectionExpression:
      "#date, doneByName, email, fullName, #role, #status, territory",
    TableName: undefined,
  };
  expect(buildParams("Role", "Territory")).toStrictEqual(expectedParams);
});

it("errors when no email provided", async () => {
  getUser.mockImplementationOnce(() => {
    return null;
  });

  const expectedReturn = RESPONSE_CODE.USER_NOT_FOUND;
  expect(
    getMyUserList({ queryStringParameters: { email: "" } })
  ).resolves.toStrictEqual(expectedReturn);
});

it("errors when user lacks authority", async () => {
  getUserRoleObj.mockImplementationOnce(() => {
    return { canAccessUserManagement: false };
  });

  const expectedReturn = RESPONSE_CODE.USER_NOT_AUTHORIZED;
  expect(
    getMyUserList({ queryStringParameters: { email: "" } })
  ).resolves.toStrictEqual(expectedReturn);
});

it("returns Items when successful", async () => {
  const expectedReturn = "something";

  expect(
    getMyUserList({ queryStringParameters: { email: "" } })
  ).resolves.toStrictEqual(expectedReturn);
});
