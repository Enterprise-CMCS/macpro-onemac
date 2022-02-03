import dynamoDb from "./libs/dynamodb-lib";
import getUser from "./utils/getUser";
import { getMyUserList, buildParams } from "./getMyUserList";
import { RESPONSE_CODE, getUserRoleObj } from "cmscommonlib";

/*
var fs = require("fs");
const testFileLocation = "../common/testData/";

const parseTestData = (filename) => {
  let parsedData = {};

  let data = fs.readFileSync(filename);

  try {
    parsedData = JSON.parse(data);
  } catch (err) {
    console.log(`${filename}: There has been an error parsing your JSON.`);
    console.log(err);
  }
  return parsedData;
};

const testDBUsers = parseTestData(`${testFileLocation}usersFromDynamo.json`);
*/
jest.mock("./utils/getUser");
jest.mock("./libs/dynamodb-lib");

beforeEach(() => {
  getUser.mockImplementation(() => {
    return testDoneBy;
  });
  getUserRoleObj.mockImplementation(() => {
    return { canAccessUserManagement: true };
  });
  getChangeRequestFunctions.mockImplementation(() => {
    return "something";
  });
  hasValidStateCode.mockImplementation(() => {
    return true;
  });
});

//dynamoDb.query.mockResolvedValue(testDBUsers);

it("builds the correct paramaters", () => {
  const expectedParams = {
    ExpressionAttributeNames: {
      "#date": "date",
      "#role": "role",
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":sk": "statesystemadmin#Territory",
      ":user": "USER",
    },
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1pk=:user AND GSI1sk=:sk",
    ProjectionExpression:
      "#date, doneByName, email, fullName, #role, #status, territory",
    TableName: undefined,
  };
  expect(buildParams("Role", "Territory")).toStrictEqual(expectedParams);
});

it("errors when no email provided", async () => {
  getUser.mockImplementationOnce(() => {
    return null;
  });

  const expectedReturn = RESPONSE_CODE.USER_NOT_FOUND;
  expect(
    getMyUserList({ queryStringParameters: { email: "" } })
  ).resolves.toStrictEqual(expectedReturn);
});

/*
  it.each(["statesystemadmin", "statesubmitter"])(
    "returns correct user list for %s",
    (userType) => {
      const callingUser = parseTestData(
        `${testFileLocation}activeUser${userType}.json`
      );
      const outUserList = parseTestData(
        `${testFileLocation}usersFor${userType}.json`
      );
      const testEvent = {
        queryStringParameters: {
          email: "email",
        },
      };
      getUser.mockResolvedValue(callingUser);

      expect(getMyUserList(testEvent))
        .resolves.toStrictEqual(outUserList)
        .catch((err) => {
          console.log("Final Promise Failed", err.message);
        });
    }
  );
*/
