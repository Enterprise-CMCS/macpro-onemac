
const PackageApi = require("./PackageApi")

it("exists without crashing", () => {
    const response = PackageApi.default.getDetail("foo","foo", "foo")
    expect(response).toBeInstanceOf(Promise)

    const response2 = PackageApi.default.getMyPackages("foo")
    expect(response2).toBeInstanceOf(Promise)

    const response3 = PackageApi.default.withdraw("foo","foo","foo")
    expect(response3).toBeInstanceOf(Promise)


});
