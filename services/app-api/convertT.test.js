import dynamoDb from "./libs/dynamodb-lib";
import { main } from "./convert";

import newSubmission from "./utils/newSubmission";
import { validateSubmission } from "./form/validateSubmission";

jest.mock("./libs/dynamodb-lib");
jest.mock("./utils/newSubmission");
//jest.mock("./form/validateSubmission");

beforeAll(() => {
  jest.clearAllMocks();

  dynamoDb.scan.mockImplementation(() => {
    return {
      Items: [
        {
          summary: "This is an new base waiver MI.1122",
          waiverAuthority: "1915(b)(4)",
          ninetyDayClockEnd: 1659986718318,
          type: "waiver",
          userId: "offlineContext_cognitoIdentityId",
          uploads: [
            {
              s3Key: "1652210717212/Attachment 3.1-A, #4b, Page 3f Track.pdf",
              filename: "Attachment 3.1-A, #4b, Page 3f Track.pdf",
              title:
                "1915(b) Comprehensive (Capitated) Waiver Application Pre-print (Initial, Renewal, Amendment)",
              contentType: "application/pdf",
              url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A3211a6ff-043f-436b-8313-1b314582b2a5/1652210717212/Attachment%203.1-A%2C%20%234b%2C%20Page%203f%20Track.pdf",
            },
          ],
          actionType: "new",
          createdAt: 1652210718250,
          transmittalNumberWarningMessage: "",
          id: "ed0f08a0-d096-11ec-a68b-a5c367084617",
          state: "submitted",
          transmittalNumber: "MI.1122",
          submittedAt: 1652210718318,
          user: {
            firstName: "Angie",
            lastName: "Active",
            email: "statesubmitteractive@cms.hhs.local",
          },
          territory: "MI",
        },
        {
          summary: "This is the renewal MI.1122.R01 for the base MI.1122",
          waiverAuthority: "1915(b)(4)",
          ninetyDayClockEnd: 1659986718318,
          type: "waiver",
          userId: "offlineContext_cognitoIdentityId",
          uploads: [
            {
              s3Key: "1652210717212/Attachment 3.1-A, #4b, Page 3f Track.pdf",
              filename: "Attachment 3.1-A, #4b, Page 3f Track.pdf",
              title:
                "1915(b) Comprehensive (Capitated) Waiver Application Pre-print (Initial, Renewal, Amendment)",
              contentType: "application/pdf",
              url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A3211a6ff-043f-436b-8313-1b314582b2a5/1652210717212/Attachment%203.1-A%2C%20%234b%2C%20Page%203f%20Track.pdf",
            },
          ],
          actionType: "renewal",
          createdAt: 1652210718250,
          transmittalNumberWarningMessage: "",
          id: "ed0f08a0-d096-11ec-a68b-a5c367084617",
          state: "submitted",
          transmittalNumber: "MI.1122.R01",
          submittedAt: 1652210718318,
          user: {
            firstName: "Angie",
            lastName: "Active",
            email: "statesubmitteractive@cms.hhs.local",
          },
          territory: "MI",
        },
        {
          summary:
            "This is an amendment for the renewal MI.1122.R01 for the base MI.1122",
          waiverAuthority: "1915(b)(4)",
          ninetyDayClockEnd: 1659986718318,
          type: "waiver",
          userId: "offlineContext_cognitoIdentityId",
          uploads: [
            {
              s3Key: "1652210717212/Attachment 3.1-A, #4b, Page 3f Track.pdf",
              filename: "Attachment 3.1-A, #4b, Page 3f Track.pdf",
              title:
                "1915(b) Comprehensive (Capitated) Waiver Application Pre-print (Initial, Renewal, Amendment)",
              contentType: "application/pdf",
              url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A3211a6ff-043f-436b-8313-1b314582b2a5/1652210717212/Attachment%203.1-A%2C%20%234b%2C%20Page%203f%20Track.pdf",
            },
          ],
          actionType: "amendment",
          createdAt: 1652210718250,
          transmittalNumberWarningMessage: "",
          id: "ed0f08a0-d096-11ec-a68b-a5c367084617",
          state: "submitted",
          transmittalNumber: "MI.1122.R01.M01",
          submittedAt: 1652210718318,
          user: {
            firstName: "Angie",
            lastName: "Active",
            email: "statesubmitteractive@cms.hhs.local",
          },
          territory: "MI",
        },
        {
          summary: "Here is a test CHIP SPA loaded from seed data.",
          waiverAuthority: "",
          ninetyDayClockEnd: 1659551958031,
          type: "chipspa",
          userId: "offlineContext_cognitoIdentityId",
          uploads: [
            {
              s3Key: "1651775957075/Attachment 3.1-A, #4b, Page 3f Track.pdf",
              filename: "Attachment 3.1-A, #4b, Page 3f Track.pdf",
              title: "Current State Plan",
              contentType: "application/pdf",
              url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A3211a6ff-043f-436b-8313-1b314582b2a5/1651775957075/Attachment%203.1-A%2C%20%234b%2C%20Page%203f%20Track.pdf",
            },
            {
              s3Key: "1651775957075/Attachment 3.1-A, #4b, Page 3f Clean.pdf",
              filename: "Attachment 3.1-A, #4b, Page 3f Clean.pdf",
              title: "Amended State Plan Language",
              contentType: "application/pdf",
              url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A3211a6ff-043f-436b-8313-1b314582b2a5/1651775957075/Attachment%203.1-A%2C%20%234b%2C%20Page%203f%20Clean.pdf",
            },
            {
              s3Key:
                "1651775957075/Mr. Scott_ State of KS_SPA KS 21-0002 Signed.pdf",
              filename: "Mr. Scott_ State of KS_SPA KS 21-0002 Signed.pdf",
              title: "Cover Letter",
              contentType: "application/pdf",
              url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A3211a6ff-043f-436b-8313-1b314582b2a5/1651775957075/Mr.%20Scott_%20State%20of%20KS_SPA%20KS%2021-0002%20Signed.pdf",
            },
          ],
          actionType: "",
          createdAt: 1651775957952,
          transmittalNumberWarningMessage: "",
          id: "abba3c00-cca2-11ec-8862-3f438eff44d1",
          state: "submitted",
          transmittalNumber: "MI-11-1111-CHIP",
          submittedAt: 1651775958031,
          user: {
            firstName: "Angie",
            lastName: "Active",
            email: "statesubmitteractive@cms.hhs.local",
          },
          territory: "MI",
        },
        {
          summary: "Here is invalid data",
          waiverAuthority: "",
          ninetyDayClockEnd: 1659551958031,
          type: "chipspa",
          userId: "offlineContext_cognitoIdentityId",
          uploads: [
            {
              s3Key: "1651775957075/Attachment 3.1-A, #4b, Page 3f Track.pdf",
              filename: "Attachment 3.1-A, #4b, Page 3f Track.pdf",
              title: "Current State Plan",
              contentType: "application/pdf",
              url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A3211a6ff-043f-436b-8313-1b314582b2a5/1651775957075/Attachment%203.1-A%2C%20%234b%2C%20Page%203f%20Track.pdf",
            },
            {
              s3Key: "1651775957075/Attachment 3.1-A, #4b, Page 3f Clean.pdf",
              filename: "Attachment 3.1-A, #4b, Page 3f Clean.pdf",
              title: "Amended State Plan Language",
              contentType: "application/pdf",
              url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A3211a6ff-043f-436b-8313-1b314582b2a5/1651775957075/Attachment%203.1-A%2C%20%234b%2C%20Page%203f%20Clean.pdf",
            },
            {
              s3Key:
                "1651775957075/Mr. Scott_ State of KS_SPA KS 21-0002 Signed.pdf",
              filename: "Mr. Scott_ State of KS_SPA KS 21-0002 Signed.pdf",
              title: "Cover Letter",
              contentType: "application/pdf",
              url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A3211a6ff-043f-436b-8313-1b314582b2a5/1651775957075/Mr.%20Scott_%20State%20of%20KS_SPA%20KS%2021-0002%20Signed.pdf",
            },
          ],
          actionType: "",
          createdAt: 1651775957952,
          transmittalNumberWarningMessage: "",
          id: "abba3c00-cca2-11ec-8862-3f438eff44d1",
          state: "submitted",
          transmittalNumber: "MIdNONONO-11-1111-CHIP",
          submittedAt: 1651775958031,
          user: {
            firstName: "Angie",
            lastName: "Active",
            email: "statesubmitteractive@cms.hhs.local",
          },
          territory: "MI",
        },
        {
          summary: "Here is invalid data",
          waiverAuthority: "",
          ninetyDayClockEnd: 1659551958031,
          type: "notarealtype",
          userId: "offlineContext_cognitoIdentityId",
          uploads: [
            {
              s3Key: "1651775957075/Attachment 3.1-A, #4b, Page 3f Track.pdf",
              filename: "Attachment 3.1-A, #4b, Page 3f Track.pdf",
              title: "Current State Plan",
              contentType: "application/pdf",
              url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A3211a6ff-043f-436b-8313-1b314582b2a5/1651775957075/Attachment%203.1-A%2C%20%234b%2C%20Page%203f%20Track.pdf",
            },
            {
              s3Key: "1651775957075/Attachment 3.1-A, #4b, Page 3f Clean.pdf",
              filename: "Attachment 3.1-A, #4b, Page 3f Clean.pdf",
              title: "Amended State Plan Language",
              contentType: "application/pdf",
              url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A3211a6ff-043f-436b-8313-1b314582b2a5/1651775957075/Attachment%203.1-A%2C%20%234b%2C%20Page%203f%20Clean.pdf",
            },
            {
              s3Key:
                "1651775957075/Mr. Scott_ State of KS_SPA KS 21-0002 Signed.pdf",
              filename: "Mr. Scott_ State of KS_SPA KS 21-0002 Signed.pdf",
              title: "Cover Letter",
              contentType: "application/pdf",
              url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A3211a6ff-043f-436b-8313-1b314582b2a5/1651775957075/Mr.%20Scott_%20State%20of%20KS_SPA%20KS%2021-0002%20Signed.pdf",
            },
          ],
          actionType: "",
          createdAt: 1651775957952,
          transmittalNumberWarningMessage: "",
          id: "abba3c00-cca2-11ec-8862-3f438eff44d1",
          state: "submitted",
          transmittalNumber: "MIdNONONO-11-1111-CHIP",
          submittedAt: 1651775958031,
          user: {
            firstName: "Angie",
            lastName: "Active",
            email: "statesubmitteractive@cms.hhs.local",
          },
          territory: "MI",
        },
      ],
    };
  });
  newSubmission.mockResolvedValue(() => {
    return true;
  });
  //   validateSubmission.mockReturnValue(() => {
  //     return null;
  //   });
});

const expectedResponse = {
  body: '"Done"',
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
  },
  statusCode: 200,
};

it("returns Done when successful", async () => {
  expect(main({}))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
