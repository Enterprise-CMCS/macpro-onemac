
const ChangeRequestDataApi = require("./ChangeRequestDataApi")

it("exists without crashing", () => {
    const response = ChangeRequestDataApi.default.get("aa","aa")
    expect(response).toBeInstanceOf(Promise)

    const response2 = ChangeRequestDataApi.default.submit("aa",[])
    expect(response2).toBeInstanceOf(Promise)

    const response3 = ChangeRequestDataApi.default.getAllByAuthorizedTerritories("aa",)
    expect(response3).toBeInstanceOf(Promise)

    const response4 = ChangeRequestDataApi.default.packageExists("aa")
    expect(response4).toBeInstanceOf(Promise)
});
