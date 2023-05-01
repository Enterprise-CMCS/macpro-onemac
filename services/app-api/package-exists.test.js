import { main } from "./package-exists";
import packageExists from "./utils/packageExists";

jest.mock("./utils/packageExists");

it("Checks if a package exists", async () => {
  packageExists.mockResolvedValue(true);
  const response = main({ pathParameters: { packageId: "TestId" } }, "foo");
  expect(response)
    .resolves.toStrictEqual({
      body: "true",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
    })
    .catch((error) => {
      console.log("caught test error: ", error);
    });
});
