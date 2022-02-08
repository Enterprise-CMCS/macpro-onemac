import { main } from "./withdrawPackage";
import { RESPONSE_CODE, USER_ROLE } from "cmscommonlib";
import { getUser } from "./getUser";
import { validateUserSubmitting } from "./utils/validateUser";
import updateComponent from "./utils/updateComponent";
import sendEmail from "./libs/email-lib";

jest.mock("./getUser");
jest.mock("./utils/validateUser");
jest.mock("./utils/updateComponent");
jest.mock("./libs/email-lib");

const expectedResponse = {
  statusCode: 200,
  body: RESPONSE_CODE.PACKAGE_WITHDRAW_SUCCESS,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

const testUserEvent = {
  body: '{"componentId":"MI-42-1122","componentType":"spa","submitterEmail":"statesubmitteractive@cms.hhs.local","submitterName":"Angie Active"}',
};

const testDoneBy = {
  firstName: "Unit",
  lastName: "Tester",
  attributes: [
    {
      stateCode: "VA",
      history: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "active",
        },
      ],
    },
  ],
  id: "statesubmitteractive@cms.hhs.local",
  type: USER_ROLE.STATE_SUBMITTER,
};

beforeEach(() => {
  getUser.mockResolvedValue(testDoneBy);
  validateUserSubmitting.mockImplementation(() => {
    return true;
  });
  updateComponent.mockImplementation(() => {
    return {
      changeHistory: [
        {
          componentType: "spa",
          componentTimestamp: 1641584108252,
          submitterName: "Angie Active",
          componentId: "MI-13-1122",
        },
        {
          componentType: "sparai",
          componentTimestamp: 1639696189171,
          submitterName: "StateSubmitter Nightwatch",
          componentId: "MD-13-1122",
        },
        {
          componentType: "spa",
          additionalInformation: "This is just a test",
          componentId: "MI-13-1122",
          attachments: [Array],
          submissionId: "4240e440-5ec5-11ec-b2ea-eb35c89f340d",
          currentStatus: "Submitted",
          submitterId: "us-east-1:afa582ca-4e4c-4d3b-be9b-d2dbc24c3d1a",
          submitterName: "StateSubmitter Nightwatch",
          submissionTimestamp: 1639696185888,
          submitterEmail: "statesubmitter@nightwatch.test",
        },
      ],
      additionalInformation: "This is just a test",
      componentType: "spa",
      attachments: [
        {
          s3Key: "1639696180278/15MB.pdf",
          filename: "15MB.pdf",
          title: "CMS Form 179",
          contentType: "application/pdf",
          url: "https://uploads-states-of-withdrawal-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3Aafa582ca-4e4c-4d3b-be9b-d2dbc24c3d1a/1639696180278/15MB.pdf",
        },
        {
          s3Key: "1639696180278/adobe.pdf",
          filename: "adobe.pdf",
          title: "SPA Pages",
          contentType: "application/pdf",
          url: "https://uploads-states-of-withdrawal-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3Aafa582ca-4e4c-4d3b-be9b-d2dbc24c3d1a/1639696180278/adobe.pdf",
        },
        {
          s3Key: "1639696188378/adobe.pdf",
          filename: "adobe.pdf",
          title: "RAI Response",
          contentType: "application/pdf",
          url: "https://uploads-states-of-withdrawal-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3Aafa582ca-4e4c-4d3b-be9b-d2dbc24c3d1a/1639696188378/adobe.pdf",
        },
      ],
      componentId: "MI-13-1122",
      sparai: [
        {
          componentType: "sparai",
          componentTimestamp: 1639696189171,
          submitterName: "StateSubmitter Nightwatch",
          componentId: "MI-13-1122",
        },
      ],
      currentStatus: "Withdrawn",
      spa: [
        {
          componentType: "spa",
          componentTimestamp: 1641584108252,
          submitterName: "Angie Active",
          componentId: "MI-13-1122",
        },
      ],
      packageId: "MI-13-1122",
      submissionTimestamp: 1639696185888,
      devComment: "Package added via seed data for application testing",
      submissionId: "4240e440-5ec5-11ec-b2ea-eb35c89f340d",
      GSI1pk: "OneMAC",
      submitterId: "us-east-1:afa582ca-4e4c-4d3b-be9b-d2dbc24c3d1a",
      GSI1sk: "MI-13-1122",
      sk: "spa",
      pk: "MI-13-1122",
      submitterName: "StateSubmitter Nightwatch",
      submitterEmail: "statesubmitter@nightwatch.test",
    };
  });

  sendEmail.mockImplementation(() => {
    return true;
  });
});

it(`returns a validation error event doesn't parse`, async () => {
  expectedResponse.body = JSON.stringify(RESPONSE_CODE.VALIDATION_ERROR);

  expect(main({ data: "{ bad,,json }" }, "foo"))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it(`returns an error if no user email is sent`, async () => {
  expectedResponse.body = JSON.stringify(RESPONSE_CODE.VALIDATION_ERROR);
  const thisTestUserEvent = {
    body: {
      submitterEmail: null,
    },
  };

  expect(main(thisTestUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it(`checks the user is authorized`, async () => {
  expectedResponse.body = JSON.stringify(RESPONSE_CODE.USER_NOT_AUTHORIZED);

  validateUserSubmitting.mockImplementation(() => {
    return false;
  });
  expect(main(testUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it(`handles exceptions for updateComponent`, async () => {
  expectedResponse.body = JSON.stringify(RESPONSE_CODE.DATA_RETRIEVAL_ERROR);

  updateComponent.mockImplementation(() => {
    throw "If Update Component threw an error!";
  });
  expect(main(testUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it(`returns if the email was not sent`, async () => {
  expectedResponse.body = JSON.stringify(RESPONSE_CODE.EMAIL_NOT_SENT);

  sendEmail.mockImplementation(() => {
    throw "The sendEmail error thrown!";
  });
  expect(main(testUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it(`returns success message on completion`, async () => {
  expectedResponse.body = JSON.stringify(
    RESPONSE_CODE.PACKAGE_WITHDRAW_SUCCESS
  );

  expect(main(testUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
