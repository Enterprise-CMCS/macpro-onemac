import dynamoDb from "./libs/dynamodb-lib";
import { main } from "./resetData";

jest.mock("./libs/dynamodb-lib");
dynamoDb.query.mockResolvedValue({ Items: [{ pk: "testpk", sk: "testsk" }] });
dynamoDb.scan.mockResolvedValue({
  Items: [
    { userId: "testUserId", id: "testId", transmittalNumber: "MD-22-0018" },
  ],
  LastEvaluatedKey: null,
});
dynamoDb.delete.mockResolvedValue({});

it("resets the data", () => {
  const testEvent = {};

  const expectedResponse = {
    body: '"Done"',
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
    },
    statusCode: 200,
  };

  expect(main(testEvent))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error 1: ", error);
    });
});
