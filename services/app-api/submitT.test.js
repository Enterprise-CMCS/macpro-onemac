import { main } from "./submit";
import { RESPONSE_CODE } from "cmscommonlib";
import dynamoDb from "./libs/dynamodb-lib";
import { getUser } from "./getUser";
import sendEmail from "./libs/email-lib";
import packageExists from "./utils/packageExists";

jest.mock("./libs/dynamodb-lib");
jest.mock("./getUser");
jest.mock("./libs/email-lib");
jest.mock("./utils/packageExists");

const expectedResponse = {
  statusCode: 200,
  body: RESPONSE_CODE.SUBMISSION_SUCCESS,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

const validSubmitEvent = {
  body: '{"type":"spa","territory":"MI","summary":"valid submission data for testing.","transmittalNumber":"MI-22-0897","actionType":"","waiverAuthority":"","transmittalNumberWarningMessage":"","user":{"email":"statesubmitteractive@cms.hhs.local","firstName":"Angie","lastName":"Active"},"uploads":[{"s3Key":"1639488614688/CMS 179 Form Acronym Removal Signed.pdf","filename":"CMS 179 Form Acronym Removal Signed.pdf","contentType":"application/pdf","url":"https://uploads-add-rai-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A54fb74ef-1d89-4528-bb26-24926cbc5eef/1639488614688/CMS%20179%20Form%20Acronym%20Removal%20Signed.pdf","title":"CMS Form 179"},{"s3Key":"1639488614690/Attachment 3.1-A, #4b, Page 3f Track.pdf","filename":"Attachment 3.1-A, #4b, Page 3f Track.pdf","contentType":"application/pdf","url":"https://uploads-add-rai-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A54fb74ef-1d89-4528-bb26-24926cbc5eef/1639488614690/Attachment%203.1-A%2C%20%234b%2C%20Page%203f%20Track.pdf","title":"SPA Pages"}]}',
  requestContext: {
    identity: {
      cognitoIdentityId: "us-east-1:54fb74ef-1d89-4528-bb26-24926cbc5eef",
    },
  },
};

const invalidSubmitEvent = {
  body: '{"type":"spa"}',
  requestContext: {
    identity: {
      cognitoIdentityId: "us-east-1:54fb74ef-1d89-4528-bb26-24926cbc5eef",
    },
  },
};

const validDoneBy = {
  roleList: [{ role: "statesubmitter", status: "active", territory: "MI" }],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

const invalidDoneBy = {
  roleList: [{ role: "statesubmitter", status: "denied", territory: "MI" }],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

beforeEach(() => {
  getUser.mockImplementation(() => {
    return validDoneBy;
  });

  dynamoDb.put.mockImplementation(() => {
    return;
  });

  sendEmail.mockImplementation(() => {
    return;
  });

  packageExists.mockImplementation(() => {
    return false;
  });
});

it(`successfully submits`, async () => {
  expectedResponse.body = JSON.stringify(RESPONSE_CODE.SUCCESSFULLY_SUBMITTED);

  expect(main(validSubmitEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
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

  expect(main(invalidSubmitEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("returns an error if submitter does not have access", async () => {
  expectedResponse.body = JSON.stringify(RESPONSE_CODE.USER_NOT_AUTHORIZED);

  getUser.mockImplementationOnce(() => {
    return invalidDoneBy;
  });

  expect(main(validSubmitEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it(`returns an error for unknown user`, async () => {
  expectedResponse.body = JSON.stringify(RESPONSE_CODE.USER_NOT_FOUND);

  getUser.mockImplementationOnce(() => {
    return {};
  });

  expect(main(validSubmitEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
