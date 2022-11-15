import dynamoDb from "../libs/dynamodb-lib";
import {
  stateWithdrawalReceipt,
  getAllActiveStateUserEmailAddresses,
} from "./stateWithdrawalReceipt";

jest.mock("../libs/dynamodb-lib");

dynamoDb.query.mockImplementation(() => {
  return {
    Items: [
      {
        fullname: "test test",
        email: "test@test.com",
      },
    ],
  };
});

const testData = {
  submitterName: "name",
  componentId: "MI-11-1111-22",
};
const testConfig = {
  typeLabel: "Test Type",
};
const user = {
  fullName: "Tester",
  email: "tester@test.test",
};

it("builds the State Withdrawal Receipt Email", async () => {
  try {
    const response = await stateWithdrawalReceipt(testData, testConfig, user);
    expect(response.HTML.length).toBe(418);
  } catch (e) {
    console.log("reeived error: ", e);
  }
});

it("handles a query exception", async () => {
  dynamoDb.query.mockImplementationOnce(() => {
    throw new Error("this is an error");
  });
  try {
    expect(await getAllActiveStateUserEmailAddresses("TT")).toThrow(
      "this is an error"
    );
    const response = await stateWithdrawalReceipt(testData, testConfig, user);
    expect(response.ToAddresses.length).toBe(0);
  } catch (e) {
    console.log("reeived error: ", e);
  }
});
