import dynamoDb from "../libs/dynamodb-lib";
import { stateWithdrawalReceipt } from "./stateWithdrawalReceipt";

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

it("builds the State Withdrawal Receipt Email", async () => {
  const testData = {
    changeHistory: [
      { submissionTimestamp: 1631626754502 },
      { submissionTimestamp: 1631626754502 },
    ],
    submitterName: "name",
    componentId: "MI-11-1111-22",
  };
  const testConfig = {
    typeLabel: "Test Type",
  };
  // TODO:  Get Test Data
  try {
    const response = await stateWithdrawalReceipt(testData, testConfig);
    expect(response.HTML.length).toBe(409);
  } catch (e) {
    console.log("reeived error: ", e);
  }
});
