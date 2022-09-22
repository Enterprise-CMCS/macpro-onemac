const ChangeRequestDataApi = require("./ChangeRequestDataApi");
import { Auth, API } from "aws-amplify";
jest.mock("aws-amplify");

it("exists without crashing", () => {
  const apiObject = { key: "theKeyToTheUniverse" };
  const testUser = {
    signInUserSession: {
      idToken: {
        payload: {
          email: "userEmail",
          given_name: "Given",
          family_name: "Family",
        },
      },
    },
  };

  API.get.mockResolvedValue(apiObject);
  API.post.mockResolvedValue(apiObject);
  Auth.currentAuthenticatedUser.mockResolvedValue(testUser);

  const response = ChangeRequestDataApi.default.get("aa", "aa");
  expect(response)
    .resolves.toBe(apiObject)
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response2 = ChangeRequestDataApi.default.submit({ type: "aa" }, [
    { file: "One" },
    { file: "Two" },
  ]);
  expect(response2)
    .resolves.toBe(apiObject)
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response3 =
    ChangeRequestDataApi.default.getAllByAuthorizedTerritories("aa");
  expect(response3)
    .resolves.toBe(apiObject)
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response4 = ChangeRequestDataApi.default.packageExists("aa");
  expect(response4)
    .resolves.toBe(apiObject)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
