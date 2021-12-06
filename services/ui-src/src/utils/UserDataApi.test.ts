
const UserDataApi = require("./UserDataApi")

it("exists without crashing", () => {
    const response = UserDataApi.default.getCmsRoleApprovers()
    expect(response).toBeInstanceOf(Promise)

    const response2 = UserDataApi.default.getCmsSystemAdmins()
    expect(response2).toBeInstanceOf(Promise)

    const response3 = UserDataApi.default.setUserStatus({})
    expect(response3).toBeInstanceOf(Promise)

    const response4 = UserDataApi.default.updatePhoneNumber("id", "phone")
    expect(response4).toBeInstanceOf(Promise)

    const response5 = UserDataApi.default.updateUser({})
    expect(response5).toBeInstanceOf(Promise)

    const response6 = UserDataApi.default.getMyUserList("email")
    expect(response6).toBeInstanceOf(Promise)

    const response7 = UserDataApi.default.userProfile("email")
    expect(response7).toBeInstanceOf(Promise)
});
