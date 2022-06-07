import { CMSSubmissionNotice } from "./CMSSubmissionNotice";

it("builds the CMS Submission Notice Email", async () => {
  const testData = {
    submitterName: "name",
    componentId: "MI-11-1111-22",
  };
  const testConfig = {
    typeLabel: "Test Type",
  };
  const warnings = [];

  const response2 = CMSSubmissionNotice(testData, testConfig, warnings);
  //expect(response2.HTML.length).toBe(1158);
});
