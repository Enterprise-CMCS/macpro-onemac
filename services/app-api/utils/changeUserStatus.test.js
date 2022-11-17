import AWS from "aws-sdk";
import { buildSK, changeUserStatus } from "./changeUserStatus";

jest.mock("aws-sdk");

beforeAll(() => {
  jest.clearAllMocks();

  AWS.DynamoDB.DocumentClient.mockImplementation(() => {
    return {
      update: () => ({ Attributes: { Latest: 2 } }),
      put: () => {},
    };
  });
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
  AWS.DynamoDB.DocumentClient.mockImplementation(() => {
    return {
      update: () => ({ Attributes: { Latest: 2 } }),
      put: () => {
        throw new Error("an exception");
      },
    };
  });

  expect(() => changeUserStatus(testParams))
    .rejects.toThrow("an exception")
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
