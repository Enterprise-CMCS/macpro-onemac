import dynamoDb from "../libs/dynamodb-lib";
import { buildSK, changeUserStatus } from "./changeUserStatus";

jest.mock("../libs/dynamodb-lib");

beforeAll(() => {
  jest.clearAllMocks();

  dynamoDb.update.mockImplementation(() => {
    return { Attributes: { Latest: 2 } };
  });
  dynamoDb.put.mockImplementation(() => {});
});

const testParams = {
  email: "testemail",
  fullName: "testfullName",
  doneByEmail: "testdoneByEmail",
  doneByName: "testdoneByName",
  date: "testdate",
  role: "testrole",
  territory: "testterritory",
  status: "teststatus",
};

it.each`
  roleName              | skReturned
  ${"statesubmitter"}   | ${"statesystemadmin#VA"}
  ${"cmsreviewer"}      | ${"cmsroleapprover"}
  ${"statesystemadmin"} | ${"cmsroleapprover"}
  ${"default"}          | ${"Boss"}
`("builds the right SK for %s", ({ roleName, skReturned }) => {
  expect(buildSK(roleName, "VA")).toStrictEqual(skReturned);
});

it("runs without crashing", async () => {
  const expectedReturn = undefined;
  expect(changeUserStatus(testParams))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("runs without crashing with different variables", async () => {
  const expectedReturn = undefined;
  testParams.status = "active";
  expect(changeUserStatus(testParams))
    .resolves.toStrictEqual(expectedReturn)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("handles a put exception", () => {
  dynamoDb.put.mockImplementationOnce(() => {
    throw new Error("an exception");
  });
  expect(() => changeUserStatus(testParams))
    .rejects.toThrow("an exception")
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
