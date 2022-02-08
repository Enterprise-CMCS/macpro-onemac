import dynamoDb from "./libs/dynamodb-lib";
import { getUserRoleObj, USER_STATUS } from "cmscommonlib";
import { main, getUser } from "./getUser";

jest.mock("./libs/dynamodb-lib");
jest.mock("cmscommonlib");

const testContactDetail = { email: "testEmail", fullName: "My Name" };
const testAccessList = [
  { role: "statesubmitter", territory: "VA", status: USER_STATUS.ACTIVE },
];
const testValidRoutes = "accesses";
dynamoDb.get.mockImplementation(() => {
  return { Item: testContactDetail };
});
dynamoDb.query.mockImplementation(() => {
  return {
    Items: testAccessList,
  };
});
getUserRoleObj.mockImplementation(() => {
  return { getAccesses: () => testValidRoutes };
});

it("returns null if user not found", async () => {
  dynamoDb.get.mockImplementationOnce(() => {
    return {};
  });

  expect(getUser("email@test.com"))
    .resolves.toStrictEqual(null)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("returns the user data", async () => {
  expect(getUser("email@test.com"))
    .resolves.toStrictEqual({ ...testContactDetail, roleList: testAccessList })
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("handles the lambda event", async () => {
  const testEvent = { queryStringParameters: { email: "testEmail" } };
  const expectedReturn = {
    statusCode: 200,
    body: JSON.stringify({
      ...testContactDetail,
      roleList: testAccessList,
      validRoutes: testValidRoutes,
    }),
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
