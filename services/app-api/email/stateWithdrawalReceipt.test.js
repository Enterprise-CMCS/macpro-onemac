import { stateWithdrawalReceipt } from "./stateWithdrawalReceipt";

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
  const response = stateWithdrawalReceipt(testData, testConfig);
  expect(response.HTML.length).toBe(383);
});
