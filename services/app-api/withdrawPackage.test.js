import { main } from "./withdrawPackage";
import { RESPONSE_CODE, USER_ROLE } from "cmscommonlib";
import { getUser } from "./getUser";
import { validateUserSubmitting } from "./utils/validateUser";
import updateComponent from "./utils/updateComponent";
import sendEmail from "./libs/email-lib";
import dynamoDb from "./libs/dynamodb-lib";

jest.mock("./getUser");
jest.mock("./utils/validateUser");
jest.mock("./utils/updateComponent");
jest.mock("./libs/email-lib");
jest.mock("./libs/dynamodb-lib");

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
  roleList: [{ role: "statesubmitter", status: "active", territory: "MD" }],
  email: "myemail@email.com",
  fullName: "firsty lasty",
  phoneNumber: "555-1212",
};

beforeEach(() => {
  getUser.mockResolvedValue(testDoneBy);
  validateUserSubmitting.mockImplementation(() => {
    return true;
  });
  updateComponent.mockImplementation(() => {
    return {
      componentType: "testComponentType",
      componentId: "testComponentId",
      parentId: "testParentID",
      parentType: "testParentType",
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
  dynamoDb.get.mockImplementation(() => ({
    Item: {
      children: [
        {
          componentId: "testComponentId",
          componentType: "testComponentType",
          submissionTimestamp: 1639696185888,
        },
      ],
    },
  }));
  dynamoDb.update.mockImplementation(() => "parent updated");
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
  expectedResponse.body = JSON.stringify(
    RESPONSE_CODE.PACKAGE_WITHDRAW_SUCCESS
  );

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
