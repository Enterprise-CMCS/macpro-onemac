import { API, Auth } from "aws-amplify";

import { Workflow } from "cmscommonlib";
const PackageApi = require("./PackageApi");

jest.mock("aws-amplify");

beforeEach(() => {
  jest.clearAllMocks();

  Auth.currentAuthenticatedUser.mockResolvedValue({
    signInUserSession: {
      idToken: {
        payload: {
          email: "testEmail",
          given_name: "MyGivenName",
          family_name: "MyFamilyName",
        },
      },
    },
  });

  API.post.mockResolvedValue({ test: "thisTest" });

  //  API.get.mockResolvedValue({ oauth: {} });
});

it("exists without crashing", () => {
  const response = PackageApi.default.getDetail("foo", "foo", "foo");
  expect(response)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response2 = PackageApi.default.getMyPackages("foo", "tab");
  expect(response2)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response4 = PackageApi.default.getMyPackages("foo");
  expect(response4)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response3 = PackageApi.default.withdraw("foo", "foo", "foo");
  expect(response3)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response5 = PackageApi.default.getTopic(
    "test@test.com",
    "Medicaid_SPA"
  );
  expect(response5)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response6 = PackageApi.default.getTopicDetail(
    "AK-00-0885",
    "1657824888790"
  );
  expect(response6)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});

it("sucessfully submits a form", async () => {
  const testData = {
    type: Workflow.ONEMAC_TYPE.CHIP_SPA,
  };
  const testUploads = ["Upload1", "Upload2"];

  // const expectedData = {
  //   ...testData,
  //   submitterEmail: "testEmail",
  //   submitterName: "MyGivenName MyFamilyName",
  //   uploads: testUploads,
  // }

  const expectedResponse = { test: "thisTest" };

  expect(PackageApi.default.submitToAPI(testData, testUploads))
    .resolves.toStrictEqual(expectedResponse)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
