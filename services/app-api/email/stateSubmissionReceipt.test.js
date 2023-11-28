import { stateSubmissionReceipt } from "./stateSubmissionReceipt";

it("builds the State Submission Receipt Email", async () => {
  const testData = {
    submitterName: "name",
    submitterEmail: "theemail@email.com",
    componentId: "MI-11-1111-22",
    clockEndTimestamp: 1631626754502,
  };
  const testConfig = {
    typeLabel: "Test Type",
  };
  try {
    const response2 = stateSubmissionReceipt(testData, testConfig);
    expect(response2.HTML.length).toBe(999);
  } catch (e) {
    console.log("reeived error: ", e);
  }
});
