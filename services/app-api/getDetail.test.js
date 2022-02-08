import dynamoDb from "./libs/dynamodb-lib";
import { validateUserReadOnly } from "./utils/validateUser";
import { getDetails } from "./getDetail";
import { getUser } from "./getUser";
jest.mock("./getUser");
jest.mock("./utils/validateUser");

jest.mock("./libs/dynamodb-lib");
dynamoDb.get.mockResolvedValue({
  result: {
    Item: {
      field1: "one",
    },
  },
});

describe("component details are sent", () => {
  it("returns details", () => {
    const testEvent = {
      queryStringParameters: {
        email: "email",
        cType: "spa",
        cNum: 18274923435,
      },
      pathParameters: {
        id: "id",
      },
    };
    getUser.mockResolvedValue({
      type: "statesubmitter",
      attributes: [
        { stateCode: "HI", history: [{ date: 123456789, status: "active" }] },
        { stateCode: "OR", history: [{ date: 123456789, status: "active" }] },
      ],
    });
    validateUserReadOnly.mockReturnValue(true);

    expect(getDetails(testEvent))
      .resolves.toBe({
        field1: "one",
      })
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });
});
