import dynamoDb from "./libs/dynamodb-lib";
import getUser from "./utils/getUser";
import { getMyUserList } from "./getMyUserList";

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

jest.mock("./utils/getUser");

jest.mock("./libs/dynamodb-lib");
dynamoDb.scan.mockResolvedValue(testDBUsers);

describe("request from user management page", () => {
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
});
