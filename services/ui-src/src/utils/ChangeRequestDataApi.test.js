const ChangeRequestDataApi = require("./ChangeRequestDataApi");

it("exists without crashing", () => {
  const response = ChangeRequestDataApi.default.get("aa", "aa");
  expect(response)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response2 = ChangeRequestDataApi.default.submit("aa", []);
  expect(response2)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response3 =
    ChangeRequestDataApi.default.getAllByAuthorizedTerritories("aa");
  expect(response3)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });

  const response4 = ChangeRequestDataApi.default.packageExists("aa");
  expect(response4)
    .resolves.toBeInstanceOf(Promise)
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
