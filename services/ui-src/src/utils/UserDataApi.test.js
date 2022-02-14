const { USER_ROLE } = require("cmscommonlib");
const UserDataApi = require("./UserDataApi");

it("exists without crashing", () => {
  const response = UserDataApi.default.getMyUserList("aa");
  expect(response).toBeInstanceOf(Promise);

  const response2 = UserDataApi.default.userProfile("aa");
  expect(response2).toBeInstanceOf(Promise);

  const response3 = UserDataApi.default.updatePhoneNumber("aa", "bb");
  expect(response3).toBeInstanceOf(Promise);

  const response4 = UserDataApi.default.setContactInfo("aa");
  expect(response4).toBeInstanceOf(Promise);

  const response5 = UserDataApi.default.requestAccess(
    "aa",
    USER_ROLE.STATE_SUBMITTER,
    ["ee"],
    2,
    3
  );
  expect(response5).toBeInstanceOf(Promise);

  const response6 = UserDataApi.default.updateUserStatus("aa");
  expect(response6).toBeInstanceOf(Promise);

  const response7 = UserDataApi.default.getMyApprovers("aa", "ee");
  expect(response7).toBeInstanceOf(Promise);
});
