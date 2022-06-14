import { generateMetrics } from "./metrics-lib";

const scanData = [
  {
    userId: "us-east-1:4c3bdaa2-3563-41d2-a771-f7bca383253b",
    id: "1a771d60-f6cb-11eb-9261-c1e6ff79f7e2",
    transmittalNumber: "MD-21-1111-NK1",
    summary: "",
    transmittalNumberWarningMessage: "",
    createdAt: 1628263774774,
    user: {
      authProvider:
        "cognito-idp.us-east-1.amazonaws.com/us-east-1_KDU39SsRi,cognito-idp.us-east-1.amazonaws.com/us-east-1_KDU39SsRi:CognitoSignIn:d65f0f6d-f875-4913-ad0a-7ca9cadc0f7c",
      firstName: "Stateadmin",
      lastName: "Nightwatch",
      id: "us-east-1:4c3bdaa2-3563-41d2-a771-f7bca383253b",
      email: "stateadmin@nightwatch.test",
    },
    submittedAt: 1628263775227,
    uploads: [
      {
        s3Key: "1628263773391/Report_SubmissionList (10).csv",
        filename: "Report_SubmissionList (10).csv",
        title: "CMS Form 179",
        contentType: "application/vnd.ms-excel",
        url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A4c3bdaa2-3563-41d2-a771-f7bca383253b/1628263773391/Report_SubmissionList%20%2810%29.csv",
      },
      {
        s3Key: "1628263773398/Report_SubmissionList (8).csv",
        filename: "Report_SubmissionList (8).csv",
        title: "SPA Pages",
        contentType: "application/vnd.ms-excel",
        url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A4c3bdaa2-3563-41d2-a771-f7bca383253b/1628263773398/Report_SubmissionList%20%288%29.csv",
      },
    ],
    state: "submitted",
    waiverAuthority: "",
    territory: "MD",
    actionType: "",
    ninetyDayClockEnd: 1636039775227,
    type: "medicaidspa",
  },
];
it("Metrics Stub", async () => {
  const response = generateMetrics(scanData);
  expect(response.stateTotals[0]).toBe(" { 'MD' : '1' } ");
});
