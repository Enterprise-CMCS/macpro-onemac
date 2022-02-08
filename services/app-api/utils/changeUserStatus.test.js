import dynamoDb from "../libs/dynamodb-lib";
import { buildSK, changeUserStatus } from "./changeUserStatus";

jest.mock("../libs/dynamodb-lib");

dynamoDb.update.mockImplementation(() => {});
dynamoDb.put.mockImplementation(() => {});

it("uses buildSK to create the right sk", () => {
  expect(buildSK("statesubmitter", "VA")).toStrictEqual("statesystemadmin#VA");
});
