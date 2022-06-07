import { CMSSubmissionNotice } from "./CMSSubmissionNotice";

it("builds the CMS Submission Notice Email", async () => {
  const testData = {
    submitterName: "name",
    componentId: "MI-11-1111-22",
    proposedEffectiveDate: "2022-06-07",
  };
  const testConfig = {
    typeLabel: "Test Type",
  };
  const warnings = [];

  const response2 = CMSSubmissionNotice(testData, testConfig, warnings);

  expect(response2.Subject).toBe(
    testConfig.typeLabel + " " + testData.componentId + " Submitted"
  );

  expect(response2.HTML.includes(testData.componentId)).toBe(true);
  expect(response2.HTML.includes(process.env.applicationEndpoint)).toBe(true);
  expect(response2.HTML.length).toBe(1213);
});
