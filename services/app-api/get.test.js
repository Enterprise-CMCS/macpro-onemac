import dynamoDb from "./libs/dynamodb-lib";

const testSubmission = {
  Item: {
    transmittalNumber: "MI.7778.R11",
    summary: "",
    createdAt: 1623779834196,
    user: {
      authProvider:
        "cognito-idp.us-east-1.amazonaws.com/us-east-1_KDU39SsRi,cognito-idp.us-east-1.amazonaws.com/us-east-1_KDU39SsRi:CognitoSignIn:3554f7a8-b563-4f7a-bc90-447d44ee3d82",
      firstName: "Angie",
      lastName: "Active",
      id: "us-east-1:4267bada-207d-47f2-8cf9-e80150f3e670",
      email: "statesubmitteractive@cms.hhs.local",
    },
    submittedAt: 1623779834680,
    state: "submitted",
    waiverAuthority: "1915(b)(4)",
    userId: "us-east-1:4267bada-207d-47f2-8cf9-e80150f3e670",
    territory: "MI",
    actionType: "renewal",
    ninetyDayClockEnd: 1631555834680,
    id: "1d9ca140-ce03-11eb-bf37-fb17b319eb72",
    type: "waiver",
  },
};

jest.mock("./libs/dynamodb-lib");
dynamoDb.get.mockResolvedValue(testSubmission);

import { main } from "./get";

const expectedResponse = {
  statusCode: 200,
  body: JSON.stringify(testSubmission.Item),
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

const testGetEvent = {
  pathParameters: {
    userId: "testUserId",
    id: "testId",
  },
  requestContext: {
    identity: {
      cognitoIdentityId: "us-east-1:54fb74ef-1d89-4528-bb26-24926cbc5eef",
    },
  },
};

it("returns the submission", async () => {
  expect(main(testGetEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
