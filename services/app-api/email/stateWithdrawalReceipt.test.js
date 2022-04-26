import { StateWithdrawalReceipt } from "./StateWithdrawalReceipt";

it("builds the State Withdrawal Receipt Email", async () => {
  const testData = {
    changeHistory: [
      { submissionTimestamp: 1631626754502 },
      { submissionTimestamp: 1631626754502 },
    ],
    submitterName: "name",
    componentId: "MI-11-1111-22",
  };
  // TODO:  Get Test Data
  const response = StateWithdrawalReceipt(testData);
  expect(response.HTML.length).toBe(348);
});
