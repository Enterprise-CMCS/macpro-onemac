import { CMSWithdrawalNotice } from "./CMSWithdrawalNotice";

it("builds the CMS Withdrawal Notice Email", async () => {
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

  const user = {
    fullName: "Tester",
    email: "tester@test.test",
  };

  const response2 = CMSWithdrawalNotice(testData, testConfig, user);
  expect(response2.HTML.length).toBe(499);
});
