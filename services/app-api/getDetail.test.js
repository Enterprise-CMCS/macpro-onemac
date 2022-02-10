import dynamoDb from "./libs/dynamodb-lib";
import { validateUserReadOnly } from "./utils/validateUser";
import { getDetails } from "./getDetail";
import { getUser } from "./getUser";
import { RESPONSE_CODE } from "cmscommonlib";

const testDoneBy = {
  roleList: [
    { role: "statesubmitter", status: "active", territory: "VA" },
    { role: "statesubmitter", status: "active", territory: "MD" },
  ],
  email: "myemail@email.com",
  firstName: "firsty",
  lastName: "lasty",
  fullName: "firsty lastly",
};

jest.mock("./getUser");
jest.mock("./utils/validateUser");
jest.mock("./libs/dynamodb-lib");

describe("handles errors and exceptions", () => {
  it("checks incoming parameters", async () => {
    const testEvent = {
      queryStringParameters: {
        email: "email",
        cType: "spa",
        cNum: 18274923435,
      },
    };

    const expectedReturn = RESPONSE_CODE.VALIDATION_ERROR;

    expect(getDetails(testEvent))
      .resolves.toStrictEqual(expectedReturn)
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });
});

describe("component details are returned", () => {
  it("returns details", async () => {
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

    getUser.mockResolvedValue(testDoneBy);
    validateUserReadOnly.mockReturnValue(true);

    dynamoDb.get.mockResolvedValue({
      Item: {
        field1: "one",
      },
    });

    expect(getDetails(testEvent))
      .resolves.toStrictEqual({
        field1: "one",
      })
      .catch((error) => {
        console.log("caught test error: ", error);
      });
  });
});
