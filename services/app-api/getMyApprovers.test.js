import dynamoDb from "./libs/dynamodb-lib";
import { main } from "./getMyApprovers";

jest.mock("./libs/dynamodb-lib");

dynamoDb.query.mockImplementation(() => {
  return {
    Items: [
      {
        email: "sabrina.mccrae@cms.hhs.gov",
        firstName: "Sabrina",
        lastName: "McCrae",
      },
      {
        email: "systemadmintest@cms.hhs.local",
        firstName: "Teresa",
        lastName: "Test",
      },
    ],
  };
});

afterAll(() => {
  jest.clearAllMocks();
});

it("gets approver list from role and territory", async () => {
  const eventObject = {
    queryStringParameters: { role: "statesystemadmin", territory: "VA" },
  };
  const expectedResponse = {
    statusCode: 200,
    body: '[{"email":"sabrina.mccrae@cms.hhs.gov","firstName":"Sabrina","lastName":"McCrae"},{"email":"systemadmintest@cms.hhs.local","firstName":"Teresa","lastName":"Test"}]',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };

  expect(main(eventObject))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
