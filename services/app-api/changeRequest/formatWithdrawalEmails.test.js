import {
  StateWithdrawalEmail,
  CMSWithdrawalEmail,
} from "./formatWithdrawalEmails";

it("Change Request Types", async () => {
  const testData = {
    changeHistory: [
      { submissionTimestamp: 1631626754502 },
      { submissionTimestamp: 1631626754502 },
    ],
    submitterName: "name",
    componentId: "MI-11-1111-22",
  };
  // TODO:  Get Test Data
  const response = StateWithdrawalEmail(testData);
  expect(response.HTML.length).toBe(348);

  const response2 = CMSWithdrawalEmail(testData);
  expect(response2.HTML.length).toBe(349);
});
