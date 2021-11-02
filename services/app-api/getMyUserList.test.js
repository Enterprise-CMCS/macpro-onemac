import dynamoDb from "./libs/dynamodb-lib";
import getUser from "./utils/getUser";
import { getMyUserList } from "./getMyUserList";

var fs = require("fs");
const testFileLocation = "../common/testData/";

var data = fs.readFileSync(`${testFileLocation}usersFromDynamo.json`),
  testDBUsers;

try {
  testDBUsers = JSON.parse(data);
} catch (err) {
  console.log("testDBUsers: There has been an error parsing your JSON.");
  console.log(err);
}

jest.mock("./utils/getUser");

jest.mock("./libs/dynamodb-lib");
dynamoDb.scan.mockResolvedValue(testDBUsers);

describe("request from user management page", () => {
  it.each(["statesystemadmin", "statesubmitter"])(
    "returns correct user list for %s",
    (userType) => {
      const userFilename = `${testFileLocation}activeUser${userType}.json`;
      const outputFilename = `${testFileLocation}usersFor${userType}.json`;

      data = fs.readFileSync(userFilename);
      let callingUser;

      try {
        callingUser = JSON.parse(data);
      } catch (err) {
        console.log("callingUser: There has been an error parsing your JSON.");
        console.log(err);
      }

      data = fs.readFileSync(outputFilename);
      let outUserList;

      try {
        outUserList = JSON.parse(data);
      } catch (err) {
        console.log("outUserList There has been an error parsing your JSON.");
        console.log(err);
      }
      const testEvent = {
        queryStringParameters: {
          email: "email",
        },
      };
      getUser.mockResolvedValue(callingUser);

      try {
        expect(getMyUserList(testEvent)).resolves.toBe(outUserList);
      } catch (err) {
        console.log("getMyUserList There has been an error parsing your JSON.");
        console.log(err);
      }
    }
  );
});
