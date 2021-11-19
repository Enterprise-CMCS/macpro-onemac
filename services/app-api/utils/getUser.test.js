import dynamoDb from "../libs/dynamodb-lib";
import getUser from "./getUser";

const returnUser = {
  Item: {
    firstName: "Unita",
    lastName: "Testingham",
    attributes: [
      {
        stateCode: "ZZ",
        history: [
          {
            date: 1617149287,
            doneBy: "systemadmintest@cms.hhs.local",
            status: "active",
          },
          {
            date: 1616544487,
            doneBy: "statesystemadminmi@cms.hhs.local",
            status: "pending",
          },
        ],
      },
    ],
    id: "test@test.com",
    type: "userrole",
  },
};

jest.mock("../libs/dynamodb-lib");
dynamoDb.get.mockResolvedValue(returnUser);

describe("returns a user's details, if found", () => {
  it("finds a user", () => {
    const testUserEmail = "test@test.com";

    expect(getUser(testUserEmail)).resolves.toBe(returnUser.Item);
  });
});
