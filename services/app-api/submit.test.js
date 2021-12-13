import { main } from "./submit";
import { validateSubmission } from "./changeRequest/changeRequest-util";
import { RESPONSE_CODE } from "cmscommonlib";

jest.mock("./changeRequest/changeRequest-util");

const expectedResponse = {
  statusCode: 200,
  body: RESPONSE_CODE.SUBMISSION_SUCCESS,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

it("Get Stub", async () => {
  const response = main({ source: "serverless-plugin-warmup" }, "foo");
  expect(response).toBeInstanceOf(Promise);
});

it(`returns an error for invalid submission`, async () => {
  const testEvent = {
    requestContext: {
      identity: {
        cognitoIdentityId: "Test ID for Cognito",
      },
    },
    body: '{"type":"spa"}',
    isBase64Encoded: false,
  };
  expectedResponse.body = RESPONSE_CODE.VALIDATION_ERROR;

  validateSubmission.mockReturnValue(false);

  const response = main(testEvent, "foo");

  expect(response).resolves.toBe(expectedResponse);
});
