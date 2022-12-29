import { main } from "./migrate";
import dynamoDb from "./libs/dynamodb-lib";

jest.mock("./libs/dynamodb-lib");

const expectedResponse = {
  statusCode: 200,
  body: "Done",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

beforeEach(() => {
  dynamoDb.query.mockResolvedValue({
    Items: [
      {
        componentType: "waivernew",
        componentId: "VA.1117",
        currentStatus: "In Review",
        submitterName: "Angie Active",
        submissionTimestamp: 1638473560098,
        submitterEmail: "statesubmitteractive@cms.hhs.local",
      },
      {
        componentType: "spa",
        componentId: "VA-45-5913",
        currentStatus: "Disapproved",
        submitterName: "Statesubmitter Nightwatch",
        submissionTimestamp: 1639609658284,
        submitterEmail: "statesubmitter@nightwatch.test",
      },
      {
        componentType: "chipspa",
        componentId: "VA-33-2244-CHIP",
        currentStatus: "Submitted",
        submitterName: "Angie Active",
        submissionTimestamp: 1640014441278,
        submitterEmail: "statesubmitteractive@cms.hhs.local",
      },
    ],
    Count: 3,
    ScannedCount: 3,
  });
  dynamoDb.update.mockResolvedValue({ Actual: "Trash" });
});
it(`returns Done`, async () => {
  expectedResponse.body = '"Done"';
  const thisTestUserEvent = {
    queryStringParameters: {
      email: null,
    },
  };

  expect(main(thisTestUserEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
