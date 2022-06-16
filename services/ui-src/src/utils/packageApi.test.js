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
  expect(response).toBeInstanceOf(Promise);

  const response2 = PackageApi.default.getMyPackages("foo", "tab");
  expect(response2).toBeInstanceOf(Promise);

  const response4 = PackageApi.default.getMyPackages("foo");
  expect(response4).toBeInstanceOf(Promise);

  const response3 = PackageApi.default.withdraw("foo", "foo", "foo");
  expect(response3).toBeInstanceOf(Promise);
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

  expect(
    PackageApi.default.submitToAPI(testData, testUploads)
  ).resolves.toStrictEqual(expectedResponse);
});
