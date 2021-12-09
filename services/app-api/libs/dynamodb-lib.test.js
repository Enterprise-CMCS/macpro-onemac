const dynamodblib = require("./dynamodb-lib");

it("Get DocumentClient Stub", async () => {
  expect(dynamodblib.default.get({})).toBeInstanceOf(Promise);
});
