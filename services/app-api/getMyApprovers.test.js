import dynamoDb from "./libs/dynamodb-lib";
import { main } from "./getMyApprovers";

jest.mock("./libs/dynamodb-lib");

beforeAll(() => {
  jest.clearAllMocks();

  dynamoDb.query.mockImplementation(() => {
    return {
      Items: [
        {
          email: "systemadmintest@cms.hhs.local",
          firstName: "Teresa",
          lastName: "Test",
        },
      ],
    };
  });
});

it("gets approver list from role and territory", async () => {
  const eventObject = {
    queryStringParameters: { role: "statesystemadmin", territory: "VA" },
  };
  const expectedResponse = {
    statusCode: 200,
    body: '[{"email":"systemadmintest@cms.hhs.local","firstName":"Teresa","lastName":"Test"}]',
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

it("sets appropriate default values", async () => {
  const eventObject = {
    queryStringParameters: { role: "statesystemadmin" },
  };
  const expectedResponse = {
    statusCode: 200,
    body: '[{"email":"systemadmintest@cms.hhs.local","firstName":"Teresa","lastName":"Test"}]',
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

it("catches any exception from dynamo query", async () => {
  const eventObject = {
    queryStringParameters: { role: "statesystemadmin", territory: "VA" },
  };
  const expectedResponse = {
    statusCode: 500,
    body: `{"error":"Cannot read property 'Items' of undefined"}`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
  dynamoDb.query.mockImplementationOnce(() => {
    throw new Error();
  });

  expect(main(eventObject))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
