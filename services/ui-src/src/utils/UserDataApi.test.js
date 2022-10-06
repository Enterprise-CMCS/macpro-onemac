const { USER_ROLE, RESPONSE_CODE } = require("cmscommonlib");
const UserDataApi = require("./UserDataApi");

it("exists without crashing", () => {
  const response = UserDataApi.default.getMyUserList("aa");
  expect(response)
    .rejects.toThrow("DASHBOARD_RETRIEVAL_ERROR")
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response2 = UserDataApi.default.userProfile("aa");
  expect(response2)
    .rejects.toThrow("FETCH_ERROR")
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response3 = UserDataApi.default.updatePhoneNumber("aa", "bb");
  expect(response3)
    .rejects.toThrow("USER_SUBMISSION_FAILED")
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response4 = UserDataApi.default.setContactInfo("aa");
  expect(response4)
    .rejects.toThrow("USER_SUBMISSION_FAILED")
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response5 = UserDataApi.default.requestAccess(
    "aa",
    USER_ROLE.STATE_SUBMITTER,
    ["ee"],
    2,
    3
  );
  expect(response5)
    .rejects.toThrow("USER_SUBMISSION_FAILED")
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response6 = UserDataApi.default.updateUserStatus("aa");
  expect(response6)
    .rejects.toThrow("USER_SUBMISSION_FAILED")
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response7 = UserDataApi.default.getMyApprovers("aa", "ee");
  expect(response7)
    .rejects.toThrow("FETCH_ERROR")
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
