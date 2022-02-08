import { main } from "./submit";
import getChangeRequestFunctions, {
  validateSubmission,
  hasValidStateCode,
} from "./changeRequest/changeRequest-util";
import {
  RESPONSE_CODE,
  USER_STATUS,
  latestAccessStatus,
  USER_TYPE,
} from "cmscommonlib";
import { getUser } from "./getUser";

jest.mock("./changeRequest/changeRequest-util");
jest.mock("./getUser");
jest.mock("cmscommonlib");

const expectedResponse = {
  statusCode: 200,
  body: RESPONSE_CODE.SUBMISSION_SUCCESS,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

const testUserEvent = {
  body: '{"type":"spa"}', // rest of a valid event.body,"territory":"MI","summary":"valid submission data for testing.","transmittalNumber":"MI-22-0897","actionType":"","waiverAuthority":"","transmittalNumberWarningMessage":"","user":{"email":"statesubmitteractive@cms.hhs.local","firstName":"Angie","lastName":"Active"},"uploads":[{"s3Key":"1639488614688/CMS 179 Form Acronym Removal Signed.pdf","filename":"CMS 179 Form Acronym Removal Signed.pdf","contentType":"application/pdf","url":"https://uploads-add-rai-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A54fb74ef-1d89-4528-bb26-24926cbc5eef/1639488614688/CMS%20179%20Form%20Acronym%20Removal%20Signed.pdf","title":"CMS Form 179"},{"s3Key":"1639488614690/Attachment 3.1-A, #4b, Page 3f Track.pdf","filename":"Attachment 3.1-A, #4b, Page 3f Track.pdf","contentType":"application/pdf","url":"https://uploads-add-rai-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A54fb74ef-1d89-4528-bb26-24926cbc5eef/1639488614690/Attachment%203.1-A%2C%20%234b%2C%20Page%203f%20Track.pdf","title":"SPA Pages"}]}',
  requestContext: {
    identity: {
      cognitoIdentityId: "us-east-1:54fb74ef-1d89-4528-bb26-24926cbc5eef",
    },
  },
};

const testDoneBy = {
  firstName: "Unit",
  lastName: "Tester",
  attributes: [
    {
      stateCode: "MI",
      history: [
        {
          date: 1617149287,
          doneBy: "systemadmintest@cms.hhs.local",
          status: "active",
        },
      ],
    },
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
  type: USER_TYPE.STATE_SUBMITTER,
};

beforeEach(() => {
  validateSubmission.mockImplementation(() => {
    return null;
  });
  getUser.mockImplementation(() => {
    return testDoneBy;
  });
  latestAccessStatus.mockImplementation(() => {
    return USER_STATUS.ACTIVE;
  });
  getChangeRequestFunctions.mockImplementation(() => {
    return "something";
  });
  hasValidStateCode.mockImplementation(() => {
    return true;
  });
});

it("takes exception to bad JSON", async () => {
  return expect(() =>
    main({ data: "{ bad,,json }" }, "foo").toThrow(
      "SyntaxError: Unexpected token b in JSON at position 2"
    )
  );
});

it(`returns an error for invalid submission`, async () => {
  expectedResponse.body = JSON.stringify(RESPONSE_CODE.VALIDATION_ERROR);

  validateSubmission.mockImplementation(() => {
    return "VA000";
  });

  expect(main(testUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("returns an error if submitter does not have access", async () => {
  expectedResponse.body = JSON.stringify(RESPONSE_CODE.USER_NOT_AUTHORIZED);

  latestAccessStatus.mockImplementation(() => {
    return USER_STATUS.DENIED;
  });

  expect(main(testUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it(`returns an error for unknown user`, async () => {
  expectedResponse.body = JSON.stringify(RESPONSE_CODE.USER_NOT_FOUND);

  getUser.mockImplementation(() => {
    return {};
  });

  expect(main(testUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("errors if can't find crfunctions", async () => {
  expectedResponse.body = JSON.stringify(RESPONSE_CODE.VALIDATION_ERROR);

  getChangeRequestFunctions.mockImplementation(() => {
    return null;
  });

  expect(main(testUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("errors if territory is invalid", async () => {
  expectedResponse.body = JSON.stringify(
    RESPONSE_CODE.TRANSMITTAL_ID_TERRITORY_NOT_VALID
  );

  hasValidStateCode.mockImplementation(() => {
    return false;
  });

  expect(main(testUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("errors if second check of territory is invalid", async () => {
  expectedResponse.body = JSON.stringify(
    RESPONSE_CODE.TRANSMITTAL_ID_TERRITORY_NOT_VALID
  );

  hasValidStateCode
    .mockImplementationOnce(() => {
      return true;
    })
    .mockImplementation(() => {
      return false;
    });

  expect(main(testUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
